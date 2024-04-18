<template>

    <Dialog v-model:visible="visible" modal header="Create Position" :style="{ width: '25rem' }">
        <p class="p-text-secondary block mb-5">Fields marked with an <span style="color: red;">*</span>
            are required</p>
        <div class="flex align-items-center gap-3 mb-2">
            <p for="name" class="font-semibold w-6rem">Position Name <span style="color: red;">*</span>
            </p>
            <InputText id="name" v-model="form.name" class="flex-auto " autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-2">
            <p for="description" class="font-semibold w-6rem">Description</p>
            <InputText id="description" v-model="form.description" class="flex-auto" autocomplete="off" />
        </div>
        <hr>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="closeModal"></Button>
            <Button v-if="isCreateMode" type="button" label="Create" @click="handleCreatePosition"></Button>
            <Button v-else type="button" label="Update" @click="handleUpdateForm"></Button>

        </div>
    </Dialog>

</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Update } from './interface';
import axios, { AxiosResponse } from 'axios';

const emit = defineEmits<{
    (e: 'createsuccess',): void
   
}>()

const visible = ref(false)
const isCreateMode = ref(true)
const client = axios.create({
    baseURL: "https://api.arnut.co"
});

const form = reactive<Update>({
    positionId: '',
    name: '',
    description: ''

})



const handleCreatePosition = async () => {
    const name = form.name
    const description = form.description
    await client.post("/position/create", { name, description })
        .then(() => {
            emit('createsuccess')
            visible.value = false;
        })

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
    await client.get<any, AxiosResponse<Update, any>>(`/position/getDetail?${urlSearchParam}`)
        .then((res) => {
            console.log(res)
            form.positionId = res.data.positionId
            form.name = res.data.name
            form.description = res.data.description
            isCreateMode.value = false
        })
}

const clearForm = () => {
    form.name = ''
    form.description = ''
}

const openModalCreate = () => {
    clearForm()
    visible.value = true
    isCreateMode.value = true

}
const openModalUpdate = (id: string) => {
    clearForm()
    loadDetail(id)
    visible.value = true
    isCreateMode.value = false

}

const closeModal = () => {
    visible.value = false

}

const handleUpdateForm = async () => {
    await client.post("/position/update", form)
        .then(() => {
            emit('createsuccess')
            visible.value = false;
        })
}


defineExpose({
    openModalCreate,
    openModalUpdate
})


</script>


<style></style>