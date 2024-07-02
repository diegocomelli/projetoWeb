<template>
  <q-page class="opcoes-pagamento">
    <div class="container">
      <h1>Opções de Pagamento</h1>
      <div class="resumo">
        <h2>Total a pagar: R$ {{ total.toFixed(2) }}</h2>
        <ul>
          <li v-for="complemento in complementos" :key="complemento.id">
            {{ complemento.nome }} - R$ {{ complemento.preco.toFixed(2) }}
          </li>
        </ul>
      </div>
      <div class="botoes-pagamento">
        <h2>Efetuar Pagamento</h2>
        <button
          @click="pagar('credito')"
          :disabled="pagando"
          class="botao-credito"
        >
          Cartão de Crédito
        </button>
        <button
          @click="pagar('debito')"
          :disabled="pagando"
          class="botao-debito"
        >
          Cartão de Débito
        </button>
        <button @click="gerarQrCodePIX()" :disabled="pagando" class="botao-pix">
          PIX
        </button>
      </div>
      <div v-if="mensagem" class="mensagem">{{ mensagem }}</div>
      <div v-if="mostrarFormCartao" class="formulario-cartao">
        <h3>Insira os dados do cartão:</h3>
        <!-- Formulário de dados do cartão -->
        <form @submit.prevent="processarPagamentoCartao">
          <label>Número do Cartão:</label>
          <input
            type="text"
            v-model="dadosCartao.numero"
            placeholder="XXXX - XXXX - XXXX - XXXX"
            required
            @input="formatarNumeroCartao"
          />
          <span v-if="!cartaoValido.numero" class="erro-validacao"
            >Número de cartão inválido.</span
          >
          <label>Nome do Titular:</label>
          <input type="text" v-model="dadosCartao.nomeTitular" required />
          <label>Vencimento:</label>
          <input
            type="text"
            v-model="dadosCartao.vencimento"
            placeholder="MM/AA"
            required
          />
          <label>CVV:</label>
          <input
            type="text"
            v-model="dadosCartao.cvv"
            placeholder="XXX"
            required
          />
          <button
            type="submit"
            :disabled="!cartaoValido.todosCampos || processandoPagamentoCartao"
          >
            Pagar
          </button>
        </form>
      </div>
      <div v-if="mostrarQrCodePIX" class="qrcode-pix">
        <h3>QR Code para PIX:</h3>
        <img :src="qrCodePIX" alt="QR Code PIX" />
        <p>Chave PIX: {{ chavePIX }}</p>
      </div>
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
      mostrarFormCartao: false,
      dadosCartao: {
        numero: "",
        nomeTitular: "",
        vencimento: "",
        cvv: "",
      },
      processandoPagamentoCartao: false,
      mostrarQrCodePIX: false,
      qrCodePIX: "",
      chavePIX: "",
      cartaoValido: {
        numero: false,
        todosCampos: false,
      },
    };
  },
  methods: {
    pagar(metodo) {
      this.pagando = true;
      this.mensagem = `Processando pagamento com ${metodo}...`;
      if (metodo === "credito" || metodo === "debito") {
        this.mostrarFormCartao = true;
        this.mostrarQrCodePIX = false;
      } else if (metodo === "pix") {
        this.mostrarQrCodePIX = true;
        this.mostrarFormCartao = false;
        // Exemplo de geração de QR Code e chave PIX
        this.qrCodePIX =
          "https://api.qrserver.com/v1/create-qr-code/?data=chavePIX";
        this.chavePIX = "acaifood@gmail.com";
      }
      setTimeout(() => {
        this.pagando = false;
        this.mensagem = `Pagamento com ${metodo} realizado com sucesso!`;
        console.log(`Pagamento com ${metodo} selecionado`);
      }, 2000);
    },
    processarPagamentoCartao() {
      this.processandoPagamentoCartao = true;
      // Lógica para enviar dados do cartão ao backend e processar o pagamento
      setTimeout(() => {
        this.processandoPagamentoCartao = false;
        this.mensagem =
          "Pagamento com cartão de crédito realizado com sucesso!";
        console.log("Dados do cartão:", this.dadosCartao);
      }, 2000);
    },
    gerarQrCodePIX() {
      // Lógica para gerar o QR Code e exibir a chave PIX
      this.mostrarQrCodePIX = true;
      this.mostrarFormCartao = false;
      // Exemplo de geração de QR Code e chave PIX
      this.qrCodePIX =
        "https://api.qrserver.com/v1/create-qr-code/?data=chavePIX";
      this.chavePIX = "chavePIX";
    },
    formatarNumeroCartao() {
      // Formatar número do cartão com traços a cada 4 dígitos
      let numCartao = this.dadosCartao.numero.replace(/\D/g, "");
      numCartao = numCartao.replace(/(\d{4})(?=\d)/g, "$1 - ");
      this.dadosCartao.numero = numCartao.trim();
      this.validarNumeroCartao();
    },
    validarNumeroCartao() {
      // Simples validação de número de cartão (número de dígitos)
      const numCartao = this.dadosCartao.numero.replace(/\D/g, "");
      this.cartaoValido.numero = numCartao.length === 16;
      this.validarTodosCampos();
    },
    validarTodosCampos() {
      // Validar se todos os campos obrigatórios estão preenchidos
      const { numero, nomeTitular, vencimento, cvv } = this.dadosCartao;
      this.cartaoValido.todosCampos =
        numero && nomeTitular && vencimento && cvv;
    },
  },
};
</script>

<style scoped>
.opcoes-pagamento {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.container {
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

h2 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #666;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

li {
  margin-bottom: 5px;
}

.botoes-pagamento {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
}

.botao-credito {
  background-color: #007bff;
}

.botao-debito {
  background-color: #28a745;
}

.botao-pix {
  background-color: #ffc107;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.mensagem {
  margin-top: 20px;
  font-size: 18px;
  color: green;
}

.formulario-cartao {
  margin-top: 20px;
}

.formulario-cartao form {
  display: flex;
  flex-direction: column;
}

.formulario-cartao label {
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
}

.formulario-cartao input {
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.erro-validacao {
  color: red;
  font-size: 14px;
}

.qrcode-pix {
  margin-top: 20px;
  text-align: center;
}

.qrcode-pix img {
  max-width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.qrcode-pix p {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}
</style>
