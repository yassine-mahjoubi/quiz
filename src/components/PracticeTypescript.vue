<template>
  <div class="user-card">
    <h2>{{ title }}</h2>
    <div class="user-info">
      <p>Nom: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Âge: {{ user.age }}</p>
      <p>Statut: {{ user.isActive ? 'Actif' : 'Inactif' }}</p>
    </div>

    <div class="actions">
      <button @click="toggleStatus">
        {{ user.isActive ? 'Désactiver' : 'Activer' }}
      </button>
      <button @click="updateAge">Anniversaire +1</button>
      <button @click="sendNotification">Envoyer notification</button>
    </div>

    <div v-if="notification" class="notification">
      {{ notification }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  user: object
  showNotifications: boolean
}>()

const emit = defineEmits<{
  'user-updated': (dataUser: object) => void
  'notification-sent': (dataNotif: object) => void
}>()

const notification = ref<string>('')

const toggleStatus = () => {
  props.user.isActive = !props.user.isActive
  emit('user-updated', props.user)
}

const updateAge = () => {
  props.user.age += 1
  emit('user-updated', props.user)
}

const sendNotification = () => {
  if (props.showNotifications) {
    notification.value = `Notification envoyée à ${props.user.name}`
    emit('notification-sent', {
      userId: props.user.id,
      message: notification.value,
      timestamp: new Date(),
    })

    setTimeout(() => {
      notification.value = ''
    }, 3000)
  }
}
</script>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
}

.user-info {
  margin: 15px 0;
}

.actions {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  cursor: pointer;
}

.actions button:hover {
  background: #0056b3;
}

.notification {
  margin-top: 15px;
  padding: 10px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}
</style>
