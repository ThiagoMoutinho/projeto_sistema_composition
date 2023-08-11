import { defineStore } from 'pinia';

export const useUsuarioStore = defineStore("formularioGeral", {
  state: () => ({
    form: {},
    tela: {},
  })
})