<template>
    <div>
        count: {{ count }}
        <Level1 count="count"></Level1>
        <Button text="A" @click="emitter.emit('A')">A</Button>
        <Button text="B" @click="emitter.emit('B')">B</Button>
        <Button text="C" @click="logB">C</Button>
    </div>
</template>

<script setup lang="ts">
import Level1 from './Level1.vue'
import Button from '../../components/Button/Button.vue';
import { ref, provide } from 'vue';
import mitt from 'mitt'
import { EventList} from './interface'
import { symbolMitt} from './key'

const count = ref(0)


const emitter = mitt<EventList>()
provide(symbolMitt, emitter)
emitter.on('A', () => {
    console.log('A')

    count.value++
})

function logB() {
    console.log('B');

}
emitter.on('B', logB)
</script>

<style>
.box {
    /* width: 200px;
    height: 200px; */
    border: 1px solid black;
    padding: 24px;
}
</style>