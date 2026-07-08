import axiosInstance from "./axios";

import type {
  ICreateProduct,
  IProductQuery,
  IUpdateProduct,
} from "../types/product";

export const ProductApi = {
  /**
   * Get All Products
   * GET /products
   */
  getProducts: async (params?: IProductQuery) => {
    const response = await axiosInstance.get("/products", {
      params,
    });

    return response.data;
  },

  /**
   * Get Single Product
   * GET /products/:id
   */
  getProductById: async (id: string) => {
    const response = await axiosInstance.get(`/products/${id}`);

    return response.data;
  },

  /**
   * Create Product
   * POST /products
   */
  createProduct: async (payload: ICreateProduct) => {
    const formData = new FormData();

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    formData.append("name", payload.name);
    formData.append("sku", payload.sku);
    formData.append("category", payload.category);
    formData.append("purchasePrice", payload.purchasePrice.toString());
    formData.append("sellingPrice", payload.sellingPrice.toString());
    formData.append("stock", payload.stock.toString());
    formData.append("image", payload.image);

    const response = await axiosInstance.post("/products", formData);

    return response.data;
  },

  /**
   * Update Product
   * PATCH /products/:id
   */
  updateProduct: async (id: string, payload: IUpdateProduct) => {
    const formData = new FormData();

    if (payload.name !== undefined) {
      formData.append("name", payload.name);
    }

    if (payload.sku !== undefined) {
      formData.append("sku", payload.sku);
    }

    if (payload.category !== undefined) {
      formData.append("category", payload.category);
    }

    if (payload.purchasePrice !== undefined) {
      formData.append("purchasePrice", payload.purchasePrice.toString());
    }

    if (payload.sellingPrice !== undefined) {
      formData.append("sellingPrice", payload.sellingPrice.toString());
    }

    if (payload.stock !== undefined) {
      formData.append("stock", payload.stock.toString());
    }

    if (payload.image) {
      formData.append("image", payload.image);
    }

    const response = await axiosInstance.patch(`/products/${id}`, formData);

    return response.data;
  },

  /**
   * Delete Product
   * DELETE /products/:id
   */
  deleteProduct: async (id: string) => {
    const response = await axiosInstance.delete(`/products/${id}`);

    return response.data;
  },
};
