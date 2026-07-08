import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ProductImage from "./ProductImage";

import type { ICreateProduct, IProduct } from "../../types/product";

/* -------------------------------------------------------------------------- */
/*                                Validation                                  */
/* -------------------------------------------------------------------------- */

const productSchema = z
  .object({
    name: z.string().trim().min(2, "Product name is required."),

    sku: z.string().trim().min(1, "SKU is required."),

    category: z.string().trim().min(1, "Category is required."),

    purchasePrice: z.coerce
      .number()
      .min(0, "Purchase price must be greater than or equal to 0."),

    sellingPrice: z.coerce
      .number()
      .min(0, "Selling price must be greater than or equal to 0."),

    stock: z.coerce.number().min(0, "Stock cannot be negative."),
  })
  .refine((data) => data.sellingPrice >= data.purchasePrice, {
    path: ["sellingPrice"],
    message: "Selling price must be greater than or equal to purchase price.",
  });

type ProductFormValues = z.infer<typeof productSchema>;

/* -------------------------------------------------------------------------- */
/*                                   Props                                    */
/* -------------------------------------------------------------------------- */

interface ProductFormProps {
  defaultValues?: IProduct;

  loading?: boolean;

  onSubmit: (payload: ICreateProduct) => Promise<void> | void;
}

const ProductForm = ({
  defaultValues,
  loading = false,
  onSubmit,
}: ProductFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const formDefaultValues = useMemo(
    () => ({
      name: defaultValues?.name ?? "",
      sku: defaultValues?.sku ?? "",
      category: defaultValues?.category ?? "",
      purchasePrice: defaultValues?.purchasePrice ?? 0,
      sellingPrice: defaultValues?.sellingPrice ?? 0,
      stock: defaultValues?.stock ?? 0,
    }),
    [defaultValues],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: formDefaultValues,
  });

  useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues, reset]);

  useEffect(() => {
    if (!selectedImage) {
      setPreview(defaultValues?.image ?? "");

      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedImage, defaultValues]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);
  };

  const submitHandler = async (values: ProductFormValues) => {
    if (!selectedImage && !defaultValues) {
      return;
    }

    await onSubmit({
      ...values,
      image: selectedImage ?? (defaultValues?.image as unknown as File),
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* Image Preview */}
      <ProductImage preview={preview} />
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Product Image</label>

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleImageChange}
          disabled={loading}
          className="block w-full cursor-pointer rounded-lg border border-slate-300 bg-white p-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white hover:file:bg-slate-800"
        />
      </div>

      {/* Product Information */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Product Name */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Product Name</label>

          <input
            type="text"
            placeholder="Enter product name"
            {...register("name")}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-black"
          />

          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* SKU */}

        <div className="space-y-2">
          <label className="text-sm font-medium">SKU</label>

          <input
            type="text"
            placeholder="Enter SKU"
            {...register("sku")}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-black"
          />

          {errors.sku && (
            <p className="text-sm text-red-500">{errors.sku.message}</p>
          )}
        </div>

        {/* Category */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>

          <input
            type="text"
            placeholder="Enter category"
            {...register("category")}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-black"
          />

          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Stock */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Stock Quantity</label>

          <input
            type="number"
            min={0}
            placeholder="Enter stock quantity"
            {...register("stock")}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-black"
          />

          {errors.stock && (
            <p className="text-sm text-red-500">{errors.stock.message}</p>
          )}
        </div>

        {/* Purchase Price */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Purchase Price</label>

          <input
            type="number"
            min={0}
            step="0.01"
            placeholder="Enter purchase price"
            {...register("purchasePrice")}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-black"
          />

          {errors.purchasePrice && (
            <p className="text-sm text-red-500">
              {errors.purchasePrice.message}
            </p>
          )}
        </div>

        {/* Selling Price */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Selling Price</label>

          <input
            type="number"
            min={0}
            step="0.01"
            placeholder="Enter selling price"
            {...register("sellingPrice")}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-black"
          />

          {errors.sellingPrice && (
            <p className="text-sm text-red-500">
              {errors.sellingPrice.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-lg bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? defaultValues
              ? "Updating Product..."
              : "Creating Product..."
            : defaultValues
              ? "Update Product"
              : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
