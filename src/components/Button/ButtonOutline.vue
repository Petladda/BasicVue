<template>
    <button type="button" 
    :class="['btn', { 'btn-sm': size === 'sm', 'btn-md': size === 'md' },{'disabled': disabled === true }]"
    :disabled="disabled"
    >
        <slot></slot> {{ text }} <slot name="icon-right"></slot>
    </button>

</template>
<script setup lang="ts">

withDefaults(
    defineProps<{
        text: string
        size?: 'sm' | 'md'
        disabled?: boolean
    }>(), {
    size: 'sm',
    disabled: false
}
)


</script>

<style lang="scss" scoped>
.btn {
    
    border-radius: 4px;
    border: 1px solid $light-grey2;
    background: #FFFFFF;
    cursor: pointer;

    &:hover{
        background: $light-grey2;
    }
}

.btn-sm{
    width: 110px;
    height: 24px;
    font-size: 12px;
    font-weight: 700;

    
}

.btn-md{
    width: 110px;
    height: 32px;
    font-size: 14px;
    font-weight: 700; 
}

.disabled{
    color: $light-grey;
    background: $light-grey2;
    border: none;
    border-radius: 4px;
    font-size: large;
    cursor: pointer;
    text-align: center;
    padding-left: 1px;
    padding-right: 1px;

    &:hover{
        color: $light-grey;
        background: $light-grey2;
       
    }
}

</style>