<template>
    <div class="v-container">
      <v-card>
        <v-card-title>
          <slot name="titulo">
            {{ props.titulo }}
          </slot>
        </v-card-title>
        <v-divider class="my-1 mx-2" />
  
        <v-form
          ref="formRef"
          @submit.prevent="salvar"
        >
          <div class="v-container v-container--fluid">
            <slot />
          </div>
          <v-divider class="my-1 mx-2" />
          <v-card-text>
            <slot name="botoesFormulario" />
  
            <div v-if="!haBotoesNoFormulario()">
              <v-btn
                color="#3498DB"
                type="submit"
              >
                Salvar
              </v-btn>
            </div>
          </v-card-text>
        </v-form>
      </v-card>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, useSlots } from "vue"
  import { VForm } from "vuetify/components"
  
  const props = defineProps({
    titulo: {
      type: String,
      default: "Título do formulário"
    }
  })
  const formRef = ref<VForm>()
  const emits = defineEmits(["ao-salvar"])
  const slots = useSlots()
  
  /*
    Métodos
   */
  const salvar = async () => {
    const validacao = await formRef.value?.validate()
    if (validacao?.valid) {
      emits("ao-salvar")
    }
  }
  
  const haBotoesNoFormulario = () => {
    return slots.botoesFormulario !== undefined
  }
  </script>

<style scoped>
.espaco-entre-botoes-formulario button {
  /*margin: 4px; !* 4px equivale ao ma-1 segundo a documentação do vuetify 3 "CSS spacing-helpers" *!*/
  margin-right: 4px;
}
</style>
  
  