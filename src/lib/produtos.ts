"use client";

import { api } from "@/config/axios.config";
import type { Produto, ProdutosResponse } from "@/types/produto";

class ProdutosService {
  /**
   * Busca todos os produtos disponíveis
   * @returns Promise com array de produtos
   */
  async getAll(): Promise<Produto[]> {
    try {
      console.log("🔵 Buscando todos os produtos...");
      const response = await api.get<ProdutosResponse>("/produtos");

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar produtos");
      }

      console.log("🔵 Produtos carregados:", response.data.data.length);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar produtos:", error);
      throw new Error("Não foi possível carregar os produtos");
    }
  }

  /**
   * Busca um produto específico por ID
   * @param id UUID do produto
   * @returns Promise com dados do produto
   */
  async getById(id: string): Promise<Produto> {
    try {
      console.log("🔵 Buscando produto:", id);
      const response = await api.get<{ success: boolean; message: string; data: Produto }>(`/produtos/id/${id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Produto não encontrado");
      }

      console.log("🔵 Produto encontrado:", response.data.data.nome);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar produto:", error);
      throw new Error("Não foi possível carregar o produto");
    }
  }

  /**
   * Busca produtos por categoria
   * @param categoria Nome da categoria
   * @returns Promise com array de produtos filtrados
   */
  async getByCategoria(categoria: string): Promise<Produto[]> {
    try {
      const produtos = await this.getAll();
      return produtos.filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase());
    } catch (error) {
      console.error("❌ Erro ao filtrar produtos por categoria:", error);
      throw new Error("Não foi possível filtrar os produtos");
    }
  }

  /**
   * Busca produtos por termo de pesquisa (nome ou descrição)
   * @param searchTerm Termo para buscar
   * @returns Promise com array de produtos filtrados
   */
  async search(searchTerm: string): Promise<Produto[]> {
    try {
      const produtos = await this.getAll();
      const normalizedTerm = searchTerm.toLowerCase().trim();

      return produtos.filter((p) => p.nome.toLowerCase().includes(normalizedTerm) || p.descricao.toLowerCase().includes(normalizedTerm));
    } catch (error) {
      console.error("❌ Erro ao buscar produtos:", error);
      throw new Error("Não foi possível buscar os produtos");
    }
  }
}

export const produtosService = new ProdutosService();
