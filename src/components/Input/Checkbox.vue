<template>
    <div class="checkbox"  @click="handleCheckBox">
        <div class="checkbox-style" :class="[{ 'active-style': activeStatus || disabled }, { disabled }]" tabindex="0" >
            
            <Tick class="icon" ></Tick>
            
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
    get() {
        return props.checkValue
    },
    set(newValue) {
        emit('update:checkValue', newValue)
    },
})

function handleCheckBox() {
    if (props.disabled) {
        return activeStatus.value;
    }
    console.log(activeStatus.value = !activeStatus.value);

}
</script>
<style lang="scss" scoped>

.checkbox{

    .icon {
        display: none;
        margin-left: 0.8px;
    }
    
    .checkbox-style {
        position: relative;
        border: 2px solid $light-grey2;
        border-radius: 4px;
        cursor: pointer;
        width: 16px;
        height: 16px;
        

        &:hover {
            border: 2px solid $primary;
        }

        &:focus-within {
            border: 2px solid $primary;
            outline: 3.5px solid $primary-light;
        }


        &.active-style {
            background: $primary;
            border: 2px solid $primary;
            width: 16px;
            height: 16px;
            // outline: 3.5px solid $primary-light;

            &:focus-within{
                outline: 3.5px solid $primary-light;
            }

            .icon {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 12px;
                height: 12px;
                color: white;
                margin-top: 1px;

            }

            &.disabled {
                position: relative;
                cursor: not-allowed;
                background: $light-grey2;
                border: 2px solid $neutral-light1;

                .icon{
                    display: none; 
                }

                &:focus {
                    outline: none;
                    border: none;
                    padding-top: 1px;
                    
                    .icon{
                        margin-left: 2.5px;
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 12px;
                        height: 12px;
                        color: white;
                        margin-top: 1px;
                    }
                }
            }
        }


    }


}

</style>