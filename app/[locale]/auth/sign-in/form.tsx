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
import { authClient } from "@/lib/auth-client";
import { cn } from "@/app/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authSchemas, type SignInInput } from "@/app/validations/schemas";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(authSchemas.signIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInInput) => {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/",
      fetchOptions: {
        onResponse: () => {},
        onRequest: () => {},
        onSuccess: () => {
          toast.success("Giriş başarılı!");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Giriş Yap</CardTitle>
          <CardDescription>
            Hesabınıza giriş yapmak için bilgilerinizi girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Şifre</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Şifrenizi mi unuttunuz?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Hesabınız yok mu?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Kayıt ol
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
