<template>
  <div>
    <q-btn @click="mostrarFormulario = true" label="Efetuar Cadastro" />
    <q-dialog v-model="mostrarFormulario">
      <q-card>
        <q-card-section>
          <q-input v-model="nome" label="Nome" />
          <q-input v-model="cpf" label="CPF" />
          <q-input v-model="endereco" label="Endereço" />
          <q-input v-model="telefone" label="Telefone" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="verificarCPF" label="Verificar CPF" color="primary" />
          <q-btn
            @click="efetuarCadastro"
            label="Salvar"
            color="primary"
            :disable="!cpfValido || cpfExistente"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "CadastroCompletoPage",
  data() {
    return {
      nome: "",
      cpf: "",
      endereco: "",
      telefone: "",
      mostrarFormulario: false,
      cpfExistente: false,
      cpfValido: false,
    };
  },
  methods: {
    validarCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g, "");
      if (cpf.length !== 11) return false;

      let soma;
      let resto;
      soma = 0;
      if (cpf === "00000000000") return false;

      for (let i = 1; i <= 9; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(9, 10))) return false;

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(10, 11))) return false;

      return true;
    },
    async verificarCPF() {
      try {
        const response = await axios.get(
          "http://localhost:3000/clientes?cpf=" + this.cpf
        );
        if (response.data.length > 0) {
          this.cpfExistente = true;
          this.cpfValido = false; // Desabilita o botão de salvar se o CPF já existe
          this.$q.notify({
            color: "negative",
            message: "CPF já cadastrado. Por favor, utilize outro CPF.",
            position: "top",
          });
        } else {
          this.cpfExistente = false;
          this.cpfValido = true; // Habilita o botão de salvar se o CPF for válido
          this.$q.notify({
            color: "positive",
            message: "CPF disponível para cadastro.",
            position: "top",
          });
        }
      } catch (error) {
        console.error("Erro ao verificar CPF:", error);
        this.$q.notify({
          color: "negative",
          message: "Erro ao verificar CPF. Por favor, tente novamente.",
          position: "top",
        });
      }
    },
    async efetuarCadastro() {
      if (!this.validarCPF(this.cpf)) {
        this.$q.notify({
          color: "negative",
          message: "CPF inválido. Por favor, digite um CPF válido.",
          position: "top",
        });
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/clientes", {
          nome: this.nome,
          cpf: this.cpf,
          endereco: this.endereco,
          telefone: this.telefone,
          login: {
            usuario: this.cpf,
            senha: this.telefone,
          },
        });

        this.$q.notify({
          color: "positive",
          message: "Cadastro efetuado com sucesso!!!",
          position: "top",
        });

        this.nome = "";
        this.cpf = "";
        this.endereco = "";
        this.telefone = "";
        this.mostrarFormulario = false;
        this.cpfValido = false; // Desabilita o botão de salvar após o cadastro
      } catch (error) {
        console.error("Erro ao efetuar cadastro:", error);
        this.$q.notify({
          color: "negative",
          message: "Erro ao efetuar cadastro. Por favor, tente novamente.",
          position: "top",
        });
      }
    },
  },
});
</script>

<style scoped>
/* Estilos específicos do componente */
</style>
