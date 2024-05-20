<template>
  <Modal
    :show="showModal"
    footer-align="right"
    class="position"
    @close="closeModal"
  >
    <template #header>
      {{ !form.position_id ? tc('titleCreate') : tc ('titleEdit') }}
    </template>
    <template #body>
      <FormLabelRequired />
      <div class="row g-2" style="--bs-gutter-x: 12px;">
        <FlexibleScope v-slot="{ validation }" :setup-scope="{ validation: codeValidation }">
          <FormGroup
            label="รหัส"
            required
            class="col-7"
            :validation-state="validation.validationState"
          >
            <InputText
              v-model="form.code"
              :show-border-red="validation.validationState.valid === false"
              @input="validation.validate()"
            />
          </FormGroup>
        </FlexibleScope>
        <FormGroup label="สถานะการใช้งาน" class="col-5">
          <InputSwitcher v-model="form.is_active" />
        </FormGroup>
        <FlexibleScope v-slot="{ validation }" :setup-scope="{ validation: nameLocalValidation }">
          <FormGroup
            label="ชื่อตำแหน่ง (Local Language)"
            required
            class="col-12"
            :validation-state="validation.validationState"
          >
            <InputText
              v-model="form.name_local"
              :show-border-red="validation.validationState.valid === false"
              @input="validation.validate()"
            />
          </FormGroup>
        </FlexibleScope>
        <FlexibleScope v-slot="{ validation }" :setup-scope="{ validation: nameForeignValidation }">
          <FormGroup
            label="ชื่อตำแหน่ง (Foreign Language)"
            required
            class="col-12"
            :validation-state="validation.validationState"
          >
            <InputText
              v-model="form.name_foreign"
              :show-border-red="validation.validationState.valid === false"
              @input="validation.validate()"
            />
          </FormGroup>
        </FlexibleScope>
        <FormGroup label="รายละเอียด" class="col-12">
          <InputTextArea
            :rows="4"
            :model-value="form.description ?? undefined"
            @update:model-value="form.description = $event"
          />
        </FormGroup>
      </div>
    </template>
    <template #footer>
      <Button text="ยกเลิก" @click="closeModal" />
      <Button
        variant="primary"
        text="บันทึก"
        :loading="lockBtn"
        @click="save()"
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Button, InputText, InputTextArea, Modal, useToastNotification } from '@clicknext/ui'
import { computed, inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { createModalManagePositionDataProvider } from './dataprovider/modalManage'
import { positionEventBusSymbol } from './key'
import { type ValidationFeedback, type ValidationPact, useFieldValidation, useValidateAllFields } from '@/composables/validation'
import { checkApiResultSuccess } from '@/utils/erpApi'
import FormLabelRequired from '@/components/Form/FormLabelRequired.vue'
import FormGroup from '@/components/Form/FormGroup.vue'
import FlexibleScope from '@/utils/FlexibleScope'
import { RequiredValidationPact } from '@/utils/validation'
import { type PositionUpdateRequest, usePositionApi } from '@/erpApi/modules/position'
import InputSwitcher from '@/components/Input/InputSwitcher.vue'

const { form, loadData, submitForm } = createModalManagePositionDataProvider()
const { t: tc } = useI18n()

const showModal = ref(false)
const lockBtn = ref(false)

const { success, fail } = useToastNotification()
const emitter = inject(positionEventBusSymbol)!

const codeValidation = useFieldValidation(computed(() => form.value.code), {
  validationsPacts: [RequiredValidationPact],
  throttledValidationsPacts: {
    delayMode: 'Throttle',
    duration: 2000,
    validationsPacts: [checkDuplicateInput('code', 'รหัสนี้ถูกใช้งานแล้ว')],
  },
})
const nameLocalValidation = useFieldValidation(computed(() => form.value.name_local), {
  validationsPacts: [RequiredValidationPact],
  throttledValidationsPacts: {
    delayMode: 'Throttle',
    duration: 2000,
    validationsPacts: [checkDuplicateInput('name_local', 'ชื่อนี้ถูกใช้งานแล้ว')],
  },
})
const nameForeignValidation = useFieldValidation(computed(() => form.value.name_foreign), {
  validationsPacts: [RequiredValidationPact],
  throttledValidationsPacts: {
    delayMode: 'Throttle',
    duration: 2000,
    validationsPacts: [checkDuplicateInput('name_foreign', 'ชื่อนี้ถูกใช้งานแล้ว')],
  },
})

const positionApi = usePositionApi()
function checkDuplicateInput(field: keyof PositionUpdateRequest, feedback?: string): ValidationPact<ValidationFeedback> {
  return {
    failingSeverity: 'Error',
    feedback: () => ({ i18nkey: feedback }),
    validate: async () => {
      const model = {
        id: form.value.position_id || '',
        field,
        value: (form.value[field] as string) || '',
      }
      return await positionApi.checkDuplicateInput(model).then(x => !(x.status === 900))
    },
  }
}

const formValidation = useValidateAllFields(computed(() => [
  codeValidation,
  nameForeignValidation,
  nameLocalValidation,
]))

async function save() {
  lockBtn.value = true
  try {
    const valid = await formValidation.validateAll()
    if (valid) {
      await submitForm().then(checkApiResultSuccess)
      emitter.emit('closeModalSuccess')
      success()
      closeModal()
    }
  }
  catch (e) {
    fail()
  }
  lockBtn.value = false
}

function closeModal() {
  showModal.value = false
}
async function openModal(position_id?: string | null) {
  await loadData(position_id)
  formValidation.resetAll()
  showModal.value = true
}

defineExpose({
  openModal,
})
</script>

<style lang="scss"></style>

<i18n locale="en" lang="yaml">
  titleCreate: Create Position
  titleEdit: Edit Position
</i18n>

<i18n locale="th" lang="yaml">
  titleCreate: สร้างตำแหน่ง
  titleEdit: แก้ไขตำแหน่ง
</i18n>
