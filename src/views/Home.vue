<template>
  <CadastroLayout @ao-salvar="salvar">
    <template #titulo>
      Dados Profissionais
    </template>
        <v-form>
          <v-col>
            <h3 class="my-5">Tipo de Usuario</h3>

            <v-radio-group v-model="form.tipoUsuario" inline>
              <v-radio
                label="Policia Civil"
                value= 1
              ></v-radio>
              <v-radio
                label="Orgão"
                value= 2
              ></v-radio>
            </v-radio-group>
          </v-col>
  
          <v-container class="fill-height" v-if="form.tipoUsuario">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined" label="Nome do Usuário*" v-model="form.nome"
                  required></v-text-field>
              </v-col>
  
              <v-col cols="12" md="6">
                <v-text-field variant="outlined" label="Órgão*" v-model="form.orgao" required></v-text-field>
              </v-col>
  
              <v-col cols="12" md="6" v-if="form.tipoUsuario == 1">
                <v-text-field variant="outlined" label="Matrícula*" v-model="form.matricula" required></v-text-field>
              </v-col>
  
              <v-col cols="12" md="6" v-if="form.tipoUsuario == 2">
                <v-text-field variant="outlined" label="Carteira Funcional*" v-model="form.carteiraFuncional" required></v-text-field>
              </v-col>
  
              <v-col cols="12" md="6">
  
                <v-select
                  @change="pegarDadosCargo"
                  label="Cargo"
                  placeholder="Cargo"
                  variant="outlined"
                  ensity="comfortable"
                  v-model="form.cargo"
                  :items="listarCargos"
                  item-title="nome"
                  item-value="id"
                  >
                </v-select>
              </v-col>
  
              <v-col cols="12" md="6" v-if="form.tipoUsuario == 1">
  
                <v-select
                  label="Unidade"
                  placeholder="Unidade"
                  variant="outlined"
                  ensity="comfortable"
                  v-model="form.unidade"
                  :items="listaUnidades"
                  item-title="nome"
                  item-value="id"
                  >
                </v-select>
              </v-col>
            </v-row>
          </v-container>
  
          <v-card-title>Qual o sistema deseja ter acesso</v-card-title>
          <v-divider class="ma-2 my-1"></v-divider>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  @update:modelValue="carregarDadosSistema"
                  placeholder="Sistema"
                  variant="outlined"
                  ensity="comfortable"
                  v-model="form.sistema"
                  :items="listarSistemas"
                  item-title="nome"
                  item-value="id"
                >
                </v-select>
                <v-btn
                  color="#3498DB" 
                  @click="carregarDadosSistema"
                >
                  PESQUISAR
                </v-btn>
              </v-col>
            
            
            <v-col cols="12" md="6">
              <v-card
              v-if="form.sistema"
              class="mx-auto"
              color="#3498DB"
              theme="dark"
              max-width="400"
              title="Detalhes do item Selecionado"
              >
              <v-card-text >
                <p class="my-1">Sistema: {{ dadosSistema.nome }}</p>
                <p class="my-1">Responsável pelo acesso: {{ dadosSistema.nome_responsavel }}</p>
                <p class="my-1">Unidade Responsável: {{ dadosSistema.unidade_responsavel_id }}</p>
                <p class="my-1">Telefone: {{ dadosSistema.telefone_responsavel }}</p>
                <p class="my-1">E-mail: {{ dadosSistema.email_responsavel }}</p>
                <p>Descrição: {{ dadosSistema.descricao }}</p>
  
              </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
  
          <v-container>
            <v-card>
              <v-sheet class="d-flex mb-6">
                <v-sheet class="ma-2 pa-2 me-auto">
                  Endereço
                </v-sheet>
  
                <v-tooltip text="Adicionar" location="top">
                  <template #activator="{ props }">
                    <v-sheet class="ma-2 pa-2">
                      <v-btn v-bind="props" class="ml-7" fab color="primary accent-2" icon="mdi-plus"
                        @click="dialog = !dialog">
                      </v-btn>
                    </v-sheet>
                  </template>
                </v-tooltip>
              </v-sheet>
              <v-dialog persistent v-model="dialog" max-width="950px">
                <v-card>
                  <v-card-title class="ma-3">
                    Adicionar Endereço
                  </v-card-title>
                  <v-divider class="ma-2"></v-divider>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field density="comfortable" variant="outlined" label="CEP"
                          append-inner-icon="mdi-list-box-outline" 
                          v-model="cep"
                          minlength="8" 
                          maxlength="8" 
                          required
                          >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-btn v-if="tela.buscar" color="primary" @click="buscarEndereco">
                          Buscar
                        </v-btn>
                      </v-col>
                    </v-row>
                    <div v-if="endereco">
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-label>Logradoutro</v-label>
                          <v-text-field density="comfortable" variant="outlined" v-model="endereco.logradouro"
                            append-inner-icon="mdi-list-box-outline"
                            >
                            
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-label>Bairro</v-label>
                          <v-text-field density="comfortable" variant="outlined" v-model="endereco.bairro"
                            append-inner-icon="mdi-list-box-outline">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-label>Complemento</v-label>
                          <v-text-field v-model="endereco.complemento" density="comfortable" variant="outlined" clearable
                            clear-icon="mdi-close-circle">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-label>Cidade</v-label>
                          <v-text-field density="comfortable" variant="outlined" v-model="endereco.localidade"
                            append-inner-icon="mdi-list-box-outline">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-label>Estado</v-label>
                          <v-text-field density="comfortable" variant="outlined" v-model="endereco.uf"
                            append-inner-icon="mdi-list-box-outline">
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                    <div v-else-if="erro">
                      <p>{{ erro }}</p>
                    </div>
                    <div v-else>
                      <p>Insira um CEP válido para buscar o endereço.</p>
                    </div>
                  </v-card-text>
                  <v-card-actions class="ma-2">
                    <v-spacer />
                    <v-btn height="48" variant="tonal" flat @click="cancelar()">
                      Cancelar
                    </v-btn>
                    <v-btn :loading="loading" height="48" color="primary" variant="tonal" v-if="form.acao === 'Cadastrar'"
                      @click="adicionarEndereco()">
                      Salvar
                    </v-btn>
                    <v-btn :loading="loading" height="48" size="large" variant="tonal" flat color="primary"
                      v-if="form.acao === 'Editar'" @click="atualizarEndereco">
                      Atualização
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
  
              <v-table 
              fixed-header 
              v-if="tela.mostrarTabela"
              >
                <thead>
                  <tr>
                    <th class="text-left">
                      CEP
                    </th>
                    <th class="text-center">
                      Logradouro
                    </th>
                    <th class="text-center">
                      Bairro
                    </th>
                    <th class="text-center">
                      Cidade
                    </th>
                    <th class="text-center">
                      Estado
                    </th>
                    <th class="text-rigth">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, indice) in form.endereco" :key="indice" class="ma-2 pa-2">
                    <td class="text-left">
                      {{ item.cep }}
                    </td>
                    <td class="text-center">
                      {{ item.logradouro }}
                    </td>
                    <td class="text-center">
                      {{ item.bairro }}
                    </td>
                    <td class="text-center">
                      {{ item.localidade }}
                    </td>
                    <td class="text-center">
                      {{ item.uf }}
                    </td>
                    <td class="text-rigth">
                      <v-tooltip text="Editar" location="top">
                        <template #activator="{ props }">
                          <v-icon v-bind="props" size="small" color="grey" class="me-2" @click="editarEndereco(indice)">
                            mdi-pencil
                          </v-icon>
                        </template>
                      </v-tooltip>
                      &nbsp;
                      <v-tooltip text="Deletar" location="top">
                        <template #activator="{ props }">
                          <v-icon v-bind="props" size="small" color="red" @click="deleteItem(indice)">
                            mdi-delete
                          </v-icon>
                        </template>
                      </v-tooltip>
                    </td>
                  </tr>
                </tbody>
              </v-table>
  
              <v-dialog persistent v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">
                    Deseja realmente excluir o usuario?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue-darken-1" variant="text" @click="fecharModalDelete">
                      CANCELAR
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm()">
                      OK
                    </v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
            
            <template>
              <v-btn #botoesFormulario
                type="submit"
                to="/visualizacao"
                class="mt-8"
                color="#3498DB"
                >
                  SALVAR
                </v-btn>
            </template>
          </v-container>
        </v-form>
      
    
  </CadastroLayout>
