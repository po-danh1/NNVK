import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { LINK_CONFIG } from "@/config/link";
import { Facebook } from "lucide-react";

export default function ServicesPage() {  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-green-700">Dịch vụ</h1>
        <p className="mt-3 text-gray-700">
          Tại NGÔI NHÀ VUI KHOẺ, chúng tôi ưu tiên sự vừa đủ: vận động nhẹ nhàng,
          khoa học và thói quen lành mạnh để bạn hiểu cơ thể – lắng nghe cảm xúc.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">TƯ VẤN CHĂM SÓC SỨC KHOẺ</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
            Chúng tôi lắng nghe thói quen sinh hoạt, nhịp sống và nhu cầu cá nhân của bạn để đưa ra gợi ý phù hợp về vận động, dinh dưỡng tinh gọn và các thói quen duy trì sức khỏe hằng ngày.
            Mục tiêu không phải thay đổi đột ngột, mà là đồng hành cùng bạn xây dựng lối sống lành mạnh lâu dài - NƠI CHÚNG TA LÀ MỘT GIA ĐÌNH
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">BUỔI TẬP ĐI KÈM ĂN SÁNG</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
            Trải nghiệm vận động nhẹ nhàng kết hợp bữa sáng tinh gọn dạng bột, giúp cơ thể được khởi động vừa đủ, dễ chịu và tỉnh táo
            Buổi tập hỗ trợ tăng tuần hoàn, giảm căng thẳng, trong khi bữa sáng cung cấp năng lượng cần thiết mà không gây nặng bụng – phù hợp với nhịp sống hiện đại, bận rộn. Tạo môi trường thân thiện, gắn kết cộng đồng.
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 rounded-xl border bg-white p-5">
          <div className="text-sm font-semibold text-green-700">KHUNG GIỜ & QUY ĐỊNH</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>Giờ hoạt động: 5h30 – 19h.</li>
            <li>
              Đổi/hủy lịch: vui lòng báo trước để chúng tôi sắp xếp lại khung giờ phù hợp.
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-3xl mt-10">
        <h1 className="text-3xl font-bold text-green-700">Liên hệ</h1>
        <p className="mt-3 text-gray-700">
          Để được tư vấn nhanh, bạn có thể gọi điện hoặc để lại số điện thoại ở trang chủ.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Thông tin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
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
                <div>5h30 – 19h</div>
              </div>
            </CardContent>
          </Card>

          <Card>
  <CardHeader>
    <CardTitle className="text-green-700">Mạng xã hội</CardTitle>
  </CardHeader>

  <CardContent className="space-y-3 text-sm text-gray-700">
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
  </CardContent>
</Card>

        </div>
      </div>
    </div>
  );
}


