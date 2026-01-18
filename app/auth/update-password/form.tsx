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
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalı")
    .required("Yeni şifre gerekli"),
});

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const supabase = createClient();

      try {
        const { error } = await supabase.auth.updateUser({
          password: values.password,
        });

        if (error) throw error;

        toast.success("Şifreniz başarıyla güncellendi!");
        router.push("/protected");
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Bir hata oluştu");
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Şifrenizi Sıfırlayın</CardTitle>
          <CardDescription>Lütfen yeni şifrenizi aşağıya girin</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">Yeni Şifre</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Yeni şifre"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting
                  ? "Kaydediliyor..."
                  : "Yeni şifreyi kaydet"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
