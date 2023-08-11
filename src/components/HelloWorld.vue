<template>
  <v-container class="fill-height">
    <v-container fluid>
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
                label="Profissão"
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
                  color="black accent-2"
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
                    v-if="form.acao == 'Cadastrar'"
                    @click="adicionarUsuario()"
                  >
                    Salvar
                  </v-btn>
                  <v-btn
                    size="large"
                    flat
                    color="primary"
                    v-if="form.acao == 'Editar'"
                    @click="atualizarUsuario"
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
                    Complemento
                  </th>
                  <th>
                    Lotação
                  </th>
                  <th class="text-rigth">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in form.listarEndereco"
                  :key="i"
                  class="ma-2 pa-2"
                >
                  <td class="text-left">
                    {{ item.cep }}
                  </td>
                  <td>
                    {{ item.endereco }}
                  </td>
                  <td>
                    {{ item.bairro }}
                  </td>
                  <td>
                    {{ item.complemento }}
                  </td>
                  <td>
                    {{ item.lotacao }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-container>
  </v-container>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        dialog: false,
        loading: false,
        form: {
          acao: 'Cadastrar',
          nome: '',
          cep: '',
          endereco: '',
          bairro: '',
          complemento: '',
          lotacao: '',
          listarEndereco: [],
        },

        tela: {
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
          setTimeout(() => (this.loading = false), 3000)
      },

      adicionarEndereco(){
        if(this.form.cep) {
          this.form.listarEndereco.push({
            cep: this.form.cep,
            endereco: this.form.endereco,
            bairro: this.form.bairro,
            complemento: this.complemento,
            lotacao: this.lotacao,
            
          })
          this.tela.mostrarEndereco = true
          this.tela.mostrarTabela = true

        }
      },

      cancelar() {
        if (this.dialog) {
            this.dialog = false
            this.tela.mostrarTabela = false
        } else {
          this.limparCampos();
          this.dialog = false
        }
        this.form.acao = "Cadastrar"
        this.form.cep = ""
        this.form.endereco = ""
        this.form.bairro = ""
        this.form.complemento = ""
        this.form.lotacao = ""
      },
    },
  }
  
</script>

