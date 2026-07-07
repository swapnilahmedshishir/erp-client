import { ImagePlus } from "lucide-react";

interface ProductImageProps {
  preview?: string;
}

const ProductImage = ({ preview }: ProductImageProps) => {
  return (
    <div className="flex justify-center">
      <div className="relative h-52 w-52 overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
        {preview ? (
          <img
            src={preview}
            alt="Product Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <ImagePlus size={40} strokeWidth={1.5} />

            <p className="mt-3 text-sm">Image Preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
