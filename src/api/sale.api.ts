import axiosInstance from "./axios";

import type { ICreateSale, ISaleQuery } from "../types/sale";

export const SaleApi = {
  /**
   * Create Sale
   * POST /sales
   */
  createSale: async (payload: ICreateSale) => {
    const response = await axiosInstance.post("/sales", payload);

    return response.data;
  },

  /**
   * Get All Sales
   * GET /sales
   */
  getSales: async (params?: ISaleQuery) => {
    const response = await axiosInstance.get("/sales", {
      params,
    });

    return response.data;
  },

  /**
   * Get Single Sale
   * GET /sales/:id
   */
  getSaleById: async (id: string) => {
    const response = await axiosInstance.get(`/sales/${id}`);

    return response.data;
  },
};
