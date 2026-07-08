import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import SalesForm from "../components/sales/SalesForm";

import { useProducts } from "../hooks/useProducts";
import { useCreateSale } from "../hooks/useSales";

const CreateSale = () => {
  const navigate = useNavigate();

  /**
   * Get Products
   */
  const { data, isLoading } = useProducts({
    page: 1,
    limit: 1000,
  });

  /**
   * Create Sale Mutation
   */
  const { mutateAsync, isPending } = useCreateSale();

  /**
   * Submit Sale
   */
  const handleCreateSale = async (payload: any) => {
    try {
      const response = await mutateAsync(payload);

      toast.success(response?.message ?? "Sale created successfully.");

      navigate("/sales");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Failed to create sale.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">Loading...</div>
    );
  }

  const products =
    data?.data?.filter((product: any) => product.stock > 0) ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/sales"
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <h1 className="text-3xl font-bold text-slate-900">Create Sale</h1>

          <p className="mt-1 text-sm text-slate-500">
            Sell products and automatically reduce stock.
          </p>
        </div>
      </div>

      {/* Form */}

      <SalesForm
        products={products}
        loading={isPending}
        onSubmit={handleCreateSale}
      />
    </div>
  );
};

export default CreateSale;
