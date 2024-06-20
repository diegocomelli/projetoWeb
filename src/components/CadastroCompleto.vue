<template>
  <div>
    <q-input v-model="nome" label="Nome" />
    <q-input v-model="cpf" label="CPF" />
    <q-input v-model="endereco" label="Endereço" />
    <q-input v-model="telefone" label="Telefone" />
    <q-btn @click="efetuarCadastro" label="Efetuar Cadastro" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CadastroCompleto",
  data() {
    return {
      nome: "",
      cpf: "",
      endereco: "",
      telefone: "",
    };
  },
  methods: {
    efetuarCadastro() {
      const dadosCadastro = {
        nome: this.nome,
        cpf: this.cpf,
        endereco: this.endereco,
        telefone: this.telefone,
      };
      this.$emit("efetuarCadastro", dadosCadastro);
    },
  },
});
</script>
