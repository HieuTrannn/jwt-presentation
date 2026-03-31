export interface CodeExample {
  language: string;
  label: string;
  icon: string;
  configure: string;
  generateToken: string;
  protectEndpoint: string;
}

export const CODE_EXAMPLES: CodeExample[] = [
  {
    language: "csharp",
    label: "C# (ASP.NET Core)",
    icon: "🟣",
    configure: `// Program.cs — JWT Configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// Middleware order matters!
app.UseAuthentication();
app.UseAuthorization();`,
    generateToken: `// TokenService.cs — Generate JWT
public string GenerateToken(User user)
{
    var securityKey = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
    var credentials = new SigningCredentials(
        securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Role, user.Role)
    };

    var token = new JwtSecurityToken(
        issuer: _config["Jwt:Issuer"],
        audience: _config["Jwt:Audience"],
        claims: claims,
        expires: DateTime.Now.AddMinutes(30),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}`,
    protectEndpoint: `// ProductsController.cs — Protected Endpoints
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    [Authorize] // Requires valid JWT
    public IActionResult GetProducts()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Ok(products);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")] // Requires Admin role
    public IActionResult CreateProduct(Product product)
    {
        return CreatedAtAction(nameof(GetProducts), product);
    }
}`,
  },
  {
    language: "javascript",
    label: "Node.js (Express)",
    icon: "🟢",
    configure: `// app.js — JWT Configuration with Express
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = process.env.JWT_SECRET; // Strong random string
const JWT_EXPIRES_IN = '30m';

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}`,
    generateToken: `// authController.js — Generate JWT
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate credentials (simplified)
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT with claims
    const accessToken = jwt.sign(
        {
            sub: user._id,
            username: user.username,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: '30m', issuer: 'my-app', audience: 'my-api' }
    );

    const refreshToken = jwt.sign(
        { sub: user._id },
        REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    res.json({ accessToken, refreshToken });
});`,
    protectEndpoint: `// routes/products.js — Protected Routes
const express = require('express');
const router = express.Router();

// Public route
router.get('/public', (req, res) => {
    res.json({ message: 'This is public' });
});

// Protected route — requires valid JWT
router.get('/products', authenticateToken, (req, res) => {
    const userId = req.user.sub;
    res.json({ products, userId });
});

// Admin-only route
router.post('/products', authenticateToken, requireRole('Admin'),
    (req, res) => {
        // Only Admin can create products
        res.status(201).json(req.body);
    }
);`,
  },
  {
    language: "python",
    label: "Python (FastAPI)",
    icon: "🔵",
    configure: `# main.py — JWT Configuration with FastAPI
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta

app = FastAPI()

SECRET_KEY = "your-256-bit-secret-key-here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

# Dependency: Validate JWT token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return payload`,
    generateToken: `# auth.py — Generate JWT Token
from datetime import datetime, timedelta
from jose import jwt

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=30))
    to_encode.update({
        "exp": expire,
        "iat": datetime.utcnow(),
        "iss": "my-fastapi-app"
    })
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/api/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": str(user.id), "role": user.role}
    )
    refresh_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(days=7)
    )
    return {"access_token": access_token, "refresh_token": refresh_token}`,
    protectEndpoint: `# routes/products.py — Protected Endpoints
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/api")

# Protected route — requires valid JWT
@router.get("/products")
async def get_products(current_user: dict = Depends(get_current_user)):
    user_id = current_user["sub"]
    return {"products": products, "user_id": user_id}

# Admin-only route
@router.post("/products")
async def create_product(
    product: Product,
    current_user: dict = Depends(get_current_user)
):
    if current_user.get("role") != "Admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return {"created": product}

# Public route — no authentication needed
@router.get("/public")
async def public_info():
    return {"message": "This is public"}`,
  },
  {
    language: "java",
    label: "Java (Spring Boot)",
    icon: "☕",
    configure: `// SecurityConfig.java — JWT Configuration
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/login", "/api/public").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
    generateToken: `// JwtService.java — Generate JWT Token
@Service
public class JwtService {
    @Value("\${jwt.secret}")
    private String secretKey;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList()));

        return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis()
                + 1000 * 60 * 30)) // 30 minutes
            .setIssuer("my-spring-app")
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername())
            && !isTokenExpired(token);
    }
}`,
    protectEndpoint: `// ProductController.java — Protected Endpoints
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    @PreAuthorize("isAuthenticated()") // Requires valid JWT
    public ResponseEntity<List<Product>> getProducts(
            Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(productService.findAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Requires Admin role
    public ResponseEntity<Product> createProduct(
            @RequestBody Product product) {
        Product created = productService.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/public")
    public ResponseEntity<String> publicEndpoint() {
        return ResponseEntity.ok("This is public");
    }
}`,
  },
];
