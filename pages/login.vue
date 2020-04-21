<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Acessar</v-toolbar-title>
          </v-toolbar>
          <v-form v-model="isValid" @submit.prevent="userLogin">
            <v-card-text>
              <v-text-field
                v-model="credentials.username"
                :rules="usernameRules"
                label="Usuário"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                required
              />

              <v-text-field
                id="password"
                v-model="credentials.password"
                :rules="passwordRules"
                label="Senha"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="primary" :disabled="!isValid">
                Login
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'public',
  middleware({ store, redirect }) {
    if (!store.state.subDomain) {
      return redirect('/')
    }
  },
  data() {
    return {
      isValid: false,
      credentials: {},
      usernameRules: [(v) => !!v || 'Usuário obrigatório'],
      passwordRules: [(v) => !!v || 'Senha obrigatória']
    }
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth
          .loginWith('local', {
            data: this.credentials
          })
          .then(() => this.$toast.success('Bem vindo!'))
      } catch (err) {
        let msgErrors = ''
        for (const prop in err.response.data) {
          if (prop === 'non_field_errors') {
            msgErrors += err.response.data[prop]
          }
        }
        if (msgErrors === '') {
          msgErrors = err
        }
        this.$toast.error(msgErrors)
      }
    }
  }
}
</script>
