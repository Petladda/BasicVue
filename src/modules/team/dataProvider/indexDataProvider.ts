import { ref, watch } from "vue";
import { PageType, Response } from "../interface";
import axios, { AxiosResponse } from 'axios';

const client = axios.create({
    baseURL: "http://localhost:3000"
});

export function useIndexTeamDataProvider() {

    const rawData = ref<Response>({
        pageIndex: 0,
        pageSize: 20,
        rowCount: 0,
        data: []
    })

    const pageList: PageType[] = [
        { id: 1, amount: 10 },
        { id: 2, amount: 20 },
        { id: 3, amount: 50 },
    ]

    const indexPage = ref<number>(0)
    const sizePage = ref<number>(pageList[0].amount)
    const searchText = ref<string>("")

    const loadTeam = async () => {
        const pageSize = sizePage.value;
        const pageIndex = indexPage.value;
        const search = {
            text: searchText.value
        }
        await client.post<any, AxiosResponse<Response, any>>("/team/index", { pageIndex, pageSize, search })
            .then((res) => {
                rawData.value = res.data;

            }).catch((error) => {
                console.log(error);

            })
    }

    const deleteTeam = (position: any) => {
        client.post("/team/delete", position)
            .then((res) => {
                console.log("deletedone", res);
                loadTeam()
            })
    }

    watch (searchText ,()=>{
        loadTeam()
     })
     

    return {
        rawData,
        loadTeam,
        deleteTeam,
        sizePage,
        searchText,
        pageList
    }
}