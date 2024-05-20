import { computed, inject, reactive, ref } from "vue";
import { Update } from "../interface";
import axios, { AxiosResponse } from 'axios';
import { TeamEventSymbol } from "../key";

const client = axios.create({
    baseURL: "http://localhost:3000"
});



export function useManageTeamDataProvider() {

    const emitter = inject(TeamEventSymbol)!

    const visible = ref(false)
    const isCreateMode = computed(() => {
        return !form.teamId
    })
    const form = reactive<Update>({
        teamId: '',
        name: '',
        description: ''
    })

    const handleCreateTeam = async () => {
        const name = form.name
        const description = form.description

        await client.post("/team/create", { name, description })
        emitter.emit('createsuccess')
     
        // emit('createsuccess')
    }

    const handleUpdateForm = async () => {
        
        await client.post("/team/update", form)
        emitter.emit('createsuccess')
        // emit('createsuccess')
    }

    const onSave = () => {
        if (isCreateMode.value) {
            handleCreateTeam()
        } else {
            handleUpdateForm()

        }
        visible.value = false;
    }

    const loadDetail = async (id: string) => {
        const param = {
            id
        }
        const urlSearchParam = new URLSearchParams(param)
        await client.get<any, AxiosResponse<Update, any>>(`/team/getDetail?${urlSearchParam}`)
            .then((res) => {
                form.teamId = res.data.teamId
                form.name = res.data.name
                form.description = res.data.description
            })
    }

    return {
        onSave,
        loadDetail,
        form,
        visible,
    }
}