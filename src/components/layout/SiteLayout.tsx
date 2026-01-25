import { Link, NavLink, Outlet } from "react-router-dom";
import { Facebook, Phone, Mail, MapPin, Clock } from "lucide-react";
import { LINK_CONFIG } from "@/config/link";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "text-sm font-medium transition-colors",
    isActive ? "text-green-700" : "text-gray-700 hover:text-green-700",
  ].join(" ");

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b border-green-700 bg-white/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt="NGÔI NHÀ VUI KHOẺ"
              className="h-9 w-9 rounded-full object-cover ring-1 ring-green-100"
            />
            <div className="leading-tight">
              <div className="text-base font-semibold text-green-700">
                NGÔI NHÀ VUI KHOẺ
              </div>
              <div className="text-xs text-gray-600">
                Hiểu cơ thể, lắng nghe cảm xúc
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            <NavLink to="/" className={navLinkClass} end>
              Trang chủ
            </NavLink>
            <NavLink to="/dich-vu&lien-he" className={navLinkClass}>
              Dịch vụ & Liên hệ
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-green-700 bg-gray-50">
        <div className="container mx-auto px-4 py-10">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="space-y-3 col-span-2">
              <div className="text-sm font-semibold text-gray-900">
                NGÔI NHÀ VUI KHOẺ
              </div>
              <div className="text-sm text-gray-600">
                Chăm sóc sức khoẻ không cần bắt đầu từ những điều phức tạp.
              </div>
              <div className="space-y-3 text-sm text-gray-700">
    {/* Facebook */}
    <div className="flex items-center gap-2">
    <a
      className="inline-flex items-center gap-2 text-green-700 hover:text-green-800"
      href={LINK_CONFIG.LINK_FACEBOOK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Facebook className="h-4 w-4" />
      Facebook
    </a>
    </div>
    <div className="flex items-center gap-2">
    {/* TikTok */}
    <a
      className="inline-flex items-center gap-2 text-green-700 hover:text-green-800"
      href={LINK_CONFIG.LINK_TIKTOK}
      onClick={(e) => e.preventDefault()}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M16.5 1c.7 3.4 3.1 5.7 6.5 6.1v4.2c-1.9.1-3.8-.5-5.4-1.5v7.6c0 3.9-3.2 7-7.1 6.6-3-.3-5.5-2.8-5.9-5.8-.6-4.3 2.7-8 6.9-8 .6 0 1.2.1 1.8.3v4.4c-.5-.2-1.1-.4-1.8-.4-1.4 0-2.7 1-2.9 2.4-.3 1.8 1.1 3.4 2.9 3.4 1.6 0 2.9-1.3 2.9-2.9V1h4.1z" />
      </svg>
      TikTok
    </a>
    </div>
    <div className="flex items-center gap-2"> 
    </div>
  </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-900">Liên hệ</div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-green-700" />
                  <a className="hover:text-green-800" href="tel:0350387088">
                    035 038 7088
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-green-700" />
                  <a
                    className="hover:text-green-800"
                    href="mailto:adngoinhavuikhoe@gmail.com"
                  >
                    adngoinhavuikhoe@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-green-700" />
                  <div>15 Lê Hữu Trác</div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-green-700" />
                  <div>Giờ hoạt động: 5h30 – 19h</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-900">
                FAQ / Chính sách
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="text-gray-700 hover:text-green-800">
                  Câu hỏi thường gặp
                </div>
                <div className="text-gray-700 hover:text-green-800">
                  Chính sách bảo mật
                </div>
                <div className="text-gray-700 hover:text-green-800">
                  Điều khoản sử dụng
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} NGÔI NHÀ VUI KHOẺ. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  );
}


