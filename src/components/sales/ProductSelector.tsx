import { Trash2 } from "lucide-react";

import type { IProduct } from "../../types/product";

interface SaleItem {
  product: string;
  quantity: number;
}

interface ProductSelectorProps {
  products: IProduct[];
  value: SaleItem[];
  onChange: (items: SaleItem[]) => void;
  disabled?: boolean;
}

const ProductSelector = ({
  products,
  value,
  onChange,
  disabled = false,
}: ProductSelectorProps) => {
  const handleAdd = () => {
    onChange([
      ...value,
      {
        product: "",
        quantity: 1,
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, productId: string) => {
    const items = [...value];

    items[index].product = productId;

    onChange(items);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const items = [...value];

    items[index].quantity = quantity < 1 ? 1 : quantity;

    onChange(items);
  };

  return (
    <div className="space-y-4">
      {value.map((item, index) => {
        const selectedProduct = products.find(
          (product) => product._id === item.product,
        );

        return (
          <div
            key={index}
            className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-12"
          >
            {/* Product */}
            <div className="md:col-span-6">
              <label className="mb-2 block text-sm font-medium">Product</label>

              <select
                value={item.product}
                disabled={disabled}
                onChange={(e) => handleProductChange(index, e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-900"
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} ({product.stock})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Qty</label>

              <input
                type="number"
                min={1}
                disabled={disabled}
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(index, Number(e.target.value))
                }
                className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-900"
              />
            </div>

            {/* Price */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Price</label>

              <div className="flex h-11 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm">
                ৳ {selectedProduct?.sellingPrice ?? 0}
              </div>
            </div>

            {/* Subtotal */}
            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium">Total</label>

              <div className="flex h-11 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold">
                ৳ {(selectedProduct?.sellingPrice ?? 0) * item.quantity}
              </div>
            </div>

            {/* Remove */}
            <div className="flex items-end justify-end md:col-span-1">
              <button
                type="button"
                disabled={disabled}
                onClick={() => handleRemove(index)}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        disabled={disabled}
        onClick={handleAdd}
        className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        + Add Product
      </button>
    </div>
  );
};
export default ProductSelector;
