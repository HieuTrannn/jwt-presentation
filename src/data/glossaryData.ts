export interface GlossaryTerm {
  term: string;
  definition: string;
  category: "core" | "claims" | "security" | "implementation" | "protocol";
}

export const GLOSSARY_DATA: GlossaryTerm[] = [
  { term: "JWT (JSON Web Token)", definition: "Chuẩn mở (RFC 7519) để truyền thông tin an toàn giữa các bên dưới dạng JSON object được ký số. Token gồm 3 phần: Header, Payload, Signature.", category: "core" },
  { term: "Bearer Token", definition: "Loại token được gửi trong HTTP Authorization header với format: 'Authorization: Bearer <token>'. Ai giữ token này đều có quyền truy cập tài nguyên.", category: "core" },
  { term: "Claims", definition: "Các cặp key-value trong JWT payload chứa thông tin về entity (user) và metadata. Có 3 loại: Registered, Public, Private claims.", category: "claims" },
  { term: "Registered Claims", definition: "Claims được định nghĩa sẵn trong RFC 7519: iss (issuer), sub (subject), aud (audience), exp (expiration), nbf (not before), iat (issued at), jti (JWT ID).", category: "claims" },
  { term: "sub (Subject)", definition: "Registered claim xác định chủ thể của token, thường là user ID hoặc username. Duy nhất trong context của issuer.", category: "claims" },
  { term: "exp (Expiration Time)", definition: "Unix timestamp chỉ thời điểm token hết hạn. Server PHẢI reject token đã quá exp. Thiếu exp = token valid mãi mãi = rủi ro bảo mật.", category: "claims" },
  { term: "iat (Issued At)", definition: "Unix timestamp chỉ thời điểm token được tạo. Dùng để xác định 'tuổi' của token.", category: "claims" },
  { term: "iss (Issuer)", definition: "Claim xác định ai đã phát hành token. Server verify xem iss có đúng là authority đáng tin cậy không.", category: "claims" },
  { term: "aud (Audience)", definition: "Claim xác định đối tượng nhận token. Server verify xem mình có phải là intended audience không.", category: "claims" },
  { term: "jti (JWT ID)", definition: "ID duy nhất của token, dùng để ngăn chặn replay attack — đảm bảo cùng 1 token không được dùng lại.", category: "claims" },
  { term: "HS256 (HMAC-SHA256)", definition: "Thuật toán ký đối xứng (symmetric): dùng cùng 1 secret key để ký và verify. Nhanh, đơn giản, phù hợp khi chỉ có 1 server.", category: "security" },
  { term: "RS256 (RSA-SHA256)", definition: "Thuật toán ký bất đối xứng (asymmetric): dùng private key để ký, public key để verify. Phù hợp microservices — chỉ auth server giữ private key.", category: "security" },
  { term: "ES256 (ECDSA-SHA256)", definition: "Thuật toán ký bất đối xứng dùng Elliptic Curve. Key nhỏ hơn RSA nhưng cùng mức bảo mật. Phù hợp mobile, IoT.", category: "security" },
  { term: "Access Token", definition: "Token ngắn hạn (15 phút–1 giờ) dùng để truy cập protected resources. Gửi trong Authorization header của mỗi API request.", category: "core" },
  { term: "Refresh Token", definition: "Token dài hạn (7–30 ngày) dùng để lấy access token mới khi token cũ hết hạn. Nên lưu trong httpOnly cookie.", category: "core" },
  { term: "Token Rotation", definition: "Chiến lược cấp refresh token mới mỗi khi dùng refresh token cũ. Nếu refresh token bị đánh cắp và dùng lại → phát hiện được → revoke cả family.", category: "security" },
  { term: "Stateless Authentication", definition: "Server không lưu session — tất cả thông tin cần thiết nằm trong token. Dễ scale horizontally vì bất kỳ server nào đều verify được.", category: "core" },
  { term: "Stateful Authentication (Session)", definition: "Server lưu session data (trong memory/DB/Redis). Client chỉ giữ session ID trong cookie. Dễ revoke nhưng khó scale.", category: "core" },
  { term: "CSRF (Cross-Site Request Forgery)", definition: "Tấn công khiến browser gửi request giả mạo kèm cookie tự động. Cần CSRF token protection khi JWT lưu trong cookie.", category: "security" },
  { term: "XSS (Cross-Site Scripting)", definition: "Tấn công inject JavaScript độc hại vào trang web. Có thể đánh cắp JWT từ localStorage. httpOnly cookie miễn nhiễm với XSS.", category: "security" },
  { term: "Base64URL Encoding", definition: "Biến thể của Base64 dùng trong JWT: thay '+' thành '-', '/' thành '_', bỏ padding '='. An toàn cho URL và HTTP header.", category: "core" },
  { term: "Signature", definition: "Phần thứ 3 của JWT, được tạo bằng HMAC hoặc RSA. Đảm bảo token không bị tamper. Server verify signature trước khi tin tưởng payload.", category: "core" },
  { term: "Token Blacklist/Revocation", definition: "Danh sách các token đã bị vô hiệu hóa trước khi hết hạn. Cần thiết cho logout, nhưng đánh đổi stateless. Thường dùng Redis.", category: "security" },
  { term: "Middleware (ASP.NET Core)", definition: "Pipeline xử lý request. UseAuthentication() xác thực token → UseAuthorization() kiểm tra quyền. Thứ tự middleware RẤT quan trọng.", category: "implementation" },
  { term: "OAuth 2.0", definition: "Framework ủy quyền (authorization framework), KHÔNG phải authentication protocol. JWT thường là format token trong OAuth 2.0 flows.", category: "protocol" },
  { term: "OpenID Connect (OIDC)", definition: "Lớp identity xây trên OAuth 2.0, thêm authentication. Dùng ID Token (JWT) để xác thực người dùng. Login with Google/Facebook dùng OIDC.", category: "protocol" },
];
