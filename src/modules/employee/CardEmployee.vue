<script setup lang="ts">

defineProps<{
    employee: {
        first_name: string;
        last_name: string;
        email: string;
        gender: string;
        team_id: number;
        position_id: number;
    }[];
    getTeam: Function
    getPosition: Function
}>()



</script>
<template>
    <p>Card components</p>
    <div class="container">
        <div class="post" v-for="(em, index) in employee" :key="index">
            <div class="card-employee">
                <span>{{ `${em.first_name} ${em.last_name}` }}</span>
                <p>{{ em.email }}</p>
                <span>{{ em.gender }}</span>
                <span>{{ getTeam(em.team_id) }} / {{ getPosition(em.position_id) }} </span>

            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    padding-bottom: 4px;
    padding-left: 20px;
    margin-right: 8px;
    display: flex;
    flex-wrap: wrap;

    .post {
        padding-right: 8px;
        padding-bottom: 6px;

        .card-employee {
            border: 1px solid gray;
            text-align: center;
            padding: 20px 14px 14px 14px;
            width: 250px;
            height: 120px;


        }
    }
}
</style>