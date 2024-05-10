<template>
    <button type="button" 
    :class="['btn',`btn-${size}`,{ [`disabled-${size}`]: disabled }]" :disabled
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
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 2px;

    &:hover{
        background: $light-grey2;
    }
}

.btn-sm{
    min-width: 110px;
    height: 24px;
    font-size: 12px;
    font-weight: 700;

    
}

.btn-md{
    min-width: 110px;
    height: 32px;
    font-size: 14px;
    font-weight: 700; 
}

.disabled-md{
    color: $light-grey;
    background: $light-grey2;
    border: none;
    border-radius: 4px;
    font-size: large;
    cursor: not-allowed;
    text-align: center;
    font-size: 14px;

    &:hover{
        color: $light-grey;
        background: $light-grey2;
       
    }
}

.disabled-sm{
    color: $light-grey;
    background: $light-grey2;
    border: none;
    border-radius: 4px;
    font-size: large;
    cursor: not-allowed;
    text-align: center;
    font-size: 12px;

    &:hover{
        color: $light-grey;
        background: $light-grey2;
       
    }
}

</style>