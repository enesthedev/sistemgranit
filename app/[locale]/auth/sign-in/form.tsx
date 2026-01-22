"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { createClient } from "@/lib/supabase/browser";
import { cn } from "@/utils";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const t = useTranslations();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email(t("Please enter a valid email address"))
          .required(t("Email is required")),
        password: Yup.string()
          .min(6, t("Password must be at least 6 characters"))
          .required(t("Password is required")),
      }),
    [t],
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const supabase = createClient();

      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) throw error;

        toast.success(t("Login successful!"));
        router.push("/");
      } catch (error: unknown) {
        toast.error(
          error instanceof Error ? error.message : t("An error occurred"),
        );
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("Sign In")}</CardTitle>
          <CardDescription>
            {t("Enter your credentials to access your account")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t("Email")}</Label>
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
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("Password")}</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t("Forgot your password?")}
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
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
                {formik.isSubmitting ? t("Signing in...") : t("Sign In")}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("Don't have an account?")}{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                {t("Sign Up")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
