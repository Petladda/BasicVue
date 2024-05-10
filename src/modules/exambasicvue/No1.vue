
<template>
    <div>
        <button type="button" @click="count--">-</button>
        count : {{ count }}
        <button type="button" @click="countUP">+</button>
    </div>
    
    

</template>
<script setup lang="ts">
import Button from '../../components/Button/Button.vue';

   

    let count = 0
    const countUP =  () => {
        count++
        console.log(count);
    }
</script>