"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { format, subDays, parseISO } from "date-fns";
import { tr } from "date-fns/locale";

import { useIsMobile } from "@/app/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import type { ProductTrend } from "@/actions/products/types";

const chartConfig = {
  products: {
    label: "Ürünler",
  },
  newProducts: {
    label: "Yeni Ürün",
    color: "var(--primary)",
  },
  activeProducts: {
    label: "Toplam Ürün",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  data: ProductTrend[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = subDays(now, daysToSubtract);

    return data.filter((item) => {
      const date = parseISO(item.date);
      return date >= startDate;
    });
  }, [data, timeRange]);

  if (!data || data.length === 0) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Ürün Trendi</CardTitle>
          <CardDescription>Henüz yeterli veri yok</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground flex h-[250px] items-center justify-center">
          Ürün ekledikçe trend verileri burada görünecek
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Ürün Trendi</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Seçilen dönemde ürün ekleme trendi
          </span>
          <span className="@[540px]/card:hidden">Ürün trendi</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Son 3 ay</ToggleGroupItem>
            <ToggleGroupItem value="30d">Son 30 gün</ToggleGroupItem>
            <ToggleGroupItem value="7d">Son 7 gün</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Zaman aralığı seç"
            >
              <SelectValue placeholder="Son 3 ay" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">Son 3 ay</SelectItem>
              <SelectItem value="30d">Son 30 gün</SelectItem>
              <SelectItem value="7d">Son 7 gün</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillNewProducts" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-newProducts)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-newProducts)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillActiveProducts"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-activeProducts)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-activeProducts)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = parseISO(value);
                return format(date, "d MMM", { locale: tr });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return format(parseISO(value), "d MMMM yyyy", {
                      locale: tr,
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="newProducts"
              type="monotone"
              fill="url(#fillNewProducts)"
              stroke="var(--color-newProducts)"
              baseValue={0}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
