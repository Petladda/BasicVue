<template>
    <main>
        <div class="head">
            <div>
                <h2>Position( )</h2>
            </div>
            <div class="create-btn">

                <div class="card flex justify-content-center">
                    <Button label="create" @click="visible = true"><span> + </span> Create</Button>
                    <Dialog v-model:visible="visible" modal header="Create Position" :style="{ width: '25rem' }">
                        <p class="p-text-secondary block mb-5">Fields marked with an <span style="color: red;">*</span>
                            are required</p>
                        <div class="flex align-items-center gap-3 mb-2">
                            <p for="name" class="font-semibold w-6rem">Position Name <span style="color: red;">*</span>
                            </p>
                            <InputText id="name" v-model="positionName" class="flex-auto " autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-2">
                            <p for="description" class="font-semibold w-6rem">Description <span
                                    style="color: red;">*</span> </p>
                            <InputText id="description" v-model="positionDescription" class="flex-auto"
                                autocomplete="off" />
                        </div>
                        <hr>
                        <div class="flex justify-content-end gap-2">
                            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                            <Button @click="handleCreatePosition" type="submit" label="Save"></Button>
                        </div>
                    </Dialog>
                </div>
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
                            <Checkbox v-model="isSelected" :binary="true"></Checkbox>
                            Position
                        </th>
                        <th class="">Description</th>
                        <th class="text-manage">Manage</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="position in rawData.data" :key="position.positionId">

                        <td>
                            <Checkbox v-model="isSelected" :binary="true"></Checkbox> {{ position.name }}
                        </td>
                        <td class="description">{{ position.description }} </td>
                        <td class="manage">
                            <i @click="test" class="pi pi-pencil"> </i>
                            <i class="pi pi-trash"></i>
                            
                        </td>

                    </tr>
                </tbody>
            </table>

        </div>
        <form class="pagenation">
            <div>
                แสดง :
                <select @click="loadPositon" v-model="sizePage">
                    <option v-for="page in pageList " :key="page.id" :value="page.amount">
                        {{ page.amount }}
                    </option>
                </select>
                <span style="padding-left: 4px; font-size: small;"> {{ currentPage + 1 }} - {{ currentPage + 1 }}
                    จาก</span>
            </div>
            <div class="pagination-wrapper">
                <span @click="prevPage()" class="pagination-btn">
                    < </span>
                        <span class="pageshow">{{ currentPage + 1 }}</span> /
                        <span class="totalpage"></span>
                        <span class="pagination-btn"> > </span>
            </div>
        </form>

    </main>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import axios, { AxiosResponse } from "axios";


const client = axios.create({
    baseURL: "https://api.arnut.co"
});

interface CreateType {
    name: string;
    description: string | null;
}

interface IndexType {
    pageIndex: number;
    pageSize: number;
    search: {
        text: string;
    }
}

const isSelected = ref(false);

const visible = ref(false)
const positionName = ref<string>('');
const positionDescription = ref<string | null>('-');



const handleCreatePosition = () => {
    const name = positionName.value;
    const description = positionDescription.value
    console.log(name);


    client.post("/position/create", { name, description })
        .then((res) => {
            console.log(res);

        })

}

interface PageType {
    id: number;
    amount: number;
}

const pageList: PageType[] = [
    { id: 1, amount: 10 },
    { id: 2, amount: 20 },
    { id: 3, amount: 50 },
]

interface Response {
    pageIndex: number;
    pageSize: number;
    rowCount: number;
    data: {
        positionId: string;
        name: string;
        description: string | null;
    }[];
}

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


const test = () =>{
    console.log("test");
    
}

//const totalPages = computed(() => Math.ceil(rawData.value.length / sizePage.value));

const prevPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
    }
    console.log('prevPage', currentPage.value);

}

/*onst nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
        currentPage.value++;
    }
    console.log('nextPage', currentPage.value);

}*/

const loadPositon = async () => {
    const pageSize = sizePage.value;
    const pageIndex = indexPage.value;
    const search = searchText.value;
    await client.post<any, AxiosResponse<Response, any>>("/position/index", { pageIndex, pageSize, search })
        .then((res) => {
            rawData.value = res.data;


        })
}

const data = rawData.value.data.map((e) => {
    return e

})
console.log(data);



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
    padding-top: 5px;
    min-width: 65rem;

}

tr{
    padding-left: 3px;
}

.manage {
    text-align: end;
    cursor: pointer;
}
.manage,i{
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
    border: 5px solid black;

}
</style>