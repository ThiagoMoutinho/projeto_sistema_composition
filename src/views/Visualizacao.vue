<template>
  <CadastroLayout @ao-salvar="voltar">
    <template #titulo>
      Confirmação de Acesso
    </template>

    <v-col class="ml-1">
      <v-row>
        <v-col cols="12" md="12">
          <strong>Tipo de Usuario</strong>
          <p>{{ descTipoUsuario }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <strong>Nome</strong>
          <p>{{ form.nome }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <strong>Orgão</strong>
          <p>{{ form.orgao }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <strong>Matricula</strong>
          <p>{{ form.matricula }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <strong>Cargo</strong>
          <p>{{ nomeCargo }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <strong>Unidade</strong>
          <p>{{ nomeUnidade }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <strong>Qual foi o sistema Selecionado para ter acesso</strong>
          <p>{{ nomeSistema }}</p>    
          <v-container>
            </v-container>
          </v-col>
          <v-card 
            width="500"
            title="Detalhes do item Selecionado"
            color="#ECF0F1"
          >
            <v-card-text>
              <p class="ma-1">Sistema: {{ dadosSistemas.nome }}</p>
              <p class="ma-1">Responsavel: {{ dadosSistemas.nome_responsavel }}</p>
              <p class="ma-1">Unidade Responsável: {{ dadosSistemas.unidade_responsavel_id}}</p>
              <p class="ma-1">Telefone: {{ dadosSistemas.telefone_responsavel}}</p>
              <p class="ma-1">Email: {{ dadosSistemas.email_responsavel }}</p>
              <p class="ma-1">Descrição: {{ dadosSistemas.descricao }}</p>
            </v-card-text>
          </v-card>
      </v-row>
    </v-col>
    <v-row>
      <v-card-text>
        <v-card-title>
          Endereço Informado
        </v-card-title>

        <v-table>
          <thead>
            <tr>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in form.endereco" :key="item.id">
              <td>{{ item.cep }}</td>
              <td>{{ item.logradouro }}</td>
              <td>{{ item.bairro }}</td>
              <td>{{ item.localidade }}</td>
              <td>{{ item.uf }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-row>

    <template #botoesFormulario>
      <v-btn
        class="mr-4"
        color="grey"
        @click="voltar"
      >
        Voltar
      </v-btn>

      <v-btn color="primary">
        Salvar
      </v-btn>
    </template>
  </CadastroLayout>
</template>

<script setup>
import CadastroLayout from '@/layouts/default/CadastroLayout.vue';
import { ref, onMounted } from "vue"
import { useUsuarioStore } from '@/stores/store';
import { useRouter } from "vue-router";
import axios from 'axios';


const { form } = useUsuarioStore()

const router = useRouter();

const nomeUnidade = ref('');

const nomeCargo = ref('');

const nomeSistema = ref('');

const dadosSistemas = ref('');



const descTipoUsuario = ref('');




descTipoUsuario.value = (form.tipoUsuario == 1) ? 'POLICIA CIVIL' : 'ORGAO EXTERNO';


const getUnidade = () => {

  axios.get(`https://homologacao.policiacivil.pa.gov.br/teste-thiago/public/api/unidades/${form.unidade}`)
    .then(response => {
      nomeUnidade.value = response.data.nome;
    }) 
    .catch(error => {
      console.error('Erro ao buscar os nomes da API:', error);
    })
}

const getCargo = () => {

  axios.get(`https://homologacao.policiacivil.pa.gov.br/teste-thiago/public/api/cargos/${form.cargo}`)
  .then(response => {
    nomeCargo.value = response.data.nome;
  })

  .catch(error => {
    console.log('Erro ao buscar os nomes da API:', error)
  })
}

const getSistema = () => {
  axios.get(`https://homologacao.policiacivil.pa.gov.br/teste-thiago/public/api/sistemas/${form.sistema}`)
  .then(response => {
    nomeSistema.value = response.data.nome;
  })

}



const getDadosDoSistema = () => {
  console.log(dadosSistemas)
  axios.get(`https://homologacao.policiacivil.pa.gov.br/teste-thiago/public/api/sistemas/${form.sistema}`)
    .then(response => {
      dadosSistemas.value = response.data
    })
}

const voltar = () => {
  router.push('/')
}






onMounted(() => {
  getUnidade()
  getCargo()
  getSistema()
  getDadosDoSistema()
})

  // === end methods
</script>