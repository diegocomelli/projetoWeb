<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: blueviolet">
      <q-toolbar style="background-color: blueviolet">
        <!-- Botão do carrinho -->
        <q-btn
          dense
          color="grey"
          round
          icon="shopping_cart"
          class="q-ml-md"
          @click="mostrarCarrinho = true"
        >
          <q-badge color="red" floating>{{ cart.length }}</q-badge>
        </q-btn>
        <q-space />
        <!-- Componentes de login e cadastro -->
        <LoginPage />
        <CadastroCompletoPage
          @efetuarCadastro="salvarCadastro"
          class="q-ml-sm"
        />
        <!-- Ícone ou logo -->
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          width="35"
          height="35"
          class="q-ml-md"
        />
      </q-toolbar>
    </q-header>

    <!-- Container para as páginas -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Modal do Carrinho de Compras -->
    <q-dialog v-model="mostrarCarrinho" persistent>
      <q-card>
        <q-card-section>
          <h4 class="text-h6">Carrinho de Compras</h4>
          <q-separator />

          <!-- Lista de itens no carrinho -->
          <q-list>
            <q-item v-for="(item, index) in cart" :key="index">
              <q-item-section>{{ item.produto.nome }}</q-item-section>
              <q-item-section side right>
                R$ {{ (item.produto.preco * item.qtd).toFixed(2) }}
              </q-item-section>
            </q-item>
          </q-list>

          <q-separator />

          <!-- Total do carrinho -->
          <div class="q-mt-md q-gutter-sm">
            <q-item>
              <q-item-section>Total a Pagar:</q-item-section>
              <q-item-section side right>
                R$ {{ totalCarrinho.toFixed(2) }}
              </q-item-section>
            </q-item>
          </div>

          <!-- Botões no rodapé do modal -->
          <q-card-actions align="right">
            <!-- Botão para continuar comprando (navegar para a home) -->
            <q-btn
              label="Continuar Comprando"
              color="primary"
              @click="continuarComprando"
            />

            <!-- Botão para finalizar compra -->
            <q-btn
              label="Finalizar Compra"
              color="primary"
              @click="finalizarCompra"
              :disabled="totalCarrinho === 0"
            />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import cartStore from "../stores/cartStore";
import LoginPage from "../components/LoginPage.vue";
import CadastroCompletoPage from "../components/CadastroCompletoPage.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    LoginPage,
    CadastroCompletoPage,
  },
  setup() {
    // Variável reativa para controlar a visibilidade do modal de carrinho
    const mostrarCarrinho = ref(false);

    // Acesso à store do carrinho
    const cart = cartStore.carrinho;

    // Cálculo do total do carrinho usando computed
    const totalCarrinho = computed(() => {
      return cart.reduce((total, item) => {
        return total + item.produto.preco * item.qtd;
      }, 0);
    });

    // Hook do Vue Router para navegação
    const router = useRouter();

    // Método para continuar comprando (navegar para a home)
    function continuarComprando() {
      // Redirecionar para a página inicial (home)
      router.push("/");
      // Fechar o modal de carrinho após redirecionar
      mostrarCarrinho.value = false;
    }

    // Método para finalizar a compra e redirecionar para OpcoesPagamento.vue
    function finalizarCompra() {
      const itensCarrinho = cart.map((item) => {
        return {
          id: item.produto.id,
          nome: item.produto.nome,
          preco: item.produto.preco * item.qtd,
        };
      });

      // Redirecionar para a página de Opções de Pagamento
      router.push({
        name: "OpcoesPagamento",
        query: {
          total: totalCarrinho.value.toFixed(2),
          complementos: JSON.stringify(itensCarrinho),
        },
      });

      // Fechar o modal de carrinho após redirecionar
      mostrarCarrinho.value = false;
    }

    // Função para salvar o cadastro do cliente
    async function salvarCadastro(dadosCadastro) {
      try {
        // Implemente a lógica para salvar o cadastro usando axios ou método adequado
        console.log("Salvar cadastro do cliente:", dadosCadastro);
      } catch (error) {
        console.error("Erro ao salvar cadastro:", error);
      }
    }

    return {
      cart,
      mostrarCarrinho,
      totalCarrinho,
      continuarComprando,
      finalizarCompra,
      salvarCadastro,
    };
  },
});
</script>

<style scoped>
/* Estilos específicos do componente */
</style>
