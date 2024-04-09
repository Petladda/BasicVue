<template>
    <div>
        component 7
        <button @click="countUP">a++</button>
        <div> Point </div>
        {{ aaa }}

        <div v-if="aaa >= 10">
            grade D
        </div>
        <div v-else-if="aaa >= 15">
            grade A++
        </div>
        <div v-else>
            F
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'



export default defineComponent({
    setup() {
        const aaa = ref<number>(1)
        function countUP() {
            aaa.value++
        }
        return {
            aaa,
            countUP
        }
    }
})
</script>

<style scoped></style>