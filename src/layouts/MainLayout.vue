<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: blueviolet">
      <q-toolbar style="background-color: blueviolet">
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
        <LoginPage />
        <CadastroCompletoPage
          @efetuarCadastro="salvarCadastro"
          class="q-ml-sm"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          width="35"
          height="35"
          class="q-ml-md"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Modal do Carrinho de Compras -->
    <q-dialog v-model="mostrarCarrinho" persistent>
      <q-card>
        <q-card-section>
          <h4 class="text-h6">Carrinho de Compras</h4>
          <q-separator />
          <q-list>
            <q-item v-for="(item, index) in cart" :key="index">
              <q-item-section>{{ item.produto.nome }}</q-item-section>
              <q-item-section side right>
                R$ {{ (item.produto.preco * item.qtd).toFixed(2) }}
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator />
          <div class="q-mt-md q-gutter-sm">
            <q-item>
              <q-item-section>Total a Pagar:</q-item-section>
              <q-item-section side right>
                R$ {{ totalCarrinho.toFixed(2) }}
              </q-item-section>
            </q-item>
          </div>
          <q-card-actions align="right">
            <q-btn
              label="Fechar"
              color="primary"
              @click="mostrarCarrinho = false"
            />
            <q-btn
              label="Finalizar Compra"
              color="primary"
              @click="irParaOpcoesPagamento"
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
import cartStore from "src/stores/cartStore";
import CadastroCompletoPage from "src/components/CadastroCompletoPage.vue";
import LoginPage from "src/components/LoginPage.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    CadastroCompletoPage,
    LoginPage,
  },
  setup() {
    const mostrarCarrinho = ref(false);

    const cart = cartStore.carrinho;

    const totalCarrinho = computed(() => {
      return cart.reduce((total, item) => {
        return total + item.produto.preco * item.qtd;
      }, 0);
    });

    async function salvarCadastro(dadosCadastro) {
      try {
        const response = await axios.post(
          "http://localhost:3000/clientes",
          dadosCadastro
        );
        console.log("Cadastro efetuado com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao salvar cadastro:", error);
      }
    }

    function irParaOpcoesPagamento() {
      // Implemente a navegação para a página de opções de pagamento aqui
      console.log("Navegar para opções de pagamento");
    }

    return {
      cart,
      mostrarCarrinho,
      salvarCadastro,
      totalCarrinho,
      irParaOpcoesPagamento,
    };
  },
});
</script>

<style scoped>
/* Estilos específicos do componente */
</style>
