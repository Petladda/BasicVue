<template>
    <div class="nav">
        <div class="nav-ul">
            <div class="">
                <ul class="">
                    <li class="nav-li">
                        <a @click="$router.push({ name: 'home' })">
                            <span >Home</span>
                        </a>
                    </li>
                    <li class="nav-li">
                        <a @click="$router.push({ name: 'employee' })">
                            <span >Employee</span>
                        </a>
                    </li>

                </ul>
            </div>
            <div class="icon">
                <Setting class="setting-icon" @click="$router.push({ name: 'setting' })" />
            </div>


        </div>
    </div>
    <!-- <div class="navigate">
        <Menubar class="sticky" :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="{ name: item.route }" custom>
                    <a   v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon"></span>
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
            </template>
</Menubar>

</div> -->

</template>
<script setup lang="ts">
import Setting from '../Icons/Setting.vue';




// const items = ref([
//     {
//         label: 'Home',
//         // icon: 'pi pi-home',
//         route: 'home',
//     },
//     {
//         label: 'Employee',
//         // icon: 'pi pi-reddit',
//         route: 'employee',
//     },
//     {
//         label: 'Setting',
//         // icon: 'pi pi-spin pi-cog',
//         route: 'setting',
//     }
// ]);

</script>



<style lang="scss" scoped>
.card-navigate {
    padding-bottom: 40px;
    display: block;
}

.nav {
    text-decoration: none;
    position: fixed;
    width: 100%;
}

.nav-ul {
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    background: black;
    width: 100%;
    height: 48px;
    align-items: center;
    padding-left: 16px;


}


ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    :hover {
        background: $hover-on-black;
        height: 48px;
        padding-top: 12px;
    }

    li{
        a{
            color: $primary-light;
            padding: 12px 12px 12px 12px;
        }
    }
}




.icon {
    :hover {
        fill: $neutral-light1;
    }
    
}

.setting-icon {
    cursor: pointer;
    fill: $primary-light;
    margin-right: 16px;
    width: 20px;
    height: 20px;


}

.nav-li {
    list-style: none;
    text-decoration: none;
    color: white;
    cursor: pointer;



}

.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: ghostwhite;
}
</style>
