<template>
  <v-container class="fill-height">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                variant="outlined"
                label="Nome do Usuario"
                density="comfortable"
                v-model="form.nome"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                variant="outlined"
                label="Órgão"
                density="comfortable"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                variant="outlined"
                label="Matricula"
                density="comfortable"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                variant="outlined"
                label="Carteira Funcional"
                density="comfortable"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-combobox
                variant="outlined"
                label="Cargo"
                density="comfortable"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              ></v-combobox>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-combobox
                variant="outlined"
                label="Unidade"
                density="comfortable"
                :items="['Desenvolvedor', 'Programado']"
              ></v-combobox>
            </v-col>
          </v-row>

        </v-container>
        
        <v-card-title>Qual o sistema deseja ter acesso</v-card-title>
        <v-divider class="ma-2 my-1"></v-divider>
        <v-container>
          <v-col
            cols="12"
            md="6"
          >
            <v-combobox
              variant="outlined"
              label="Selecione um Sistema"
              :items="['Dime', 'Cooperação', 'Zeus']"
              density="comfortable"
            ></v-combobox>
          </v-col>
        </v-container>
        
        <v-container>
          <v-card>
            <v-sheet class="d-flex mb-6">
              <v-sheet class="ma-2 pa-2 me-auto">
                Endereço
              </v-sheet>

              <v-tooltip
                text="Adicionar"
                location="top"
              >
              <template #activator="{ props }">
                <v-sheet class="ma-2 pa-2">
                  <v-btn
                  v-bind="props"
                  class="ml-7"
                  fab
                  color="primary accent-2"
                  icon="mdi-plus"
                  @click="dialog = !dialog"
                  >
                  </v-btn>
                </v-sheet>
              </template>  
              </v-tooltip>
            </v-sheet>
            <v-dialog
              persistent
              v-model="dialog"
              max-width="950px"
            >
              <v-card>
                <v-card-title class="ma-3">
                  Adicionar Endereço
                </v-card-title>
                <v-divider class="ma-2"></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        density="comfortable"
                        variant="outlined"
                        label="CEP"
                        append-inner-icon="mdi-list-box-outline"
                        v-model="form.cep"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        density="comfortable"
                        variant="outlined"
                        label="Endereço"
                        append-inner-icon="mdi-list-box-outline"
                        v-model="form.endereco"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        density="comfortable"
                        variant="outlined"
                        label="Bairro"
                        append-inner-icon="mdi-list-box-outline"
                        v-model="form.bairro"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                    >
                        <v-text-field
                          v-model="form.complemento"
                          density="comfortable"
                          variant="outlined"
                          clearable
                          clear-icon="mdi-close-circle"
                          label="Complemento"
                        ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                    <v-select
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                        v-model="form.lotacao"
                        density="comfortable"
                        variant="outlined"
                        label="Lotação*"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions class="ma-2">
                  <v-spacer />
                  <v-btn
                    height="48"
                    variant="tonal"
                    flat
                    @click="cancelar()"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    :loading="loading"
                    height="48"
                    color="primary"
                    variant="tonal"
                    v-if="form.acao === 'Cadastrar'"
                    @click="adicionarEndereco()"
                  >
                    Salvar
                  </v-btn>
                  <v-btn
                    :loading="loading"
                    height="48"
                    size="large"
                    variant="tonal"
                    flat
                    color="primary"
                    v-if="form.acao === 'Editar'"
                    @click="atualizarEndereco"
                  >
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
                    Endereço
                  </th>
                  <th class="text-center">
                    Bairro
                  </th>
                  <th class="text-center">
                    Lotação
                  </th>
                  <th class="text-rigth">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, indice) in form.listarEndereco"
                  :key="indice"
                  class="ma-2 pa-2"
                >
                  <td class="text-left">
                    {{ item.cep }}
                  </td>
                  <td class="text-center">
                    {{ item.endereco }}
                  </td>
                  <td class="text-center">
                    {{ item.bairro }}
                  </td>
                  <td class="text-center">
                    {{ item.lotacao }}
                  </td>
                  <td class="text-rigth">
                    <v-tooltip 
                      text="Editar" 
                      location="top"
                    >
                    <template #activator="{ props }">
                      <v-icon
                        v-bind="props"
                        size="small"
                        color="grey"
                        class="me-2"
                        @click="editarEndereco(indice)"
                      >
                        mdi-pencil
                      </v-icon>
                    </template>
                    </v-tooltip>
                    &nbsp;
                    <v-tooltip text="Deletar" location="top">
                      <template #activator="{ props }">
                        <v-icon
                          v-bind="props"
                          size="small"
                          color="red"
                          @click="deleteItem(indice)"
                        >
                          mdi-delete
                        </v-icon>
                      </template>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </v-table>
            
            <v-dialog
              persistent
              v-model="dialogDelete"
              max-width="500px"
            >
              <v-card>
                <v-card-title class="text-h5">
                  Deseja realmente excluir o usuario?
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="fecharModalDelete"
                  >
                    CANCELAR
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="deleteItemConfirm()"
                  >
                    OK
                  </v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-card>
        </v-container>
