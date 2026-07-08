/**
 * Product Entity
 */
export interface IProduct {
  _id: string;
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  image: string;
  imagePublicId: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Product Payload
 */
export interface ICreateProduct {
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  image: File;
}

/**
 * Update Product Payload
 */
export interface IUpdateProduct {
  name?: string;
  sku?: string;
  category?: string;
  purchasePrice?: number;
  sellingPrice?: number;
  stock?: number;
  image?: File;
}

/**
 * Product Query Params
 */
export interface IProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  category?: string;
}

/**
 * Pagination Meta
 */
export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

/**
 * Product List Response
 */
export interface IProductListResponse {
  meta: IPaginationMeta;
  data: IProduct[];
}

/**
 * Single Product Response
 */
export interface IProductResponse {
  data: IProduct;
}
