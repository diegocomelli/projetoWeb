<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <!-- Remova o título padrão "Quasar App" -->
        <!-- <q-toolbar-title> Quasar App </q-toolbar-title> -->

        <!-- Adicione o botão "Efetuar Cadastro" -->
        
        <!-- Adicione um botão de carrinho de compras -->
        <q-btn dense color="purple" round icon="shopping_cart" class="q-ml-md">
          <q-badge color="red" floating>{{ cart.length }}</q-badge>
        </q-btn>
        <CadastroCompletoPage @efetuarCadastro="salvarCadastro" class="q-ml-sm" />

        <q-space />
        
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


export default defineComponent({
  name: "MainLayout",
  components:{
    CadastroCompletoPage
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
