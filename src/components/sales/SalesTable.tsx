// src/components/sales/SalesTable.tsx

import { Package } from "lucide-react";

import type { ISale } from "../../types/sale";

interface SalesTableProps {
  sales: ISale[];
  loading?: boolean;
}

const SalesTable = ({ sales, loading = false }: SalesTableProps) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-slate-500">Loading sales...</p>
      </div>
    );
  }

  if (!sales.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-20">
        <div className="flex flex-col items-center justify-center">
          <Package size={48} className="mb-4 text-slate-300" />

          <h3 className="text-lg font-semibold text-slate-700">
            No Sales Found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Create your first sale to see history here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">#</th>

              <th className="px-5 py-3 text-left font-semibold">Products</th>

              <th className="px-5 py-3 text-center font-semibold">Quantity</th>

              <th className="px-5 py-3 text-right font-semibold">
                Grand Total
              </th>

              <th className="px-5 py-3 text-left font-semibold">Sold By</th>

              <th className="px-5 py-3 text-center font-semibold">Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale, index) => {
              const totalQuantity = sale.products.reduce(
                (sum, item) => sum + item.quantity,
                0,
              );

              return (
                <tr
                  key={sale._id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">{index + 1}</td>

                  <td className="px-5 py-4">
                    <div className="space-y-1">
                      {sale.products.map((item) => (
                        <div
                          key={item.product._id}
                          className="flex items-center gap-2"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-8 w-8 rounded-md object-cover"
                          />

                          <div>
                            <p className="font-medium text-slate-800">
                              {item.product.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {item.product.sku}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center font-medium">
                    {totalQuantity}
                  </td>

                  <td className="px-5 py-4 text-right font-semibold text-green-600">
                    ৳ {sale.grandTotal.toFixed(2)}
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium">{sale.soldBy.name}</p>

                      <p className="text-xs text-slate-500">
                        {sale.soldBy.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center text-slate-500">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
