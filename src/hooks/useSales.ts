import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { SaleService } from "../services/sale.service";

import type { ICreateSale, ISaleQuery } from "../types/sale";

/**
 * Get All Sales
 */
export const useSales = (params?: ISaleQuery) => {
  return useQuery({
    queryKey: ["sales", params],
    queryFn: () => SaleService.getSales(params),
  });
};

/**
 * Get Single Sale
 */
export const useSale = (id: string) => {
  return useQuery({
    queryKey: ["sale", id],
    queryFn: () => SaleService.getSaleById(id),
    enabled: !!id,
  });
};

/**
 * Create Sale
 */
export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateSale) => SaleService.createSale(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sales"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
