<template>
    <div class="container">
        <div class="header">
            <div>
                <h3>Employee2 <span class="employee-lenght"> ({{ rawData.data.length }}) </span> </h3>
            </div>
            <div>
                <cui-button text="Create" variant="primary" size="md" @click="$router.push({ name: 'create2' })">
                    <template v-slot:prepend>
                        <cui-icon-linear-plus />
                    </template>
                </cui-button>
            </div>
        </div>
        <div class="search">
            <cui-input-search placeholder="Search" size="md" />
        </div>
        <div class="table">
            <cui-table-normal v-model:sort-fields="sortField" :field="fieldSimple" :itemGroups="rawData.data"
                :haveCheck="false" :pages="{ pageIndex: 0, pageSize: rawData.pageSize }">

                <template #cell-firstname="{ item }">
                    <Link :text="item.firstname"
                        @click="$router.push({ name: 'view2', params: { id: item.employeeId } })">
                    </Link>

                    <!-- <cui-text-link target :text="item.firstname"
                        @click="$router.push({ name: 'view2', params: { id: item.employeeId } })">
                    </cui-text-link> -->
                </template>

                <template #cell-positionId="{ item }">
                    {{ getPositionName(item.positionId) }}
                </template>
                <template #cell-teamId="{ item }">
                    {{ getTeamName(item.teamId) }}
                </template>
                <template #cell-manage="{ item }">
                    <cui-icon-button format="ghost"
                        @click="$router.push({ name: 'edit2', params: { id: item.employeeId } })">
                        <cui-icon-linear-edit />
                    </cui-icon-button>
                    <cui-icon-button format="ghost" @click="deleteEmployee(item.employeeId)">
                        <cui-icon-linear-bin />
                    </cui-icon-button>
                </template>
            </cui-table-normal>
        </div>

        <!-- <div class="pagination">
            <cui-pagination :modelValue="{ pageIndex: pageLoad.pageIndex, pageSize: pageLoad.pageSize }" :pageSizeOptions="pageList" isPageSizeOptions @update:modelValue="onUpdatePagination" />

        </div> -->
    </div>

</template>
<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { reactive, ref, watch } from 'vue';
import { Index, PageType, Response, DropDown } from './interface';
import Link from '../../components/Link/Link.vue'


const client = axios.create({
    baseURL: "http://localhost:3000"
});
const searchQuery = ref<string>('')
const teamQuery = ref<string>('')
const positionQuery = ref<string>('')
const sortField = ref({ direction: null })
const positionDropdown = ref<DropDown[]>([]);
const teamDropDown = ref<DropDown[]>([]);

const pageList: PageType[] = [
    { text: '10', value: 10 },
    { text: '20', value: 20 },
    { text: '50', value: 50 },
]
const pageLoad = reactive<Index>({
    pageIndex: 0,
    pageSize: pageList[0].value,
    search: {
        text: searchQuery.value,
        teamId: teamQuery.value,
        positionId: positionQuery.value,
    }
})

const rawData = ref<Response>({
    pageIndex: 0,
    pageSize: pageList[0].value,
    rowCount: 0,
    data: []
})

// const page = ref<Response>({ pageIndex: 0, pageSize: pageList[0].value, data: [], rowCount: 0 })

const fieldSimple = ref([
    { label: 'Firstname', key: 'firstname', thClass: 'mxw-170px', tdClass: 'mxw-170px' },
    { label: 'Lastname', key: 'lastname' },
    { label: 'Email', key: 'email', thClass: 'mxw-170px', tdClass: 'mxw-170px' },
    { label: 'DateOfBirth', key: 'dateOfBirth' },
    { label: 'Position', key: 'positionId' },
    { label: 'Team', key: 'teamId' },
    { label: 'Manage', key: 'manage' },
])

const loadEmployee = async () => {
    const pageSelect = reactive<Index>({
        pageIndex: pageLoad.pageIndex,
        pageSize: pageLoad.pageSize,
        search: {
            text: searchQuery.value,
            teamId: teamQuery.value,
            positionId: positionQuery.value,
        }
    })
    await client.post<any, AxiosResponse<Response, any>>("/employee/index", pageSelect)
        .then((res) => {
            rawData.value = res.data;

        })
}

watch([searchQuery, teamQuery, positionQuery], () => {
    loadEmployee();
}, { immediate: true })

const getpositionDropdown = async () => {
    await client.get<any, AxiosResponse<DropDown[], any>>("/position/getPositionDropdown")
        .then((res) => {
            positionDropdown.value = res.data
            loadEmployee()
        })
}
const getPositionName = (positionId: string) => {
    const position = positionDropdown.value.find((p) => p.value === positionId);
    return position ? position.text : '';
};

const getTeamDropDown = async () => {
    await client.get<any, AxiosResponse<DropDown[], any>>("/team/getTeamDropdown")
        .then((res) => {
            teamDropDown.value = res.data
            loadEmployee()
        })
}
const getTeamName = (teamId: string) => {
    const team = teamDropDown.value.find((t) => t.value === teamId);
    return team ? team.text : '';
}
const deleteEmployee = async (employeeId: string) => {
    await client.post("/employee/delete", employeeId)
        .then((res) => {
            console.log("delete", res);
            loadEmployee()
        })
}


(async () => {
    loadEmployee()
    getpositionDropdown()
    getTeamDropDown()
})()
</script>
<style lang="scss" scoped>
.container {
    padding-bottom: 50px;
    padding-top: 60px;

    h3 {
        color: $dark-grey;
    }

    .header {
        position: fixed;
        width: 100%;
        background: #FFFFFF;
        top: 45px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 13px 10px 12px;
        box-shadow: 0 0 1px 1px $light-grey2;

        .employee-lenght {
            color: $medium-grey;
        }

        h3 {
            color: $dark-grey;
        }
    }

    .search {
        margin-top: 50px;
        margin-left: 15px;
        position: fixed;
        background: white;
        width: 240px;
        display: flex;
        flex-direction: row;
        align-items: center;

        @include mobile {
            width: calc(100vw - 30px);
        }
    }

    .table {
        padding: 50px 8px 0 8px;

        @include mobile {
            overflow: auto;
            width: 100vw;
            // -webkit-overflow-scrolling: touch;
        }
    }

    .pagination {
        position: fixed;
        width: 100%;
        background: #FFFFFF;
        padding: 8px 12px 10px 8px;
        color: $medium-grey;
        position: fixed;
        bottom: 24px;

    }
}
</style>