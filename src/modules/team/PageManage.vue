<template>

    <div v-if="visible" class="modal-container">
        <div class="header">
            <div>
                <h4>Create Team</h4>
            </div>
            <div @click="closeModal">
                <Close class="close-modal"></Close>
            </div>
        </div>
        <div class="form">
            <label class="p-text-secondary  block mb-5">Fields marked with an <span style="color: red;">*</span>
                are required</label>

            <div>
                <p for="name" class="">Team Name <span style="color: red;">*</span>
                </p>
                <input class="name" id="name" v-model="form.name" autocomplete="off" />
            </div>
            <div>
                <p>Description</p>
                <textarea class="description" v-model="form.description"></textarea>
            </div>


        </div>
        <hr>
        <div class="modal-btn">
            <ButtonOutline class="cancle-btn" text="Cancle" size="md" @click="closeModal"></ButtonOutline>
            <Button text="Save" size="md" @click="onSave"></Button>
        </div>


    </div>

    <!-- 
    <Dialog v-model:visible="visible" modal header="Team" :style="{ width: '480px', height: '358px' }">
        isCre  ateMode {{ isCreateMode }}

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
        <button class="cancle-btn" type="button" label="Cancel" severity="secondary" @click="closeModal">Cancel</button>

        <button class="save-btn" type="button" label="Save" @click="onSave">Save</button>

    </div>
    </Dialog> -->

</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Update } from './interface';
import axios, { AxiosResponse } from 'axios';
import Close from '../../components/Icons/Close.vue';
import Button from '../../components/Button/Button.vue';
import ButtonOutline from '../../components/Button/ButtonOutline.vue';

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

const handleCreateTeam = async () => {
    const name = form.name
    const description = form.description

    await client.post("/team/create", { name, description })
    emit('createsuccess')
}



const handleUpdateForm = async () => {
    await client.post("/team/update", form)
    emit('createsuccess')
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
    form.description = '-'
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
$color-border: #E3E7F0;


.modal-container {

    position: absolute;
    top: 355px;
    left: 55vw;
    transform: translate(-100%, -65%);
    background-color: #fff;
    border-radius: 8px; 
    box-shadow: 3px 3px 10px 0px #272E393D;
    z-index: 9999;
    width: 480px;
    height: 358px;

    .header {
        padding: 11px 16px 11px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        background: #F7F8FC;
    }

    h4 {
        font-size: 18px;
        font-weight: 500;
        color: $dark-grey;
    }

    .close-modal {
        cursor: pointer;
        fill: $medium-grey;
    }

    .form {
        padding: 12px 16px 64px 16px;
        color: $medium-grey;
    }

    p {
        font-size: 12px;
        padding-top: 12px;
        padding-bottom: 4px;
    }

    label {
        font-size: 14px;
        font-weight: 400;
        padding-bottom: 12px;
    }


    .name {
        padding-top: 4px;
        width: 448px;
        height: 32px;
        border: 1px solid $color-border;
        border-radius: 4px;
        padding-left: 4px;
    }

    .description {

        width: 448px;
        height: 52px;
        border: 1px solid $color-border;
        border-radius: 4px;
        padding-left: 8px;
        padding-top: 8px;
    }
}

hr {
    border: 1px solid #E3E7F0;
}

.modal-btn {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 11px;
    margin-right: 16px;

    .cancle-btn{
        margin-right: 12px;
    }
}
</style>