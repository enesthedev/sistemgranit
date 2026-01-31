"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";
import { CategoryRowActions } from "./category-row-actions";
import Image from "next/image";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Kategori Adı",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {row.original.image_url ? (
          <div className="relative h-10 w-10 overflow-hidden rounded-lg border">
            <Image
              src={row.original.image_url}
              alt={row.original.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg border">
            <span className="text-muted-foreground text-[10px] font-medium uppercase">
              Yok
            </span>
          </div>
        )}
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "slug",
    header: "URL (Slug)",
    cell: ({ row }) => (
      <code className="bg-muted group-hover:bg-background relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm transition-colors">
        /{row.getValue("slug")}
      </code>
    ),
  },
  {
    accessorKey: "description",
    header: "Açıklama",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[300px] truncate transition-all group-hover:max-w-none group-hover:whitespace-normal">
        {row.getValue("description") || "-"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoryRowActions category={row.original} />,
    meta: {
      className: "w-[80px] text-right",
    },
  },
];
