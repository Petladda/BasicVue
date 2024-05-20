<template>
    <div class="box">
        Level4
        <div>
            click:child: <button @click="emitter?.emit('A')">+</button>
        </div>
        <div>
            click:childWithValueString:
            <button>
                +
            </button>
        </div>
        <div>
            click:childWithValueObject
            <button>
                +
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Emitter, EventType } from 'mitt'
import { symbolMitt} from './key'

import { EventList} from './interface'

const emitter = inject(symbolMitt)

</script>

<style scoped></style>
