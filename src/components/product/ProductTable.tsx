import ProductRow from "./ProductRow";

import type { IProduct } from "../../types/product";

interface ProductTableProps {
  products: IProduct[];
  loading?: boolean;
  onDelete: (id: string) => void;
}

const ProductTable = ({
  products,
  loading = false,
  onDelete,
}: ProductTableProps) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <p className="text-slate-500">Loading products...</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700">
          No Products Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Start by creating your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr className="text-left text-slate-700">
              <th className="px-4 py-3 font-semibold">Image</th>

              <th className="px-4 py-3 font-semibold">Product</th>

              <th className="px-4 py-3 font-semibold">Category</th>

              <th className="px-4 py-3 font-semibold">Purchase</th>

              <th className="px-4 py-3 font-semibold">Selling</th>

              <th className="px-4 py-3 font-semibold">Stock</th>

              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
