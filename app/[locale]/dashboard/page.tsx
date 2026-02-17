import { Suspense } from "react";
import { getProductTrend } from "@/actions/products/trend";

import { SiteHeader } from "./components/header/site-header";
import { SectionCards } from "./components/cards/section-cards";
import { ChartAreaInteractive } from "./components/charts/chart-area-interactive";

import { Skeleton } from "@/app/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/app/components/ui/card";

function CardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-24" />
            </CardDescription>
            <CardTitle>
              <Skeleton className="h-8 w-20" />
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-28" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      <Skeleton className="h-[250px] w-full" />
    </div>
  );
}

async function ProductStatsSection() {
  return <SectionCards />;
}

async function TrendChartSection() {
  const trendData = await getProductTrend(90);
  return <ChartAreaInteractive data={trendData} />;
}

export default function Page() {
  return (
    <>
      <SiteHeader title="İstatistikler" />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-4 md:gap-8 md:py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Suspense fallback={<CardsSkeleton />}>
                <ProductStatsSection />
              </Suspense>
            </div>
          </div>

          <div className="grid gap-6 px-4 lg:px-6">
            <Suspense fallback={<ChartSkeleton />}>
              <TrendChartSection />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
