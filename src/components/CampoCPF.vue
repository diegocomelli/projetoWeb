<template>
  <div class="cpf-input">
    <label for="cpf">CPF:</label>
    <q-input
      id="cpf"
      v-model="cpf"
      type="text"
      placeholder="Digite seu CPF"
      outlined
    />
    <q-btn color="primary" @click="onCadastrarCPF">Cadastrar CPF</q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cpf: "",
    };
  },
  methods: {
    onCadastrarCPF() {
      this.$emit("cadastrar", this.cpf);
    },
  },
};
</script>

<style scoped>
.cpf-input {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.cpf-input label {
  margin-right: 10px;
}
</style>
