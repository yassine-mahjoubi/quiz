<template>
  <div class="language-switcher">
    <!-- Label pour l'accessibilité (RGAA) -->
    <label for="language-select" class="visually-hidden">
      {{ $t('language.choose') || 'Choisir la langue' }}
    </label>

    <select
      id="language-select"
      v-model="currentLocale"
      @change="handleLanguageChange"
      :disabled="isLoading"
      class="language-select"
      :aria-label="$t('language.choose') || 'Choisir la langue'"
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>

    <!-- Indicateur de chargement -->
    <span v-if="isLoading" class="loading-indicator" aria-live="polite">
      {{ $t('language.loading') || 'Chargement...' }}
    </span>

    <!-- Message d'erreur -->
    <div v-if="error" class="error-message" role="alert" aria-live="assertive">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { loadLocaleMessages, setI18nLanguage, SUPPORT_LOCALES } from '@/plugins/i18n'

// Composition API
const { locale } = useI18n()
const currentLocale = ref(locale.value)
const isLoading = ref(false)
const error = ref('')

/**
 * Gère le changement de langue
 * @param {Event} event - Événement de changement du select
 */
const handleLanguageChange = async (event) => {
  const newLocale = event.target.value

  console.log('Changement de langue demandé:', newLocale)

  // Validation de base
  if (!newLocale) {
    showError('Aucune langue sélectionnée')
    return
  }

  // Vérification que la locale est supportée
  if (!SUPPORT_LOCALES.includes(newLocale)) {
    showError(`Langue "${newLocale}" non supportée`)
    return
  }

  // Si c'est déjà la langue actuelle, on ne fait rien
  if (newLocale === locale.value) {
    console.log('Langue déjà active:', newLocale)
    return
  }

  await changeLanguage(newLocale)
}

/**
 * Change la langue de l'application
 * @param {string} newLocale - Nouvelle langue à appliquer
 */
const changeLanguage = async (newLocale) => {
  isLoading.value = true
  error.value = ''

  try {
    console.log(`Chargement de la langue: ${newLocale}`)

    // Charger les messages de traduction
    await loadLocaleMessages(useI18n().global, newLocale)

    // Mettre à jour la langue
    setI18nLanguage(useI18n().global, newLocale)

    // Mettre à jour les références locales
    locale.value = newLocale
    currentLocale.value = newLocale

    console.log(`Langue changée avec succès: ${newLocale}`)

    // Optionnel : sauvegarder la préférence utilisateur
    localStorage.setItem('preferred-language', newLocale)
  } catch (err) {
    console.error('Erreur lors du changement de langue:', err)
    showError(`Erreur: ${err.message}`)

    // Revenir à la langue précédente en cas d'erreur
    currentLocale.value = locale.value
  } finally {
    isLoading.value = false
  }
}

/**
 * Affiche un message d'erreur
 * @param {string} message - Message d'erreur à afficher
 */
const showError = (message) => {
  error.value = message
  console.error('Erreur SwitchLanguage:', message)

  // Effacer l'erreur après 5 secondes
  setTimeout(() => {
    error.value = ''
  }, 5000)
}

/**
 * Initialise le composant au montage
 */
onMounted(async () => {
  console.log('Initialisation SwitchLanguage')

  // Récupérer la langue préférée depuis localStorage
  const savedLanguage = localStorage.getItem('preferred-language')

  if (savedLanguage && SUPPORT_LOCALES.includes(savedLanguage) && savedLanguage !== locale.value) {
    console.log('Restauration de la langue sauvegardée:', savedLanguage)
    await changeLanguage(savedLanguage)
  } else {
    // Charger les messages pour la langue par défaut si pas encore chargés
    try {
      await loadLocaleMessages(useI18n().global, locale.value)
    } catch (err) {
      console.error('Erreur lors du chargement de la langue par défaut:', err)
    }
  }
})
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.language-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
}

.language-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.language-select:focus {
  outline: 2px solid #007cba;
  outline-offset: 2px;
}

.loading-indicator {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}

.error-message {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  padding: 0.5rem;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 10;
}

/* Classe pour masquer visuellement mais garder accessible aux lecteurs d'écran */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
