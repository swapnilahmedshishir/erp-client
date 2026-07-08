import { SaleApi } from "../api/sale.api";

import type { ICreateSale, ISaleQuery } from "../types/sale";

/**
 * Create Sale
 */
const createSale = async (payload: ICreateSale) => {
  const response = await SaleApi.createSale(payload);

  return response;
};

/**
 * Get All Sales
 */
const getSales = async (params?: ISaleQuery) => {
  const response = await SaleApi.getSales(params);

  return response;
};

/**
 * Get Single Sale
 */
const getSaleById = async (id: string) => {
  const response = await SaleApi.getSaleById(id);

  return response;
};

export const SaleService = {
  createSale,
  getSales,
  getSaleById,
};
