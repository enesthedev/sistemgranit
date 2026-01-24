"use client";

import { deleteProduct } from "@/actions/products";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { ROUTES } from "@/app/routes";
import type { Product } from "@/types/product";
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from "@/app/constants";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProductsTableProps {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

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

function formatPrice(price: number | null, currency: string): string {
  if (price === null) return "-";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
  }).format(price);
}

export function ProductsTable({
  products,
  total,
  page,
  totalPages,
}: ProductsTableProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deleteProduct(productToDelete.id);
      if (result.success) {
        toast.success("Ürün başarıyla silindi");
        router.refresh();
      } else {
        toast.error(result.error || "Ürün silinemedi");
      }
    } catch {
      toast.error("Bir hata oluştu");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  if (products.length === 0) {
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
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Görsel</TableHead>
              <TableHead>Ürün Adı</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">Fiyat (m²)</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded object-cover"
                    />
                  ) : (
                    <div className="bg-muted text-muted-foreground flex h-10 w-10 items-center justify-center rounded text-xs">
                      N/A
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{getCategoryLabel(product.category)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(product.status)}>
                    {getStatusLabel(product.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(
                    product.price_per_sqm,
                    product.currency || "TRY",
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <IconDotsVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={ROUTES.PRODUCTS.EDIT.replace(
                            "[id]",
                            product.id,
                          )}
                        >
                          <IconEdit className="mr-2 size-4" />
                          Düzenle
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => {
                          setProductToDelete(product);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <IconTrash className="mr-2 size-4" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span>
          Toplam {total} ürün - Sayfa {page} / {totalPages}
        </span>
      </div>
    </>
  );
}
