"use client";

export default function AuthVsAuthzSection() {
  return (
    <div className="space-y-8">
      {/* Visual comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Authentication */}
        <div className="byte-card border-t-4 border-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center text-3xl">
              🆔
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-400">Authentication</h3>
              <p className="text-sm text-slate-400">AuthN — &quot;Bạn là ai?&quot;</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-300 mb-2 font-semibold">🎯 Mục đích</p>
              <p className="text-sm text-slate-400">Xác minh danh tính người dùng — chứng minh &quot;bạn đúng là ai bạn nói bạn là&quot;</p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-300 mb-2 font-semibold">📋 Ví dụ thực tế</p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Đăng nhập bằng username/password</li>
                <li>• Quét vân tay, Face ID</li>
                <li>• Login with Google/Facebook</li>
                <li>• Mã OTP qua điện thoại</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-300 mb-2 font-semibold">⚙️ Trong JWT</p>
              <div className="text-sm text-slate-400 font-mono bg-slate-900/50 p-3 rounded">
                POST /api/login<br/>
                → Server kiểm tra credentials<br/>
                → Trả về JWT token<br/>
                → <span className="text-blue-400">Token = bằng chứng đã xác thực</span>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300 font-semibold">🔑 ASP.NET Core</p>
              <code className="text-xs text-blue-400">UseAuthentication()</code>
              <p className="text-xs text-slate-400 mt-1">Middleware chạy ĐẦU TIÊN — đọc JWT từ header và gán HttpContext.User</p>
            </div>
          </div>
        </div>

        {/* Authorization */}
        <div className="byte-card border-t-4 border-green-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center text-3xl">
              🛡️
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-400">Authorization</h3>
              <p className="text-sm text-slate-400">AuthZ — &quot;Bạn được làm gì?&quot;</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-300 mb-2 font-semibold">🎯 Mục đích</p>
              <p className="text-sm text-slate-400">Kiểm tra quyền hạn — xác định người dùng được phép truy cập tài nguyên nào</p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-300 mb-2 font-semibold">📋 Ví dụ thực tế</p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Admin được tạo/xóa sản phẩm</li>
                <li>• User thường chỉ được xem</li>
                <li>• Manager được approve đơn hàng</li>
                <li>• Guest chỉ xem trang public</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-300 mb-2 font-semibold">⚙️ Trong JWT</p>
              <div className="text-sm text-slate-400 font-mono bg-slate-900/50 p-3 rounded">
                JWT Payload chứa claims:<br/>
                {`{ "role": "Admin" }`}<br/>
                {`{ "permissions": ["read","write"] }`}<br/>
                → <span className="text-green-400">Server đọc claims → quyết định access</span>
              </div>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-300 font-semibold">🔑 ASP.NET Core</p>
              <code className="text-xs text-green-400">UseAuthorization()</code>
              <p className="text-xs text-slate-400 mt-1">Middleware chạy SAU Authentication — kiểm tra [Authorize(Roles = &quot;Admin&quot;)]</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flow diagram */}
      <div className="byte-card">
        <h4 className="text-lg font-bold text-white mb-4">🔄 Thứ tự xử lý trong ASP.NET Core Pipeline</h4>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "Request đến", color: "slate", icon: "📨" },
            { label: "UseAuthentication()", color: "blue", icon: "🔵" },
            { label: "Xác thực JWT", color: "blue", icon: "🆔" },
            { label: "UseAuthorization()", color: "green", icon: "🟢" },
            { label: "Kiểm tra quyền", color: "green", icon: "🛡️" },
            { label: "Controller Action", color: "orange", icon: "⚙️" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-slate-600 text-lg">→</span>}
              <div className={`px-3 py-2 rounded-lg bg-${item.color}-500/10 border border-${item.color}-500/30`}>
                <span className="mr-1">{item.icon}</span>
                <span className={`text-xs font-semibold text-${item.color}-400`}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
