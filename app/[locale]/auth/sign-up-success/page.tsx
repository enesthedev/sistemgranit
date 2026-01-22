import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

async function SignUpSuccessContent() {
  const t = await getTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          {t("Thank you for signing up!")}
        </CardTitle>
        <CardDescription>{t("Check your email to confirm")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          {t(
            "You've successfully signed up. Please check your email to confirm your account before signing in.",
          )}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpSuccessContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
