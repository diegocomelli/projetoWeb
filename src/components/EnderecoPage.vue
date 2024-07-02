<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Endereço Atual</div>
        <p>{{ endereco }}</p>
        <q-btn
          @click="editarEndereco"
          label="Editar Endereço"
          color="primary"
        />
        <q-btn
          @click="continuarComprando"
          label="Continuar Comprando"
          color="secondary"
        />
      </q-card-section>
    </q-card>

    <q-dialog v-model="mostrarDialogo">
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Endereço</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="novoEndereco" label="Novo Endereço" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn @click="salvarEndereco" label="Salvar" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "EnderecoPage",
  data() {
    return {
      endereco: "",
      novoEndereco: "",
      mostrarDialogo: false,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `http://localhost:3000/clientes/${this.$route.params.clienteId}`
      );
      this.endereco = response.data.endereco;
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      this.$q.notify({
        color: "negative",
        message: "Erro ao buscar endereço. Por favor, tente novamente.",
        position: "top",
      });
    }
  },
  methods: {
    editarEndereco() {
      this.novoEndereco = this.endereco;
      this.mostrarDialogo = true;
    },
    async salvarEndereco() {
      try {
        await axios.patch(
          `http://localhost:3000/clientes/${this.$route.params.clienteId}`,
          {
            endereco: this.novoEndereco,
          }
        );
        this.endereco = this.novoEndereco;
        this.mostrarDialogo = false;
        this.$q.notify({
          color: "positive",
          message: "Endereço atualizado com sucesso!",
          position: "top",
        });
      } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        this.$q.notify({
          color: "negative",
          message: "Erro ao atualizar endereço. Por favor, tente novamente.",
          position: "top",
        });
      }
    },
    continuarComprando() {
      this.$router.push("/");
    },
  },
});
</script>

<style scoped>
/* Estilos específicos para o componente de endereço */
</style>
