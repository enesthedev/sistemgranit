"use client";

import { Table } from "@tanstack/react-table";
import { IconX, IconSearch, IconPlus } from "@tabler/icons-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { DataTableViewOptions } from "@/app/components/data-table";
import Link from "next/link";
import { ROUTES } from "@/app/routes";

import { Category } from "@/types/category";

interface CategoriesTableToolbarProps {
  table: Table<Category>;
}

export const categoryColumnLabels: Record<string, string> = {
  name: "Kategori Adı",
  slug: "URL (Slug)",
  description: "Açıklama",
  seo_title: "SEO Başlığı",
  seo_description: "SEO Açıklaması",
  actions: "İşlemler",
};

export function CategoriesTableToolbar({ table }: CategoriesTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <IconSearch className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
          <Input
            placeholder="Kategori ara..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] pl-8 lg:w-[250px]"
          />
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Temizle
            <IconX className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions
          table={table}
          columnLabels={categoryColumnLabels}
        />
        <Button size="sm" asChild>
          <Link href={ROUTES.CATEGORIES.NEW}>
            <IconPlus className="mr-2 size-4" />
            Yeni Kategori
          </Link>
        </Button>
      </div>
    </div>
  );
}
