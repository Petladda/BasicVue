<template>
    <div class="switch-tab">
        <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)"
            :class="{ 'active': activeTab === index }">
            {{ tab }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

withDefaults(defineProps<{
    tabs: string[];
}>(), {
})

const activeTab = ref<number>(0);

function changeTab(index: number) {
    activeTab.value = index;
}
</script>
<style lang="scss" scoped>
.switch-tab {
    display: flex;
    text-align: center;
    
    .tab {
        padding: 10px 20px;
        min-width: 135px;
        min-height: 32px;
        cursor: pointer;
        border: 1px solid $grey-bg;
        color: $medium-grey;
        font-size: 14px;
        font-weight: 400;
        border-radius: 4px;

        &:hover {
            color: $primary;
        }

        &.active {
            background-color: $primary-light;
            color: $primary;
            border: 1px solid $primary;
            border-radius: 4px;
            font-weight: 700;
        }
    }

}
</style>