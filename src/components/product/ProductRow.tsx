import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import type { IProduct } from "../../types/product";

interface ProductRowProps {
  product: IProduct;
  onDelete: (id: string) => void;
}

const ProductRow = ({ product, onDelete }: ProductRowProps) => {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
      {/* Image */}

      <td className="px-4 py-3">
        <img
          src={product.image}
          alt={product.name}
          className="h-14 w-14 rounded-lg border object-cover"
        />
      </td>

      {/* Name */}

      <td className="px-4 py-3">
        <div className="font-medium text-slate-900">{product.name}</div>

        <div className="text-xs text-slate-500">{product.sku}</div>
      </td>

      {/* Category */}

      <td className="px-4 py-3">{product.category}</td>

      {/* Purchase */}

      <td className="px-4 py-3">৳ {product.purchasePrice.toFixed(2)}</td>

      {/* Selling */}

      <td className="px-4 py-3">৳ {product.sellingPrice.toFixed(2)}</td>

      {/* Stock */}

      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            product.stock < 5
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {product.stock}
        </span>
      </td>

      {/* Actions */}

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Link
            to={`/products/edit/${product._id}`}
            className="rounded-lg border p-2 transition hover:bg-slate-100"
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            onClick={() => onDelete(product._id)}
            className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
