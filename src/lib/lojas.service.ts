"use client";

import { api } from "@/config/axios.config";
import type { Loja, LojaResponse, LojasResponse, CreateLojaDto, UpdateLojaDto } from "@/types/loja";

class LojasService {
  async getAll(): Promise<Loja[]> {
    try {
      const response = await api.get<LojasResponse>("/lojas");

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar lojas");
      }

      return response.data.data;
    } catch (error) {
      throw new Error("Não foi possível carregar as lojas");
    }
  }

  async getById(id: string): Promise<Loja> {
    try {
      const response = await api.get<LojaResponse>(`/lojas/${id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Loja não encontrada");
      }

      return response.data.data;
    } catch (error) {
      throw new Error("Não foi possível carregar a loja");
    }
  }

  async getMinhasLojas(): Promise<Loja[]> {
    try {
      const response = await api.get<LojasResponse>("/lojas/minhas/lojas");

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar lojas do usuário");
      }

      return response.data.data;
    } catch (error) {
      return [];
    }
  }

  async getByUsuarioId(usuario_id: string): Promise<Loja[]> {
    try {
      const response = await api.get<LojasResponse>(`/lojas/usuario/${usuario_id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao buscar lojas do usuário");
      }

      return response.data.data;
    } catch (error) {
      throw new Error("Não foi possível buscar as lojas");
    }
  }

  async create(data: CreateLojaDto): Promise<Loja> {
    try {
      const response = await api.post<LojaResponse>("/lojas", data);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao criar loja");
      }

      return response.data.data;
    } catch (error) {
      throw new Error("Não foi possível criar a loja");
    }
  }

  async update(id: string, data: UpdateLojaDto): Promise<Loja> {
    try {
      const response = await api.patch<LojaResponse>(`/lojas/${id}`, data);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao atualizar loja");
      }

      return response.data.data;
    } catch (error) {
      throw new Error("Não foi possível atualizar a loja");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await api.delete(`/lojas/${id}`);

      if (!response.data || !response.data.success) {
        throw new Error("Falha ao deletar loja");
      }
    } catch (error) {
      throw new Error("Não foi possível deletar a loja");
    }
  }
}

export const lojasService = new LojasService();
