<template>
    <a class="text-link">
        {{ text }}
    </a>
</template>
<script setup lang="ts">

withDefaults(
    defineProps<{
        text: string
    
    }>(), {

    }
)

</script>
<style lang="scss" scoped>
.text-link{
    color: $primary ;
    cursor: pointer;

    &:hover{
        color: $primary-dark2;
    }
}
</style>