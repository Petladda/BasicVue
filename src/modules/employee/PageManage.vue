<template>
    <div class="header-bar">
        <div>

            <i @click="$router.push({ name: 'employee' })" class="pi pi-arrow-left"
                style="cursor: pointer; padding-left: 2px;"></i>
            <span class="text-header">Create Employee </span>

        </div>
        <div class="header-btn">
            <div style="padding-right: 15px;">
                <button class="cancle-btn" severity="secondary"
                    @click="$router.push({ name: 'employee' })">Cancle</button>
            </div>
            <div>
                <button class="save-btn" severity="info" @click="onSave()">Save</button>
            </div>

        </div>

    </div>
    <hr>
    <div class="card-view">
        <div class="card-info">

            <i class="pi pi-pen-to-square" style="font-size: 2rem; color: blueviolet; padding: 20px 0  16px 20px;"></i>
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
                    <input v-model="rawData.email"></input>
                </div>
                <div>
                    <label>Date of Birth<span style="color: red;"> *</span></label>
                    <input v-model="rawData.dateOfBirth" type="date">
                </div>
                <div>
                    <label>Team</label><span style="color: red;"> *</span>
                    <select class="select-option" v-model="rawData.teamId">
                        <option v-for="team in teamDropDown" :key="team.value" :value="team.value">
                            {{ team.text }}
                        </option>
                    </select>

                </div>
                <div>
                    <label>Position</label><span style="color: red;"> *</span>
                    <select class="select-option" v-model="rawData.positionId">
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
                        <label class="create-phone" @click="onCreatePhoneNumber()"><span
                                style="font-size: medium;">+</span>Phone</label>
                    </div>
                </div>
                <div class="phone-number">
                    <div class="phone" v-for="(phone, index) in rawData.phones" :key="phone.phoneId">
                        <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="number"
                            v-model="phone.phoneNumber"></input>

                        <i class="pi pi-minus-circle" @click="onDeletePhoneNumber(index)"
                            style="color: #646D78; cursor: pointer; padding-right: 37px"></i>
                        
                    </div>
                </div>
                <a href="../../components/icons/update.svg"></a>

            </div>


        </div>
    </div>
</template>
<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { Employee, DropDown, Create, Update, GetDetail, PhoneModel } from './interface';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, ref } from 'vue';

const router = useRouter()
const route = useRoute()
const client = axios.create({
    baseURL: "http://localhost:3000"
});

const rawData = reactive<GetDetail>({
    employeeId: '',
    firstname: '',
    lastname: '',
    email: '',
    dateOfBirth: '',
    phones: [],
    positionId: '',
    teamId: '',

})


const positionDropdown = ref<DropDown[]>([]);
const teamDropDown = ref<DropDown[]>([]);

const newPhone = reactive<PhoneModel>({
    phoneId: '',
    phoneNumber: '',
})

const updateDetail = async () => {
    const updateInfo = reactive<Update>({
        employeeId: rawData.employeeId,
        firstname: rawData.firstname,
        lastname: rawData.lastname,
        email: rawData.email,
        dateOfBirth: rawData.dateOfBirth,
        positionId: rawData.positionId,
        teamId: rawData.teamId,
        phones: rawData.phones
    })
    await client.post<any, AxiosResponse<Update, any>>("/employee/update", updateInfo)
        .then((res) => {
            console.log('updateDetail', res);

        })
}


const handleCreatePosition = async () => {

    const createEmployee = reactive<Create>({
        firstname: rawData.firstname,
        lastname: rawData.lastname,
        email: rawData.email,
        dateOfBirth: rawData.dateOfBirth,
        positionId: rawData.positionId,
        teamId: rawData.teamId,
        phones: rawData.phones
    })

    await client.post("/employee/create", createEmployee)
        .then((res) => {
            console.log("Create", res);

        })
}

const employeeDetail = async () => {
    await client.get<any, AxiosResponse<Employee, any>>(`/employee/getDetail?${route.params.id}`)
        .then((res) => {
            // console.log("employeeDetail manage", res);
            rawData.employeeId = res.data.employeeId
            rawData.firstname = res.data.firstname
            rawData.lastname = res.data.lastname
            rawData.email = res.data.email
            rawData.dateOfBirth = res.data.dateOfBirth
            rawData.positionId = res.data.positionId
            rawData.teamId = res.data.teamId
            rawData.phones = res.data.phones
        })
}
const getpositionDropdown = async () => {
    await client.get<any, AxiosResponse<DropDown[], any>>("/position/getPositionDropdown")
        .then((res) => {
            // console.log("dropdownPosition",res);
            positionDropdown.value = res.data

        })
}


const getTeamDropDown = async () => {
    await client.get<any, AxiosResponse<DropDown[], any>>("/team/getTeamDropdown")
        .then((res) => {
            // console.log("teamdropdown",res);
            teamDropDown.value = res.data

        })
}

const onCreatePhoneNumber = () => {
    rawData.phones.push({
        phoneId: newPhone.phoneId,
        phoneNumber: newPhone.phoneNumber
    });
    newPhone.phoneNumber = '';
};

const onDeletePhoneNumber = (index: number) => {
    rawData.phones.splice(index, 1);
};


const clearForm = () => {
    rawData.firstname = ''
    rawData.lastname = ''
    rawData.email = ''
    rawData.dateOfBirth = ''
    rawData.positionId = ''
    rawData.teamId = ''
    rawData.phones = []
}

const isCreateMode = computed(() => {
    return !route.params.id
})

const onSave = () => {
    if (isCreateMode.value) {
        handleCreatePosition()
        router.push({ name: 'employee' })
    } else {
        updateDetail()
        router.push({ name: 'employee' })
    }

}


(async () => {

    if (isCreateMode.value) {

        clearForm()
        //    console.log("create");
    } else {
        employeeDetail()
        //    console.log("update"); 
    }
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

.text-hederinfo {
    font-size: large;
    font-weight: bold;
    padding: 26px 0 0 13px;
}

.header-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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

        :hover {
            background: #454957;
        }
    }

}

hr {
    border: 1px solid $color-border;
}

.header-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 55px;
    padding-bottom: 10px;
    padding-left: 12px;
    border: none;
}

.card-info {
    margin-top: 50px;
    margin-bottom: 40px;
    border-radius: 8px;
    background: $text-white;
    width: 609px;
    height: 663px;
    padding: 15px 20px 15px 20px;
    box-shadow: 1px 2px 2px 2px rgb(207, 207, 207);
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
    gap: 15px;
    padding: 0 0 10px 0;
    padding-bottom: 12px;
}

.inside-info {
    display: flex;
    flex-direction: column;
}

input {
    margin-top: 2px;
    width: 100%;
    height: 32px;
    border: 1px solid $color-border;
    border-radius: 4px;
    box-shadow: 4px;
    padding-left: 4px;
    margin-right: 22px;
}

.select-option {
    margin-top: 2px;
    width: 100%;
    height: 32px;
    border: 1px solid $color-border;
    border-radius: 4px;
    box-shadow: 4px;
}

.header-phone {
    padding-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.phone-number {

    margin-top: 12px;
    margin-bottom: 15px;
}

.number {
    padding-left: 10px;
    display: flex;
    flex-direction: row;
}

.phone {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;

}

.create-phone {
    color: #5119F0;
    font-size: small;
    font-weight: bolder;
    padding-right: 57px;
    cursor: pointer;
}
</style>