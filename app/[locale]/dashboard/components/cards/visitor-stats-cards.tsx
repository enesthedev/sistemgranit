"use client";

import {
  IconTrendingDown,
  IconTrendingUp,
  IconEye,
  IconUser,
  IconClock,
  IconArrowBack,
} from "@tabler/icons-react";
import NumberFlow from "@number-flow/react";
import type { VisitorStats } from "@/actions/analytics/get-visitor-stats";

import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

interface VisitorStatsCardsProps {
  stats: VisitorStats;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function VisitorStatsCards({ stats }: VisitorStatsCardsProps) {
  const PageViewsTrend =
    stats.pageViewsGrowth >= 0 ? IconTrendingUp : IconTrendingDown;
  const VisitorsTrend =
    stats.visitorsGrowth >= 0 ? IconTrendingUp : IconTrendingDown;

  const pageViewsColor =
    stats.pageViewsGrowth >= 0
      ? "text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800"
      : "text-rose-600 border-rose-200 dark:text-rose-400 dark:border-rose-800";

  const visitorsColor =
    stats.visitorsGrowth >= 0
      ? "text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800"
      : "text-rose-600 border-rose-200 dark:text-rose-400 dark:border-rose-800";

  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="to-card @container/card bg-linear-to-t from-blue-500/5 shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconEye className="size-4" />
            Sayfa Görüntüleme
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberFlow value={stats.totalPageViews} />
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={pageViewsColor}>
              <PageViewsTrend className="size-3.5" />
              {stats.pageViewsGrowth >= 0 ? "+" : ""}
              {stats.pageViewsGrowth}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Son 30 gün</div>
          <div className="text-muted-foreground">
            Toplam sayfa görüntüleme sayısı
          </div>
        </CardFooter>
      </Card>

      <Card className="to-card @container/card bg-linear-to-t from-violet-500/5 shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconUser className="size-4" />
            Benzersiz Ziyaretçi
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberFlow value={stats.uniqueVisitors} />
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={visitorsColor}>
              <VisitorsTrend className="size-3.5" />
              {stats.visitorsGrowth >= 0 ? "+" : ""}
              {stats.visitorsGrowth}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Son 30 gün</div>
          <div className="text-muted-foreground">Tekil ziyaretçi sayısı</div>
        </CardFooter>
      </Card>

      <Card className="to-card @container/card bg-linear-to-t from-amber-500/5 shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconClock className="size-4" />
            Ort. Oturum Süresi
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatDuration(stats.avgSessionDuration)}
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-amber-200 text-amber-600 dark:border-amber-800 dark:text-amber-400"
            >
              dakika
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.totalSessions} toplam oturum
          </div>
          <div className="text-muted-foreground">Ortalama ziyaret süresi</div>
        </CardFooter>
      </Card>

      <Card className="to-card @container/card bg-linear-to-t from-rose-500/5 shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconArrowBack className="size-4" />
            Bounce Rate
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            %<NumberFlow value={stats.bounceRate} />
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className={
                stats.bounceRate <= 50
                  ? "border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400"
                  : "border-rose-200 text-rose-600 dark:border-rose-800 dark:text-rose-400"
              }
            >
              {stats.bounceRate <= 50 ? "İyi" : "Yüksek"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tek sayfa ziyaretleri
          </div>
          <div className="text-muted-foreground">Hemen çıkış oranı</div>
        </CardFooter>
      </Card>
    </div>
  );
}
