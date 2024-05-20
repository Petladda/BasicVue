<template>

    <div v-if="visible" class="modal-container">
        <div class="header">
            <div>
                <h4>Create Position</h4>
            </div>
            <div @click="closeModal">
                <Close class="close-modal"></Close>
            </div>
        </div>
        <div class="form">
            <label class="">Fields marked with an <span style="color: red;">*</span>
                are required</label>

            <div>
                <p class="" for="name">Position Name <span style="color: red;">*</span>
                </p>
                <input class="name" id="name" v-model="form.name" autocomplete="off" />
            </div>
            <div>
                <p class="">Description</p>
                <textarea class="description" id="description" v-model="form.description"></textarea>
            </div>


        </div>
        <hr>
        <div class="modal-btn">
            <ButtonOutline class="cancle-btn" text="Cancle" size="md" @click="closeModal"></ButtonOutline>
            <Button text="Save" size="md" @click="onSave"></Button>
        </div>


    </div>
    <!-- 
    <Dialog v-model:visible="visible" modal header="Create Position" :style="{ width: '480px' , height:'358px'  }">
        isCreateMode {{ isCreateMode }}

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

            <Button type="button" label="Save" @click="onSave"></Button>

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

const client = axios.create({
    baseURL: "http://localhost:3000"
});

const form = reactive<Update>({
    positionId: '',
    name: '',
    description: ''
})

const isCreateMode = computed(() => {
    return !form.positionId
})

const handleCreatePosition = async () => {
    const name = form.name
    const description = form.description

    await client.post("/position/create", { name, description })
    emit('createsuccess')
}


const handleUpdateForm = async () => {
    await client.post("/position/update", form)
    emit('createsuccess')
}

const onSave = () => {
    if (isCreateMode.value) {
        handleCreatePosition()
        
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
    await client.get<any, AxiosResponse<Update, any>>(`/position/getDetail?${urlSearchParam}`)
        .then((res) => {
            console.log(res)
            form.positionId = res.data.positionId
            form.name = res.data.name
            form.description = res.data.description
        })
}

const clearForm = () => {
    form.positionId = ''
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
$color-border: #E3E7F0;


.modal-container {
    position: absolute;
    top: 300px;
    left: 40vw;
    transform: translate(-50%, -50%);
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

        h4{
            font-size: 18px;
            font-weight: 500;
            color: $dark-grey;
        }

        .close-modal {
            cursor: pointer;
            width: 15px;
            height: 15px;
            color: $medium-grey;
        }
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

    img {
        cursor: pointer;
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
        padding-left: 4px;
        width: 448px;
        height: 52px;
        border: 1px solid $color-border;
        border-radius: 4px;
    }
}

hr {
    border: 1px solid #E3E7F0;
}

.modal-btn {
    display: flex;
    justify-content: end;
    padding-top: 10px;
    padding-bottom: 11px;
    text-align: center;
    margin-right: 14px;

    .cancle-btn{
        margin-right: 8px;
    }

}
</style>