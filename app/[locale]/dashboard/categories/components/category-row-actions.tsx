"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  IconDots,
  IconPencil,
  IconTrash,
  IconExternalLink,
} from "@tabler/icons-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { deleteCategory } from "@/actions/categories";
import { Category } from "@/types/category";
import { DeleteCategoryDialog } from "./delete-dialog";

interface CategoryRowActionsProps {
  category: Category;
}

export function CategoryRowActions({ category }: CategoryRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  async function onDelete() {
    setIsDeleting(true);
    try {
      const result = await deleteCategory(category.id);
      if (result.success) {
        toast.success("Kategori başarıyla silindi");
        router.refresh();
      } else {
        toast.error(result.error || "Kategori silinemedi");
      }
    } catch (error) {
      console.error("Delete category error:", error);
      toast.error("Bir hata oluştu");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Menüyü aç</span>
            <IconDots className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/categories/${category.id}`}>
              <IconPencil className="mr-2 h-4 w-4" />
              Düzenle
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/categories/${category.slug}`} target="_blank">
              <IconExternalLink className="mr-2 h-4 w-4" />
              Sitede Gör
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteDialog(true)}
          >
            <IconTrash className="mr-2 h-4 w-4" />
            Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteCategoryDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        categoryName={category.name}
        onConfirm={onDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
