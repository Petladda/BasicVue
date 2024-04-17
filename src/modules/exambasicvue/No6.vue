<script setup lang="ts">
import { ref, watch } from "vue";




const count = ref(0);
const countUP = () => {
    count.value++;
    console.log(count);
};
watch(count, (newValue, oldValue) => {
    console.log('watch');

    console.log(newValue);
    console.log(oldValue);

}, {
    immediate: true
})

console.log('setup')

</script>
<template>
    <div>
        <button type="button" @click="count--">-</button>
        count : {{ count }}
        <button type="button" @click="countUP">+</button>
    </div>
</template>
