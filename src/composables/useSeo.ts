import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSchemaOrg, definePerson, defineWebSite } from '@unhead/schema-org/vue'

const useSeo = () => {
  const { t, locale } = useI18n()

  const localeMap: Record<string, string> = {
    fr: 'fr_FR',
    en: 'en_US',
  }
  console.log('loale from useSeo:', locale.value)
  useHead({
    templateParams: {
      schemaOrg: {
        host: 'https://yassine-mahjoubi-quiz-ia-generator.netlify.app',
        inLanguage: localeMap[locale.value],
      },
    },
  })

  useSchemaOrg(
    [
      definePerson({
        name: 'Yassine Mahjoubi',
        jobTitle: computed(() => t('seo.site.author.jobTitle')),
        url: 'https://yassine-mahjoubi-quiz-ia-generator.netlify.app/about',
        sameAs: [
          'https://about.me/yassine-mahjoubi',
          'https://yassine-mahjoubi.carrd.co/',
          'https://www.linkedin.com/in/yassine-mahjoubi/',
          'https://github.com/yassine-mahjoubi/',
        ],
        knowsAbout: [
          'JavaScript',
          'Typescript',
          'css',
          'rgaa',
          'a11y',
          'Vue.js',
          'nuxt',
          'supabase',
          'SEO',
          'LLM',
          'access42',
          'agile',
        ],
      }),
      defineWebSite({
        name: t('seo.site.name'),
        description: t('seo.site.description'),
        url: 'https://yassine-mahjoubi-quiz-ia-generator.netlify.app/',
      }),
    ],
    { tagPosition: 'head' },
  )
}

export { useSeo }
