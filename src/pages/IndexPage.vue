<template>
  <div>
    <!-- Conteúdo da página aqui -->
    <ListaProdutos
      :produtos="arrProdutos"
      @comprar="onComprar"
      @detalhes="onDetalhes"
      @retirar="onRetirar"
      :botoes="['Ola mundo', 'comprar']"
    />
    <EscolherComplementos
      v-if="mostrandoComplementos"
      :produtoSelecionado="produtoSelecionado"
      :totalProduto="produtoSelecionado.preco"
      @comprarComComplementos="comprarComComplementos"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

import ListaProdutos from "src/components/ListaProdutos.vue";
import EscolherComplementos from "src/components/EscolherComplementos.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    ListaProdutos,
    EscolherComplementos,
  },
  data() {
    return {
      arrProdutos: [],
      mostrandoComplementos: false,
      produtoSelecionado: null,
    };
  },
  created() {
    this.carregarProdutos();
  },
  methods: {
    async carregarProdutos() {
      try {
        const response = await axios.get("http://localhost:3000/produtos");
        this.arrProdutos = response.data;
      } catch (error) {
        console.error("Erro ao carregar:", error);
      }
    },
    async onComprar(produto) {
      this.produtoSelecionado = produto;
      this.mostrandoComplementos = true;
      // Lógica de adicionar produto ao carrinho
    },
    async onDetalhes(produto) {
      // Lógica para mostrar detalhes do produto
    },
    async onRetirar(produto) {
      // Lógica para retirar produto do carrinho
    },
    async comprarComComplementos(complementos) {
      console.log("Complementos selecionados:", complementos);
      // Lógica para finalizar a compra com os complementos selecionados
    },
    async salvarCadastro(dadosCadastro) {
      try {
        const response = await axios.post(
          "http://localhost:3000/clientes",
          dadosCadastro
        );
        console.log("Cadastro efetuado com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao salvar:", error);
      }
    },
  },
});
</script>

<style scoped>
/* Estilos específicos para esta página, se necessário */
</style>
