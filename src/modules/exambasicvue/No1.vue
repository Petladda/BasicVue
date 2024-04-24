<script setup lang="ts">
   

    let count = 0
    const countUP =  () => {
        count++
        console.log(count);
    }
</script>
<template>
    <div>
        <button type="button" @click="count--">-</button>
        count : {{ count }}
        <button type="button" @click="countUP">+</button>
    </div>
    
    

</template>