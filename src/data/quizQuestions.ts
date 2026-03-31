export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "JWT payload được mã hóa (encrypted) hay chỉ được encode?",
    options: [
      "Được mã hóa (encrypted) bằng AES",
      "Chỉ được Base64URL encode — ai cũng có thể đọc",
      "Được hash bằng SHA-256",
      "Được mã hóa bằng RSA",
    ],
    correctIndex: 1,
    explanation:
      "JWT payload chỉ được Base64URL encode, KHÔNG phải encrypted. Bất kỳ ai có token đều có thể decode và đọc nội dung payload. Vì vậy KHÔNG BAO GIỜ lưu dữ liệu nhạy cảm (password, credit card) trong JWT.",
    topic: "JWT Structure",
  },
  {
    id: "q2",
    question: "JWT gồm bao nhiêu phần chính?",
    options: ["2 phần", "3 phần", "4 phần", "5 phần"],
    correctIndex: 1,
    explanation:
      "JWT gồm 3 phần: Header (thông tin thuật toán), Payload (claims/dữ liệu), và Signature (chữ ký xác thực). Ba phần được nối với nhau bằng dấu chấm (.).",
    topic: "JWT Structure",
  },
  {
    id: "q3",
    question: "Nên lưu JWT Access Token ở đâu trên client?",
    options: [
      "localStorage — dễ truy cập nhất",
      "URL query parameter",
      "Memory (biến JS) hoặc httpOnly cookie",
      "Trong thẻ meta HTML",
    ],
    correctIndex: 2,
    explanation:
      "Memory (biến trong JS) là an toàn nhất cho access token vì không bị XSS đọc được. httpOnly cookie cũng an toàn nhưng cần backend hỗ trợ. localStorage có rủi ro XSS vì JavaScript có thể đọc được.",
    topic: "Security",
  },
  {
    id: "q4",
    question: "Tại sao cần Refresh Token?",
    options: [
      "Để thay thế password",
      "Để lấy access token mới khi token cũ hết hạn mà không cần đăng nhập lại",
      "Để mã hóa dữ liệu",
      "Để xác thực email người dùng",
    ],
    correctIndex: 1,
    explanation:
      "Refresh token cho phép lấy access token mới khi token cũ hết hạn, giúp user không phải đăng nhập lại. Access token sống ngắn (15 phút) để giảm rủi ro, refresh token sống lâu hơn (7-30 ngày) và được lưu an toàn.",
    topic: "Refresh Token",
  },
  {
    id: "q5",
    question: "Authentication và Authorization khác nhau như thế nào?",
    options: [
      "Giống nhau, chỉ là 2 cách gọi khác",
      "Authentication = xác thực danh tính, Authorization = phân quyền",
      "Authentication = phân quyền, Authorization = xác thực",
      "Authentication chỉ dùng cho API, Authorization chỉ dùng cho web",
    ],
    correctIndex: 1,
    explanation:
      'Authentication (AuthN) trả lời "Bạn là ai?" — xác minh danh tính. Authorization (AuthZ) trả lời "Bạn được làm gì?" — kiểm tra quyền hạn. Authentication luôn chạy trước, sau đó mới Authorization.',
    topic: "Auth Concepts",
  },
  {
    id: "q6",
    question: "Thuật toán HS256 thuộc loại nào?",
    options: [
      "Asymmetric (bất đối xứng)",
      "Symmetric (đối xứng) — dùng 1 secret key chung",
      "Hashing (không khôi phục được)",
      "Không phải thuật toán ký",
    ],
    correctIndex: 1,
    explanation:
      "HS256 (HMAC-SHA256) là thuật toán đối xứng (symmetric) — cùng 1 secret key để ký và verify. RS256 mới là bất đối xứng (private key ký, public key verify).",
    topic: "Algorithms",
  },
  {
    id: "q7",
    question: 'Tấn công "None Algorithm" là gì?',
    options: [
      "Tấn công khiến server không phản hồi",
      'Attacker đổi "alg" trong header thành "none" để bỏ qua signature verification',
      "Tấn công bằng cách gửi rất nhiều request",
      "Tấn công bằng cách xóa token",
    ],
    correctIndex: 1,
    explanation:
      'Attacker sửa JWT header thành {"alg": "none"} và bỏ phần signature. Nếu server không validate algorithm, nó sẽ chấp nhận token giả. Phòng chống: luôn enforce algorithm cụ thể (HS256/RS256), reject "none".',
    topic: "Security",
  },
  {
    id: "q8",
    question:
      "Trong ASP.NET Core, attribute nào dùng để bảo vệ API endpoint?",
    options: [
      "[ApiController]",
      "[Authorize]",
      "[HttpGet]",
      "[AllowAnonymous]",
    ],
    correctIndex: 1,
    explanation:
      '[Authorize] yêu cầu request phải có JWT hợp lệ. Có thể thêm Roles: [Authorize(Roles = "Admin")]. [AllowAnonymous] ngược lại — cho phép truy cập không cần auth.',
    topic: "Implementation",
  },
  {
    id: "q9",
    question: "Claim 'exp' trong JWT payload có ý nghĩa gì?",
    options: [
      "Experience level của user",
      "Thời gian hết hạn (Expiration Time) của token",
      "Tên experiment/thử nghiệm",
      "Expected response type",
    ],
    correctIndex: 1,
    explanation:
      "'exp' (Expiration Time) là Unix timestamp chỉ thời điểm token hết hạn. Server phải kiểm tra exp trước khi chấp nhận token. Thiếu exp → token valid mãi mãi → rủi ro bảo mật cực lớn.",
    topic: "JWT Structure",
  },
  {
    id: "q10",
    question: "JWT là stateless nghĩa là gì?",
    options: [
      "JWT không có trạng thái hoạt động",
      "Server không cần lưu session — tất cả thông tin nằm trong token",
      "Client không lưu gì cả",
      "Token không thể bị thay đổi",
    ],
    correctIndex: 1,
    explanation:
      "Stateless nghĩa là server không cần lưu trữ session hay token ở phía server. Tất cả thông tin cần thiết (user ID, role, expiration) đều nằm trong JWT. Server chỉ cần verify signature là xong.",
    topic: "JWT Overview",
  },
  {
    id: "q11",
    question:
      "XSS (Cross-Site Scripting) attack có thể đánh cắp JWT khi token được lưu ở đâu?",
    options: [
      "httpOnly cookie",
      "localStorage hoặc sessionStorage",
      "Secure cookie",
      "Server-side session",
    ],
    correctIndex: 1,
    explanation:
      "XSS có thể đọc localStorage/sessionStorage thông qua JavaScript. httpOnly cookie KHÔNG thể bị JavaScript đọc, nên an toàn hơn trước XSS. Tuy nhiên httpOnly cookie vẫn cần CSRF protection.",
    topic: "Security",
  },
  {
    id: "q12",
    question: "Trong JWT flow, bước nào xảy ra ĐẦU TIÊN?",
    options: [
      "Server generate JWT token",
      "Client gửi username/password đến Auth Server",
      "Client gửi Bearer token trong header",
      "Server validate signature",
    ],
    correctIndex: 1,
    explanation:
      "Flow bắt đầu khi client gửi credentials (username/password) đến Auth Server. Server validate, nếu đúng → generate JWT → trả về client. Sau đó client mới dùng token để gọi API.",
    topic: "JWT Flow",
  },
  {
    id: "q13",
    question: "RS256 khác HS256 ở điểm nào quan trọng nhất?",
    options: [
      "RS256 nhanh hơn HS256",
      "RS256 dùng cặp public/private key (bất đối xứng), HS256 dùng 1 secret (đối xứng)",
      "RS256 không cần signature",
      "HS256 an toàn hơn RS256",
    ],
    correctIndex: 1,
    explanation:
      "RS256 (RSA-SHA256) dùng private key để ký và public key để verify — phù hợp khi nhiều services cần verify token. HS256 dùng cùng 1 secret key — đơn giản hơn nhưng mọi service verify đều phải biết secret.",
    topic: "Algorithms",
  },
  {
    id: "q14",
    question: "HTTPS quan trọng như thế nào khi dùng JWT?",
    options: [
      "Không quan trọng, JWT đã tự bảo mật",
      "BẮT BUỘC — không có HTTPS, token có thể bị sniff/đánh cắp khi truyền qua mạng",
      "Chỉ cần cho trang đăng nhập",
      "Chỉ cần cho production, dev không cần",
    ],
    correctIndex: 1,
    explanation:
      "HTTPS (TLS/SSL) mã hóa toàn bộ traffic. Không có HTTPS, attacker trên cùng network có thể sniff và đánh cắp JWT token dạng plain text. JWT chỉ đảm bảo integrity (không bị tamper), KHÔNG đảm bảo confidentiality.",
    topic: "Security",
  },
  {
    id: "q15",
    question: "Claim 'sub' trong JWT payload thường chứa gì?",
    options: [
      "Subscription type",
      "Subject — thường là user ID hoặc username",
      "Subdomain",
      "Subtitle của token",
    ],
    correctIndex: 1,
    explanation:
      "'sub' (Subject) là registered claim xác định chủ thể của token — thường là user ID. Đây là 1 trong các registered claims theo RFC 7519, cùng với iss (issuer), aud (audience), exp, iat, nbf, jti.",
    topic: "JWT Structure",
  },
];
