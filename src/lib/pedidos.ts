"use client";

import { api } from "@/config/axios.config";
import type { Pedido, PedidoResponse, PedidosResponse, CreatePedidoDto, UpdatePedidoDto } from "@/types/pedido";

class PedidosService {
  /**
   * Busca todos os pedidos
   * @returns Promise com array de pedidos
   */
  async getAll(): Promise<Pedido[]> {
    try {
      console.log("🔵 Buscando todos os pedidos...");
      const response = await api.get<PedidosResponse>("/pedidos");

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar pedidos");
      }

      console.log("🔵 Pedidos carregados:", response.data.data.length);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar pedidos:", error);
      throw new Error("Não foi possível carregar os pedidos");
    }
  }

  /**
   * Busca um pedido específico por ID (com seus itens)
   * @param id UUID do pedido
   * @returns Promise com dados do pedido completo
   */
  async getById(id: string): Promise<Pedido> {
    try {
      console.log("🔵 Buscando pedido:", id);
      const response = await api.get<PedidoResponse>(`/pedidos/${id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Pedido não encontrado");
      }

      console.log("🔵 Pedido encontrado:", response.data.data.id);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar pedido:", error);
      throw new Error("Não foi possível carregar o pedido");
    }
  }

  /**
   * Busca pedidos do usuário autenticado
   * @returns Promise com array de pedidos do usuário
   */
  async getMeusPedidos(): Promise<Pedido[]> {
    try {
      console.log("🔵 Buscando pedidos do usuário autenticado...");
      const response = await api.get<PedidosResponse>("/pedidos/meus/pedidos");

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar pedidos do usuário");
      }

      console.log("🔵 Pedidos do usuário carregados:", response.data.data.length);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar pedidos do usuário:", error);
      // Se a rota não existir, retornar array vazio
      return [];
    }
  }

  /**
   * Busca pedidos por status
   * @param status Status do pedido
   * @returns Promise com array de pedidos filtrados
   */
  async getByStatus(status: string): Promise<Pedido[]> {
    try {
      console.log("🔵 Buscando pedidos por status:", status);
      const response = await api.get<PedidosResponse>(`/pedidos/status/${status}`);

      if (!response.data || !response.data.success) {
        return [];
      }

      console.log("🔵 Pedidos encontrados:", response.data.data.length);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar pedidos por status:", error);
      return [];
    }
  }

  /**
   * Busca pedidos por data
   * @param date Data no formato YYYY-MM-DD
   * @returns Promise com array de pedidos filtrados
   */
  async getByDate(date: string): Promise<Pedido[]> {
    try {
      console.log("🔵 Buscando pedidos por data:", date);
      const response = await api.get<PedidosResponse>(`/pedidos/search/date?date=${date}`);

      if (!response.data || !response.data.success) {
        return [];
      }

      console.log("🔵 Pedidos encontrados:", response.data.data.length);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao buscar pedidos por data:", error);
      return [];
    }
  }

  /**
   * Cria um novo pedido
   * @param data Dados do novo pedido (incluindo produtos)
   * @returns Promise com dados do pedido criado
   */
  async create(data: CreatePedidoDto): Promise<Pedido> {
    try {
      console.log("🔵 Criando novo pedido...");
      const response = await api.post<PedidoResponse>("/pedidos", data);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao criar pedido");
      }

      console.log("🔵 Pedido criado:", response.data.data.id);
      return response.data.data;
    } catch (error: any) {
      console.error("❌ Erro ao criar pedido:", error);
      const errorMessage = error.response?.data?.message || "Não foi possível criar o pedido";
      throw new Error(errorMessage);
    }
  }

  /**
   * Atualiza um pedido existente
   * @param id UUID do pedido
   * @param data Dados para atualização
   * @returns Promise com dados do pedido atualizado
   */
  async update(id: string, data: UpdatePedidoDto): Promise<Pedido> {
    try {
      console.log("🔵 Atualizando pedido:", id);
      const response = await api.patch<PedidoResponse>(`/pedidos/${id}`, data);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao atualizar pedido");
      }

      console.log("🔵 Pedido atualizado:", response.data.data.id);
      return response.data.data;
    } catch (error) {
      console.error("❌ Erro ao atualizar pedido:", error);
      throw new Error("Não foi possível atualizar o pedido");
    }
  }

  /**
   * Cancela um pedido
   * @param id UUID do pedido
   * @returns Promise com dados do pedido cancelado
   */
  async cancel(id: string): Promise<Pedido> {
    try {
      console.log("🔵 Cancelando pedido:", id);
      return await this.update(id, { status: "cancelado" });
    } catch (error) {
      console.error("❌ Erro ao cancelar pedido:", error);
      throw new Error("Não foi possível cancelar o pedido");
    }
  }

  /**
   * Deleta um pedido (soft delete)
   * @param id UUID do pedido
   * @returns Promise void
   */
  async delete(id: string): Promise<void> {
    try {
      console.log("🔵 Deletando pedido:", id);
      const response = await api.delete(`/pedidos/${id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao deletar pedido");
      }

      console.log("🔵 Pedido deletado com sucesso");
    } catch (error) {
      console.error("❌ Erro ao deletar pedido:", error);
      throw new Error("Não foi possível deletar o pedido");
    }
  }
}

export const pedidosService = new PedidosService();
