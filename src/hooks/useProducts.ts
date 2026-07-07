import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ProductService } from "../services/product.service";

import type {
  ICreateProduct,
  IProductQuery,
  IUpdateProduct,
} from "../types/product";

const PRODUCT_QUERY_KEY = "products";

/**
 * Get All Products
 */
export const useProducts = (params?: IProductQuery) => {
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEY, params],
    queryFn: () => ProductService.getProducts(params),
  });
};

/**
 * Get Single Product
 */
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEY, id],
    queryFn: () => ProductService.getProductById(id),
    enabled: !!id,
  });
};

/**
 * Create Product
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateProduct) =>
      ProductService.createProduct(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_QUERY_KEY],
      });
    },
  });
};

/**
 * Update Product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IUpdateProduct }) =>
      ProductService.updateProduct(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_QUERY_KEY],
      });

      queryClient.invalidateQueries({
        queryKey: [PRODUCT_QUERY_KEY, variables.id],
      });
    },
  });
};

/**
 * Delete Product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductService.deleteProduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_QUERY_KEY],
      });
    },
  });
};
