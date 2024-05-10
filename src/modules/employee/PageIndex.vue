<template>
     <main>
          <div class="container">
               <div class="header">
                    <div>
                         <h3>Employee <span class="employee-lenght"> ({{ rawData.data.length }}) </span> </h3>
                    </div>
                    <div>
                         <Button text="Create" size='md'  @click="$router.push({ name: 'create' })">
                              <template v-slot:icon-left>
                                   <Plus></Plus>
                              </template>


                         </Button>

                    </div>
               </div>
               <hr>
               <div class="filter">
                    <div class="search">
                         <div>
                              <Search class="icon"></Search>
                              <input class="search-btn" placeholder="Search" v-model="searchQuery">
                         </div>
                         <!-- <div>
                              <label>Team</label><span style="color: red;"> *</span>
                              <select class="select-option" v-model="teamQuery">
                                   <option v-for="team in teamDropDown" :key="team.value" :value="team.value">
                                        {{ team.text }}
                                   </option>
                              </select>
                         </div>
                         <div>
                              <label>Position</label><span style="color: red;"> *</span>
                              <select class="select-option" v-model="positionQuery">
                                   <option v-for="position in positionDropdown " :key="position.value"
                                        :value="position.value">
                                        {{ position.text }}
                                   </option>
                              </select>
                         </div> -->

                    </div>

                    <div class="position">
                         <div>


                         </div>
                    </div>

               </div>

               <div class="table">
                    <table>
                         <thead>
                              <tr>
                                   <!-- <th>
                                        <input type="checkbox" name="select" class="check-box">
                                   </th> -->
                                   <th class="firstname">
                                        Firstname
                                   </th>
                                   <th class="">Lastname
                                   </th>
                                   <th class="">Email
                                   </th>
                                   <th class="">DateOfBirth </th>
                                   <th class="">Position </th>
                                   <th class="">Team </th>
                                   <th class="manage">Manage </th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr v-for="employee in rawData.data" :key="employee.employeeId">
                                   <!-- <td>
                                        <input type="checkbox" name="select" class="check-box">
                                   </td> -->
                                   <td>
                                        <Link :text="employee.firstname"
                                             @click="$router.push({ name: 'view', params: { id: employee.employeeId } })">
                                        </Link>
                                        <!-- <span 
                                             style="cursor: pointer; padding-left: 6px;">{{ employee.firstname }}</span> -->
                                   </td>
                                   <td class="">{{ employee.lastname }}</td>
                                   <td class="">{{ employee.email }}</td>
                                   <td class="">{{ employee.dateOfBirth }}</td>
                                   <td class="">{{ getPositionName(employee.positionId) }}</td>
                                   <td class="">{{ getTeamName(employee.teamId) }}</td>
                                   <td class="manage">
                                        <div class="icon">
                                             <IconButton size="md"
                                                  @click="$router.push({ name: 'edit', params: { id: employee.employeeId } })">
                                                  <Edit></Edit>
                                             </IconButton>

                                             <IconButton size="md" @click="deleteEmployee(employee.employeeId)">
                                                  <Bin></Bin>
                                             </IconButton>
                                        </div>



                                   </td>

                              </tr>

                         </tbody>
                    </table>
               </div>


          </div>
          <div class="pagination" ref="pagination">
               <div>
                    <span style="font-size: 12px;">Show: </span>
                    <select class="pagesize" @change="loadEmployee" v-model="pageLoad.pageSize">
                         <option v-for="page in pageList" :key="page.id" :value="page.amount">{{ page.amount }}</option>
                    </select>
                    <span style="padding-left: 4px; font-size: 12px;">{{ currentPage * pageLoad.pageSize + 1 }} - {{
                              Math.min((currentPage + 1) * pageLoad.pageSize, rawData.rowCount) }} of {{ rawData.rowCount
                         }}</span>
               </div>
               <div class="">
                    <Arrowleft @click="prevPage()" class="arrow"></Arrowleft>
                    <div class="pageshow">
                         <label>{{ currentPage + 1 }} </label>
                    </div>
                    /
                    <span style="font-size: small;">{{ totalPages }}</span>
                    <ArrowRight @click="nextPage()" class="arrow"></ArrowRight>

               </div>
          </div>

     </main>
     <Footer></Footer>

