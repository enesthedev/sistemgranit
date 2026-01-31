import { Suspense } from "react";
import { getProductTrend } from "@/actions/analytics";
import { getVisitorStats } from "@/actions/analytics/get-visitor-stats";
import { getPopularPages } from "@/actions/analytics/get-popular-pages";

import { SiteHeader } from "./components/header/site-header";
import { ResetAnalyticsWrapper } from "./components/reset-analytics-wrapper";
import { SectionCards } from "./components/cards/section-cards";
import { VisitorStatsCards } from "./components/cards/visitor-stats-cards";
import { ChartAreaInteractive } from "./components/charts/chart-area-interactive";
import { PopularPagesTable } from "./components/tables/popular-pages-table";

import { Skeleton } from "@/app/components/ui/skeleton";

function CardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-card rounded-xl border p-6">
          <div className="mb-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
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

function TableSkeleton() {
  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

async function ProductStatsSection() {
  return <SectionCards />;
}

async function VisitorStatsSection() {
  const stats = await getVisitorStats(30);
  return (
    <div className="px-4 lg:px-6">
      <VisitorStatsCards stats={stats} />
    </div>
  );
}

async function TrendChartSection() {
  const trendData = await getProductTrend(90);
  return <ChartAreaInteractive data={trendData} />;
}

async function PopularPagesSection() {
  const pages = await getPopularPages(30, 10);
  return <PopularPagesTable data={pages} />;
}

export default function Page() {
  return (
    <>
      <SiteHeader
        title="İstatistikler"
        rightAction={<ResetAnalyticsWrapper />}
      />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-4 md:gap-8 md:py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Suspense fallback={<CardsSkeleton />}>
                <VisitorStatsSection />
              </Suspense>
            </div>

            <div className="flex flex-col gap-2">
              <Suspense fallback={<CardsSkeleton />}>
                <ProductStatsSection />
              </Suspense>
            </div>
          </div>

          <div className="grid gap-6 px-4 lg:px-6 @2xl/main:grid-cols-2">
            <Suspense fallback={<ChartSkeleton />}>
              <TrendChartSection />
            </Suspense>
            <Suspense fallback={<TableSkeleton />}>
              <PopularPagesSection />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
