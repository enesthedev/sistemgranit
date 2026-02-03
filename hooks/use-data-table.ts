"use client";

import {
  type PaginationState,
  type SortingState,
  type OnChangeFn,
} from "@tanstack/react-table";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

export function useDataTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- Pagination State ---
  const page = searchParams?.get("page") ? Number(searchParams.get("page")) : 1;
  const perPage = searchParams?.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  // Create stable pagination state
  const pagination: PaginationState = React.useMemo(
    () => ({
      pageIndex: page - 1,
      pageSize: perPage,
    }),
    [page, perPage],
  );

  // --- Sorting State ---
  const sortParam = searchParams?.get("sort");
  const [sortId, sortDesc] = sortParam?.split(".") ?? [];

  const sorting: SortingState = React.useMemo(() => {
    if (!sortId) return [];
    return [{ id: sortId, desc: sortDesc === "desc" }];
  }, [sortId, sortDesc]);

  // --- Helpers ---

  // Helper to create query string with support for arrays and removals
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | string[] | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === "") {
          newSearchParams.delete(key);
        } else if (Array.isArray(value)) {
          newSearchParams.delete(key);
          value.forEach((v) => newSearchParams.append(key, String(v)));
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  // --- Handlers ---

  const onPaginationChange: OnChangeFn<PaginationState> = React.useCallback(
    (updaterOrValue) => {
      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue(pagination)
          : updaterOrValue;

      const queryString = createQueryString({
        page: newPagination.pageIndex + 1,
        per_page: newPagination.pageSize,
      });

      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [createQueryString, pathname, router, pagination],
  );

  const onSortingChange: OnChangeFn<SortingState> = React.useCallback(
    (updaterOrValue) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting)
          : updaterOrValue;

      const sort = newSorting[0];
      const queryString = createQueryString({
        sort: sort ? `${sort.id}.${sort.desc ? "desc" : "asc"}` : null,
      });

      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [createQueryString, pathname, router, sorting],
  );

  return {
    pagination,
    onPaginationChange,
    sorting,
    onSortingChange,
    createQueryString,
    router,
    pathname,
  };
}
