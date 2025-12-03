"use client";

import { api } from "@/config/axios.config";
import type { Produto, ProdutosResponse } from "@/types/produto";

class ProdutosService {
  async getAll(): Promise<Produto[]> {
    try {
      const response = await api.get<ProdutosResponse>("/produtos");

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar produtos");
      }

      return response.data.data;
    } catch (error) {
      throw new Error("Não foi possível carregar os produtos");
    }
  }

  async getById(id: string): Promise<Produto> {
    try {
      const response = await api.get<{ success: boolean; message: string; data: Produto }>(`/produtos/id/${id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Produto não encontrado");
      }

      return response.data.data;
    } catch (error) {
      throw new Error("Não foi possível carregar o produto");
    }
  }

  async getByCategoria(categoria: string): Promise<Produto[]> {
    try {
      const produtos = await this.getAll();
      return produtos.filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase());
    } catch (error) {
      throw new Error("Não foi possível filtrar os produtos");
    }
  }

  async search(searchTerm: string): Promise<Produto[]> {
    try {
      const produtos = await this.getAll();
      const normalizedTerm = searchTerm.toLowerCase().trim();

      return produtos.filter((p) => p.nome.toLowerCase().includes(normalizedTerm) || p.descricao.toLowerCase().includes(normalizedTerm));
    } catch (error) {
      throw new Error("Não foi possível buscar os produtos");
    }
  }
}

export const produtosService = new ProdutosService();
