"use client";

import { cn } from "@/utils";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta adresi gerekli"),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const supabase = createClient();

      try {
        const { error } = await supabase.auth.resetPasswordForEmail(
          values.email,
          {
            redirectTo: `${window.location.origin}/auth/update-password`,
          },
        );

        if (error) throw error;

        setSuccess(true);
        toast.success("Şifre sıfırlama e-postası gönderildi!");
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Bir hata oluştu");
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">E-postanızı Kontrol Edin</CardTitle>
            <CardDescription>
              Şifre sıfırlama talimatları gönderildi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              E-posta ve şifre ile kayıt olduysanız, şifre sıfırlama e-postası
              alacaksınız.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Şifrenizi Sıfırlayın</CardTitle>
            <CardDescription>
              E-postanızı girin, size şifre sıfırlama bağlantısı gönderelim
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting
                    ? "Gönderiliyor..."
                    : "Sıfırlama e-postası gönder"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Hesabınız var mı?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Giriş yap
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
