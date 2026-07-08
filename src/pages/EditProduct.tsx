import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import ProductForm from "../components/product/ProductForm";

import { useProduct, useUpdateProduct } from "../hooks/useProducts";

import type { IUpdateProduct } from "../types/product";

const EditProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useProduct(id ?? "");

  const { mutateAsync, isPending } = useUpdateProduct();

  const handleUpdateProduct = async (payload: IUpdateProduct) => {
    if (!id) return;

    try {
      const response = await mutateAsync({
        id,
        payload,
      });

      toast.success(response?.message ?? "Product updated successfully.");

      navigate("/products");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to update product.",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-slate-500">Loading product...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-red-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Edit Product
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update product information.
        </p>
      </div>

      {/* Form */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductForm
          defaultValues={data.data}
          loading={isPending}
          onSubmit={handleUpdateProduct}
        />
      </div>
    </div>
  );
};

export default EditProduct;
