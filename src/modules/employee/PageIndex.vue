<template>
     <main>
          <div class="container">

               <h3>Employee ({{ rawData.data.length }})</h3>
               <table>
                    <thead>
                         <tr>
                              <th class="">Firstname</th>
                              <th class="">Lastname</th>
                              <th class="">Email</th>
                              <th class="">DateOfBirth</th>
                              <th class="">Position</th>
                              <th class="">Team</th>
                              <th class="">Manage</th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr v-for="employee in rawData.data" :key="employee.employeeId">
                              <td  @click="$router.push({ name: 'view', params: { id: employee.employeeId } })"><span style="cursor: pointer; padding-left: 6px;">{{ employee.firstname }}</span></td>
                              <td class="">{{ employee.lastname }}</td>
                              <td class="">{{ employee.email }}</td>
                              <td class="">{{ employee.dateOfBirth }}</td>
                              <td class="">{{ getPositionName(employee.positionId) }}</td>
                              <td class="">{{ getTeamName(employee.teamId) }}</td>
                              <td >
                                  <i style="cursor: pointer;"  class="pi pi-pencil"  @click="$router.push({ name: 'edit', params: { id: employee.employeeId } })" ></i>
                                   <i style="cursor: pointer;"  class="pi pi-trash" @click="deleteEmployee(employee.employeeId)" ></i>
                              </td>

                         </tr>

                    </tbody>
               </table>

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



const nextPage = () => {
     if (currentPage.value < totalPages.value - 1) {
          currentPage.value++;
          loadEmployee();
     }
}

const prevPage = () => {
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

const deleteEmployee = async(employeeId: string) => {
     await client.post("/employee/delete",employeeId)
     .then((res)=>{
          console.log("delete",res);
          loadEmployee()
     })
}

(async () => {
     loadEmployee()
     getpositionDropdown()
     getTeamDropDown()
})()
</script>
<style>

body{
     padding-top: 50px;
}
table {
     border-spacing: 1;
     border-collapse: collapse;
     background: white;
     border-radius: 4px;
     overflow: hidden;
     width: 100%;
     margin: 0 auto;
     position: relative;

}

th,
td {
     padding-left: 8px;
     text-align: center;
}

thead tr {
     height: 60px;
     background: cadetblue;
     font-size: 16px;
}

tbody tr {
     height: 48px;
     border-bottom: 1px solid #E3F1D5;

}

i {
     padding-left: 8px;
}

.pagination {
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     padding-top: 20px;
     padding: 6px 6px;
}
.container{
     padding-bottom: 50px;
     
}

</style>