"use client";

import { api } from "@/config/axios.config";
import type { Pedido, PedidoResponse, PedidosResponse, CreatePedidoDto, UpdatePedidoDto } from "@/types/pedido";

class PedidosService {
  async getAll(): Promise<Pedido[]> {
    try {
      const response = await api.get<PedidosResponse>("/pedidos");

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar pedidos");
      }

      return response.data.data;
    } catch (error) {
      throw new Error("Não foi possível carregar os pedidos");
    }
  }

  async getById(id: string): Promise<Pedido> {
    try {
      const response = await api.get<PedidoResponse>(`/pedidos/${id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Pedido não encontrado");
      }

      return response.data.data;
    } catch (error) {
      throw new Error("Não foi possível carregar o pedido");
    }
  }

  async getMeusPedidos(): Promise<Pedido[]> {
    try {
      const response = await api.get<PedidosResponse>("/pedidos/meus/pedidos");

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar pedidos do usuário");
      }

      return response.data.data;
    } catch (error) {
      return [];
    }
  }

  async getByStatus(status: string): Promise<Pedido[]> {
    try {
      const response = await api.get<PedidosResponse>(`/pedidos/status/${status}`);

      if (!response.data || !response.data.success) {
        return [];
      }

      return response.data.data;
    } catch (error) {
      return [];
    }
  }

  async getByDate(date: string): Promise<Pedido[]> {
    try {
      const response = await api.get<PedidosResponse>(`/pedidos/search/date?date=${date}`);

      if (!response.data || !response.data.success) {
        return [];
      }

      return response.data.data;
    } catch (error) {
      return [];
    }
  }

  async create(data: CreatePedidoDto): Promise<Pedido> {
    try {
      const response = await api.post<PedidoResponse>("/pedidos", data);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao criar pedido");
      }

      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Não foi possível criar o pedido";
      throw new Error(errorMessage);
    }
  }

  async update(id: string, data: UpdatePedidoDto): Promise<Pedido> {
    try {
      const response = await api.patch<PedidoResponse>(`/pedidos/${id}`, data);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao atualizar pedido");
      }

      return response.data.data;
    } catch (error) {
      throw new Error("Não foi possível atualizar o pedido");
    }
  }

  async cancel(id: string): Promise<Pedido> {
    try {
      return await this.update(id, { status: "cancelado" });
    } catch (error) {
      throw new Error("Não foi possível cancelar o pedido");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await api.delete(`/pedidos/${id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao deletar pedido");
      }
    } catch (error) {
      throw new Error("Não foi possível deletar o pedido");
    }
  }
}

export const pedidosService = new PedidosService();
