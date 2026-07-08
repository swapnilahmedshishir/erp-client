import type { IProduct } from "../../types/product";

interface LowStockTableProps {
  products: IProduct[];
  loading?: boolean;
}

const LowStockTable = ({ products, loading = false }: LowStockTableProps) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-slate-500">Loading low stock products...</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No Low Stock Products
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          All products have sufficient stock.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Low Stock Products
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Product
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                SKU
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Category
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-slate-700">
                Stock
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-slate-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg border object-cover"
                    />

                    <div>
                      <p className="font-medium text-slate-900">
                        {product.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        #{product._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {product.sku}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {product.category}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="font-semibold text-red-600">
                    {product.stock}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Low Stock
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockTable;
