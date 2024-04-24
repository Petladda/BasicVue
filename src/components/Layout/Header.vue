<script setup lang="ts">



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

<template>
    <div class="nav">
        <div class="nav-ul">
            <div>
                <ul class="nav-ul">
                    <li class="nav-li">
                        <a @click="$router.push({ name: 'home' })">
                            <span style="color: white; padding-right: 10px;" class="ml-2">Home</span>
                        </a>
                    </li>
                    <li class="nav-li">
                        <a @click="$router.push({ name: 'employee' })">
                            <span style="color: white; " class="ml-2">Employee</span>
                        </a>
                    </li>
                    
                </ul>
            </div>
            <div>
                <ul >
                    <li class="setting">
                        <a @click="$router.push({ name: 'setting' })">
                            <i style="color: white; font-size: large;" class="pi pi-cog"></i>
                        </a>
                    </li>
                </ul>
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
    padding-left: 8px;
    padding-right: 20px;

}

.nav-li {
    list-style: none;
    text-decoration: none;
    color: white;
    cursor: pointer;
}

.setting {
    cursor: pointer;
   
    justify-content: space-between
}

.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: ghostwhite;
}
</style>
