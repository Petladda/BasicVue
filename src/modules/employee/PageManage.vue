<template>
    <div class="header-bar">
        <div>

            <i @click="$router.push({ name: 'employee' })" class="pi pi-arrow-left"
                style="cursor: pointer; padding-left: 2px;"></i>
            <span class="text-header">Create Employee </span>

        </div>
        <div class="header-btn">
            <div style="padding-right: 15px;">
                <Button label="Cancle" severity="secondary" @click="$router.push({ name: 'employee' })"></Button>
            </div>
            <div>
                <Button label="Save" severity="info" @click="updateDetail()"></Button>
            </div>

        </div>

    </div>
    <div class="card-view">
        <div class="card-info">
            <div class="">
                <i class="pi pi-pen-to-square" style="font-size: 1.5rem; color: blueviolet;"></i>
                <span class="text-hederinfo">Basic Info</span>
                <div class="info">
                    <div class="inside-info">
                        <label>Firstname<span style="color: red;"> *</span></label>
                        <input type="text" v-model="rawData.firstname"></input>
                    </div>
                    <div>
                        <label>Lastname<span style="color: red;"> *</span></label>
                        <input v-model="rawData.lastname"></input>
                    </div>
                    <div>
                        <label>Email</label><span style="color: red;"> *</span>
                        <input v-model="rawData.email">{{ }}</input>
                    </div>
                    <div>
                        <label>Date of Birth<span style="color: red;"> *</span></label>
                        <input v-model="rawData.dateOfBirth" type="date">
                    </div>
                </div>
                <div class="info">
                    <div>
                        <label>Team</label><span style="color: red;"> *</span>
                        <select v-model="rawData.teamId">
                            <option v-for="team in teamDropDown" :key="team.value" :value="team.value">
                                {{ team.text }}
                            </option>
                        </select>

                    </div>
                    <div>
                        <label>Position</label><span style="color: red;"> *</span>
                        <select v-model="rawData.positionId">
                            <option v-for="position in positionDropdown " :key="position.value" :value="position.value">
                                {{ position.text }}
                            </option>
                        </select>

                    </div>

                </div>


                <hr>
                <div>
                    <div class="header-phone">
                        <div>
                            <i class="pi pi-phone" style="color: gray; font-size: 0.8rem;"></i>
                            <label> Phone</label>
                        </div>
                        <div>
                            <label @click="onCreatePhoneNumber()"
                                style="color: #5119F0; font-size: small; font-weight: bolder; cursor: pointer;"><span
                                    style="font-size: medium;">+</span>Phone</label>
                        </div>
                    </div>
                    <div class="phone-number">
                        <div class="phone" v-for="(phone, index) in rawData.phones" :key="phone.phoneId" >
                            <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="number"
                                v-model="phone.phoneNumber"></input>
                            <i class="pi pi-minus-circle" @click="onDeletePhoneNumber(index)" style="color: red; cursor: pointer;"></i>

                        </div>
                    </div>


                </div>
            </div>

        </div>
    </div>
   
</template>
<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { Employee, DropDown, Create, Update, GetDetail, PhoneModel } from './interface';
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue';


const route = useRoute()
const client = axios.create({
    baseURL: "http://localhost:3000"
});

const rawData = ref<GetDetail>({
    employeeId: '',
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

})


// const form = reactive<Update>({
//     employeeId: '',
//     firstname: '',
//     lastname: '',
//     email: '',
//     dateOfBirth: '',
//     positionId: '',
//     teamId: '',
//     phones: [],
// })


const positionDropdown = ref<DropDown[]>([]);
const teamDropDown = ref<DropDown[]>([]);

const newPhone = reactive<PhoneModel>({
    phoneId: '',
    phoneNumber: '',
})

const updateDetail = async () => {
    const updateInfo = reactive<Update>({
        employeeId: rawData.value.employeeId,
        firstname: rawData.value.firstname,
        lastname: rawData.value.lastname,
        email: rawData.value.email,
        dateOfBirth: rawData.value.dateOfBirth,
        positionId: rawData.value.positionId,
        teamId: rawData.value.teamId,
        phones: rawData.value.phones
    })
    await client.post<any, AxiosResponse<Update, any>>("/employee/update", updateInfo)
        .then((res) => {
            console.log('updateDetail', res);

        })
}

// const handleCreatePosition = async () => {
//     await client.post("/employee/create",)
//     .then((res)=>{
//         console.log(res);

//     })
// }

const employeeDetail = async () => {
    await client.get<any, AxiosResponse<Employee, any>>(`/employee/getDetail?${route.params.id}`)
        .then((res) => {
            console.log("employeeDetail manage", res);
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


const getTeamDropDown = async () => {
    await client.get<any, AxiosResponse<DropDown[], any>>("/team/getTeamDropdown")
        .then((res) => {
            // console.log("teamdropdown",res);
            teamDropDown.value = res.data
            employeeDetail()
        })
}

const onCreatePhoneNumber = () => {
    rawData.value.phones.push({
        phoneId: newPhone.phoneId,
        phoneNumber: newPhone.phoneNumber
    });
    newPhone.phoneNumber = '';
};

const onDeletePhoneNumber = (index: number) => {
    rawData.value.phones.splice(index, 1);
};



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

.text-hederinfo {
    font-size: large;
    font-weight: bold;
    padding-left: 20px;
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
    /* border: 2px solid #b7b8b9; */
    border-radius: 8px;
    background: white;
    width: 609px;
    height: 663px;
    padding: 15px 20px 15px 20px;
    box-shadow: 1px 2px 2px 2px rgb(207, 207, 207);
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

.inside-info {
    display: flex;
    flex-direction: column;
}

input {
    margin-top: 2px;
    width: 100%;
    height: 32px;
    border: 1px solid #E3E7F0;
    border-radius: 4px;
    box-shadow: 4px;
    padding-left: 4px;
}

select {
    margin-top: 2px;
    width: 100%;
    height: 32px;
    border: 1px solid #E3E7F0;
    border-radius: 4px;
    box-shadow: 4px;
}

.header-phone {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.phone-number {

    margin-top: 6px;
    margin-bottom: 15px;
}

.number {
    padding-left: 10px;
    display: flex;
    flex-direction: row;
}
.phone{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
}
</style>