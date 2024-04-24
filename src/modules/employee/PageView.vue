<template>

    <div class="header-bar">
        <div>

            <i @click="$router.push({ name: 'employee' })" class="pi pi-arrow-left"
                style="cursor: pointer; padding-left: 2px;"></i>
            <span class="text-header">View Employee </span>

        </div>
        <div class="header-btn">
            <div style="padding-right: 15px;">
                <button class="cancle-btn" severity="secondary"
                    @click="$router.push({ name: 'employee' })">Cancle</button>
            </div>
            <div>
                <button class="save-btn" severity="info">Save</button>
            </div>
        </div>

    </div>
    <hr>
    <div class="card-view">
        <div class="card-info">
            <div class="">
                <h3 style="padding: 26px 0 0 68px; ">Basic Info</h3>
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
                    <div>
                        <label>Date of Birth<span style="color: red;"> *</span></label>
                        <p>{{ rawData.dateOfBirth }}</p>
                    </div>
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
                <div class="phone">

                    <i class="pi pi-phone" style="color: gray; font-size: 0.8rem;"></i>
                    <label> Phone</label>
                    <div v-for="phone in rawData.phones">
                        <p class="number">{{ getPhoneNumber(phone.phoneId) }}</p>
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
<style lang="scss" scoped>
$color-border: #E3E7F0;
$text-white: #FFFFFF;



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
    padding-right: 12px;
    
    .cancle-btn {
        width: 100px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid $color-border;
        background: $text-white;
        cursor: pointer;
    }

    .save-btn {
        width: 100px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid $color-border;
        background: #5119F0;
        color: $text-white;
        cursor: pointer;
        
    }
}

hr {
    border: 1px solid $color-border;
    padding-left: 20px;
    // box-shadow: 0.5px 0.8px 0.8px 0.8px rgb(207, 207, 207);
}

.header-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 55px;
    padding-bottom: 10px;
    padding-left: 12px;
    border-bottom: 1px solid azure;
    font-weight: 700;
    font-size: 14px;

}

.card-info {
    margin-top: 50px;
    margin-bottom: 40px;
    border-radius: 8px;
    background: white;
    width: 609px;
    height: 663px;
    padding: 15px 21px 15px 21px;
    box-shadow: 1px 2px 2px 2px rgb(209, 209, 209);
}

.card-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #F7F8FC;
}

.info {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 20px 0 10px 0;

    p {
        font-size: 14px;
    }
}

.number {
    // padding-left: 10px;
    padding-top: 10px;
}

.phone {
    padding-top: 12px;
}
</style>