</template>

<script>
import http from '@/services/http.js';
import axios from 'axios';
import CadastroLayout from "@/layouts/default/CadastroLayout.vue"
import { useUsuarioStore } from '@/stores/store';

export default {
  name: "FormularioSistemas",
  components: {
    CadastroLayout
  },

  data() {
    return {
      useUsuarioStore: useUsuarioStore(),
      visualizar:false,
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      endereco: null,
      cidade: '',
      localidade: '',
      estado: '',
      erro: null,
      deletarEsteNumero: "",
      dialog: false,
      loading: false,
      listaUnidades: [],
      listarCargos: [],
      listarSistemas: [],
      dadosSistema: [],
      dialogDelete: false,
      form: {
        acao: 'Cadastrar',
        id: "",
        indice: "",
        nome: '',
        orgao: "",
        matricula: "",
        carteiraFuncional: "",
        cargo: "",
        endereco: [],
        sistema: '',
        tipoUsuario: '',
        unidade: '',
      },
      
      tela: {
        listarCargos: '',
        mostrarEndereco: false,
        mostrarTabela: false,
        buscar: true

      },
    }
  },
  

  mounted() {
    this.loadUnidade();
    this.carregarCargos();
    this.carregarSistemas();
  },

  methods: {

    salvar() {
      this.useUsuarioStore.form = this.form
      this.$router.push("/formulario");
    },


    loadUnidade() {
      axios.get('https://homologacao.policiacivil.pa.gov.br/teste-thiago/public/api/unidades')
        .then(response => {
          this.listaUnidades = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar os nomes da API:', error);
        });
    },

    carregarCargos() {
      axios.get(`https://homologacao.policiacivil.pa.gov.br/teste-thiago/public/api/cargos/`)
      .then(response => {
        this.listarCargos = response.data;
      })
      .catch(error => {
        console.log('Erro ao buscar os nomes da API:', error);
      });
    },

    carregarSistemas() {
      axios.get('https://homologacao.policiacivil.pa.gov.br/teste-thiago/public/api/sistemas')
      .then(response => {
        this.listarSistemas = response.data;
      }) 
      .catch(error => {
        console.error('Erro ao buscar os nomes da API:', error);
      })
    },

    carregarDadosSistema() {
      console.log('Entrou', this.form.sistema);
      axios.get(`https://homologacao.policiacivil.pa.gov.br/teste-thiago/public/api/sistemas/${this.form.sistema}`)
      .then(response => {
        this.dadosSistema = response.data;
      })
      .catch(error => {
        console.error('Erro ao buscar os nomes da API:', error);
      })
    },

    buscarEndereco() {
      const cepNumerico = this.cep.replace(/\D/g, '');
      
      if (cepNumerico.length !== 8) {
        this.endereco = null;
        this.erro = "CEP inválido. Verifique se possui 8 dígitos.";
        return;
      }

      http.get(`${cepNumerico}/json/`)
        .then(response => {
          this.endereco = response.data;
          this.erro = null;
        })
        .catch(error => {
          console.error(error);
          this.endereco = null;
          this.erro = "CEP não encontrado ou inválido.";
        });
    },

    load() {
      this.loading = true
      setTimeout(() => (this.loading = false), 500)
    },

    limparCampos() {
      this.cep = '',
      this.endereco.logradouro = '',
      this.endereco.complemento = '',
      this.endereco.bairro = '',
      this.endereco.endereco = '',
      this.endereco.localidade = '',
      this.endereco.uf = ''
    },

    adicionarEndereco() {
      if(this.cep) {
        this.form.endereco.push({
          cep: this.endereco.cep,
          logradouro: this.endereco.logradouro,
          complemento: this.endereco.complemento,
          bairro: this.endereco.bairro,
          endereco: this.endereco.endereco,
          localidade: this.endereco.localidade,
          uf: this.endereco.uf

        })
      }
      this.tela.mostrarUsuario = true
      this.limparCampos()
      this.load()
      this.tela.buscar = true
      this.tela.mostrarTabela = true
    },

    cancelar() {
      if (this.dialog) {
        this.dialog = false
      } 


      this.error = false
      this.limparCampos()
      this.tela.buscar = true
      this.form.acao = "Cadastrar"
    },

    editarEndereco(indice) {
      this.endereco.indice = indice

      const enderecoSelecionado = this.form.endereco[indice]

      this.cep = enderecoSelecionado.cep
      this.endereco.logradouro = enderecoSelecionado.logradouro
      this.endereco.complemento = enderecoSelecionado.complemento
      this.endereco.bairro = enderecoSelecionado.bairro
      this.endereco.endereco = enderecoSelecionado.endereco
      this.endereco.localidade = enderecoSelecionado.localidade,
      this.endereco.uf = enderecoSelecionado.uf,

      this.dialog = true
      this.tela.buscar = false
      
      this.form.acao = "Editar"

      // this.dialog = false;
    },

    atualizarEndereco() {
      const enderecoAtual = this.endereco;
      const indice = enderecoAtual.indice;

      this.form.endereco[indice].cep = enderecoAtual.cep;
      this.form.endereco[indice].logradouro = enderecoAtual.logradouro;
      this.form.endereco[indice].complemento = enderecoAtual.complemento;
      this.form.endereco[indice].bairro = enderecoAtual.bairro;
      this.form.endereco[indice].endereco = enderecoAtual.endereco;
      this.form.endereco[indice].localidade = enderecoAtual.localidade;
      this.form.endereco[indice].uf = enderecoAtual.uf;

      this.dialog = false
      this.form.acao = "Cadastrar"

      this.load()
      this.limparCampos();
      this.tela.buscar = true
    },

    fecharModalDelete() {
      this.dialogDelete = false
    },

    deleteItem(indice) {
      this.dialogDelete = true
      this.deletarEsteNumero = indice
    },

    deleteItemConfirm() {
      this.form.endereco.splice(this.deletarEsteNumero, 1)
      this.fecharModalDelete()
      if (this.form.endereco == !this.form.endereco) {
        this.tela.mostrarTabela = false
      }
    }
  }
}

</script>
