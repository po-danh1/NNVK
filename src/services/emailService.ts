import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/config/emailjs";

export interface RegistrationFormData {
  fullName?: string;
  phone: string;
  email?: string;
  purposes: string[];
  preferredTime?: string;
  source?: string;
}
export const initEmailJS = () => {
  if (!EMAILJS_CONFIG.PUBLIC_KEY) {
    console.warn("⚠️ EmailJS PUBLIC_KEY chưa được cấu hình");
    return;
  }
  
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

export const sendRegistrationEmail = async (data: RegistrationFormData) => {
  try {
    if (
      !EMAILJS_CONFIG.PUBLIC_KEY ||
      !EMAILJS_CONFIG.SERVICE_ID ||
      !EMAILJS_CONFIG.TEMPLATE_ID
    ) {
      throw new Error("EmailJS config không hợp lệ");
    }
    
    const templateParams = {
      fullName: data.fullName || "Không cung cấp",
      phone: data.phone,
      email: data.email || "Không có",
    
      purposes: data.purposes
        .map((p) => {
          const map: Record<string, string> = {
            training: "Trải nghiệm tập luyện",
            breakfast: "Quan tâm bữa sáng tinh gọn",
            health: "Cải thiện sức khoẻ tổng thể",
            consultation: "Muốn được tư vấn",
          };
          return map[p] || p;
        })
        .join(", "),
    
      preferredTime:
        data.preferredTime === "morning"
          ? "Sáng"
          : data.preferredTime === "afternoon"
          ? "Chiều"
          : data.preferredTime === "weekend"
          ? "Cuối tuần"
          : "Không xác định",
    
      date: new Date().toLocaleString("vi-VN"),

      // Optional fields (template may ignore if not used)
      source:
        data.source === "google"
          ? "Google"
          : data.source === "facebook"
          ? "Facebook"
          : data.source === "tiktok"
          ? "TikTok"
          : data.source === "referral"
          ? "Giới thiệu"
          : data.source || "Không xác định",
    };
    

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log("✅ Email sent successfully:", response);
    return {
      success: true,
      message: "Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.",
    };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
