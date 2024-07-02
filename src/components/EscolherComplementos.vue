<template>
  <q-page class="container">
    <h1 class="page-title">Escolha os complementos para montar o açaí</h1>
    <div>
      <h2 class="section-title">Frutas</h2>
      <div class="complemento-item" v-for="fruta in frutas" :key="fruta.id">
        <input
          type="checkbox"
          :id="'fruta-' + fruta.id"
          v-model="fruta.selected"
        />
        <label :for="'fruta-' + fruta.id"
          >{{ fruta.nome }} - R$ {{ fruta.preco.toFixed(2) }}</label
        >
        <div class="buttons">
          <button
            @click="adicionarComplemento('fruta', fruta)"
            :disabled="!fruta.selected"
            class="acao-button"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
    <div>
      <h2 class="section-title">Adicionais</h2>
      <div
        class="complemento-item"
        v-for="adicional in adicionais"
        :key="adicional.id"
      >
        <input
          type="checkbox"
          :id="'adicional-' + adicional.id"
          v-model="adicional.selected"
        />
        <label :for="'adicional-' + adicional.id"
          >{{ adicional.nome }} - R$ {{ adicional.preco.toFixed(2) }}</label
        >
        <div class="buttons">
          <button
            @click="adicionarComplemento('adicional', adicional)"
            :disabled="!adicional.selected"
            class="acao-button"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
    <div>
      <h2 class="section-title">Itens Selecionados</h2>
      <ul>
        <li v-if="produtoSelecionado.id" class="selected-item">
          <span>{{ produtoSelecionado.nome }}</span> - R$
          {{ produtoSelecionado.preco.toFixed(2) }}
        </li>
        <li v-for="item in selectedItems" :key="item.id" class="selected-item">
          <span>{{ item.nome }}</span> - R$ {{ item.preco.toFixed(2) }}
          <button @click="removerComplemento(item)" class="acao-button">
            Remover
          </button>
        </li>
      </ul>
      <div v-if="totalPagar > 0" class="total-pagar">
        <p>Total a pagar: R$ {{ totalPagar.toFixed(2) }}</p>
      </div>
    </div>
    <button
      class="adicionar-carrinho-button"
      @click="adicionarAoCarrinho"
      :disabled="!hasSelectedItems"
    >
      Adicionar ao Carrinho
    </button>
  </q-page>
</template>

<script>
import { ref } from "vue";
import cartStore from "src/stores/cartStore";
import { useRouter } from "vue-router";

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
        { id: 4, nome: "Granola", preco: 1.0, selected: false },
        { id: 5, nome: "Leite em pó", preco: 0.5, selected: false },
        { id: 6, nome: "Nutella", preco: 2.0, selected: false },
      ],
      totalPagar: this.totalProduto,
      selectedItems: [],
    };
  },
  computed: {
    hasSelectedItems() {
      return this.selectedItems.length > 0;
    },
  },
  methods: {
    adicionarAoCarrinho() {
      const itensSelecionados = [];

      // Adiciona o produto principal (selecionado) ao carrinho
      if (this.produtoSelecionado.id) {
        itensSelecionados.push({
          id: this.produtoSelecionado.id,
          nome: this.produtoSelecionado.nome,
          preco: this.produtoSelecionado.preco,
        });
        cartStore.addProduto(this.produtoSelecionado, 1);
      }

      // Adiciona os complementos selecionados ao carrinho
      this.selectedItems.forEach((item) => {
        itensSelecionados.push({
          id: item.id,
          nome: item.nome,
          preco: item.preco,
        });
        cartStore.addProduto(item, 1);
      });

      // Limpa os complementos selecionados
      this.frutas.forEach((fruta) => {
        fruta.selected = false;
      });
      this.adicionais.forEach((adicional) => {
        adicional.selected = false;
      });

      // Redireciona para a página inicial (home)
      this.$router.push("/");
    },
    adicionarComplemento(tipo, complemento) {
      if (complemento.selected) {
        this.totalPagar += complemento.preco;
        this.selectedItems.push(complemento);
      }
    },
    removerComplemento(complemento) {
      const index = this.selectedItems.findIndex(
        (item) => item.id === complemento.id
      );
      if (index !== -1) {
        this.totalPagar -= complemento.preco;
        this.selectedItems.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.page-title {
  font-size: 24px;
  margin-bottom: -10px;
  text-align: center;
  color: #333;
}

.section-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: #555;
}

.complemento-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.complemento-item label {
  margin-right: 10px;
  flex: 1;
  font-weight: bold;
}

.complemento-item .buttons {
  display: flex;
}

.acao-button {
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.acao-button:first-child {
  margin-right: 10px;
}

.acao-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.acao-button:not(:disabled) {
  background-color: #4caf50;
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

.selected-item {
  margin-bottom: 5px;
  font-size: 16px;
}

.total-pagar {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #4caf50;
}

.adicionar-carrinho-button {
  display: block;
  width: 100%;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.adicionar-carrinho-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
