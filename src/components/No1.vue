<script setup lang="ts">
    import { ref } from 'vue'

    const count = ref(0)
    
</script>
<template>
    <div>
        <button type="button" @click="count--">-</button>
        count : {{ count }}
        <button type="button" @click="count++">+</button>
    </div>
    
    

</template>