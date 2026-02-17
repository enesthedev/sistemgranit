"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { cn } from "@/app/utils";
import { FileUploadItem } from "./file-upload-item";
import type { FileUploadFile, FileUploadPreviewProps } from "./types";

interface SortableItemProps {
  file: FileUploadFile;
  onRemove: (id: string) => void;
  onRetry?: (id: string) => void;
}

function SortableItem({ file, onRemove, onRetry }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("touch-none", isDragging && "z-10 opacity-80 shadow-lg")}
      {...attributes}
      {...listeners}
    >
      <FileUploadItem file={file} onRemove={onRemove} onRetry={onRetry} />
    </div>
  );
}

export function FileUploadPreview({
  files,
  onRemove,
  onRetry,
  sortable = false,
  onReorder,
}: FileUploadPreviewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.id === active.id);
      const newIndex = files.findIndex((f) => f.id === over.id);
      const reorderedFiles = arrayMove(files, oldIndex, newIndex);
      onReorder?.(reorderedFiles);
    }
  };

  if (files.length === 0) {
    return null;
  }

  const gridContent = sortable ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext
        items={files.map((f) => f.id)}
        strategy={rectSortingStrategy}
      >
        {files.map((file) => (
          <SortableItem
            key={file.id}
            file={file}
            onRemove={onRemove}
            onRetry={onRetry}
          />
        ))}
      </SortableContext>
    </DndContext>
  ) : (
    files.map((file) => (
      <FileUploadItem
        key={file.id}
        file={file}
        onRemove={onRemove}
        onRetry={onRetry}
      />
    ))
  );

  return (
    <div
      className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5"
      role="list"
      aria-label="Yüklenen dosyalar"
    >
      {gridContent}
    </div>
  );
}
