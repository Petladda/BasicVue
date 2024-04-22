<template>
    
    <div class="header-bar">
        <div>

            <i @click="$router.push({ name: 'employee' })" class="pi pi-arrow-left"
                style="cursor: pointer; padding-left: 2px;"></i>
            <span class="text-header">View Employee </span>

        </div>
        <div class="header-btn">
            <div style="padding-right: 15px;">
                <Button label="Cancle" severity="secondary" @click="$router.push({ name: 'employee' })"></Button>
            </div>
            <div>
                <Button label="Save" severity="info"></Button>
            </div>

        </div>

    </div>
    <div class="card-view">
        <div class="card-info">
            <div class="">
                <h3 style="padding-left: 50px;">Basic Info</h3>
                <div class="info">
                    <div>
                        <label>Firstname</label><span style="color: red;"> *</span>
                        <p>{{ rawData.firstname }}</p>
                    </div>
                    <div>
                        <label>Lastname</label><span style="color: red;"> *</span>
                        <p>{{ rawData.lastname }}</p>
                    </div>
                    <div>
                        <label>Email</label><span style="color: red;"> *</span>
                        <p>{{ rawData.email }}</p>
                    </div>

                </div>
                <div class="info">
                    <div>
                        <label>Team</label><span style="color: red;"> *</span>
                        <p>{{ getTeamName(rawData.teamId) }}</p>
                    </div>
                    <div>
                        <label>Position</label><span style="color: red;"> *</span>
                        <p>{{ getPositionName(rawData.positionId) }}</p>
                    </div>

                </div>


                <hr>
                <div>

                    <i class="pi pi-phone" style="color: gray; font-size: 1rem;"></i>
                    <label> Phone</label>
                    <div v-for="phone in rawData.phones">
                        <p>{{ getPhoneNumber(phone.phoneId) }}</p>
                    </div>

                </div>
            </div>

        </div>
    </div>

</template>
<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { Employee, DropDown } from './interface';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute()
const client = axios.create({
    baseURL: "http://localhost:3000"
});

const rawData = ref({
    firstname: '',
    lastname: '',
    email: '',
    dateOfBirth: '',
    phones: [{
        phoneId: '',
        phoneNumber: '',
    }],
    positionId: '',
    teamId: '',
    employeeId: '',
})
const positionDropdown = ref<DropDown[]>([]);
const teamDropDown = ref<DropDown[]>([]);

const employeeDetail = async () => {
    await client.get<any, AxiosResponse<Employee, any>>(`/employee/getDetail?${route.params.id}`)
        .then((res) => {
            console.log("employeeDetail", res);
            rawData.value = res.data

        })
}
const getpositionDropdown = async () => {
    await client.get<any, AxiosResponse<DropDown[], any>>("/position/getPositionDropdown")
        .then((res) => {
            // console.log("dropdownPosition",res);
            positionDropdown.value = res.data
            employeeDetail()
        })
}
const getPositionName = (positionId: string) => {
    const position = positionDropdown.value.find((p) => p.value === positionId);
    return position ? position.text : '';
};

const getTeamDropDown = async () => {
    await client.get<any, AxiosResponse<DropDown[], any>>("/team/getTeamDropdown")
        .then((res) => {
            // console.log("teamdropdown",res);
            teamDropDown.value = res.data
            employeeDetail()
        })
}

const getTeamName = (teamId: string) => {
    const team = teamDropDown.value.find((t) => t.value === teamId);
    return team ? team.text : '';
}

const getPhoneNumber = (phoneId: string) => {
    const phone = rawData.value.phones.find((p) => p.phoneId === phoneId);
    return phone ? phone.phoneNumber : '';
}
(async () => {
    employeeDetail()
    getpositionDropdown()
    getTeamDropDown()
})()
</script>
<style>
body {
    padding-top: 50px;

}

label {
    color: #454957;
    font-size: small;

}

.text-header {
    padding-left: 15px;
    font-size: large;
    font-weight: bold;
    padding-right: 80px;
}

.header-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

.header-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
    margin-bottom: 40px;
    border-bottom: 1px solid azure;

}

.card-info {
    
    border-radius: 8px;
    background: white;
    width: 609px;
    height: 663px;
    padding: 15px 20px 15px 20px;
    box-shadow: 1px 2px 2px 2px rgb(209, 209, 209);
}

.card-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

}

.info {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 10px;
}
</style>