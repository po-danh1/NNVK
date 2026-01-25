import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import { initEmailJS, sendRegistrationEmail } from "@/services/emailService";

const schema = z.object({
  phone: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, "Vui lòng đồng ý với chính sách để tiếp tục"),
});

type Values = z.infer<typeof schema>;

export default function ComingSoonPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    initEmailJS();
  }, []);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { phone: "", email: "", consent: false },
  });

  const onSubmit = async (data: Values) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    try {
      await sendRegistrationEmail({
        phone: data.phone,
        email: data.email || undefined,
        purposes: ["coming_soon"],
      });
      setSubmitSuccess(true);
      form.reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (e) {
      console.error(e);
      alert("Có lỗi xảy ra khi gửi. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-green-700">Coming Soon</h1>
        <p className="mt-3 text-gray-700">
          Để lại số điện thoại để nhận thông tin sớm nhất khi dịch vụ/cập nhật mới ra mắt.
        </p>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Nhận thông tin</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Số điện thoại <span className="text-green-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Nhập số điện thoại của bạn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email (tùy chọn)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Nhập email của bạn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-3 rounded-lg border bg-white p-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(v) => field.onChange(Boolean(v))}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="font-normal text-gray-700 cursor-pointer">
                              Tôi đồng ý cho NGÔI NHÀ VUI KHOẺ liên hệ và xử lý dữ liệu theo{" "}
                              <a
                                className="text-green-700 hover:text-green-800 underline underline-offset-2"
                                href="/faq-chinh-sach#privacy"
                              >
                                chính sách bảo mật
                              </a>
                              .
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  {submitSuccess && (
                    <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
                      Đã ghi nhận! Chúng tôi sẽ gửi thông tin cho bạn sớm nhất.
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Đang gửi..." : "Đăng ký nhận thông tin"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


