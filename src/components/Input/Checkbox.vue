<template>
    <div class="container" tabindex="0"  @click="handleCheckBox" >
        <div class="checkbox-style" :class="[{'active-style': activeStatus || disabled},{disabled}]" >
            <div tabindex="0" class="checkbox-input">
                <Tick class="icon"></Tick>  
            </div>
        </div>
    </div>
    
   
</template>
<script setup lang="ts">

import { computed } from 'vue';
import Tick from '../Icons/Tick.vue';

const props = withDefaults(
    defineProps<{
       checkValue: boolean
       disabled?: boolean
    }>(), {
        disabled: false,
    }
)

const emit = defineEmits<{
  (e: 'update:checkValue', value: boolean): void;
}>()

const activeStatus = computed({
    get(){
        return props.checkValue 
    },
    set(newValue){
        emit('update:checkValue', newValue)  
    }, 
})

function handleCheckBox() {
    if (props.disabled) {
        return activeStatus.value = !activeStatus.value
    } 
    console.log(activeStatus.value = !activeStatus.value);
    
}
</script>
<style lang="scss" scoped>

.container{
        
    &:focus{
        background: $primary-light;
        width: 22px;
        height: 22px;
        display: flex;
        border-radius: 8px;
        justify-content: center;
        align-items: center; 

       
    }

    &:focus-within {
            background: $primary-light;
            width: 22px;
            height: 22px;
            display: flex;
            border-radius: 8px;
            justify-content: center;
            align-items: center; 
    }
    

    .checkbox-style{
        position: relative;
        border: 2px solid $light-grey2;
        border-radius: 4px;
        cursor: pointer;
        width: 16px;
        height: 16px;


        .icon{
            display: none;
        }
        

        &:hover{
            border:  2px solid $primary;   
        }

        &:focus-within{
            border:  2px solid $primary; 
        }

        &.active-style{
            background: $primary;
            border:  2px solid $primary; 
            width: 16px;
            height: 16px;

            .icon{
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                left: 1px;
                top: 1px;
                width: 12px;
                height: 11px;
                fill: white;
            
            }
            &:hover{
                border:  2px solid $primary;   
            }

            &.disabled{
                cursor: not-allowed;
                background: $light-grey2;

                .icon{
                    fill: white;
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    left: 1px;
                    top: 1px;
                    width: 12px;
                    height: 11px;
                }
            } 
        }
    
    }

}
</style>