</template>

<script>
  export default {
    name: "PoliciaCivil",
    data() {
      return {
        deletarEsteNumero: "",
        dialog: false,
        loading: false,
        dialogDelete:false,
        form: {
          id: "",
          indice: "",
          acao: 'Cadastrar',
          nome: '',
          cep: "",
          endereco: "",
          bairro: '',
          complemento: '',
          lotacao: '',
          listarEndereco: [],
        },

        tela: {
          esconderRadio: false,
          mostrarEndereco: false,
          mostrarTabela: false,
          tipoUsuario: 
          [
            {
              nome: 'Policia Civil',
              valor: 1
            },

            {
              nome: 'Orgão Externo',
              valor: 2
            }
          ],
        }
      }
    },

    methods: {
      load() {
        this.loading = true
          setTimeout(() => (this.loading = false), 300)
      },

      limparCampos() {
        this.form.cep = ""
        this.form.endereco = ""
        this.form.bairro = ""
        this.form.complemento = ""
        this.form.lotacao = ""
      },

      adicionarEndereco(){
        if(this.form.cep) {
          this.form.listarEndereco.push({
            cep: this.form.cep,
            endereco: this.form.endereco,
            bairro: this.form.bairro,
            complemento: this.form.complemento,
            lotacao: this.form.lotacao,
            
          })
          this.tela.mostrarEndereco = true
          this.tela.mostrarTabela = true
          
        }
        this.load()
        this.limparCampos()
      },

      cancelar() {
        if (this.dialog) {
            this.dialog = false
        } else {
          this.limparCampos();
          this.dialog = false
        }
        this.limparCampos() 
        this.form.acao = "Cadastrar"
      },

      editarEndereco(indice) {
        this.indice = indice
        this.form.cep = this.form.listarEndereco[indice].cep
        this.form.endereco = this.form.listarEndereco[indice].endereco
        this.form.bairro = this.form.listarEndereco[indice].bairro
        this.form.complemento = this.form.listarEndereco[indice].complemento
        this.form.lotacao = this.form.listarEndereco[indice].lotacao
        
        this.dialog = true
        this.form.acao = "Editar"

        // this.dialog = false;
      },

      atualizarEndereco() {
        this.form.listarEndereco[this.indice].cep = this.form.cep
        this.form.listarEndereco[this.indice].endereco = this.form.endereco
        this.form.listarEndereco[this.indice].bairro = this.form.bairro
        this.form.listarEndereco[this.indice].complemento = this.form.complemento
        this.form.listarEndereco[this.indice].lotacao = this.form.lotacao

        this.dialog = false
        this.form.acao = "Cadastrar"

        this.limparCampos();
      },

      fecharModalDelete() {
        this.dialogDelete = false
      },

      deleteItem(indice) {
        this.dialogDelete = true
        this.deletarEsteNumero = indice
      },

      deleteItemConfirm() {
        this.form.listarEndereco.splice(this.deletarEsteNumero, 1)
        this.fecharModalDelete()
        if(this.form.listarEndereco == !this.form.listarEndereco) {
          this.tela.mostrarTabela = false
        }
      }


    },
  }
  
</script>

