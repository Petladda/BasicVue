<script setup lang="ts">
    import { ref,computed } from 'vue'

    const firstname = ref('')
    const lastname = ref('')

    const fullname = computed(()=>{
        return `${firstname.value} ${lastname.value}`
    })
</script>
<template>
    <form>
        <p>firstname</p>
        <input type="text" v-model="firstname">
        <p>lastname</p>
        <input type="text" v-model="lastname">
        <p>{{ fullname.toUpperCase() }}</p>
    </form>
    
</template>