<script setup lang="ts">

import { RouterView,RouterLink } from 'vue-router';

import { ref } from 'vue'


const items = ref([
    {
        label: 'No1',
        icon: 'pi pi-calculator',
        route:'No1',
    },
    {
        label: 'No2',
        icon: 'pi pi-circle-fill',
        route: 'No2',
    },
    {
        label: 'No3',
        icon: 'pi pi-caret-righ',
        route: 'No3',
    },
    {
        label: 'No4',
        icon: 'pi pi-bullseye',
        route: 'No4',
    },
    {
        label: 'No5',
        icon: 'pi pi-address-book',
        route: 'No5',
    },
    {
        label: 'No6',
        icon: 'pi pi-circle-fill',
        route: 'No6',
    },
    {
        label: 'No7',
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

<template>
    <main>
        <div class="page">
            <div class="">
                <div class="card flex justify-content-center">
                
                    <Menu :model="items"  >
                        <template #item="{ item, props }">
                            
                            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="{name:item.route }" custom>
                                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                    <span :class="item.icon"></span>
                                    <span class="ml-2">{{ item.label }}</span>
                                </a>
                            </router-link>
                        </template>
                    </Menu>
                </div>

                
            </div> 

            <div class="view">
                <router-view />
            </div>
        
             
        </div>
        
        
    </main>
   
</template>

<style>

</style>