<template>
  <q-btn @click="mostrarFormulario = true" label="Login" />
  <q-dialog v-model="mostrarFormulario">
    <q-card>
      <q-card-section>
        <q-input v-model="cpf" label="CPF" />
        <q-input v-model="telefone" label="Telefone" type="password" />
        <q-btn @click="fazerLogin" label="Login" color="primary" class="btn" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { useAuthStore } from "src/stores/auth";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      cpf: "",
      telefone: "",
      mostrarFormulario: false,
    };
  },
  methods: {
    async fazerLogin() {
      try {
        const response = await axios.get(
          `http://localhost:3000/clientes?cpf=${this.cpf}&telefone=${this.telefone}`
        );

        if (response.data.length > 0) {
          const cliente = response.data[0];
          if (cliente.cpf === this.cpf && cliente.telefone === this.telefone) {
            this.$q.notify({
              color: "positive",
              message: "Login efetuado com sucesso!",
              position: "top",
            });

            const authStore = useAuthStore();
            authStore.login(cliente);

            this.$router.push(`/endereco/${cliente.id}`);
          } else {
            this.$q.notify({
              color: "negative",
              message: "CPF ou telefone incorretos. Tente novamente.",
              position: "top",
            });
          }
        } else {
          this.$q.notify({
            color: "negative",
            message: "CPF ou telefone incorretos. Tente novamente.",
            position: "top",
          });
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        this.$q.notify({
          color: "negative",
          message: "Erro ao fazer login. Por favor, tente novamente.",
          position: "top",
        });
      }
    },
  },
});
</script>

<style scoped>
.btn {
  margin-top: 20px;
  width: 100%;
}
</style>
