import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDown, Facebook, Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  sendRegistrationEmail,
  initEmailJS,
  type RegistrationFormData,
} from "@/services/emailService";

const BANNERS = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
  "/images/banner4.jpg",
  "/images/banner5.jpg",
];
const registrationSchema = z.object({
  fullName: z.string().optional().or(z.literal("")),
  phone: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  purposes: z.array(z.string()).optional(),
  preferredTime: z.string().optional(),
  source: z.string().optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, "Vui lòng đồng ý với chính sách để tiếp tục"),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const PURPOSE_OPTIONS = [
  { id: "training", label: "Trải nghiệm tập luyện" },
  { id: "breakfast", label: "Quan tâm bữa sáng tinh gọn" },
  { id: "health", label: "Cải thiện sức khoẻ tổng thể" },
  { id: "consultation", label: "Chưa rõ, muốn được tư vấn" },
];

const TIME_OPTIONS = [
  { value: "morning", label: "Sáng" },
  { value: "afternoon", label: "Chiều" },
  { value: "weekend", label: "Cuối tuần" },
];

const SOURCE_OPTIONS = [
  { value: "google", label: "Google" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "referral", label: "Giới thiệu" },
];

const HomePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Khởi tạo EmailJS khi component mount
  useEffect(() => {
    initEmailJS();
  }, []);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      purposes: ["consultation"],
      preferredTime: "",
      source: "",
      consent: false,
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const registrationData: RegistrationFormData = {
        fullName: data.fullName || undefined,
        phone: data.phone,
        email: data.email || undefined,
        purposes: data.purposes?.length ? data.purposes : ["consultation"],
        preferredTime: data.preferredTime || undefined,
        source: data.source || undefined,
      };

      await sendRegistrationEmail(registrationData);
      setSubmitSuccess(true);
      form.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="container mx-auto px-4 pt-10 pb-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-green-700 md:text-5xl">
            NGÔI NHÀ VUI KHOẺ
          </h1>
          <p className="mt-3 text-lg font-medium text-gray-700">
            Hiểu cơ thể, lắng nghe cảm xúc
          </p>
          <p className="mx-auto mt-5 max-w-4xl text-gray-700">
          Chăm sóc sức khoẻ không cần bắt đầu từ những điều phức tạp.
Chúng tôi mang đến một trải nghiệm chăm sóc toàn diện, kết hợp giữa vận động nhẹ nhàng, có cơ sở khoa học và bữa sáng tinh gọn, phù hợp với nhịp sống hiện đại.
Mỗi buổi tập được thiết kế vừa đủ để cơ thể khởi động an toàn, kích hoạt năng lượng tích cực, đồng thời giúp tinh thần thư giãn và cân bằng hơn. Từ những thói quen đơn giản mỗi sáng, bạn có thể nuôi dưỡng sức khoẻ bền vững và cảm nhận sự thay đổi nhẹ nhàng mỗi ngày.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              className="bg-green-700 hover:bg-green-800 text-white"
              size="lg"
              type="button"
              onClick={() =>
                document.getElementById("dang-ky-tu-van")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              <Phone className="mr-2 h-4 w-4" />
              Để lại số điện thoại để tư vấn
            </Button>
            <Button
              variant="outline"
              size="lg"
              type="button"
              className="border-green-200 text-green-800 hover:bg-green-50"
              onClick={() =>
                document.getElementById("gioi-thieu")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              <ArrowDown className="mr-2 h-4 w-4" />
              Xem thêm
            </Button>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 mb-8">
        <Carousel
          className="w-full"
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {BANNERS.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden">
                  <img
                    src={src}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nút điều hướng */}
          <CarouselPrevious className="bg-white border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400" />
          <CarouselNext className="bg-white border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400" />
        </Carousel>
      </section>

      {/* Intro */}
      <section id="gioi-thieu" className="container mx-auto px-4 pb-10 scroll-mt-24">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-5">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-green-700">Giới thiệu về dịch vụ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <p>
              Không ép buộc, không quá tải – chỉ là những chuyển động vừa đủ để cơ thể được đánh thức nhẹ nhàng mỗi buổi sáng.
Dịch vụ của chúng tôi kết hợp vận động nhẹ nhàng an toàn cùng bữa sáng tinh gọn dạng bột, dễ hấp thu và phù hợp với nhịp sống hiện đại.

            </p>
              <p>
              Tại Ngôi Nhà Vui Khỏe, chăm sóc sức khỏe không chỉ là tập luyện, mà là hiểu cơ thể – lắng nghe cảm xúc, bắt đầu từ những điều đơn giản và bền vững mỗi ngày.
  
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2" >
            <CardHeader>
              <CardTitle className="text-green-700">Dịch vụ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700">
              <div>Lắng nghe thói quen sinh hoạt và nhu cầu cá nhân để gợi ý phương pháp vận động, dinh dưỡng tinh gọn và thói quen lành mạnh phù hợp.</div>
              <div>Buổi tập đi kèm bữa sáng tinh gọn
              Trải nghiệm vận động nhẹ nhàng, có người hướng dẫn, kết hợp bữa sáng dạng ngũ cốc và yến mạch</div>
              <div className="pt-2">
                <a
                  className="text-green-700 hover:text-green-800 font-medium"
                  href="https://www.facebook.com/profile.php?id=61586944703941"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="inline-flex items-center gap-2">
                    <Facebook className="h-4 w-4" />
                    Bắt đầu tư vấn 
                  </span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>



      {/* Registration Form */}
      <section
        id="dang-ky-tu-van"
        className="container mx-auto px-4 pb-12 max-w-2xl scroll-mt-24"
      >
        <Card>
          <CardHeader >
            <CardTitle className="text-2xl font-bold text-center text-green-700">
              Đăng ký tư vấn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Họ và tên
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập họ và tên của bạn"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Số điện thoại <span className="text-green-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Nhập số điện thoại của bạn"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Nhập email của bạn (tùy chọn)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Registration Purpose */}
                <FormField
                  control={form.control}
                  name="purposes"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-gray-700">
                          Bạn quan tâm (tùy chọn)
                        </FormLabel>
                      </div>
                      {PURPOSE_OPTIONS.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="purposes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0 py-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id) || false}
                                    onCheckedChange={(checked) => {
                                      const current = field.value ?? [];
                                      return checked
                                        ? field.onChange([...current, option.id])
                                        : field.onChange(
                                            current.filter(
                                              (value) => value !== option.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer text-gray-700">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Source */}
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Bạn biết đến chúng tôi qua (tùy chọn)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn nguồn" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SOURCE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preferred Time */}
                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Thời gian mong muốn</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn thời gian (tùy chọn)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TIME_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Consent */}
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal text-gray-700">
                          Tôi đồng ý chia sẻ thông tin để NGÔI NHÀ VUI VẺ liên hệ tư vấn
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Success Message */}
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
                    Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                  disabled={isSubmitting}
                  variant="default"
                >
                  {isSubmitting ? "Đang gửi..." : "Đăng ký"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>

      {/* Footer is rendered by SiteLayout */}
    </div>
  );
};

export default HomePage;
