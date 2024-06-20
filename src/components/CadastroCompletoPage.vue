<template>
  <div>
    <q-btn
      @click="mostrarFormulario = true"
      label="Efetuar Cadastro"
    />
    <q-dialog v-model="mostrarFormulario">
      <q-card>
        <q-card-section>
          <q-input v-model="nome" label="Nome" />
          <q-input v-model="cpf" label="CPF" />
          <q-input v-model="endereco" label="Endereço" />
          <q-input v-model="telefone" label="Telefone" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="efetuarCadastro" label="Salvar" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CadastroCompletoPage",
  data() {
    return {
      nome: "",
      cpf: "",
      endereco: "",
      telefone: "",
      mostrarFormulario: false,
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
      this.mostrarFormulario = false; // Fecha o formulário após o cadastro ser efetuado

      // Exibe notificação de sucesso após efetuar o cadastro
      this.$q.notify({
        color: "positive",
        message: "Cadastro efetuado com sucesso!",
        position: "top",
      });
    },
  },
});
</script>

<style scoped>
.absolute-top-left {
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
}
</style>
