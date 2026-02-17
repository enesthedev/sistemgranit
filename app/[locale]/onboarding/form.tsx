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
import { cn } from "@/app/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authSchemas, type SignUpInput } from "@/app/validations/schemas";
import { signUpAdmin } from "./actions";

export function Form({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(authSchemas.signup),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = async (values: SignUpInput) => {
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
        toast.success("Yönetici hesabı oluşturuldu! E-postanızı kontrol edin.");
        router.push("/auth/sign-up-success");
      }
    } catch {
      toast.error("Bir hata oluştu.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-background overflow-hidden border-none shadow-none">
        {step === 1 && (
          <div className="animate-in fade-in zoom-in-95 flex flex-col items-start justify-start space-y-10 py-8 text-left duration-500">
            <Image
              src="/sistem-catalog.png"
              alt="Sistem Katalog Logo"
              height={75}
              width={150}
              className="object-contain px-6"
              priority
            />

            <div className="space-y-3 px-6">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Dijital katalog yönetimine hoş geldiniz. Sisteminizi
                yapılandırmak ve yönetici erişimi sağlamak için kuruluma
                başlayın.
              </p>
            </div>

            <div className="w-full px-6 pt-2 pb-2">
              <Button
                type="submit"
                className="h-11 w-full flex-2"
                onClick={() => setStep(2)}
              >
                Kuruluma Başla
                <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <CardHeader>
              <CardTitle className="text-xl">
                Yönetici Hesabı Oluşturun
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Ad Soyad
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Ad Soyad"
                      className="h-10"
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className="animate-pulse text-xs font-medium text-red-500">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      E-posta
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@sistemgranit.com"
                      className="h-10"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="animate-pulse text-xs font-medium text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Şifre
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="******"
                      className="h-10"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="animate-pulse text-xs font-medium text-red-500">
                        {errors.password.message}
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
                      type="password"
                      placeholder="******"
                      className="h-10"
                      {...register("repeatPassword")}
                    />
                    {errors.repeatPassword && (
                      <p className="animate-pulse text-xs font-medium text-red-500">
                        {errors.repeatPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 flex-1"
                      onClick={() => setStep(1)}
                      disabled={isSubmitting}
                    >
                      Geri Dön
                    </Button>
                    <Button
                      type="submit"
                      className="h-11 flex-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Oluşturuluyor..." : "Yöneticiyi Oluştur"}
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
