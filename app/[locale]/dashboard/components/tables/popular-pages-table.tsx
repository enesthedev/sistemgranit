"use client";

import type { PopularPage } from "@/actions/analytics/get-popular-pages";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

interface PopularPagesTableProps {
  data: PopularPage[];
}

export function PopularPagesTable({ data }: PopularPagesTableProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popüler Sayfalar</CardTitle>
          <CardDescription>Henüz yeterli veri yok</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground flex h-[200px] items-center justify-center">
          Ziyaretçi verisi toplandıkça popüler sayfalar burada görünecek
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popüler Sayfalar</CardTitle>
        <CardDescription>
          En çok görüntülenen sayfalar (son 30 gün)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sayfa</TableHead>
              <TableHead className="text-right">Görüntüleme</TableHead>
              <TableHead className="text-right">Ziyaretçi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((page, index) => (
              <TableRow key={page.path}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                      {index + 1}.
                    </span>
                    <span className="max-w-[250px] truncate" title={page.path}>
                      {page.path}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {page.views.toLocaleString("tr-TR")}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {page.uniqueVisitors.toLocaleString("tr-TR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
