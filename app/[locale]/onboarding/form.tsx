"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/utils";
import { useFormik } from "formik";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { signUpAdmin } from "./actions";

export function Form({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const t = useTranslations();
  const [step, setStep] = useState<1 | 2>(1);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        fullName: Yup.string().required(t("Please enter your full name")),
        email: Yup.string()
          .email(t("Please enter a valid email address"))
          .required(t("Email is required")),
        password: Yup.string()
          .min(6, t("Password must be at least 6 characters"))
          .required(t("Password is required")),
        repeatPassword: Yup.string()
          .oneOf([Yup.ref("password")], t("Passwords do not match"))
          .required(t("Password confirmation is required")),
      }),
    [t],
  );

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("repeatPassword", values.repeatPassword);

        const result = await signUpAdmin(undefined, formData);

        if (result.error) {
          toast.error(result.error);
          return;
        }

        if (result.success) {
          toast.success(t("Admin account created! Please check your email."));
          router.push("/auth/sign-up-success");
        }
      } catch {
        toast.error(t("An error occurred"));
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-background overflow-hidden border-none shadow-none">
        {step === 1 && (
          <div className="animate-in fade-in zoom-in-95 flex flex-col items-center justify-center space-y-10 py-8 text-center duration-500">
            <Image
              src="/sistem-catalog.png"
              alt="Sistem Katalog Logo"
              height={100}
              width={200}
              className="object-contain"
              priority
            />

            <div className="space-y-3 px-6">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(
                  "Welcome to digital catalog management. Start setup to configure your system and enable admin access.",
                )}
              </p>
            </div>

            <div className="w-full px-8 pt-2 pb-2">
              <Button
                size={"default"}
                className="group hover:shadow-primary/20 h-12 w-full text-base font-medium shadow-lg transition-all active:scale-[0.98]"
                onClick={() => setStep(2)}
              >
                {t("Start Setup")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <CardHeader>
              <CardTitle className="text-xl">
                {t("Create Admin Account")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      {t("Full Name")}
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder={t("Full Name")}
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
                      {t("Email")}
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
                      {t("Password")}
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
                      {t("Repeat Password")}
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
                      {t("Go Back")}
                    </Button>
                    <Button
                      type="submit"
                      className="h-11 flex-2"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting
                        ? t("Creating...")
                        : t("Create Admin")}
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
