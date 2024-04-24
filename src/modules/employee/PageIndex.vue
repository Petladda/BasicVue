<template>
     <main>
          <div class="container">
               <div class="header">
                    <div>
                         <h3>Employee ({{ rawData.data.length }})</h3>
                    </div>
                    <div>
                         <button class="create-btn" @click="$router.push({ name: 'create' })"><span
                                   style="font-size: larger;"> + </span> Create</button>
                    </div>
               </div>
               <hr>
               <div class="search">
                    <i class="pi pi-search"></i>
                    <input class="search-btn" placeholder="Search...">
               </div>
               <div class="table">
                    <table>
                         <thead>
                              <tr>
                                   <th class="firstname">
                                        <input type="checkbox" name="select" class="check-box"> Firstname <i
                                             class="pi pi-sort"></i>
                                   </th>
                                   <th class="">Lastname <i class="pi pi-sort"></i></th>
                                   <th class="">Email <i class="pi pi-sort"></i></th>
                                   <th class="">DateOfBirth <i class="pi pi-sort"></i></th>
                                   <th class="">Position <i class="pi pi-sort"></i></th>
                                   <th class="">Team <i class="pi pi-sort"></i></th>
                                   <th class="">Manage </th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr v-for="employee in rawData.data" :key="employee.employeeId">
                                   <td>
                                        <input type="checkbox" name="select" class="check-box">
                                        <span @click="$router.push({ name: 'view', params: { id: employee.employeeId } })"
                                             style="cursor: pointer; padding-left: 6px;">{{ employee.firstname }}</span>
                                   </td>
                                   <td class="">{{ employee.lastname }}</td>
                                   <td class="">{{ employee.email }}</td>
                                   <td class="">{{ employee.dateOfBirth }}</td>
                                   <td class="">{{ getPositionName(employee.positionId) }}</td>
                                   <td class="">{{ getTeamName(employee.teamId) }}</td>
                                   <td>
                                        <i style="cursor: pointer; color: #646D78;" class="pi pi-pencil"
                                             @click="$router.push({ name: 'edit', params: { id: employee.employeeId } })"></i>
                                        <i style="cursor: pointer; color: #646D78;" class="pi pi-trash"
                                             @click="deleteEmployee(employee.employeeId)"></i>
                                   </td>

                              </tr>

                         </tbody>
                    </table>
               </div>


          </div>
          <div class="pagination" ref="pagination">
               <div>
                    แสดง :
                    <select class="pagesize" @change="loadEmployee" v-model="pageLoad.pageSize">
                         <option v-for="page in pageList" :key="page.id" :value="page.amount">{{ page.amount }}</option>
                    </select>
                    <span style="padding-left: 4px; font-size: small;">{{ currentPage * pageLoad.pageSize + 1 }} - {{
                              Math.min((currentPage + 1) * pageLoad.pageSize, rawData.rowCount) }} จาก {{ rawData.rowCount
                         }}</span>
               </div>
               <div class="">
                    <span @click="prevPage()" class="btn">
                         < </span>
                              <span class="pageshow">{{ currentPage + 1 }} </span> /
                              <span style="font-size: small;">{{ totalPages }}</span>
                              <span @click="nextPage()" class="btn"> > </span>
               </div>
          </div>

     </main>


</template>
<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { computed, reactive, ref } from 'vue';
import { Index, PageType, Response, DropDown } from './interface';
// import { useRouter } from 'vue'


const client = axios.create({
     baseURL: "http://localhost:3000"
});

const pageList: PageType[] = [
     { id: 1, amount: 10 },
     { id: 2, amount: 20 },
     { id: 3, amount: 50 },
]

const pageLoad = reactive<Index>({
     pageIndex: 0,
     pageSize: pageList[0].amount,
     search: {
          text: '',
          teamId: '',
          positionId: '',

     }
})

const rawData = ref<Response>({
     pageIndex: 0,
     pageSize: 10,
     rowCount: 0,
     data: []
})

const positionDropdown = ref<DropDown[]>([]);
const teamDropDown = ref<DropDown[]>([]);


const currentPage = ref<number>(0)
const totalPages = computed(() => Math.ceil(rawData.value.rowCount / pageLoad.pageSize));

function nextPage() {
     if (currentPage.value < totalPages.value - 1) {
          currentPage.value++;
          loadEmployee();
     }
}

function prevPage() {
     if (currentPage.value > 0) {
          currentPage.value--;
          loadEmployee();
     }
}


const loadEmployee = async () => {
     const pageSelect = reactive<Index>({
          pageIndex: pageLoad.pageIndex,
          pageSize: pageLoad.pageSize,
          search: pageLoad.search
     })

     await client.post<any, AxiosResponse<Response, any>>("/employee/index", pageSelect)
          .then((res) => {
               rawData.value = res.data;
               // console.log("loademploy", res);
          })
}

const getpositionDropdown = async () => {
     await client.get<any, AxiosResponse<DropDown[], any>>("/position/getPositionDropdown")
          .then((res) => {
               // console.log("dropdownPosition",res);
               positionDropdown.value = res.data
               loadEmployee()
          })
}

const getTeamDropDown = async () => {
     await client.get<any, AxiosResponse<DropDown[], any>>("/team/getTeamDropdown")
          .then((res) => {
               // console.log("teamdropdown",res);
               teamDropDown.value = res.data
               loadEmployee()
          })
}

const getPositionName = (positionId: string) => {
     const position = positionDropdown.value.find((p) => p.value === positionId);
     return position ? position.text : '';
};

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
$color-btn: #2BB8AF;
$color-text: #646D78;
$color-border: #E3E7F0;

.table {
     padding: 10px 12px 0 12px;
}

table {
     border-spacing: 1;
     border-collapse: collapse;
     background: white;
     border-radius: 4px;
     overflow: hidden;
     width: 100%;
     margin: 0 auto;

}

th,
td {
     padding-left: 12px;
     text-align: start;


}

th {
     i {
          color: $color-text;
          padding-left: 125px;
          cursor: pointer;
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

td {
     i {
          padding-left: 8px;
          padding-right: 8px;
     }
}


.pagination {
     display: flex;
     width: 100%;
     flex-direction: row;
     justify-content: space-between;
     padding: 26px 6px;
     color: $color-text;
     position: fixed;
     bottom: 15px;
}

.pageshow {
     color: black;
     width: 32px;
     height: 24px;
     border: 1px solid $color-border;
}

.container {
     padding-bottom: 50px;
     padding-top: 60px;
}

.header {
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     align-items: center;
     padding: 0 13px 10px 12px;
}

.create-btn {
     color: white;
     background: $color-btn;
     border: none;
     border-radius: 4px;
     width: 100px;
     height: 32px;
     font-size: large;
     cursor: pointer;
}

.search {
     padding: 12px;

     .search-btn {
          width: 240px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid $color-border;
          background: white;
          padding-left: 6px;
          margin-left: 4px;
     }

     i {
          color: $color-text;
          padding-right: 4px;

     }

}

hr {
     border: 1px solid $color-border;
}

.check-box {
     width: 18px;
     height: 18px;
     padding-right: 17px;
     text-align: center;
}
</style>