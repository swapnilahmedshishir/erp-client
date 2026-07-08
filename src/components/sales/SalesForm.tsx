// src/components/sales/SalesForm.tsx

import { useMemo, useState } from "react";
import { toast } from "sonner";

import ProductSelector from "./ProductSelector";

import type { IProduct } from "../../types/product";
import type { ICreateSale } from "../../types/sale";

interface SalesFormProps {
  products: IProduct[];
  loading?: boolean;
  onSubmit: (payload: ICreateSale) => Promise<void>;
}

const SalesForm = ({ products, loading = false, onSubmit }: SalesFormProps) => {
  const [items, setItems] = useState([
    {
      product: "",
      quantity: 1,
    },
  ]);

  const grandTotal = useMemo(() => {
    return items.reduce((total, item) => {
      const product = products.find((p) => p._id === item.product);

      if (!product) return total;

      return total + product.sellingPrice * item.quantity;
    }, 0);
  }, [items, products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validItems = items.filter((item) => item.product);

    if (!validItems.length) {
      toast.error("Please select at least one product.");
      return;
    }

    const duplicate = new Set(validItems.map((i) => i.product));

    if (duplicate.size !== validItems.length) {
      toast.error("Duplicate products are not allowed.");
      return;
    }

    try {
      await onSubmit({
        products: validItems,
      });

      setItems([
        {
          product: "",
          quantity: 1,
        },
      ]);
    } catch {
      // handled by page
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Create Sale</h2>

          <p className="mt-1 text-sm text-slate-500">
            Select products and quantity.
          </p>
        </div>
      </div>

      <ProductSelector
        products={products}
        value={items}
        onChange={setItems}
        disabled={loading}
      />

      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
        <span className="text-lg font-medium text-slate-600">Grand Total</span>

        <span className="text-2xl font-bold text-slate-900">
          ৳ {grandTotal.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Sale..." : "Create Sale"}
        </button>
      </div>
    </form>
  );
};

export default SalesForm;
