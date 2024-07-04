// src/stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    cliente: null,
  }),
  actions: {
    login(cliente) {
      this.isAuthenticated = true;
      this.cliente = cliente;
    },
    logout() {
      this.isAuthenticated = false;
      this.cliente = null;
    },
  },
});
