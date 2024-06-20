import axios from "axios";
import { Notify } from "quasar";

const jsonAPI = axios.create({
  baseURL: process.env.URL,
});

const produtosServices = {
  getProdutos: (callback) => {
    jsonAPI
      .get("produtos")
      .then((retorno) => {
        callback(retorno.data);
      })
      .catch((erro) => {
        Notify.create({
          message: erro.message,
          color: "negative",
          position: "bottom",
          timeout: 3000,
        });
      });
  },

  addCliente: (cpf, callback) => {
    // Verificar se o CPF já está cadastrado
    jsonAPI
      .get(`clientes?cpf=${cpf}`)
      .then((retorno) => {
        if (retorno.data.length > 0) {
          Notify.create({
            message: "CPF já cadastrado!",
            color: "negative",
            position: "bottom",
            timeout: 3000,
          });
        } else {
          // Se não estiver cadastrado, adicionar o CPF
          jsonAPI
            .post("clientes", { cpf })
            .then((retorno) => {
              callback(retorno.data);
            })
            .catch((erro) => {
              Notify.create({
                message: erro.message,
                color: "negative",
                position: "bottom",
                timeout: 3000,
              });
            });
        }
      })
      .catch((erro) => {
        Notify.create({
          message: erro.message,
          color: "negative",
          position: "bottom",
          timeout: 3000,
        });
      });
  },
};

export default produtosServices;
