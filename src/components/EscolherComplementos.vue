<template>
  <q-page>
    <h1>Escolha os complementos para montar o açaí</h1>
    <div>
      <h2>Frutas</h2>
      <div class="complemento-item" v-for="fruta in frutas" :key="fruta.id">
        <input type="checkbox" :id="fruta.id" v-model="fruta.selected" />
        <label :for="fruta.id"
          >{{ fruta.nome }} - R$ {{ fruta.preco.toFixed(2) }}</label
        >
        <button
          @click="adicionarComplemento('fruta', fruta)"
          :disabled="!fruta.selected"
        >
          Adicionar
        </button>
        <button
          @click="removerComplemento('fruta', fruta)"
          :disabled="!fruta.selected"
        >
          Remover
        </button>
      </div>
    </div>
    <div>
      <h2>Adicionais</h2>
      <div
        class="complemento-item"
        v-for="adicional in adicionais"
        :key="adicional.id"
      >
        <input
          type="checkbox"
          :id="adicional.id"
          v-model="adicional.selected"
        />
        <label :for="adicional.id"
          >{{ adicional.nome }} - R$ {{ adicional.preco.toFixed(2) }}</label
        >
        <button
          @click="adicionarComplemento('adicional', adicional)"
          :disabled="!adicional.selected"
        >
          Adicionar
        </button>
        <button
          @click="removerComplemento('adicional', adicional)"
          :disabled="!adicional.selected"
        >
          Remover
        </button>
      </div>
    </div>
    <div>
      <h2>Itens Selecionados</h2>
      <ul>
        <li>
          {{ produtoSelecionado.nome }} - R$
          {{ produtoSelecionado.preco.toFixed(2) }}
        </li>
        <li v-for="item in selectedItems" :key="item.id">
          {{ item.nome }} - R$ {{ item.preco.toFixed(2) }}
        </li>
      </ul>
      <div v-if="totalPagar > 0">
        <p>Total a pagar: R$ {{ totalPagar.toFixed(2) }}</p>
      </div>
    </div>
    <button
      class="finalizar-button"
      @click="finalizarCompra"
      :disabled="
        !frutas.some((f) => f.selected) && !adicionais.some((a) => a.selected)
      "
    >
      Finalizar Compra
    </button>
  </q-page>
</template>

<script>
export default {
  props: {
    produtoSelecionado: {
      type: Object,
      required: true,
    },
    totalProduto: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      frutas: [
        { id: 1, nome: "Morango", preco: 2.5, selected: false },
        { id: 2, nome: "Banana", preco: 1.8, selected: false },
        { id: 3, nome: "Kiwi", preco: 3.0, selected: false },
      ],
      adicionais: [
        { id: 1, nome: "Granola", preco: 1.0, selected: false },
        { id: 2, nome: "Leite em pó", preco: 0.5, selected: false },
        { id: 3, nome: "Nutella", preco: 2.0, selected: false },
      ],
      totalPagar: this.totalProduto,
      selectedItems: [],
    };
  },
  methods: {
    finalizarCompra() {
      const complementos = this.selectedItems.map((item) => ({
        id: item.id,
        nome: item.nome,
        preco: item.preco,
      }));

      this.$router.push({
        name: "OpcoesPagamento",
        query: {
          total: this.totalPagar,
          complementos: JSON.stringify(complementos),
        },
      });
    },
    adicionarComplemento(tipo, complemento) {
      this.totalPagar += complemento.preco;
      this.selectedItems.push(complemento);
    },
    removerComplemento(tipo, complemento) {
      this.totalPagar -= complemento.preco;
      const index = this.selectedItems.findIndex(
        (item) => item.id === complemento.id
      );
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #555;
}

.complemento-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.complemento-item label {
  margin-right: 10px;
  flex: 1;
}

.complemento-item button {
  margin-right: 10px;
  padding: 5px 10px;
  font-size: 14px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  font-size: 16px;
}

.finalizar-button {
  display: block;
  width: 100%;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

.finalizar-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
