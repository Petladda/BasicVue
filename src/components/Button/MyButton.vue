<template>
    <div style="background-color: burlywood;">
        <slot name="slot1">

        </slot>
    </div>

    <div style="background-color: black;">
        <slot name="slot2"></slot>
    </div>
    <div style="background-color: blue;">
        <slot name="slot3">

        </slot>
    </div>
    <slot>

    </slot>

</template>
<script setup lang="ts">

</script>