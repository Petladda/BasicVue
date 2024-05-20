<template>
  <TemplateLayoutIndex content-class="overflow-auto cn-scrollbar" header-class="p-0">
    <template #header>
      <Header title="ตำแหน่ง" :show-count="false" header-title-class="border-bottom">
        <template #header-button>
          <div class="d-flex gap-2">
            <Button text="สร้าง" variant="primary" @click="openModalManagePosition()">
              <template #prepend>
                <IconLinearPlus />
              </template>
            </Button>
          </div>
        </template>
        <template #header-content>
          <div class="row g-3 align-items-center">
            <FormGroup label="สถานะการใช้งาน" class="col-xl-auto col-lg-3 col-md-6 col-12 mnw-270px">
              <DropdownNormal v-model="tableState.search.is_active" :options="activeStatusOptions" />
            </FormGroup>
            <FormGroup label="ค้นหา" class="col-xl-3 col-lg-3 col-md-6 col-12 mnw-270px">
              <InputSearch v-model="localSearchData.queryText" placeholder="รหัส, ชื่อตำแหน่ง" />
            </FormGroup>
            <FormGroup label=" " class="col-lg-3 col-md-6 col-12 mnw-270px">
              <InputCheckbox v-model="tableState.search.no_group" text="กรองเฉพาะที่ยังไม่มีกลุ่มตำแหน่ง" />
            </FormGroup>
          </div>
        </template>
      </Header>
    </template>

    <template #content>
      <TableNormal
        v-model:sortFields="sortFields"
        :fields="fields"
        :items="tableState.data"
        :checked="checkedIndices"
        :action-page="tableState.actionPage"
        @on-confirm-action="onConfirmAction"
      >
        <template #cell-user_referenced="{ item }">
          {{ item.user_referenced }}
        </template>
        <template #cell-is_active="{ item }">
          <Status v-model="item.is_active" />
        </template>
        <template #cell-manage="{ item }">
          <div class="d-flex ">
            <Tooltip text="แก้ไข">
              <template #toggle>
                <IconButton format="ghost" @click="openModalManagePosition(item.position_id)">
                  <IconFillEdit />
                </IconButton>
              </template>
            </Tooltip>
            <Tooltip v-if="item.can_delete" text="ลบ">
              <template #toggle>
                <IconButton format="ghost" @click="deletePosition(item.position_id)">
                  <IconLinearBin />
                </IconButton>
              </template>
            </Tooltip>
          </div>
        </template>
      </TableNormal>
    </template>
  </TemplateLayoutIndex>

  <ModalManagePosition ref="modalManagePosition" />
  <ModalDeleteItem ref="modalDeleteItem" />
</template>

<script setup lang="ts">
import { Button, IconFillEdit, IconLinearBin, IconLinearPlus, InputCheckbox, InputSearch, Tooltip } from '@clicknext/ui'
import { computed, provide, ref, watch } from 'vue'
import mitt from 'mitt'
import type { EventBusType } from './interface'
import ModalManagePosition from './ModalManagePosition.vue'
import { positionEventBusSymbol } from './key'
import { createIndexPositionDataProvider } from './dataprovider/pageIndex'
import FormGroup from '@/components/Form/FormGroup.vue'
import Header from '@/components/Misc/Header.vue'
import TemplateLayoutIndex from '@/components/TemplateLayout/TemplateLayoutIndex.vue'
import ModalDeleteItem from '@/components/Modal/ModalDeleteItem.vue'

import { useDelayedInput } from '@/composables/delay'
import DropdownNormal from '@/components/Dropdown/DropdownNormal.vue'
import type { FieldDefinition, SortFields } from '@/interfaces/tabular'
import IconButton from '@/components/IconButton/IconButton.vue'
import Status from '@/components/Status/Status.vue'
import TableNormal from '@/components/Table/TableNormal.vue'

import type { ConfirmAction } from '@/components/Table/interface'

const {
  tableState,
  checkedIndices,
  searchData,
  deleteSingle,
  deleteMultiple,
} = createIndexPositionDataProvider()

async function onConfirmAction({ actionState, actionComplete }: ConfirmAction) {
  if (actionState === 'can_delete') {
    await multiDeletePosition()
    actionComplete()
  }
}

const sortFields = computed({
  get: () => ({
    sortColumn: tableState.sortColumn,
    sortDirection: tableState.sortDirection,
  }),
  set: ($event: SortFields) => {
    tableState.sortColumn = $event.sortColumn
    tableState.sortDirection = $event.sortDirection
  },
})

const emitter = mitt<EventBusType>()
provide(positionEventBusSymbol, emitter)

emitter.on('closeModalSuccess', () => {
  searchData()
})

const activeStatusOptions = ref([
  { text: 'ทั้งหมด', value: null },
  { text: 'ใช้งาน', value: true },
  { text: 'ไม่ใช้งาน', value: false },
])

const fields: FieldDefinition[] = [
  { label: 'รหัส', key: 'code', thClass: 'align-bottom', sortable: true },
  { label: 'ชื่อตำแหน่ง (Local Language)', key: 'name_local', sortable: true },
  { label: 'ชื่อตำแหน่ง (Foreign Language)', key: 'name_foreign', sortable: true },
  { label: 'ผู้ใช้งาน', key: 'user_referenced', thClass: 'text-center', tdClass: 'text-center', sortable: true },
  { label: 'สถานะการใช้งาน', key: 'is_active', sortable: true },
  { label: 'จัดการ', key: 'manage', sortable: false },
]

const modalManagePosition = ref<InstanceType<typeof ModalManagePosition>>(null!)
async function openModalManagePosition(id?: string) {
  await modalManagePosition.value.openModal(id)
}

const modalDeleteItem = ref<InstanceType<typeof ModalDeleteItem>>(null!)
async function deletePosition(id: string) {
  const confirm = await modalDeleteItem.value.getResult()
  if (confirm)
    await deleteSingle(id)
}

async function multiDeletePosition() {
  const confirm = await modalDeleteItem.value.getResult()
  if (confirm)
    await deleteMultiple()
}

const localSearchData = ref<any>(structuredClone({ ...tableState.search }))
watch(() => localSearchData.value.queryText, useDelayedInput((value) => {
  tableState.search.queryText = value
}))

; (async () => {
  await searchData()
})()
</script>

<style scoped></style>
