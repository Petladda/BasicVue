<template>

    <Dialog v-model:visible="visible" modal header="Team" :style="{ width: '480px', height: '358px' }">
        <!-- isCre  ateMode {{ isCreateMode }} -->

        <p class="p-text-secondary  block mb-5">Fields marked with an <span style="color: red;">*</span>
            are required</p>
        <div class="flex align-items-center gap-3 mb-2">
            <p for="name" class="font-semibold w-6rem">Team Name <span style="color: red;">*</span>
            </p>
            <input id="name" v-model="form.name" class="flex-auto " autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-2">
            <p for="description" class="font-semibold w-6rem">Description</p>
            <input id="description" v-model="form.description" class="flex-auto" autocomplete="off" />{{ form.teamId }}
        </div>
        <hr>
        <div class="flex justify-content-end gap-2">
            <button class="cancle-btn" type="button" label="Cancel" severity="secondary"
                @click="closeModal">Cancel</button>

            <button class="save-btn" type="button" label="Save" @click="onSave">Save</button>

        </div>
    </Dialog>
    
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Update } from './interface';
import axios, { AxiosResponse } from 'axios';

const emit = defineEmits<{
    (e: 'createsuccess',): void

}>()

const visible = ref(false)
// const isCreateMode = ref(true)
const client = axios.create({
    baseURL: "http://localhost:3000"
});

const form = reactive<Update>({
    teamId: '',
    name: '',
    description: ''
})

const isCreateMode = computed(() => {
    return !form.teamId
})

const handleCreatePosition = async () => {
    const name = form.name
    const description = form.description

    await client.post("/team/create", { name, description })
}



const handleUpdateForm = async () => {
    await client.post("/team/update", form)
}

const onSave = () => {
    if (isCreateMode.value) {
        handleCreatePosition()
    } else {
        handleUpdateForm()
    }


    emit('createsuccess')
    visible.value = false;
}

const loadDetail = async (id: string) => {
    const param = {
        id
    }
    // const urlSearchParam = new URLSearchParams()
    // urlSearchParam.set('id', var1)
    // urlSearchParam.set('aaa', var2)
    // urlSearchParam.set('kkkk', var3)
    // urlSearchParam.set('ppppp', var4)


    // const urlSearchParam = new URLSearchParams({
    //     id: var1
    //     aaa: var2
    //     kkkk: var3
    //     ppppp: var4
    // })
    const urlSearchParam = new URLSearchParams(param)
    await client.get<any, AxiosResponse<Update, any>>(`/team/getDetail?${urlSearchParam}`)
        .then((res) => {
            console.log(res)
            form.teamId = res.data.teamId
            form.name = res.data.name
            form.description = res.data.description
        })
}

const clearForm = () => {
    form.teamId = ''
    form.name = ''
    form.description = ''
}


const openModalManage = (id?: string | null) => {
    clearForm()

    // isCreateMode.value = !id
    if (id) {

        loadDetail(id)
    }

    visible.value = true


}

const closeModal = () => {
    visible.value = false

}


defineExpose({
    openModalManage,
})


</script>


<style lang="scss" scoped>
hr {
    border: 1px solid #E3E7F0;
}

.cancle-btn {
    width: 100px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #E3E7F0;
    background: #FFFFFF;
    cursor: pointer;
}

.save-btn {
    width: 100px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #E3E7F0;
    background: #5119F0;
    color: #FFFFFF;
    cursor: pointer;

}
.save-btn :hover {
            background: #454957;
        }

</style>