<template>
  <div>
    <!-- Conteúdo do carrinho de compras -->
    <h2>Carrinho de Compras</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.nome }} - {{ item.quantidade }}
      </li>
    </ul>
    <button @click="finalizarCompra">Finalizar Compra</button>
  </div>
</template>

<script>
export default {
  name: "CarrinhoDeCompras",

  data() {
    return {
      items: [
        { id: 1, nome: "Produto A", quantidade: 2 },
        { id: 2, nome: "Produto B", quantidade: 1 },
      ],
    };
  },

  methods: {
    finalizarCompra() {
      // Lógica para finalizar a compra
      this.$router.push("/opcoes-pagamento"); // Redireciona para a página de opções de pagamento
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do componente */
</style>
