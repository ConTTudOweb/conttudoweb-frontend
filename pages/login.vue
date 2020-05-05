<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4" xl="3">
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
                placeholder="nome@email.com"
                name="login"
                prepend-inner-icon="mdi-account"
                type="text"
                required
                outlined
                rounded
              />

              <v-text-field
                id="password"
                v-model="credentials.password"
                :rules="passwordRules"
                label="Senha"
                placeholder="****"
                name="password"
                prepend-inner-icon="mdi-lock"
                type="password"
                required
                outlined
                rounded
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
        <breakpoint />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breakpoint from '~/components/application/Breakpoint'

export default {
  layout: 'empty',
  components: {
    Breakpoint
  },
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
      } catch (error) {
        this.$toast.error(error)
      }
    }
  },
  head() {
    return {
      title: 'Login'
    }
  }
}
</script>
