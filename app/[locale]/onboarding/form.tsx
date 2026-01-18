"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { createClient } from "@/lib/supabase/browser";
import { cn } from "@/utils";
import { useFormik } from "formik";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Ad Soyad girin"),
  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta adresi gerekli"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalı")
    .required("Şifre gerekli"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı gerekli"),
});

export function Form({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const supabase = createClient();
      try {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              displayName: values.fullName,
              role: "admin", // Explicitly marking as admin context if needed by policies
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;

        toast.success("Yönetici hesabı oluşturuldu! E-postanızı kontrol edin.");
        router.push("/auth/sign-up-success");
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Bir hata oluştu");
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-none bg-background shadow-none">
        {step === 1 && (
          <div className="flex flex-col items-center justify-center space-y-10 py-8 text-center duration-500 animate-in fade-in zoom-in-95">
            <Image
              src="/sistem-catalog.png"
              alt="Sistem Katalog Logo"
              height={75}
              width={150}
              className="object-contain"
              priority
            />

            <div className="space-y-3 px-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Dijital katalog yönetimine hoş geldiniz. Sisteminizi
                yapılandırmak ve yönetici erişimi sağlamak için kuruluma
                başlayın.
              </p>
            </div>

            <div className="w-full px-8 pb-2 pt-2">
              <Button
                size={"default"}
                className="group h-12 w-full text-base font-medium shadow-lg transition-all hover:shadow-primary/20 active:scale-[0.98]"
                onClick={() => setStep(2)}
              >
                Kuruluma Başla
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="duration-300 animate-in fade-in slide-in-from-right-4">
            <CardHeader>
              <CardTitle className="text-xl">
                Yönetici Hesabı Oluşturun
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Ad Soyad
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Ad Soyad"
                      className="h-10"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="animate-pulse text-xs font-medium text-red-500">
                        {formik.errors.fullName}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      E-posta
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@sistemgranit.com"
                      className="h-10"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="animate-pulse text-xs font-medium text-red-500">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Şifre
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="******"
                      className="h-10"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <p className="animate-pulse text-xs font-medium text-red-500">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="repeatPassword"
                      className="text-sm font-medium"
                    >
                      Şifre Tekrarı
                    </Label>
                    <Input
                      id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      placeholder="******"
                      className="h-10"
                      value={formik.values.repeatPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.repeatPassword &&
                      formik.errors.repeatPassword && (
                        <p className="animate-pulse text-xs font-medium text-red-500">
                          {formik.errors.repeatPassword}
                        </p>
                      )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 flex-1"
                      onClick={() => setStep(1)}
                      disabled={formik.isSubmitting}
                    >
                      Geri Dön
                    </Button>
                    <Button
                      type="submit"
                      className="h-11 flex-[2]"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting
                        ? "Oluşturuluyor..."
                        : "Yöneticiyi Oluştur"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  );
}
