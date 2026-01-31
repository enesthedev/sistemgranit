"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Badge } from "@/app/components/ui/badge";
import { DataTableColumnHeader } from "@/app/components/data-table";
import type { Product, ProductWithCategory } from "@/types/product";
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from "@/app/constants";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { ROUTES } from "@/app/routes";
import { ProductRowActions } from "./product-row-actions";

function getCategoryLabel(category: Product["category"]): string {
  return (
    PRODUCT_CATEGORIES.find((c) => c.value === category)?.label || category
  );
}

function getStatusLabel(status: Product["status"]): string {
  return PRODUCT_STATUSES.find((s) => s.value === status)?.label || status;
}

function getStatusVariant(
  status: Product["status"],
): "default" | "secondary" | "outline" {
  switch (status) {
    case "active":
      return "default";
    case "draft":
      return "secondary";
    case "archived":
      return "outline";
    default:
      return "secondary";
  }
}

function formatPrice(price: number | null, currency: string | null): string {
  if (price === null) return "-";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency || "TRY",
  }).format(price);
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
}

export const productColumns: ColumnDef<ProductWithCategory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tümünü seç"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Satırı seç"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "thumbnail",
    header: "Görsel",
    cell: ({ row }) => {
      const thumbnail = row.getValue("thumbnail") as string | null;
      const name = row.original.name;

      if (thumbnail) {
        return (
          <Image
            src={thumbnail}
            alt={name}
            width={40}
            height={40}
            className="size-10 rounded object-cover"
          />
        );
      }

      return (
        <div className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded text-xs">
          N/A
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ürün Adı" />
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link
          href={{
            pathname: ROUTES.PRODUCTS.EDIT,
            params: { id: product.id },
          }}
          className="font-medium hover:underline"
        >
          {product.name}
        </Link>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => {
      const category = row.getValue("category") as Product["category"];
      const categoryName = row.original.categories?.name;
      const displayLabel = categoryName || getCategoryLabel(category);

      return (
        <Badge variant="outline" className="text-muted-foreground">
          {displayLabel}
        </Badge>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => {
      const status = row.getValue("status") as Product["status"];
      return (
        <Badge variant={getStatusVariant(status)}>
          {getStatusLabel(status)}
        </Badge>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "price_per_sqm",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Fiyat (m²)"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const price = row.getValue("price_per_sqm") as number | null;
      const currency = row.original.currency;
      return (
        <div className="text-right font-medium">
          {formatPrice(price, currency)}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eklenme Tarihi" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string | null;
      return <span className="text-muted-foreground">{formatDate(date)}</span>;
    },
    meta: {
      className: "hidden lg:table-cell",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductRowActions product={row.original} />,
    enableHiding: false,
  },
];

export const productColumnLabels: Record<string, string> = {
  thumbnail: "Görsel",
  name: "Ürün Adı",
  category: "Kategori",
  status: "Durum",
  price_per_sqm: "Fiyat",
  created_at: "Eklenme Tarihi",
};
