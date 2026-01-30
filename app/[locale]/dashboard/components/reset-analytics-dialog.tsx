"use client";

import { useState, useTransition } from "react";
import { IconTrash, IconAlertTriangle, IconLoader2 } from "@tabler/icons-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/app/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

import { resetAnalyticsData } from "@/actions/analytics/reset-analytics";

export function ResetAnalyticsDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleReset = () => {
    startTransition(async () => {
      const result = await resetAnalyticsData();

      if (result.success) {
        toast.success("Veriler Sıfırlandı", {
          description: result.message,
        });
        setOpen(false);
        router.refresh();
      } else {
        toast.error("Hata", {
          description: result.message,
        });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
        >
          <IconTrash className="size-4" />
          <span className="hidden sm:inline">Verileri Sıfırla</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <IconAlertTriangle className="text-destructive size-5" />
            Analitik Verilerini Sıfırla
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-muted-foreground space-y-2 text-sm">
              <p>
                Bu işlem tüm analitik verilerini{" "}
                <strong>kalıcı olarak silecektir</strong>:
              </p>
              <p className="ml-2">
                • Sayfa görüntüleme kayıtları
                <br />
                • Ziyaretçi oturumları
                <br />• Analytics eventleri
              </p>
              <p className="text-destructive font-medium">
                Bu işlem geri alınamaz!
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>İptal</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleReset();
            }}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isPending ? (
              <>
                <IconLoader2 className="size-4 animate-spin" />
                Siliniyor...
              </>
            ) : (
              <>
                <IconTrash className="size-4" />
                Evet, Sıfırla
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
