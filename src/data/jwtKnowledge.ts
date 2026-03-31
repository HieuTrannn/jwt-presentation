export interface KnowledgeChunk {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

export const JWT_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: "rest-security-basics",
    title: "RESTful Web Service security basics",
    keywords: [
      "validation",
      "no sensitive data in url",
      "malformed json",
      "generic error",
      "method restriction",
      "rest security",
    ],
    content:
      "Chapter 06 emphasizes core REST security practices: validate all server-side inputs, never place sensitive data (username/password/token) in URL, restrict HTTP methods by intent (for example GET must not delete data), validate malformed XML/JSON input, and return generic HTTP error responses such as 403/401 without leaking internals.",
  },
  {
    id: "jwt-overview",
    title: "JWT overview",
    keywords: ["jwt", "overview", "rest api", "web api", "bearer token"],
    content:
      "JWT authentication issues a digitally signed bearer token to authenticated clients. The client must send the token on every request to protected resources. JWT is commonly used in REST APIs and ASP.NET Core Web APIs.",
  },
  {
    id: "jwt-structure",
    title: "JWT structure",
    keywords: ["header", "payload", "signature", "claims", "alg", "exp"],
    content:
      "A JWT has 3 parts: header, payload, and signature. The header describes token type and signing algorithm. The payload contains claims such as sub, exp, iat, role, permissions. The signature is used to verify integrity and prevent tampering.",
  },
  {
    id: "jwt-claims-types",
    title: "JWT claims types",
    keywords: ["claims", "registered claims", "public claims", "private claims", "payload"],
    content:
      "The JWT payload carries claims. In chapter context, claims are commonly explained as three categories: registered claims, public claims, and private claims. Claims help represent identity and permissions and are later used by authorization decisions.",
  },
  {
    id: "jwt-flow",
    title: "JWT authentication flow",
    keywords: ["flow", "login", "validate", "token", "authorization header"],
    content:
      "Typical flow: user sends username and password, server validates credentials, server generates JWT, client stores the token, client sends Authorization: Bearer <token> on later requests, middleware validates token, authorization decides access.",
  },
  {
    id: "auth-vs-authz",
    title: "Authentication vs Authorization",
    keywords: ["authentication", "authorization", "difference", "authn", "authz"],
    content:
      "Authentication answers who the user is. Authorization answers what the user is allowed to do. Authentication usually happens first; authorization depends on the authenticated identity and claims/roles/policies.",
  },
  {
    id: "authn-authz-middleware-flow",
    title: "Authentication and Authorization middleware flow",
    keywords: [
      "useauthentication",
      "useauthorization",
      "httpcontext.user",
      "challengeasync",
      "claimsprincipal",
      "middleware flow",
    ],
    content:
      "Authentication middleware (UseAuthentication) runs first and attempts to build HttpContext.User from cookie/JWT via AuthenticateAsync. Authorization middleware (UseAuthorization) then checks access rules. If an endpoint requires authorization and user is unauthenticated, the auth handler can challenge. With JWT, the client must send Authorization: Bearer <token> on subsequent protected requests.",
  },
  {
    id: "access-vs-refresh",
    title: "Access token vs Refresh token",
    keywords: ["access token", "refresh token", "expiration", "rotation"],
    content:
      "Access token should be short-lived and used for protected API access. Refresh token should live longer and be used to obtain a new access token. In production, refresh tokens are better stored in secure httpOnly cookies, but this requires a backend.",
  },
  {
    id: "storage-strategy",
    title: "Client-side storage strategy",
    keywords: ["localstorage", "sessionstorage", "cookie", "memory", "storage"],
    content:
      "For this FE-only learning project, chat history can be stored in localStorage. For real authentication systems, storing auth tokens in localStorage increases XSS risk. Memory storage is safer for short-lived access tokens. httpOnly cookies need server support and cannot be created securely by frontend-only code.",
  },
  {
    id: "best-practices",
    title: "JWT security best practices",
    keywords: ["https", "best practice", "security", "signature", "secret", "exp"],
    content:
      "Use HTTPS, set short token expiration, validate signature and expiration, never place sensitive data in JWT payload or URL, use strong secrets/keys, restrict dangerous methods, return generic error messages, and design refresh token rotation if you have backend support.",
  },
  {
    id: "transport-security-tls",
    title: "TLS/SSL transport security",
    keywords: ["tls", "ssl", "https", "transport layer security", "integrity", "encryption"],
    content:
      "Chapter 06 highlights TLS/SSL as mandatory transport protection. HTTPS helps provide confidentiality, integrity, and endpoint authentication during client-server communication. JWT without HTTPS is not sufficient for secure production traffic.",
  },
  {
    id: "common-vulnerabilities",
    title: "Common JWT vulnerabilities",
    keywords: ["none algorithm", "weak secret", "expiration", "base64", "tampering"],
    content:
      "Common mistakes: accepting alg=none, using weak secret keys, omitting exp, storing confidential data in payload, and thinking Base64 means encryption. JWT payload is encoded, not encrypted.",
  },
  {
    id: "aspnetcore-jwt",
    title: "ASP.NET Core JWT setup",
    keywords: ["asp.net core", "addjwtbearer", "authorize", "roles", "program.cs"],
    content:
      "In ASP.NET Core Web API, JWT is typically configured with AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(...). Protected endpoints use [Authorize], and role-protected endpoints can use [Authorize(Roles = \"Admin\")]. UseAuthentication should run before UseAuthorization.",
  },
  {
    id: "testing-jwt",
    title: "Testing JWT",
    keywords: ["postman", "401", "private api", "login endpoint", "refresh endpoint"],
    content:
      "A common test flow is: call login endpoint, receive access token and refresh token, call private endpoint with Bearer token, then intentionally modify token to see 401 Unauthorized, and finally test refresh token endpoint.",
  },
  {
    id: "jwt-test-endpoints",
    title: "JWT testing endpoints in chapter demo",
    keywords: ["api/account/login", "api/account/refreshtoken", "privateapi", "postman", "401 unauthorized"],
    content:
      "The chapter demo testing flow is explicit: POST /api/account/login returns access and refresh tokens; then call protected endpoint (for example /api/jwt/privateapi) with Bearer token; tamper token to verify 401 Unauthorized; finally POST /api/account/refreshtoken with accessToken + refreshToken payload to request a new access token.",
  },
];

