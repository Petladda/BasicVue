<template>

    <div class="sidebar">
        <div class="menu-bar">
            <div class="menu" v-for="item in items" :key="item.label">
                <a @click="$router.push({ name: item.route })">
                    <span >{{ item.label }}</span>
                </a>
            </div>

        </div>

    </div>
    <div class="view">
        <router-view />
    </div>
    <!-- <div class="page">
            <div class="">
                <div class=" flex justify-content-center">

                    <Menu :model="items">
                        <template #item="{ item, props }">

                            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="{ name: item.route }"
                                custom>
                                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                    <span :class="item.icon"></span>
                                    <span class="ml-2">{{ item.label }}</span>
                                </a>
                            </router-link>
                        </template>
</Menu>
</div>
</div>



</div> -->




</template>
<script setup lang="ts">

import { RouterView, } from 'vue-router';

import { ref } from 'vue'


const items = ref([
    {
        label: 'No.1',
        icon: 'pi pi-calculator',
        route: 'No1',
    },
    {
        label: 'No.2',
        icon: 'pi pi-circle-fill',
        route: 'No2',
    },
    {
        label: 'No.3',
        icon: ' pi pi-bullseye',
        route: 'No3',
    },
    {
        label: 'No.4',
        icon: 'pi pi-bullseye',
        route: 'No4',
    },
    {
        label: 'No.5',
        icon: 'pi pi-address-book',
        route: 'No5',
    },
    {
        label: 'No.6',
        icon: 'pi pi-circle-fill',
        route: 'No6',
    },
    {
        label: 'No.7',
        icon: 'pi pi-circle-fill',
        route: 'No7',
    },
    {
        label: 'Team',
        icon: 'pi pi-envelope',
        route: 'Team',
    },
    {
        label: 'Position',
        icon: 'pi pi-envelope',
        route: 'Position',
    },


]);


</script>



<style lang="scss" scoped>
.sidebar {
    position: fixed;
    top: 50px;
    left: 0;
}

.menu-bar {
    width: 216px;
    height: 100vh;
    background: $grey-bg;
    padding: 12px 36px 12px 12px;
    align-items: center;
    

    :hover {
        color: $primary;
        background: $primary-light;
    }
    
}

.menu {
    width: 168px;
    height: 32px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    border-radius: 4px;
    padding-top: 8px;
    padding-left: 8px;
    
}

.view {
    padding: 50px 0 0 216px;
}
</style>