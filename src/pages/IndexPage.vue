<template>
  <div>
    <q-dialog v-model="mostrarMensagemLogin">
      <q-card>
        <q-card-section>
          <div class="text-h6">Atenção</div>
          <div>É necessário fazer login antes de acessar os produtos.</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="irParaLogin" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Conteúdo da página aqui -->
    <ListaProdutos
      :produtos="arrProdutos"
      @comprar="onComprar"
      @detalhes="onDetalhes"
      @retirar="onRetirar"
      :botoes="['comprar', '0']"
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
import { useAuthStore } from "src/stores/auth";

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
      mostrarMensagemLogin: false,
    };
  },
  created() {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
      this.mostrarMensagemLogin = true;
    } else {
      this.carregarProdutos();
    }
  },
  methods: {
    irParaLogin() {
      this.mostrarMensagemLogin = false;
      this.$router.push("/login");
    },
    async carregarProdutos() {
      try {
        const response = await axios.get("http://localhost:3000/produtos");
        this.arrProdutos = response.data;
      } catch (error) {
        console.error("Erro ao carregar:", error);
      }
    },
    async onComprar(produto) {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        this.produtoSelecionado = produto;
        this.mostrandoComplementos = true;
      } else {
        this.$q.notify({
          color: "negative",
          message: "Você precisa estar logado para comprar.",
          position: "top",
        });
      }
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
  },
});
</script>

<style scoped>
/* Estilos específicos para esta página, se necessário */
</style>
