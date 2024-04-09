<script setup lang="ts">
    import { ref,computed } from 'vue'

    const firstname = ref('')
    const lastname = ref('')
    const fullname2 = ref('')

    const fullname = computed(()=>{
        console.log('computed');
        
        fullname2.value = `${firstname.value} ${lastname.value}`
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
        fullname2:    <div>{{ fullname2 }}</div>
    </form>
    
</template>