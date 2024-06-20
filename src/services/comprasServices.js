import axios from "axios";

const jsonAPI = axios.create({
  baseURL: process.env.URL,
});

const comprasServices = {
  gravarCompra: (compra, callback) => {
    jsonAPI
      .post("compras", compra)
      .then((retorno) => {
        callback(retorno.data);
      })
      .catch((erro) => {
        console.error("Erro ao gravar compra:", erro.message);
        // Aqui você pode adicionar uma notificação ou tratamento de erro
      });
  },
};

export default comprasServices;
