<script setup lang="ts">
    import { ref, computed } from 'vue'

    const firstname = ref('')
    const lastname = ref('')
   

    const fullname = computed(() => {
        return `${firstname.value} ${lastname.value}`
    })

    const handleClick = () => {
        console.log('handle');
        
    }
    console.log(handleClick);
    
</script>

<template>  
    <form >
        <p>Firstname</p>
        <input type="text" v-model="firstname">
        <p>Lastname</p>
        <input type="text" v-model="lastname">
        {{fullname }}
    </form>
</template>
