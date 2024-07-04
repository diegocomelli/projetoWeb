<template>
  <q-card
    :class="['cardProduto', { 'card-produto-desabilitado': !isAuthenticated }]"
  >
    <h5>{{ produto.nome }}</h5>
    <q-card-section>
      <q-card-subtitle>R$ {{ produto.preco.toFixed(2) }}</q-card-subtitle>
    </q-card-section>
    <q-card-section v-if="comImagem">
      <q-img
        :src="produto.imagem"
        :alt="produto.nome"
        style="width: 100%; height: 300px; object-fit: cover"
      />
    </q-card-section>
    <q-card-actions class="btnCompra">
      <q-btn
        label="Comprar"
        color="primary"
        @click="comprar"
        v-if="botoes.includes('comprar')"
        :disable="!isAuthenticated"
      />
      <q-btn
        label="Retirar"
        color="primary"
        @click="retirar"
        v-if="botoes.includes('retirar')"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { useAuthStore } from "src/stores/auth";

export default {
  name: "CardProduto", // nome do componente
  props: {
    // atributos recebidos pelo componente
    produto: {
      type: Object,
      required: true,
    },
    comImagem: {
      type: Boolean,
      required: false,
      default: false,
    },
    botoes: {
      type: Array,
      required: false,
      default: () => ["comprar", "retirar"],
    },
  },
  components: {}, // componentes utilizados pelo componente
  emits: ["comprar", "retirar"], // eventos emitidos pelo componente
  data() {
    return {};
  },
  computed: {
    // propriedades computadas do componente
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuthenticated;
    },
  },
  methods: {
    // métodos do componente
    comprar() {
      this.$emit("comprar", this.produto);
    },
    retirar() {
      this.$emit("retirar", this.produto);
    },
  },
};
</script>

<style scoped>
.cardProduto {
  width: 50rem;
  min-width: 300px;
  margin: 10px;
  padding: 10px;
  text-align: center;
}
.cardProduto:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: aquamarine;
}
.card-produto-desabilitado {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
