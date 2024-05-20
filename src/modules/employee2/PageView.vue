<template>
    <div class="pageview">
        <div class="header-bar">
            <cui-icon-button format="ghost" size="md" @click="$router.push({ name: 'employee2' })">
                <cui-icon-linear-back />
            </cui-icon-button>
            <span class="text-header">View Employee </span>

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
                    <cui-icon-fill-call class="call" />
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
.pageview {

    label {
        color: $medium-grey;
        font-size: small;

    }

    .header-bar {
        position: fixed;
        display: flex;
        align-items: center;
        width: 100%;
        height: 48px;
        background: #FFFFFF;
        top: 48px;
        padding: 10px 0 10px 10px;
        border-bottom: 1px solid azure;
        font-weight: 700;
        font-size: 14px;
        box-shadow: 1px 1px 6px 0px #4549571F;

        .text-header {
            padding-left: 6px;
            font-size: 20px;
            font-weight: 600;

            @include mobile {
                padding-top: 5px;
                font-size: 18px;
            }
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
                gap: 12px;
                padding: 4px 0 12px 0;

                p {
                    padding-top: 8px;
                    font-size: 14px;
                }

                @include mobile {
                    display: flex;
                    flex-direction: column;

                }
            }

            hr {
                border: 1px solid $light-grey2;
                padding-left: 20px;
            }

            .phone {
                padding-top: 9px;

                .call {
                    margin-top: 14px;
                    width: 14px;
                    height: 12px;
                    color: $medium-grey;
                }

                .number {
                    padding-top: 12px;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>