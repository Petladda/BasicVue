<script setup lang="ts">
import { ref,reactive, computed } from 'vue'

defineProps<{ msg: string }>()

interface TypeAuthor {
  name: string;
  books: string[]
}



const author: TypeAuthor = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
const BooksMessage = computed(() => {
  return `Book : ${author.books} Create By : ${author.name} `
})
const count = ref(0)

const firstname = ref('')
const lastname = ref('')
const fullname = computed(()=>{
  return `${firstname.value} ${lastname.value}`
}) 
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <div>
      {{ BooksMessage }}
    </div>
    <div>
      firstname <input type="text" v-model="firstname">
    </div>
    <div>
      lastname <input type="text" v-model="lastname">
    </div>
    <p>ชื่อ : {{ fullname }}</p>
    <p>
      Edit By
      {{ author.name }}
    </p>
  </div>

  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
