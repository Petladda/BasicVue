<template>
    <main>
        <div class="head">
            <div>
                <h2>Position( {{ rawData.data.length }} )</h2>
            </div>
            <div>
                
                <button class="btn-create" @click="openModalManage()"><span> + </span> Create</button>
            </div>
            

        </div>
        <ModalManage ref="modalManage" @createsuccess="loadPositon()">

        </ModalManage>
       
        <div class="search">
            <img alt="search" src="../../components/icons/search.svg">
            <input class="search-btn" placeholder="Search..." >
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="select" class="check-box">
                        </th>
                        <th>

                            <span class="text-position">
                                Position
                            </span>

                            <a><img alt="sort" src="../../components/icons/sort.svg"></a>
                        </th>
                        <th>Description <a><img alt="sort" src="../../components/icons/sort.svg"></a></th>
                        <th>Manage</th>
                    </tr>

                </thead>
                <tbody>
                    <tr v-for="position in rawData.data" :key="position.positionId">
                        <td>
                            <input type="checkbox" name="select" class="check-box">
                        </td>
                        <td class="text-position">


                            <span style="cursor: pointer; padding-left: 6px;">{{ position.name }}</span>
                        </td>
                        <td class="description">{{ position.description }} </td>
                        <td class="manage">
                            <a style="cursor: pointer; color: #646D78;" @click="openModalManage(position.positionId)">
                                <img alt="edit" src="../../components/icons/editBtn.svg"></a>

                            <a style="cursor: pointer; color: #646D78;" @click="deletePosition(position)">
                                <img alt="delete" src="../../components/icons/DeleteBtn.svg"></a>

                        </td>

                    </tr>

                </tbody>
            </table>
        </div>


        <div class="pagination" ref="pagination">
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

// const isSelected = ref(false);

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
    loadPositon()
})()

</script>
<style lang="scss" scoped>
$color-text: #646D78;
$color-btn: #2BB8AF;
$color-border: #E3E7F0;

.head {
    position: sticky;
    width: 100%;
    background: #FFFFFF;
    top: 48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 14px 14px 11px 0;
    box-shadow: 1px 1px 1px 1px rgb(207, 207, 207);

    h2 {
        padding-left: 12px
    }

    .btn-create {
        color: white;
        background: $color-btn;
        border: none;
        border-radius: 4px;
        width: 100px;
        height: 32px;
        font-size: large;
        cursor: pointer;
        text-align: center;


    }
}

.check-box {
    width: 18px;
    height: 18px;
    padding-right: 17px;

}



.pagination-btn {
    cursor: pointer;
}

.pagination {
    position: sticky;
    width: auto;
    background: #FFFFFF;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    bottom: 0;
    padding-bottom: 8px;
    padding-left: 12px;
    border: none;
    padding-top: 8px;
    color: $color-text;
    margin-top: 390px;
}

// .pageshow {
//     // border: 1px solid darkgray;
//     // border-radius: 2px;

// }

.totalpage {
    font-size: small;
}

table {
    border-spacing: 1;
    border-collapse: collapse;
    background: white;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
}

th,
td {
    padding-left: 10px;
    text-align: start;
    font-size: 14px;

}


th {
    // padding-right: 28px;

    img {
        padding-left: 380px;
        cursor: pointer;

    }


}

td {
    img {
        padding-right: 8px;
    }
}


thead tr {
    height: 38px;
    background: #F7F8FC;
    font-size: 14px;
    color: $color-text;
    box-shadow: 1px solid $color-border;
}

tbody tr {
    height: 48px;
    border-bottom: 1px solid $color-border;

}


.head-table {
    border: 2px solid black;

}


hr {
    border: 1px solid #E3E7F0;
}

.search {
    padding: 12px;
    position: relative;
    .search-btn {
        width: 240px;
        height: 32px;
        border-radius: 8px;
        border: 1px solid $color-border;
        background: white;
        padding-left: 34px;
        margin-left: 4px;
    }

   

    img {
        position: absolute;
        padding: 8px 10px 8px 8px;

    }

}
</style>