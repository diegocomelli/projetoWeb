<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: blueviolet">
      <q-toolbar style="background-color: blueviolet">
        <q-btn dense color="grey" round icon="shopping_cart" class="q-ml-md">
          <q-badge color="red" floating>{{ cart.length }}</q-badge>
        </q-btn>
        <q-space />
        <LoginPage />
        <CadastroCompletoPage
          @efetuarCadastro="salvarCadastro"
          class="q-ml-sm"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png "
          width="35"
          height="35"
          class="q-ml-md"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import cartStore from "src/stores/cartStore";
import CadastroCompletoPage from "src/components/CadastroCompletoPage.vue";
import LoginPage from "src/components/LoginPage.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    CadastroCompletoPage,
    LoginPage,
  },
  methods: {
    async salvarCadastro(dadosCadastro) {
      try {
        const response = await axios.post(
          "http://localhost:3000/clientes",
          dadosCadastro
        );
        console.log("Cadastro efetuado com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao salvar cadastro:", error);
      }
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      cart: cartStore.carrinho,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      mostrarFormulario: false, // Adicione esta variável para o botão "Efetuar Cadastro"
    };
  },
});
</script>

<style scoped>
.btn-efetuar-cadastro {
  margin-left: 20px; /* Ajuste a margem conforme necessário */
}
</style>
