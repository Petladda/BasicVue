<template>
    <div class="header-bar">
        <div class="">
            <i @click="$router.push({ name: 'employee' })" class="pi pi-arrow-left"
                style="cursor: pointer; padding-left: 2px;"></i>
            <span class="text-header">Create Employee </span>

        </div>
        <div class="header-btn">
            <div style="padding-right: 15px; ">
                <Outline text="Cancle" size="md" @click="$router.push({ name: 'employee' })"></Outline>
            </div>
            <div>
                <MyButton text="Save" size="md" @click="onSave()">
                </MyButton>
                <!-- <button class="save-btn" severity="info" @click="onSave()">Save</button> -->
            </div>

        </div>

    </div>
    <hr>
    <div class="card-view">
        <div class="card-info">
            <div class="header-info">
                <div class="edit">
                    <PersonalInfo class="icon"></PersonalInfo>
                </div>

                <span class="text-hederinfo">Basic Info</span>
            </div>

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
                        <Call class="call"></Call>
                        <label> Phone</label>
                    </div>
                    <div>
                        <Outline text="Phone" size="sm" @click="onCreatePhoneNumber()">
                            <Plus></Plus>
                        </Outline>
                    </div>
                </div>
                <div class="phone-number">
                    <div class="phone" v-for="(phone, index) in rawData.phones" :key="phone.phoneId">
                        <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="number"
                            v-model="phone.phoneNumber"></input>
                        <IconButton @click="onDeletePhoneNumber(index)" size="md">
                            <Circle_minus ></Circle_minus>
                        </IconButton>



                    </div>
                </div>



            </div>


        </div>
    </div>
</template>
<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { Employee, DropDown, Create, Update, GetDetail, PhoneModel } from './interface';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, ref } from 'vue';
import MyButton from '../../components/Button/Button.vue';
import Outline from '../../components/Button/ButtonOutline.vue';
import PersonalInfo from '../../components/Icons/PersonalInfo.vue';
import Call from '../../components/Icons/Call.vue';
import Plus from '../../components/Icons/Plus.vue';
import Circle_minus from '../../components/Icons/CircleMinus.vue';
import IconButton from '../../components/Button/IconButton.vue';

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
        employeeDetail()
        router.push({ name: 'employee' })
    } else {
        updateDetail()
        employeeDetail()
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
    padding: 9px 0px 2px 9px;


}

.header-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 12px;

}

hr {
    border: 1px solid $color-border;
}

.header-bar {
    position: fixed;
    width: 100%;
    height: 48px;
    background: #FFFFFF;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    top: 48px;
    padding-bottom: 8px;
    padding-left: 12px;
    border: none;
    padding-top: 10px;
    box-shadow: 1px 1px 1px 1px rgb(207, 207, 207);
}

.card-info {
    margin-bottom: 40px;
    border-radius: 8px;
    background: $text-white;
    width: 606px;
    padding: 19px 20px 15px 20px;
    box-shadow: 1px 2px 2px 2px rgb(207, 207, 207);
}

.card-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
    margin-right: 10px;
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
    align-items: center;

    .call {
        margin-top: 14px;
        width: 14px;
        height: 12px;
        fill: $medium-grey;
    }
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
    margin-right: 9px;
}

.create-phone {
    color: $primary;
    font-size: small;
    font-weight: bolder;
    padding-right: 57px;
    cursor: pointer;
}

.header-info {
    display: flex;
    // align-items: center;
    margin-bottom: 15px;

    .edit {

        background: $primary-light;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        position: relative;
        padding: 8px;

        .icon {
            fill: $primary;
            width: 20px;
            height: 20px;
            align-items: center;
            position: absolute;

        }
    }

}
</style>