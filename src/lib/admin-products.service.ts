import { api } from "@/config/axios.config";

export interface Product {
  id: string;
  nome: string;
  descricao: string;
  imagem_url: string | null;
  valor_unitario: number;
  quantidade_estoque: number;
  fornecedor_id: string;
  categoria: string;
  criado_em: string;
  atualizado_em: string;
}

export interface CreateProductData {
  nome: string;
  descricao: string;
  imagem_url?: string | null;
  valor_unitario: number;
  quantidade_estoque: number;
  fornecedor_id: string;
  categoria: string;
}

export interface UpdateProductData {
  nome?: string;
  descricao?: string;
  imagem_url?: string | null;
  valor_unitario?: number;
  quantidade_estoque?: number;
  fornecedor_id?: string;
  categoria?: string;
}

export const adminProductsService = {
  /**
   * Get all products
   */
  getAllProducts: async () => {
    const response = await api.get("/produtos");
    return response.data;
  },

  /**
   * Get product by ID
   */
  getProductById: async (productId: string) => {
    const response = await api.get(`/produtos/id/${productId}`);
    return response.data;
  },

  /**
   * Create new product
   */
  createProduct: async (data: CreateProductData) => {
    const response = await api.post("/produtos", data);
    return response.data;
  },

  /**
   * Update product
   */
  updateProduct: async (productId: string, data: UpdateProductData) => {
    const response = await api.patch(`/produtos/${productId}`, data);
    return response.data;
  },

  /**
   * Delete product
   */
  deleteProduct: async (productId: string) => {
    const response = await api.delete(`/produtos/${productId}`);
    return response.data;
  },
};
