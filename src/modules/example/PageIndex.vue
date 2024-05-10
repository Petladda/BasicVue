<template>
    <h1 style="padding-top: 80px; padding-left: 40px;">Example</h1>
    <div class="checkbox">
        <h3>CheckBox</h3>
        <Checkbox v-model:checkValue="isSelected" ></Checkbox>
    </div>

    <div style="padding: 10px;">
        <h3>SwitchTab</h3>
        <SwitchTab :tabs="tabs"  />
        
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import Checkbox from '../../components/Input/Checkbox.vue';
import SwitchTab from '../../components/SwitchTab/SwitchTab.vue';

const isSelected = ref(true)
const tabs = ref<string[]>(['Tab 1', 'Tab 2', 'Tab 3']);
// const activeTab = ref<number>(0);
</script>
<style lang="scss" scoped>
.checkbox {
    padding-left: 40px;
}
</style>