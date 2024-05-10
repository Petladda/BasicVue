<template>

    <div class="header-bar">

        <IconButton size="md" @click="$router.push({ name: 'employee' })">
            <ArrowBack></ArrowBack>
        </IconButton>
        <span class="text-header">View Employee </span>

    </div>
    
    <div class="card-view">
        <div class="card-info">
            <div class="">
                <div class="header-info">
                    <div class="edit">
                        <PersonalInfo class="icon"></PersonalInfo>
                    </div>

                    <span class="text-hederinfo">Basic Info</span>
                </div>
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

                    <Call class="call"></Call>
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
import PersonalInfo from '../../components/Icons/PersonalInfo.vue';
import Call from '../../components/Icons/Call.vue';
import IconButton from '../../components/Button/IconButton.vue';
import ArrowBack from '../../components/Icons/ArrowBack.vue'

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
    color: $medium-grey;
    font-size: small;

}

.text-header {
    padding-left: 15px;
    font-size: 20px;
    font-weight: 600; 
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
}

.header-bar {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    background: #FFFFFF;
    top: 48px;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 12px;
    border-bottom: 1px solid azure;
    font-weight: 700;
    font-size: 14px;
    box-shadow: 1px 1px 6px 0px #4549571F;

}

.card-info {
    margin-bottom: 40px;
    border-radius: 8px;
    background: white;
    width: 607px;
    margin-top: 150px;;
    padding: 15px 21px 15px 21px;
    box-shadow: 1px 1px 6px 0px #4549571F;

}

.card-view {
    display: flex;
    justify-content: center;
    align-items: start;
    height: 100vh;
    background: #F7F8FC;

  
    @include mobile{
        padding: 0 12px 0 12px;
    }

}

.info {
    display: grid;
    grid-template-columns: auto auto;
    gap: 12px;
    padding: 4px 0 12px 0;

    p {
        font-size: 14px;
    }

    @include mobile{
        display: flex;
        flex-direction: column;

    }
}



.phone {
    padding-top: 9px;

    .call {
        margin-top: 14px;
        width: 14px;
        height: 12px;
        fill: $medium-grey;
    }

    .number {
        padding-top: 12px;
    }
}

.header-info {
    display: flex;
    // align-items: center;
    margin-bottom: 15px;

    .text-hederinfo {
        font-size: large;
        font-weight: bold;
        padding: 9px 0px 2px 9px;


    }

    .edit {

        background: $primary-light;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        position: relative;
        padding: 8px;

        .icon {
            fill: #5119F0;
            width: 20px;
            height: 20px;
            align-items: center;
            position: absolute;

        }
    }

}
</style>