<template>
  <q-page>
    <h1>Opções de Pagamento</h1>
    <div>
      <h2>Total a pagar: R$ {{ total.toFixed(2) }}</h2>
      <ul>
        <li v-for="complemento in complementos" :key="complemento.id">
          {{ complemento.nome }} - R$ {{ complemento.preco.toFixed(2) }}
        </li>
      </ul>
      <div>
        <h2>Escolha a forma de pagamento</h2>
        <button @click="pagar('credito')" :disabled="pagando">
          Cartão de Crédito
        </button>
        <button @click="pagar('debito')" :disabled="pagando">
          Cartão de Débito
        </button>
        <button @click="pagar('pix')" :disabled="pagando">Pix</button>
      </div>
      <div v-if="mensagem" class="mensagem">{{ mensagem }}</div>
    </div>
  </q-page>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    complementos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pagando: false,
      mensagem: "",
    };
  },
  methods: {
    pagar(metodo) {
      this.pagando = true;
      this.mensagem = `Processando pagamento com ${metodo}...`;

      // Simulação de um processo de pagamento
      setTimeout(() => {
        this.pagando = false;
        this.mensagem = `Pagamento com ${metodo} realizado com sucesso!`;
        console.log(`Pagamento com ${metodo} selecionado`);
      }, 2000);
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

button {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
}

.mensagem {
  margin-top: 20px;
  font-size: 18px;
  color: green;
}
</style>
