<template>
  <div>
    <q-input v-model="cpf" label="CPF" />
    <q-input v-model="telefone" label="Telefone" type="password" />
    <q-btn @click="fazerLogin" label="Login" color="primary" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      cpf: "",
      telefone: "",
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
/* Estilos específicos para o componente de login */
</style>
