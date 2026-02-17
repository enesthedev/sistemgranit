import * as React from "react";

import { Table } from "@tanstack/react-table";
import { IconX, IconSearch, IconPlus } from "@tabler/icons-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  DataTableViewOptions,
  DataTableFacetedFilter,
} from "@/app/components/data-table";
import { PRODUCT_STATUSES } from "@/app/constants";
import { productColumnLabels } from "./columns";
import Link from "next/link";
import { ROUTES } from "@/app/routes";
import type { ProductWithCategory } from "@/types/product";
import type { Category } from "@/supabase/types";

interface ProductsTableToolbarProps {
  table: Table<ProductWithCategory>;
  categories: Category[];
}

const statusOptions = PRODUCT_STATUSES.map((status) => ({
  label: status.label,
  value: status.value,
}));

export function ProductsTableToolbar({
  table,
  categories,
}: ProductsTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const filterValue =
    (table.getColumn("name")?.getFilterValue() as string) ?? "";

  const [searchValue, setSearchValue] = React.useState(filterValue);

  // Sync with table filter value (e.g. on initial load or URL change)
  React.useEffect(() => {
    setSearchValue(filterValue);
  }, [filterValue]);

  // Debounce update to table
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue !== filterValue) {
        table.getColumn("name")?.setFilterValue(searchValue);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue, filterValue, table]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <IconSearch className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
          <Input
            placeholder="Ürün ara..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="h-8 w-[150px] pl-8 lg:w-[250px]"
          />
        </div>
        {table.getColumn("category_id") && (
          <DataTableFacetedFilter
            column={table.getColumn("category_id")}
            title="Kategori"
            options={categoryOptions}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Durum"
            options={statusOptions}
          />
        )}
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
          columnLabels={productColumnLabels}
        />
        <Button size="sm" asChild>
          <Link href={ROUTES.PRODUCTS.NEW}>
            <IconPlus className="mr-2 size-4" />
            Yeni Ürün
          </Link>
        </Button>
      </div>
    </div>
  );
}
