"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  type Table as TableType,
  type OnChangeFn,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { DataTable } from "@/app/components/data-table";
import { Button } from "@/app/components/ui/button";
import { CategoriesTableToolbar } from "./categories-table-toolbar";
import { categoryColumns } from "./columns";
import { Category } from "@/types/category";
import Link from "next/link";
import { ROUTES } from "@/app/routes";
import { useDataTable } from "@/hooks/use-data-table";

interface CategoriesTableProps {
  data: Category[];
}

export function CategoriesTable({ data }: CategoriesTableProps) {
  const {
    pagination,
    onPaginationChange,
    sorting,
    onSortingChange,
    createQueryString,
    router,
    pathname,
  } = useDataTable();

  const searchParams = useSearchParams();

  // Derive filters from URL
  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    if (searchParams.has("search")) {
      filters.push({ id: "name", value: searchParams.get("search") });
    }
    return filters;
  }, [searchParams]);

  // Sync filters to URL
  const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> =
    React.useCallback(
      (updaterOrValue) => {
        const newFilters =
          typeof updaterOrValue === "function"
            ? updaterOrValue(columnFilters)
            : updaterOrValue;

        const params: Record<string, string | null> = { search: null };
        const nameFilter = newFilters.find((f) => f.id === "name");
        if (nameFilter) params.search = nameFilter.value as string;

        const queryString = createQueryString({ ...params, page: 1 });
        router.push(`${pathname}?${queryString}`, { scroll: false });
      },
      [columnFilters, createQueryString, pathname, router],
    );

  // Show "Add First Category" only if database is empty AND no search is active
  if (data.length === 0 && columnFilters.length === 0) {
    return (
      <div className="bg-card rounded-lg border py-12 text-center">
        <p className="text-muted-foreground mb-4">Henüz kategori eklenmemiş.</p>
        <Button asChild>
          <Link href={ROUTES.CATEGORIES.NEW}>İlk Kategoriyi Ekle</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={categoryColumns}
        data={data}
        // Client-side pagination but controlled via URL
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        sorting={sorting}
        onSortingChange={onSortingChange}
        columnFilters={columnFilters}
        onColumnFiltersChange={onColumnFiltersChange}
        toolbar={(table: TableType<Category>) => (
          <CategoriesTableToolbar table={table} />
        )}
      />
    </div>
  );
}
