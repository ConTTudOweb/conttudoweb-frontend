<template>
  <!--suppress HtmlUnknownTarget -->
  <v-img
    :src="img_background_src"
    gradient="to top left, rgba(234,234,234,.99), rgba(173,173,173,.7)"
    aspect-ratio="16/9"
  >
    <v-container>
      <v-layout column justify-center align-center class="px-4">
        <v-flex xs12 sm8 md6>
          <v-row align="center" justify="center">
            <div class="section-header text-center mb-6">
              <div
                class="text-uppercase caption mb-4 grey--text text--darken-2 font-weight-black"
              >
                <!-- <breakpoint /> -->
                Bem vindo!
              </div>
              <span class="display-1 font-weight-medium">
                A <strong>solução</strong> que você precisa<br />
                está a um <strong>software</strong> de distância!
              </span>
              <v-divider class="mini-divider my-3 mx-auto"></v-divider>
              <p
                class="title font-weight-regular mx-auto"
                style="max-width: 700px;"
              >
                Trabalhamos com a criação de sistemas modernos e funcionais.
                Sabemos que o mais importante no mundo atual é trazer soluções
                rápidas e descomplicadas sem perder a qualidade que você merece!
              </p>
              <v-btn
                v-if="$vuetify.breakpoint.xs"
                x-large
                color="success"
                dark
                :href="this.$g('site.whatsapp')"
                target="_blank"
                ><v-icon>mdi-whatsapp</v-icon>Fale conosco</v-btn
              >
            </div>
          </v-row>
          <!-- <v-row align="center" justify="space-around">
            <v-col cols="6" sm="3" md="2">
              <v-img :src="image_center_src" width="100%" contain />
            </v-col>
          </v-row> -->
          <v-divider class="mini-divider my-3 mx-auto"></v-divider>
          <section>
            <v-row align="center" justify="center">
              <v-col cols="12">
                <p class="display-2 text-center">Conheça nossos serviços</p>
              </v-col>
              <v-col
                v-for="(service, i) in services"
                :key="i"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <card-services
                  :title="service.title"
                  :sub-title="service.subTitle"
                  :image="service.image"
                  :text="service.text"
                  :tags="service.tags"
                />
              </v-col>
            </v-row>
          </section>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
import CardServices from '~/components/site/CardServices'

export default {
  layout: 'public',
  auth: false,
  middleware({ store, redirect }) {
    if (store.state.subDomain) {
      alert('redirect to dashboard')
      return redirect('/dashboard')
    }
  },
  components: {
    // Breakpoint,
    CardServices
  },
  data() {
    return {
      img_background_src: require('~/assets/img/laptop-3174729_1920.jpg'),
      image_center_src: require('~/assets/img/welcome-monitor.png'),
      image_logo: require('~/assets/img/logo_800.png'),
      services: [
        {
          title: 'Sistemas web',
          subTitle: 'Feitos sob medida!',
          image: require('~/assets/img/apple-1868496_640.jpg'),
          text:
            'Seu software 100% customizado, usando os mais modernos padrões de projeto e garantindo a manutenção do sistema ao longo do tempo!',
          tags: ['Python', 'Django', 'PostgreSQL']
        },
        {
          title: 'Sites',
          subTitle: 'Modernos e Responsivos!',
          image: require('~/assets/img/responsive-1166833_640.png'),
          text:
            'Ter um site hoje em dia é vital para qualquer empresa que queira passar maior credibilidade a seus clientes.<br>' +
            'Faça já seu site!',
          tags: ['HTML5', 'SCSS', 'JS', 'Vue.js']
        },
        {
          title: 'Webmail',
          subTitle: 'E-mails profissional!',
          image: require('~/assets/img/at-1019990_640.jpg'),
          text:
            'Tenha e-mails corporativos com o domínio da sua empresa e passe aos seus clientes maior credibilidade.<br>' +
            'Opções de planos gratuitos!',
          tags: ['Domínio Empresarial', 'Assinaturas']
        }
      ]
    }
  }
}
</script>
