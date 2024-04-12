<template>
    <div>main</div>
    <button @click="pushByPath">
        pushByPath
    </button>
    <button @click="pushByName">pushByName</button>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const pushByPath = () => {
    router.push({ path: '/setting/No5' })
}

const pushByName = () => {
    router.push({ name: 'No5' })
}

</script>
<style>
.home {
    text-align: center;
    justify-content: center;

}
</style>
