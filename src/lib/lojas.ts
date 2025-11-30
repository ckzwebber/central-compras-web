"use client";

import { api } from "@/config/axios.config";
import type { Loja, LojaResponse, LojasResponse, CreateLojaDto, UpdateLojaDto } from "@/types/loja";

class LojasService {
  /**
   * Busca todas as lojas disponíveis
   * @returns Promise com array de lojas
   */
  async getAll(): Promise<Loja[]> {
    try {
      console.log("🔵 Buscando todas as lojas...");
      const response = await api.get<LojasResponse>("/lojas");

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar lojas");
      }

      console.log("🔵 Lojas carregadas:", response.data.data.length);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar lojas:", error);
      throw new Error("Não foi possível carregar as lojas");
    }
  }

  /**
   * Busca uma loja específica por ID
   * @param id UUID da loja
   * @returns Promise com dados da loja
   */
  async getById(id: string): Promise<Loja> {
    try {
      console.log("🔵 Buscando loja:", id);
      const response = await api.get<LojaResponse>(`/lojas/${id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Loja não encontrada");
      }

      console.log("🔵 Loja encontrada:", response.data.data.nome);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar loja:", error);
      throw new Error("Não foi possível carregar a loja");
    }
  }

  /**
   * Busca lojas do usuário autenticado
   * @returns Promise com array de lojas do usuário
   */
  async getMinhasLojas(): Promise<Loja[]> {
    try {
      console.log("🔵 Buscando lojas do usuário autenticado...");
      const response = await api.get<LojasResponse>("/lojas/minhas/lojas");

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar lojas do usuário");
      }

      console.log("🔵 Lojas do usuário carregadas:", response.data.data.length);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar lojas do usuário:", error);
      // Se a rota não existir, retornar array vazio
      return [];
    }
  }

  /**
   * Busca lojas por usuário
   * @param usuario_id UUID do usuário
   * @returns Promise com array de lojas
   */
  async getByUsuarioId(usuario_id: string): Promise<Loja[]> {
    try {
      console.log("🔵 Buscando lojas do usuário:", usuario_id);
      const response = await api.get<LojasResponse>(`/lojas/usuario/${usuario_id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar lojas do usuário");
      }

      console.log("🔵 Lojas encontradas:", response.data.data.length);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar lojas do usuário:", error);
      throw new Error("Não foi possível buscar as lojas");
    }
  }

  /**
   * Cria uma nova loja
   * @param data Dados da nova loja
   * @returns Promise com dados da loja criada
   */
  async create(data: CreateLojaDto): Promise<Loja> {
    try {
      console.log("🔵 Criando nova loja...");
      const response = await api.post<LojaResponse>("/lojas", data);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao criar loja");
      }

      console.log("🔵 Loja criada:", response.data.data.nome);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao criar loja:", error);
      throw new Error("Não foi possível criar a loja");
    }
  }

  /**
   * Atualiza uma loja existente
   * @param id UUID da loja
   * @param data Dados para atualização
   * @returns Promise com dados da loja atualizada
   */
  async update(id: string, data: UpdateLojaDto): Promise<Loja> {
    try {
      console.log("🔵 Atualizando loja:", id);
      const response = await api.patch<LojaResponse>(`/lojas/${id}`, data);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao atualizar loja");
      }

      console.log("🔵 Loja atualizada:", response.data.data.nome);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao atualizar loja:", error);
      throw new Error("Não foi possível atualizar a loja");
    }
  }

  /**
   * Deleta uma loja (soft delete)
   * @param id UUID da loja
   * @returns Promise void
   */
  async delete(id: string): Promise<void> {
    try {
      console.log("🔵 Deletando loja:", id);
      const response = await api.delete(`/lojas/${id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao deletar loja");
      }

      console.log("🔵 Loja deletada com sucesso");
    } catch (error) {
      console.error("❌ Erro ao deletar loja:", error);
      throw new Error("Não foi possível deletar a loja");
    }
  }
}

export const lojasService = new LojasService();
