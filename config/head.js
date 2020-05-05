import globals from '../global_vars.json'

export default {
  titleTemplate: `%s - ${globals.empresa.nome}`,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      'http-equiv': 'x-ua-compatible',
      content: 'ie=edge'
    },
    {
      property: 'og:title',
      content: globals.empresa.tagline,
      template: `%s - ${globals.empresa.nome}`,
      hid: 'og:title'
    },
    {
      hid: 'description',
      name: 'description',
      content: globals.empresa.descricao
    },
    {
      hid: 'og:description',
      name: 'og:description',
      property: 'og:description',
      content: globals.empresa.descricao
    }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    // { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
    // { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
    // { rel: 'preconnect', href: 'https://ik.imagekit.io' },
    {
      rel: 'preconnect',
      href: process.env.NUXT_ENV_API_URL || 'http://localhost:8000'
    },
    {
      rel: 'preload',
      href:
        'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap',
      as: 'style',
      onload: "this.rel = 'stylesheet'"
    },
    {
      rel: 'preload',
      href:
        'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
      as: 'style',
      onload: "this.rel = 'stylesheet'"
    }
  ],
  __dangerouslyDisableSanitizers: ['script', 'noscript'],
  noscript: [
    // <!-- LinkedIn Pixel Code -->
    // {
    //   innerHTML: `<img height="1" width="1" style="display:none;" alt="linkedin pixel" src="https://px.ads.linkedin.com/collect/?pid=${globals.site.pixelLinkedin}&fmt=gif" />`
    // }
    // <!-- End LinkedIn Pixel Code -->
  ],
  script: [
    // <!-- Google AdSense -->
    // {
    //   'data-ad-client': 'ca-pub-8149809607007107',
    //   async: true,
    //   defer: true,
    //   src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    // },
    // <!-- End Google AdSense -->
    // {
    //   defer: true,
    //   async: true,
    //   src: 'https://www.googletagmanager.com/gtag/js?id=AW-1037342115',
    // },
    // {
    //   innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());gtag('config', 'AW-1037342115');`,
    // },

    // <!-- LinkedIn Pixel Code -->
    // {
    //   body: false,
    //   innerHTML: `_linkedin_partner_id = "${globals.site.pixelLinkedin}";window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);`
    // },
    // {
    //   defer: true,
    //   async: true,
    //   body: true,
    //   src: 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
    // },
    // <!-- End LinkedIn Pixel Code -->
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Corporation',
        url: globals.site.url,
        image: globals.site.avatar,
        logo: globals.site.avatar,
        email: `mailto:${globals.site.email}`,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'Brazil',
          addressLocality: globals.empresa.endereco.cidade,
          addressRegion: globals.empresa.endereco.uf,
          postalCode: globals.empresa.endereco.cep,
          streetAddress: globals.empresa.endereco.logradouro
        },
        description: globals.empresa.descricao,
        name: globals.empresa.nome,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: globals.site.contactPoint,
            contactType: 'customer service',
            areaServed: 'BR',
            availableLanguage: 'Portuguese'
          }
        ],
        sameAs: globals.site.sameAs
      })
    }
  ],
  htmlAttrs: {
    lang: 'pt-br'
  }
}
