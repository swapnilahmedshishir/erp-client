import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ProductForm from "../components/product/ProductForm";

import { useCreateProduct } from "../hooks/useProducts";

import type { ICreateProduct } from "../types/product";

const AddProduct = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useCreateProduct();

  const handleCreateProduct = async (payload: ICreateProduct) => {
    try {
      const response = await mutateAsync(payload);
      console.log(response);

      toast.success(response?.message ?? "Product created successfully.");

      navigate("/products");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to create product.",
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Page Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Add Product
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create a new product and upload an image.
        </p>
      </div>

      {/* Form Card */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductForm loading={isPending} onSubmit={handleCreateProduct} />
      </div>
    </div>
  );
};

export default AddProduct;
