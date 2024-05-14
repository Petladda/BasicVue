<template>
    <button type="button" :class="['icon-btn', `icon-btn-${size}`, { 'disabled': disabled }]" :disabled>
        <slot class="icon"></slot>
    </button>
</template>
<script setup lang="ts">
withDefaults(
    defineProps<{
        size?: 'sm' | 'md'
        disabled?: boolean
    }>(), {
    size: 'sm',
    disabled: false
}
)
</script>
<style lang="scss" scoped>

.icon-btn {
    color: $medium-grey;
    cursor: pointer;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    

    &:hover {

        color: $primary;
        background: $primary-light;
        border-radius: 50%;

    }

    &.icon-btn-sm {
        width: 24px;
        height: 24px;
        font-size: 16px;

    }

    &.icon-btn-md {
        width: 32px;
        height: 32px;
        font-size: 20px;

    }

    &.disabled {
        color: $light-grey;
        margin-left: 6px;
        cursor: not-allowed;
        border: none;
        background: none;


        &:hover {
            color: $light-grey;
            background: none;
            border-radius: 50%;

        }
    }
}
</style>