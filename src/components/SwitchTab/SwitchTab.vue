<template>
    <div class="switch-tab">
        <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)"
            :class="{ 'active': tabActive === index  }">
            {{ tab }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
    tabs: string[];
    activeTab?: number;
}>(), {

})

const tabActive = ref<number>(props.activeTab ?? 0);

function changeTab(index: number) {
    tabActive.value = index
    console.log("tabactive",tabActive.value);
    
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
        background: $grey-bg;
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