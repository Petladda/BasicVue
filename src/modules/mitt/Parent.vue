<template>
    parent
    <div class="box2" style="background-color:aqua ;">
        <RouterView/>
    </div>
    <div class="box2" style="background-color: brown;">
        <RouterView/>

    </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import Level1 from './Level1.vue'
import Level2 from './Level2.vue'
import Level3 from './Level3.vue'
import Level4 from './Level4.vue'
const count = ref(0)

</script>

<style>
.box1,
.box2 {
    /* width: 200px;
    height: 200px; */
    /* background: r; */
    border: 1px solid black;
    padding: 24px;
}

</style>