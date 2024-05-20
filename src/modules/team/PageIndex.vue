<template>
    <div class="head">
        <div>
            <h2>Team <span class="team-lenght">({{ rawData.data.length }})</span></h2>
        </div>
        <div>
            <Button text="Create" size="md" @click="openModalManage()">
                <template v-slot:icon-left>
                    <Plus></Plus>
                </template>
            </Button>

        </div>

        <PageManage ref="modalManage"  >
            
        </PageManage>

    </div>

    <div class="search">
        <Search class="icon"></Search>
        <input class="search-btn" placeholder="Team Name" v-model="searchText">
    </div>
    <div class="table">
        <table>
            <thead>
                <tr>
                    <!-- <th>
                        <input type="checkbox" name="select" class="check-box">
                    </th> -->
                    <th class="">
                        Team
                    </th>
                    <th class="description">Description</th>
                    <th class="text-manage">Manage </th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="team in rawData.data" :key="team.teamId">
                    <!-- <td>
                        <input type="checkbox" name="select" class="check-box">
                    </td> -->
                    <td class="text-team">
                        <span style="cursor: pointer; padding-left: 6px;">{{ team.name }}</span>
                    </td>
                    <td class="description">{{ team.description }} </td>
                    <td class="text-manage">
                        <div class="icon-manage">
                            <IconButton size="sm" @click="openModalManage(team.teamId)">
                                <Edit></Edit>
                            </IconButton>
                            <IconButton size="sm" @click="deleteTeam(team)">
                                <Bin></Bin>
                            </IconButton>
                        </div>



                    </td>

                </tr>
            </tbody>
        </table>

    </div>


    <div class="pagination" ref="pagination">
        <!-- <cui-pagination v-model="page" /> -->
        <div>
            <span style="font-size: 12px;">Show: </span>
            <select class="pagesize" @change="loadTeam" v-model="sizePage">
                <option v-for="page in pageList" :key="page.id" :value="page.amount">{{ page.amount }}</option>
            </select>
            <span style="padding-left: 4px; font-size: small;">{{ currentPage * sizePage + 1 }} - {{
                Math.min((currentPage + 1) * sizePage, rawData.rowCount) }} of {{ rawData.rowCount }}</span>
        </div>
        <div class="pagination-wrapper">
            <Arrowleft @click="prevPage()" class="arrow"></Arrowleft>
            <div class="pageshow">
                <label>{{ currentPage + 1 }} </label>
            </div>
            /
            <span class="totalpage">{{ totalPages }}
            </span>
            <ArrowRight @click="nextPage()" class="arrow"></ArrowRight>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref, computed, provide } from 'vue';
import PageManage from './PageManage.vue'

import { EventTeam } from './interface';
import IconButton from '../../components/Button/IconButton.vue';
import Edit from '../../components/Icons/Edit.vue';
import Bin from '../../components/Icons/Bin.vue';
import Button from '../../components/Button/Button.vue';
import Plus from '../../components/Icons/Plus.vue';
import Arrowleft from '../../components/Icons/Arrowleft.vue';
import ArrowRight from '../../components/Icons/ArrowRight.vue';
import Search from '../../components/Icons/Search.vue';

import mitt from 'mitt'
import {TeamEventSymbol} from './key'
import { useIndexTeamDataProvider } from './dataProvider/indexDataProvider'


const dataProvier = useIndexTeamDataProvider()

const { rawData, loadTeam,deleteTeam,searchText,sizePage,pageList } = dataProvier


const emitter = mitt<EventTeam>()
provide(TeamEventSymbol, emitter)

emitter.on('createsuccess', () => {
  loadTeam()
})

const modalManage = ref<InstanceType<typeof PageManage>>(null!)

const openModalManage = (id?: string | null) => {
    modalManage.value.openModalManage(id)
}


const currentPage = ref<number>(0)

const totalPages = computed(() => Math.ceil(rawData.value.rowCount / sizePage.value));

const prevPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
        loadTeam();
    }
};

const nextPage = () => {
    console.log("nextPage");

    if (currentPage.value < totalPages.value - 1) {
        currentPage.value++;
        loadTeam();
    }
};



(async () => {
    loadTeam()
})()

</script>
<style lang="scss" scoped>
.head {
    position: fixed;
    width: calc(100% - 215px);
    background: #FFFFFF;
    top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px 11px 12px;
    box-shadow: 1px 2px 2px 1px $light-grey2;

    .team-lenght {
        color: $medium-grey;
    }

    h2 {
        padding-left: 12px;
        color: $dark-grey;
        font-size: 20px;
    }
}


hr {
    border: 1px solid $light-grey2;
}


.pagination-btn {
    cursor: pointer;
}

.pagination {
    position: fixed;
    width: calc(100% - 215px);
    background: white;
    bottom: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #646D78;
    padding: 8px 12px 12px 8px;
    margin-top: 390px;

    .pagesize {
        border-color: 1px solid $light-grey;
        border-radius: 4px;
        width: 52px;
        height: 24px;
        color: $light-grey;
    }
}

.arrow {
    cursor: pointer;
    padding-top: 2px;
    margin-right: 4px;
    margin-left: 4px;
}

.pageshow {

    display: inline;
    padding: 2px 12px 4px 12px;
    border: 1px solid $light-grey2;
    border-radius: 4px;

    label {
        color: $dark-grey;
    }
}

.table {
    margin-top: 120px;
    padding: 0px 12px 0 12px;
    margin-bottom: 20px
}

table {

    border-spacing: 1;
    border-collapse: collapse;
    background: white;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    padding-right: 600px;
    margin-top: 57px;
    border-collapse: collapse;

}

th,
td {
    padding-left: 10px;
    text-align: start;
    font-size: 14px;

    &.text-manage {
        text-align: end;
        padding-right: 35px;
    }

    &.description {
        margin-bottom: 150px;
    }
}

.icon-manage {
    display: flex;
    flex-direction: row;
    justify-content: end;
}

th {
    box-shadow: 0 3px 2px -2px $light-grey2;

    img {
        padding-left: 400px;
        cursor: pointer;

    }
}



thead tr {
    height: 38px;
    background: #F7F8FC;
    font-size: 14px;
    color: $medium-grey;
    box-shadow: 1px solid $light-grey2;
}

tbody tr {
    height: 48px;
    border-bottom: 1px solid $light-grey2;

}

td {
    img {
        padding-right: 6px;
    }
}

.check-box {
    width: 18px;
    height: 18px;
    padding-right: 17px;

}

.head-table {
    border: 2px solid black;

}

.search {
    padding: 13px;
    position: fixed;
    background: white;
    width: 100vw;
    top: 106px;

    .search-btn {
        width: 240px;
        height: 32px;
        border-radius: 8px;
        border: 1px solid $light-grey2;
        background: white;
        padding-left: 34px;
        margin-left: 4px;

    }



    .icon {
        color: $medium-grey;
        width: 48px;
        height: 30px;
        position: absolute;
        padding: 8px 10px 8px 8px;

    }

}
</style>