<template>
    Teste Maria de Souza Silva Santos
              
  </template>
  
  <script>
    export default {
      name: "OrgaoExterno",
      data() {
        return {
          form: {
            
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
            setTimeout(() => (this.loading = false), 3000)
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
          this.limparCampos() 
          this.form.acao = "Cadastrar"
        },
      },
    }
    
  </script>
  
  