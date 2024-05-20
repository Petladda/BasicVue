import { computed, reactive } from 'vue'
import { type PositionUpdateRequest, usePositionApi } from '@/erpApi/modules/position'

export function createModalManagePositionDataProvider() {
  const state = reactive<{
    form: PositionUpdateRequest

  }>({
    form: createDefaultForm(),
  })

  function createDefaultForm() {
    return {
      is_active: true,
    } as PositionUpdateRequest
  }

  const { create, update, detail } = usePositionApi()

  async function loadData(id?: string | null) {
    await Promise.all([
      loadDetail(id),
    ])
  }

  async function loadDetail(id?: string | null) {
    if (id) {
      const info = await detail({ position_id: id }).then(x => x.data!)
      state.form = { ...info }
    }
    else {
      state.form = createDefaultForm()
    }
  }

  async function submitForm() {
    if (!state.form.position_id)
      return await create(state.form)
    else
      return await update(state.form)
  }

  return {
    form: computed(() => state.form),
    loadData,
    submitForm,
  }
}
