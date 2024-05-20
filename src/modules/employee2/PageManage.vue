<template>
    <div class="pagemanage">
        <div class="header-bar">
            <div class="icon-back">
                <cui-icon-button format="ghost" size="md" @click="$router.push({ name: 'employee2' })">
                    <cui-icon-linear-back />
                </cui-icon-button>
                <span class="text-header">Create Employee </span>
            </div>

            <div class="header-btn">
                <div style="padding-right: 15px; ">
                    <cui-button-default text="Cancle" size="md" @click="$router.push({ name: 'employee2' })" />
                </div>
                <div>
                    <cui-button-primary text="Save" size="md" @click="onSave()" />
                </div>

            </div>

        </div>
        <div class="card-view">
            <div class="card-info">
                <div class="header-info">
                    <div class="edit">
                        <cui-icon-linear-personal-info class="icon" />
                    </div>
                    <span class="text-hederinfo">Basic Info</span>
                </div>

                <div class="info">
                    <div class="inside-info">
                        <label>Firstname<span style="color: red;"> *</span></label>
                        <cui-input-text v-model="rawData.firstname" />
                    </div>
                    <div>
                        <label>Lastname<span style="color: red;"> *</span></label>
                        <cui-input-text v-model="rawData.lastname" />

                    </div>
                    <div>
                        <label>Email</label><span style="color: red;"> *</span>
                        <cui-input-text v-model="rawData.email" />
                    </div>
                    <div>
                        <label>Date of Birth<span style="color: red;"> *</span></label>
                        <cui-input-date-picker v-model="rawData.dateOfBirth" locale="th" />
                        <!-- <input v-model="rawData.dateOfBirth" type="date"> -->
                    </div>
                    <div>
                        <label>Team</label><span style="color: red;"> *</span>

                        <cui-dropdown-normal v-model="rawData.teamId" :options="teamDropDown" :allowEmpty="false"
                            placeholder="Select Team">
                            <template v-slot:option="{ option }">
                                <span class="label"> {{ option.text }}</span>
                            </template>
                        </cui-dropdown-normal>
                    </div>
                    <div>
                        <label>Position</label><span style="color: red;"> *</span>
                        <cui-dropdown-normal v-model="rawData.positionId" :options="positionDropdown"
                            placeholder="Select Position">
                            <template v-slot:option="{ option }">
                                <span class="label"> {{ option.text }}</span>
                            </template>
                        </cui-dropdown-normal>
                    </div>
                </div>
                <hr>
                <div>
                    <div class="header-phone">
                        <div>
                            <cui-icon-fill-call class="call" />
                            <label> Phone</label>
                        </div>
                        <div>
                            <cui-button text="Phone" size="sm" @click="onCreatePhoneNumber()">
                                <template v-slot:prepend>
                                    <cui-icon-linear-plus />
                                </template>
                            </cui-button>

                        </div>
                    </div>
                    <div class="phone-number">
                        <div class="phone" v-for="(phone, index) in rawData.phones" :key="phone.phoneId">
                            <!-- <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="number"
                                ></input> -->
                            <cui-input-text v-model="phone.phoneNumber" class="number" />
                            <cui-icon-button format="ghost" @click="onDeletePhoneNumber(index)">
                                <cui-icon-fill-circle-minus />
                            </cui-icon-button>
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
        employeeDetail()
        router.push({ name: 'employee2' })
    } else {
        updateDetail()
        employeeDetail()
        router.push({ name: 'employee2' })
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
.pagemanage {

    label {
        color: $medium-grey;
        font-size: small;

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
        padding: 10px 0 10px 10px;
        border: none;
        box-shadow: 1px 1px 6px 0px #4549571F;

        @include mobile {}

        .icon-back {
            display: flex;
            flex-direction: row;
        }

        .text-header {
            padding-left: 4px;
            padding-top: 4px;
            font-size: 20px;
            font-weight: 600;

            @include mobile {
                padding-top: 5px;
                font-size: 18px;
            }
        }

        .header-btn {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-right: 12px;

        }

    }

    .card-view {
        display: flex;
        justify-content: center;
        align-items: start;
        min-height: 100vh;
        background: #F7F8FC;

        @include mobile {
            padding: 0 12px 0 12px;
        }

        .card-info {
            margin-bottom: 40px;
            border-radius: 8px;
            background: white;
            width: 607px;
            margin-top: 150px;
            padding: 19px 20px 15px 20px;
            box-shadow: 1px 2px 2px 2px rgb(207, 207, 207);

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
                        color: $primary;
                        width: 20px;
                        height: 20px;
                        align-items: center;
                        position: absolute;

                    }
                }

                .text-hederinfo {
                    font-size: large;
                    font-weight: bold;
                    padding: 9px 0px 2px 9px;
                }

            }

            .info {
                display: grid;
                grid-template-columns: auto auto;
                gap: 15px;
                padding: 0 0 10px 0;
                padding-bottom: 12px;

                @include mobile {
                    display: flex;
                    flex-direction: column;
                }
            }

            .header-phone {
                padding-top: 12px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .call {
                    height: 14px;
                    color: $medium-grey;
                }
            }

            hr {
                border: 1px solid $light-grey2;
                padding-left: 20px;
            }

            .phone-number {
                margin-top: 12px;
                margin-bottom: 15px;

                .phone {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-bottom: 8px;
                    margin-right: 9px;

                    .number {
                        margin-right: 6px;
                    }
                }
            }
        }
    }
}
</style>