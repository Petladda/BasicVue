<template>
    <button type="button" :class="['icon', `icon-${size}`, { 'disabled': disabled }]" :disabled>
        <slot></slot>
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
.icon {


    fill: $medium-grey;
    cursor: pointer;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {

        color: $primary;
        background: $primary-light;
        border-radius: 48px;

    }
}

.icon-sm {
    width: 16px;
    height: 16px;
    font-size: 12px;
    font-weight: 700;
}

.icon-md {
    width: 20px;
    height: 20px;
    font-size: 14px;
    font-weight: 700;

}

.disabled {


    fill: $light-grey;
    margin-left: 6px;
    cursor: not-allowed;
    border: none;
    background: none;


    &:hover {
        color: $light-grey;
        background: none;
        border-radius: 48px;

    }
}
</style>