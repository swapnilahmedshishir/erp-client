// src/pages/Sales.tsx

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Plus } from "lucide-react";

import SearchBox from "../components/common/SearchBox";
import Pagination from "../components/common/Pagination";
import SalesTable from "../components/sales/SalesTable";

import { useSales } from "../hooks/useSales";

const Sales = () => {
  /**
   * Search
   */
  const [search, setSearch] = useState("");

  /**
   * Pagination
   */
  const [page, setPage] = useState(1);

  const limit = 10;

  /**
   * Query Params
   */
  const queryParams = useMemo(
    () => ({
      page,
      limit,
      searchTerm: search.trim(),
    }),
    [page, limit, search],
  );

  /**
   * Get Sales
   */
  const { data, isLoading, isError } = useSales(queryParams);

  const sales = data?.data ?? [];

  const meta = data?.meta;

  if (isError) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-red-500">Failed to load sales history.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sales</h1>

          <p className="mt-1 text-sm text-slate-500">View all sales history.</p>
        </div>

        <Link
          to="/sales/create"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <Plus size={18} />
          Create Sale
        </Link>
      </div>

      {/* Search */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-sm">
            <SearchBox
              value={search}
              placeholder="Search sale..."
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />
          </div>

          <div className="text-sm text-slate-500">
            Total Sales :
            <span className="ml-2 font-semibold text-slate-900">
              {meta?.total ?? 0}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}

      <SalesTable sales={sales} loading={isLoading} />

      {/* Pagination */}

      {meta && meta.totalPage > 1 && (
        <div className="flex justify-end">
          <Pagination
            currentPage={page}
            totalPages={meta.totalPage}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Sales;
