<template>
    <button type="button"  
    :class="['btn',`btn-${size}`,{ [`disabled-${size}`] : disabled }]" :disabled>
       <slot name="icon-left"></slot>  {{ text }}  <slot name="icon-right"> </slot> 
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
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 2px;
    
    &:hover {
        background: $primary-dark2;
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

    &svg{
        padding-right: 20px;
    }
    
    .icon{
        padding-right: 6px;
        padding-top: 6px;
    }
}

.disabled-md{
    color: white;
    background: $primary-disable;
    border: none;
    border-radius: 4px; 
    cursor: not-allowed;
    text-align: center;
    font-size: 14px;

    &:hover{
        color: white;;
        background: $primary-disable;
       
    }
}

.disabled-sm{
    color: white;
    background: $primary-disable;
    border: none;
    border-radius: 4px; 
    cursor: not-allowed;
    text-align: center;
    font-size: 12px;

    &:hover{
        color: white;;
        background: $primary-disable;
       
    }
}



</style>