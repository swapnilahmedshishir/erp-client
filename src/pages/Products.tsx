import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Plus } from "lucide-react";

import ProductTable from "../components/product/ProductTable";

import Button from "../components/common/Button";
import SearchBox from "../components/common/SearchBox";
import Pagination from "../components/common/Pagination";
import Modal from "../components/common/Modal";

import { useDeleteProduct, useProducts } from "../hooks/useProducts";

const Products = () => {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const limit = 10;

  /**
   * Query Params
   */
  const queryParams = useMemo(
    () => ({
      page,
      limit,
      search: search.trim(),
    }),
    [page, limit, search],
  );

  /**
   * Get Products
   */
  const { data, isLoading, isError, refetch } = useProducts(queryParams);

  /**
   * Delete Product Mutation
   */
  const { mutateAsync: deleteProduct, isPending: isDeleting } =
    useDeleteProduct();

  const handleDeleteProduct = (id: string) => {
    setSelectedProductId(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (!selectedProductId) return;

    try {
      const response = await deleteProduct(selectedProductId);

      toast.success(response?.message ?? "Product deleted successfully.");

      setDeleteModalOpen(false);
      setSelectedProductId(null);

      refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to delete product.",
      );
    }
  };

  /**
   * Product List
   */
  const products = data?.data ?? [];

  /**
   * Pagination Meta
   */
  const meta = data?.meta;

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-red-500">Failed to load products.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage all products from here.
            </p>
          </div>

          <Link to="/products/create">
            <Button leftIcon={<Plus size={18} />}>Add Product</Button>
          </Link>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="w-full md:max-w-sm">
              <SearchBox
                value={search}
                placeholder="Search by name, SKU or Category..."
                onChange={(value) => {
                  setSearch(value);
                  setPage(1);
                }}
              />
            </div>

            {/* Result Count */}

            <div className="text-sm text-slate-500">
              Total Products :{" "}
              <span className="font-semibold text-slate-900">
                {meta?.total ?? 0}
              </span>
            </div>
          </div>
        </div>
        <ProductTable
          loading={isLoading || isDeleting}
          products={products}
          onDelete={handleDeleteProduct}
        />
        {meta && meta.totalPage > 1 && (
          <div className="flex justify-end">
            <Pagination
              currentPage={page}
              totalPages={meta.totalPage}
              onPageChange={setPage}
            />
          </div>
        )}{" "}
      </div>

      <Modal
        open={deleteModalOpen}
        title="Delete Product"
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedProductId(null);
        }}
        onConfirm={confirmDeleteProduct}
        confirmText="Delete"
        loading={isDeleting}
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
      </Modal>
    </>
  );
};

export default Products;
