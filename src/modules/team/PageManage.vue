<template>
    <cui-modal :show="visible" size="md" @close="visible = false" footerAlign="right">
        <template v-slot:header>
            Create Something
        </template>
        <template v-slot:body>
            <label class="text-detail">Fields marked with an <span style="color: red;">*</span>
                are required</label>
            <div>
                <p class="text-input">Team Name <span style="color: red;">*</span></p>
                <cui-input-text v-model="form.name" />
                <p class="text-input">Description</p>
                <cui-input-text-area v-model="form.description" class="description" />
            </div>

        </template>
        <template v-slot:footer>
            <div>
                <cui-button text="Cancel" @click="closeModal" class="cancle-btn" />
                <cui-button text="Save" variant="primary" @click="onSave" />

            </div>
        </template>
    </cui-modal>

</template>
<script setup lang="ts">
// import { inject } from 'vue';
// import {TeamEventSymbol} from './key'

import { useManageTeamDataProvider } from './dataProvider/manageDataProvider'

const dataProvier = useManageTeamDataProvider()
const { onSave, loadDetail, visible, form } = dataProvier


const clearForm = () => {
    form.teamId = ''
    form.name = ''
    form.description = ''
}

const openModalManage = (id?: string | null) => {
    clearForm()

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
.text-input {
    padding-top: 12px;
    padding-bottom: 6px;
}

.description {
    margin-bottom: 40px;
}
</style>