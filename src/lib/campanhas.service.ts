import { api } from "@/config/axios.config";
import type { Campanha } from "@/types/campanha";

interface CampanhasResponse {
  success: boolean;
  message: string;
  data: Campanha[];
}

class CampanhasService {
  async getAtivasPorFornecedor(fornecedorId: string): Promise<Campanha[]> {
    try {
      const response = await api.get<CampanhasResponse>("/campanhas/status/ativo");
      const campanhas = response.data.data;
      return campanhas.filter((c) => c.fornecedor_id === fornecedorId);
    } catch (error) {
      console.error("Erro ao buscar campanhas:", error);
      return [];
    }
  }

  async verificarCampanhaAplicavel(fornecedorId: string, valor: number, quantidade: number): Promise<Campanha | null> {
    const campanhas = await this.getAtivasPorFornecedor(fornecedorId);

    let melhorCampanha: Campanha | null = null;
    let maiorDesconto = 0;

    for (const campanha of campanhas) {
      const atendeValor = campanha.valor_min === 0 || campanha.valor_min === null || valor >= campanha.valor_min;
      const atendeQuantidade = campanha.quantidade_min === 0 || campanha.quantidade_min === null || quantidade >= campanha.quantidade_min;

      if (atendeValor && atendeQuantidade) {
        const desconto = (valor * campanha.desconto_porcentagem) / 100;
        if (desconto > maiorDesconto) {
          maiorDesconto = desconto;
          melhorCampanha = campanha;
        }
      }
    }

    return melhorCampanha;
  }

  async getMelhorCampanhaPorFornecedor(fornecedorId: string): Promise<Campanha | null> {
    const campanhas = await this.getAtivasPorFornecedor(fornecedorId);
    
    if (campanhas.length === 0) {
      return null;
    }

    let melhorCampanha = campanhas[0];
    for (const campanha of campanhas) {
      if (campanha.desconto_porcentagem > melhorCampanha.desconto_porcentagem) {
        melhorCampanha = campanha;
      }
    }

    return melhorCampanha;
  }
}

export const campanhasService = new CampanhasService();
