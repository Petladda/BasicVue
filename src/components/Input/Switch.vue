<template>
    <div class='switch' @click="handleSwitch()">
        <div class="toggle-switch" :class="[activeStatus ? 'toggle' : '', disabled ? 'disabled' : '']">
            <div></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        switchValue: boolean
        disabled?: boolean
    }>(), {
    disabled: false,
}
)

const emit = defineEmits<{
    (e: 'update:switchValue', value: boolean): void;
}>()

const activeStatus = computed({
    get() {
        return props.switchValue
    },
    set(newValue) {
        emit('update:switchValue', newValue)
    },
})

function handleSwitch() {
    if (props.disabled) {
        return activeStatus.value;
    }
    console.log(activeStatus.value = !activeStatus.value);

}
</script>
<style lang="scss" scoped>

.switch {
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 34px;
    height: 14px;
    border-radius: 8px;
    background: $light-grey;
    box-shadow: 1px 1px 6px 0px #4549571F;

    &.disabled {
        cursor: not-allowed;
        background: $primary;
    }

    .toggle-switch {
        background: white;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: 1px 1px 6px 0px #4549571F;
        top: -3px;

        &:hover {
            outline: 4px solid #b6b5ff81;
        }

        &.toggle {
            background: $primary;
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            box-shadow: 1px 1px 6px 0px #4549571F;
            left: 15px;

            &.disabled {
                cursor: not-allowed;
                background: $primary-light2;

                &:hover {
                    outline: none;
                }
            }
        }

        &.disabled {
            cursor: not-allowed;
            background: $light-grey;

            &:hover {
                outline: none;
            }
        }
    }
}
</style>