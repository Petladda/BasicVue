<script setup lang="ts">
import { ref } from 'vue'


const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        route:'home',
    },
    {
        label: 'Employee',
        icon: 'pi pi-reddit',
        route: 'employee',
    },
    {
        label: 'Setting',
        icon: 'pi pi-spin pi-cog',
        route: 'setting',
    }
]);

</script>

<template>
    <div class="">
        <Menubar class="sticky" :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="{name:item.route}" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon"></span>
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
            </template>
        </Menubar>

    </div>
    
</template>

<style scoped>
.card-navigate {
    padding-bottom: 40px;
    display: block;
}
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ghostwhite;
}
</style>
