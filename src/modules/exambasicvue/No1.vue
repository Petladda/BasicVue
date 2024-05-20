<template>
    <div>
        <button type="button" @click="count--">-</button>
        count : {{ count }}
        <button type="button" @click="countUp1">+</button>
    </div>





</template>
<script setup lang="ts">
import Button from '../../components/Button/Button.vue';


let count = 0
const countUp1 = () => {
    count++
    console.log(count);
}
</script>
<style lang="scss" scoped>
.count {
    display: flex;
}
</style>../../stores/counterStore.ts