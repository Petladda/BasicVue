<template>
    <button type="button"  
    :class="[ 'btn', { 'btn-sm': size === 'sm', 'btn-md': size === 'md'  },{'disabled': disabled === true }]" 
    :disabled="disabled">
       <slot></slot>  {{ text }}  <slot name="icon-right"> </slot>
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
    color: white;
    background: $primary;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    padding-left: 2px;
    padding-right: 2px;
    
    &:hover {
        background: $primary-dark2;
    }

}

.btn-sm{
    width: 120px;
    height: 24px;
    font-size: 12px;
    font-weight: 700;

    
}

.btn-md{
    width: 110px;
    height: 32px;
    font-size: 14px;
    font-weight: 700;  

    &svg{
        padding-right: 20px;
    }
    
}

.disabled{
    color: white;
    background: $primary-disable;
    border: none;
    border-radius: 4px; 
    cursor: not-allowed;
    text-align: center;
    padding-left: 1px;
    padding-right: 1px;

    &:hover{
        color: white;;
        background: $primary-disable;
       
    }
}


</style>