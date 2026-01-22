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
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const t = useTranslations();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        password: Yup.string()
          .min(6, t("Password must be at least 6 characters"))
          .required(t("New password is required")),
      }),
    [t],
  );

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

        toast.success(t("Your password has been updated successfully!"));
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
          <CardTitle className="text-2xl">{t("Reset Your Password")}</CardTitle>
          <CardDescription>
            {t("Please enter your new password below")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">{t("New Password")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("New Password")}
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
                {formik.isSubmitting ? t("Saving...") : t("Save New Password")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
