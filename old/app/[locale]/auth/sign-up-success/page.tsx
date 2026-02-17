import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Kayıt olduğunuz için teşekkürler!
              </CardTitle>
              <CardDescription>
                Onaylamak için e-postanızı kontrol edin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Başarıyla kayıt oldunuz. Giriş yapmadan önce lütfen hesabınızı
                onaylamak için e-postanızı kontrol edin.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
