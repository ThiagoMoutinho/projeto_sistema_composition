<template>
  <v-app>
    <v-app-bar color="blue">
      <v-card-title>FORMULÁRIO DE ACESSO AO SISTEMA</v-card-title>
    </v-app-bar>
    <default-bar />
    
    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>
