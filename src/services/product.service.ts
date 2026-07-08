import { ProductApi } from "../api/product.api";

import type {
  ICreateProduct,
  IProductQuery,
  IUpdateProduct,
} from "../types/product";

/**
 * Get All Products
 */
const getProducts = async (params?: IProductQuery) => {
  const response = await ProductApi.getProducts(params);

  return response;
};

/**
 * Get Single Product
 */
const getProductById = async (id: string) => {
  const response = await ProductApi.getProductById(id);

  return response;
};

/**
 * Create Product
 */
const createProduct = async (payload: ICreateProduct) => {
  console.log("SERVICE PAYLOAD:", payload);
  const response = await ProductApi.createProduct(payload);

  return response;
};

/**
 * Update Product
 */
const updateProduct = async (id: string, payload: IUpdateProduct) => {
  const response = await ProductApi.updateProduct(id, payload);

  return response;
};

/**
 * Delete Product
 */
const deleteProduct = async (id: string) => {
  const response = await ProductApi.deleteProduct(id);

  return response;
};

export const ProductService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