</template>
<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { computed, reactive, ref, watch } from 'vue';
import { Index, PageType, Response, DropDown } from './interface';
import Button from '../../components/Button/Button.vue';
import Plus from '../../components/Icons/Plus.vue';
import Search from '../../components/Icons/Search.vue';
import Edit from '../../components/Icons/Edit.vue';
import Bin from '../../components/Icons/Bin.vue';
import IconButton from '../../components/Button/IconButton.vue';
import Arrowleft from '../../components/Icons/Arrowleft.vue';
import ArrowRight from '../../components/Icons/ArrowRight.vue';
import Link from '../../components/Link/Link.vue'
import Footer from '../../components/Layout/Footer.vue'

const searchQuery = ref<string>('')
const teamQuery = ref<string>('')
const positionQuery = ref<string>('')

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
          text: searchQuery.value,
          teamId: teamQuery.value,
          positionId: positionQuery.value,

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
const totalPages = computed(() => Math.ceil(rawData.value.data.length / pageLoad.pageSize));

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

const getTeamDropDown = async () => {
     await client.get<any, AxiosResponse<DropDown[], any>>("/team/getTeamDropdown")
          .then((res) => {
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
.table {
     padding: 10px 12px 0 12px;

     @include mobile {
          
          width: 100vw;
          display: inline-block;
          flex-wrap: nowrap;
          overflow: auto;
          height: 85vh;
          // -webkit-overflow-scrolling: touch;

     }
}

table {

     border-spacing: 1;
     border-collapse: collapse;
     background: white;
     border-radius: 4px;
     overflow: hidden;
     width: 100%;
     margin: 95px auto;

     @include mobile{
          width: 250vw;
     }

}

th,
td {
     padding-left: 12px;
     text-align: start;
     font-size: 14px;

     
}

th {
     font-size: 12px;
     font-weight: 700;
     box-shadow: 0 3px 2px -2px $light-grey2;

     img {
          color: $medium-grey;
          padding-left: 12px;
          cursor: pointer;
     }
}



thead tr {
     height: 38px;
     background: $grey-bg;
     font-size: 14px;
     color: $medium-grey;
     box-shadow: 1px solid $light-grey2;
}

tbody tr {
     height: 48px;
     border-bottom: 1px solid $light-grey2;

}

.icon {
     display: flex;
     flex-direction: row;
}

.pagination {
     position: fixed;
     width: 100%;
     background: #FFFFFF;
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     padding: 8px 12px 12px 8px;
     color: $medium-grey;
     position: fixed;
     bottom: 24px;

     .pagesize {
          border-color: 1px solid $light-grey;
          border-radius: 4px;
          width: 52px;
          height: 24px;
          fill: $light-grey;
     }
}



.container {
     padding-bottom: 50px;
     padding-top: 60px;
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
     box-shadow: 1px 2px 2px 1px $light-grey2;

     .employee-lenght {
          color: $medium-grey;
     }

     h3 {
          color: $dark-grey;
     }


}

.filter {
     display: flex;
     flex-direction: row;

     .team {
          padding: 12px;
          margin-top: 36px;
          position: fixed;
          background: white;
          width: 100vw;
     }
}

.search {
     padding: 12px;
     margin-top: 36px;
     position: fixed;
     background: white;
     width: 100%;
     display: flex;
     flex-direction: row;
     align-items: center;

     .search-btn {
          width: 240px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid $light-grey2;
          background: white;
          padding-left: 34px;
          margin-left: 4px;

          @include mobile {
               width: calc(100vw - 30px);
          }
     }

     .icon {
          fill: $medium-grey;
          width: 48px;
          height: 30px;
          position: absolute;
          padding: 8px 10px 8px 8px;
     }

     .select-option {
          width: 240px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid $light-grey2;
          background: white;
          padding-left: 10px;
          padding-right: 10px;
          margin-left: 4px;
     }

     label {
          padding-left: 12px;
          color: $medium-grey;
          font-size: 14px;
     }
}

hr {
     border: 1px solid $light-grey2;
}

.check-box {
     width: 18px;
     height: 18px;
     padding-right: 17px;
     text-align: center;

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
</style>