export interface ISaleProduct {
  product: string;
  quantity: number;
}

export interface ICreateSale {
  products: ISaleProduct[];
}

export interface ISaleItem {
  product: {
    _id: string;
    name: string;
    sku: string;
    category: string;
    image: string;
  };

  quantity: number;
  price: number;
  subtotal: number;
}

export interface ISale {
  _id: string;

  products: ISaleItem[];

  grandTotal: number;

  soldBy: {
    _id: string;
    name: string;
    email: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface ISaleQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ISaleResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: ISale[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface ISingleSaleResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: ISale;
}
