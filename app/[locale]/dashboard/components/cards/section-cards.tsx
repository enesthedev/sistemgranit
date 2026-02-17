import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { getProductStats } from "@/actions/analytics";

import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export async function SectionCards() {
  const stats = await getProductStats();

  const formatTrend = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value}%`;
  };

  const TrendIcon = stats.growthRate >= 0 ? IconTrendingUp : IconTrendingDown;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Toplam Ürün</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.total.toLocaleString("tr-TR")}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendIcon />
              {formatTrend(stats.growthRate)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Bu ay {stats.thisMonthNew} yeni ürün{" "}
            <TrendIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Geçen ay {stats.lastMonthNew} ürün eklendi
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Aktif Ürünler</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.active.toLocaleString("tr-TR")}
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400"
            >
              <IconTrendingUp />
              Yayında
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Aktif katalog ürünleri <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Toplam ürünlerin %
            {stats.total > 0
              ? Math.round((stats.active / stats.total) * 100)
              : 0}
            &apos;i
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Taslak Ürünler</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.draft.toLocaleString("tr-TR")}
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-amber-200 text-amber-600 dark:border-amber-800 dark:text-amber-400"
            >
              Beklemede
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Yayınlanmayı bekliyor
          </div>
          <div className="text-muted-foreground">
            Düzenleme ve onay bekliyor
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Arşivlenmiş</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.archived.toLocaleString("tr-TR")}
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"
            >
              Arşiv
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Arşivlenmiş ürünler
          </div>
          <div className="text-muted-foreground">
            Artık satışta olmayan ürünler
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
