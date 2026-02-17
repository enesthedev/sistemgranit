"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import {
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconCopy,
  IconExternalLink,
} from "@tabler/icons-react";
import { deleteProduct } from "@/actions/products";
import { ROUTES } from "@/app/routes";
import type { Product } from "@/types/product";
import { Link } from "@/lib/i18n/navigation";
import { toast } from "sonner";

interface ProductRowActionsProps {
  product: Product;
}

export function ProductRowActions({ product }: ProductRowActionsProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteProduct(product.id);
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
      setShowDeleteDialog(false);
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(product.id);
    toast.success("Ürün ID kopyalandı");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted flex size-8 p-0"
          >
            <IconDotsVertical className="size-4" />
            <span className="sr-only">Menüyü aç</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link
              href={{
                pathname: ROUTES.PRODUCTS.EDIT,
                params: { id: product.id },
              }}
            >
              <IconEdit className="mr-2 size-4" />
              Düzenle
            </Link>
          </DropdownMenuItem>
          {product.slug && (
            <DropdownMenuItem asChild>
              <Link
                href={{
                  pathname: ROUTES.PRODUCT_DETAIL,
                  params: { slug: product.slug },
                }}
                target="_blank"
              >
                <IconExternalLink className="mr-2 size-4" />
                Görüntüle
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleCopyId}>
            <IconCopy className="mr-2 size-4" />
            ID Kopyala
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <IconTrash className="mr-2 size-4" />
            Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Ürünü silmek istediğinize emin misiniz?
            </AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{product.name}&quot; ürünü kalıcı olarak silinecektir. Bu
              işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Siliniyor..." : "Sil"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
