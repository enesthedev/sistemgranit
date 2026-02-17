"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import type {
  ColumnFiltersState,
  Table as TableType,
  OnChangeFn,
} from "@tanstack/react-table";
import { DataTable } from "@/app/components/data-table";
import { productColumns } from "./columns";
import { ProductsTableToolbar } from "./products-table-toolbar";
import type { ProductWithCategory } from "@/types/product";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/app/routes";
import type { Category } from "@/types/category";
import { useDataTable } from "@/hooks/use-data-table";

interface ProductsDataTableProps {
  products: ProductWithCategory[];
  total: number;
  categories: Category[];
}

export function ProductsDataTable({
  products,
  total,
  categories,
}: ProductsDataTableProps) {
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

  // Derive initial filters from URL
  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    if (searchParams.has("search")) {
      filters.push({ id: "name", value: searchParams.get("search") });
    }
    const categoryParams = searchParams.getAll("category");
    if (categoryParams.length > 0) {
      filters.push({ id: "category_id", value: categoryParams });
    }
    const statusParams = searchParams.getAll("status");
    if (statusParams.length > 0) {
      filters.push({ id: "status", value: statusParams });
    }
    return filters;
  }, [searchParams]);

  // Handle filter changes (sync to URL)
  const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> =
    React.useCallback(
      (updaterOrValue) => {
        const newFilters =
          typeof updaterOrValue === "function"
            ? updaterOrValue(columnFilters)
            : updaterOrValue;

        const params: Record<string, string | string[] | null> = {
          search: null,
          category: null,
          status: null,
        };

        for (const filter of newFilters) {
          if (filter.id === "name") {
            params.search = filter.value as string;
          }
          if (filter.id === "category_id") {
            params.category = filter.value as string[];
          }
          if (filter.id === "status") {
            params.status = filter.value as string[];
          }
        }

        const queryString = createQueryString({
          ...params,
          page: 1, // Reset to first page
        });

        router.push(`${pathname}?${queryString}`, { scroll: false });
      },
      [columnFilters, createQueryString, pathname, router],
    );

  // Empty state check
  if (products.length === 0 && total === 0 && columnFilters.length === 0) {
    return (
      <div className="rounded-lg border py-12 text-center">
        <p className="text-muted-foreground mb-4">Henüz ürün eklenmemiş.</p>
        <Button asChild>
          <Link href={ROUTES.PRODUCTS.NEW}>İlk Ürünü Ekle</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={productColumns}
        data={products}
        pageCount={Math.ceil(total / pagination.pageSize)}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        sorting={sorting}
        onSortingChange={onSortingChange}
        columnFilters={columnFilters}
        onColumnFiltersChange={onColumnFiltersChange}
        toolbar={(table: TableType<ProductWithCategory>) => (
          <ProductsTableToolbar table={table} categories={categories} />
        )}
      />
      <div className="text-muted-foreground text-sm">Toplam {total} ürün</div>
    </div>
  );
}
