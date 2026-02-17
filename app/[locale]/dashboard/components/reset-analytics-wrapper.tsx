"use client";

import dynamic from "next/dynamic";
import { Button } from "@/app/components/ui/button";
import { IconTrash } from "@tabler/icons-react";

// Diyalog bilesenini dynamic import ile yüklüyoruz (SSR kapalı)
const ResetAnalyticsDialog = dynamic(
  () =>
    import("./reset-analytics-dialog").then((mod) => mod.ResetAnalyticsDialog),
  {
    ssr: false,
    loading: () => (
      <Button
        variant="outline"
        size="sm"
        className="text-destructive hover:text-destructive hover:bg-destructive/10 cursor-wait gap-2 opacity-50"
      >
        <IconTrash className="size-4" />
        <span className="hidden sm:inline">Verileri Sıfırla</span>
      </Button>
    ),
  },
);

export function ResetAnalyticsWrapper() {
  return <ResetAnalyticsDialog />;
}
