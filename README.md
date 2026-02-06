# JWT Authentication Flow - Chapter 06

**PRN232 - Implement Security in RESTful Web Service**

Presentation về JWT Authentication Flow theo phong cách ByteByteGo – single-page scrolling design.

## Tính năng

- 📜 **Single-page scrolling** – Không chuyển slide, cuộn xuống để xem nội dung
- 📊 **4 ByteByteGo-style diagrams** – Minh họa rõ ràng, căn chỉnh chính xác
- 🎨 **Dark theme** – Giao diện tối phù hợp phong cách ByteByteGo
- 📈 **Progress bar** – Theo dõi tiến độ cuộn

## Nội dung

| Section                     | Mô tả                                                                    |
| --------------------------- | ------------------------------------------------------------------------ |
| **Hero**                    | Giới thiệu JWT – Stateless, Scalable, Cross-Domain                       |
| **JWT Authentication Flow** | Diagram 7 bước: Login → Validate → JWT → API Request → Verify → Resource |
| **JWT Structure**           | Header, Payload, Signature với ví dụ JSON                                |
| **JWT vs Session**          | So sánh Stateless vs Stateful authentication                             |
| **Refresh Token Strategy**  | 3 phase: Initial Login, Using Access Token, Token Expired → Refresh      |
| **Security Best Practices** | 9 nguyên tắc bảo mật quan trọng                                          |
| **Common Vulnerabilities**  | 4 lỗ hổng phổ biến và cách phòng tránh                                   |
| **Implementation**          | ASP.NET Core code examples                                               |

## Cấu trúc project

```
jwt-presentation/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── components/
│       ├── ByteByteGoPresentation.tsx  # Main presentation
│       ├── JwtFlowDiagram.tsx          # JWT auth flow
│       ├── JwtStructureDiagram.tsx     # JWT structure
│       ├── JwtVsSessionDiagram.tsx     # JWT vs Session
│       └── RefreshTokenFlowDiagram.tsx # Refresh token flow
├── package.json
└── README.md
```

## Cài đặt & chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

## Scripts

| Script          | Mô tả                        |
| --------------- | ---------------------------- |
| `npm run dev`   | Development mode (port 3000) |
| `npm run build` | Build production             |
| `npm run start` | Chạy production build        |
| `npm run lint`  | Chạy ESLint                  |

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **SVG** (custom diagrams)

## Tham khảo

- [ByteByteGo](https://bytebytego.com/) – Phong cách diagram
- Chapter 06 – Implement security in RESTful WebService (PRN232)
