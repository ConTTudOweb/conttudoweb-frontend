<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4" xl="3">
        <v-card
          class="px-5 py-3 v-card--material v-sheet theme--light v-card--material--has-heading"
        >
          <div class="d-flex grow flex-wrap">
            <div
              class="v-card--material__heading mb-n6 v-sheet theme--dark elevation-6 primary pa-7"
              style="width: 100%;"
            >
              <div class="text-center">
                <h1 class="display-2 font-weight-bold mb-2">Login</h1>
              </div>
            </div>
          </div>

          <!--<v-toolbar dark flat>-->
          <!--  <v-toolbar-title>Acessar</v-toolbar-title>-->
          <!--</v-toolbar>-->
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
                autofocus
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
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                required
                outlined
                rounded
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
                color="success"
                :disabled="!isValid"
                :loading="loading"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <!--<breakpoint />-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Breakpoint from '~/components/application/Breakpoint'

export default {
  layout: 'empty',
  auth: 'guest',
  // components: {
  //   Breakpoint
  // },
  middleware({ store, redirect }) {
    if (!store.state.subDomain) {
      return redirect('/')
    }
  },
  data() {
    return {
      showPassword: false,
      isValid: false,
      loading: false,
      credentials: {},
      usernameRules: [(v) => !!v || 'Usuário obrigatório'],
      passwordRules: [(v) => !!v || 'Senha obrigatória']
    }
  },
  created() {
    if (this.$store.state.subDomain === 'demo') {
      this.credentials = {
        username: 'admin@admin.com',
        password: 'adminadmin'
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        this.loading = true
        await this.$auth
          .loginWith('local', {
            data: this.credentials
          })
          .then(() => this.$toast.success('Bem vindo!'))
        this.loading = false
      } catch (error) {
        console.error(error)
        this.$toast.error(error.message)
        this.loading = false
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
