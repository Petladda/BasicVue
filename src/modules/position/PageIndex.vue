<template>
    <main>
        <div class="head">
            <div>
                <h2>Position( {{ rawData.data.length }} )</h2>
            </div>
            <div class="create-btn">
                <Button label="create" @click="openModalManage()"><span> + </span> Create</Button>

                <ModalManage ref="modalManage"  @createsuccess="loadPositon"  >

                </ModalManage>


            </div>
        </div>
        <hr>
        <div>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-search"> </InputIcon>
                <InputText id="search" placeholder="Search" />
            </IconField>
        </div>
        <div>
            <table>
                <thead>
                    <tr class="head-table">
                        <th class="text-position">
                            <Checkbox v-model="isSelected"></Checkbox>
                            Position
                        </th>
                        <th class="">Description</th>
                        <th class="text-manage">Manage</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="position in rawData.data" :key="position.positionId">

                        <td>
                            <Checkbox v-model="isSelected"></Checkbox>
                            <span style="cursor: pointer; padding-left: 6px;">{{position.name }}</span>
                        </td>
                        <td class="description">{{ position.description }} </td>
                        <td class="manage">
                            <i @click="openModalManage(position.positionId)" class="pi pi-pencil"> </i>
                            <i @click="deletePosition(position)" class="pi pi-trash"></i>

                        </td>

                    </tr>
                </tbody>
            </table>

        </div>


        <div class="pagenation" ref="pagination">
            <div>
                แสดง :
                <select @change="loadPositon" v-model="sizePage">
                    <option v-for="page in pageList" :key="page.id" :value="page.amount">{{ page.amount }}</option>
                </select>
                <span style="padding-left: 4px; font-size: small;">{{ currentPage * sizePage + 1 }} - {{
                    Math.min((currentPage + 1) * sizePage, rawData.rowCount) }} จาก {{ rawData.rowCount }}</span>
            </div>
            <div class="pagination-wrapper">
                <span @click="prevPage()" class="pagination-btn">
                    < </span>
                        <span class="pageshow">{{ currentPage + 1 }} </span> /
                        <span class="totalpage">{{ totalPages }}
                        </span>
                        <span @click="nextPage()" class="pagination-btn"> > </span>
            </div>
        </div>

    </main>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import axios, { AxiosResponse } from "axios";
import ModalManage from './ModalManage.vue'

import { PageType, Response } from './interface';



const client = axios.create({
    baseURL: "http://localhost:3000"
});

const isSelected = ref(false);

const modalManage = ref<InstanceType<typeof ModalManage>>(null!)

const openModalManage = (id?: string | null) => {
    modalManage.value.openModalManage(id)
}




const pageList: PageType[] = [
    { id: 1, amount: 10 },
    { id: 2, amount: 20 },
    { id: 3, amount: 50 },
]


const indexPage = ref<number>(0)
const sizePage = ref<number>(pageList[0].amount)
const searchText = ref<string>("")
const currentPage = ref<number>(0)

const rawData = ref<Response>({
    pageIndex: 0,
    pageSize: 20,
    rowCount: 0,
    data: []
})


const totalPages = computed(() => Math.ceil(rawData.value.rowCount / sizePage.value));

const prevPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
        loadPositon();
    }
};

const nextPage = () => {
    console.log("nextPage");

    if (currentPage.value < totalPages.value - 1) {
        currentPage.value++;
        loadPositon();
    }
};


const loadPositon = async () => {
    const pageSize = sizePage.value;
    const pageIndex = indexPage.value;
    const search = searchText.value;
    await client.post<any, AxiosResponse<Response, any>>("/position/index", { pageIndex, pageSize, search })
        .then((res) => {
            rawData.value = res.data;

        }).catch((error) => {
            console.log(error);

        })
}

const deletePosition = (position: any) => {
    client.post("/position/delete", position)
        .then((res) => {
            console.log("deletedone", res);
            loadPositon()
        })
}



(async () => {
    await loadPositon()
})()

</script>
<style>
.head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.create-btn {
    text-align: center;
    padding-top: 2%;

}

.pagination-btn {
    cursor: pointer;
}

.pagenation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 20px;
}

.pageshow {
    border: 1px solid darkgray;
    border-radius: 2px;

}

.totalpage {
    font-size: small;
}

table {
    width: 100%;
    
    min-width: 65rem;

}

tr {
    padding-left: 3px;
}

.manage {
    text-align: end;
    cursor: pointer;
}

.manage,
i {
    padding-left: 10px;
    padding-right: 5px;
}

.text-position {
    text-align: start;
}

.text-manage {
    text-align: end;
}

.description {
    text-align: center;
}

.head-table {
    border: 2px solid black;

}
</style>