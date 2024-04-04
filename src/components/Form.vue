<script setup lang="ts"> 
   import { ref } from 'vue'

   defineProps<{
    messageText: string
    changeMessage: Function
    }>()
    const message = ref('')
</script>

<template>
    <p>Form component</p>
    <p>{{ messageText }}</p>
    <input v-model="message">
    <div>
        <button @click="changeMessage(message)">change</button>
    </div>
</template>