import { useToastNotification } from '@clicknext/ui'
import { computed, reactive, ref, watch } from 'vue'
import type { PositionIndexData } from '../interface'
import type { ConditionedTabularState, PaginatedResult } from '@/interfaces/tabular'
import { defaultPageSize } from '@/utils/pagination'
import { type PositionIndexRequest, type PositionIndexResponse, usePositionApi } from '@/erpApi/modules/position'
import filterDeletableIds from '@/utils/indexpage'
import { checkApiResultSuccess } from '@/utils/erpApi'

export function createIndexPositionDataProvider() {
  const { index, multiDelete, ...positionApi } = usePositionApi()

  const rawData = ref<PaginatedResult<PositionIndexResponse>>({
    data: [],
    rowCount: 0,
    pageIndex: 0,
    pageSize: defaultPageSize,
  })

  const tableState: ConditionedTabularState<PositionIndexRequest, PositionIndexData> = reactive({
    data: computed(() => rawData.value.data.map((x): PositionIndexData => ({
      ...x,
      can_edit: true,
      can_delete: !x.has_referenced,
    }))),
    rowCount: computed(() => rawData.value.rowCount),
    pageIndex: 0,
    pageSize: defaultPageSize,
    sortColumn: '',
    sortDirection: 'ASC',
    actionPage: ['can_delete'],
    search: {
      is_active: null!,
      queryText: null!,
      no_group: false,
    },
  })

  const checkedIndices = reactive(new Set<number>())

  watch([
    () => tableState.pageIndex,
    () => tableState.pageSize,
    () => tableState.sortColumn,
    () => tableState.sortDirection,
    () => tableState.search.queryText,
    () => tableState.search.is_active,
    () => tableState.search.no_group,
  ], () => {
    return searchData()
  })

  async function searchData() {
    rawData.value = await index(tableState).then(x => x.data!)
    if (tableState.pageIndex !== rawData.value.pageIndex)
      tableState.pageIndex = rawData.value.pageIndex
  }

  const { success, fail } = useToastNotification()

  async function deleteSingle(id: string) {
    try {
      await positionApi.delete({ position_id: id })
        .then(checkApiResultSuccess)
      success()
      searchData()
    }

    catch {
      fail()
    }
  }

  async function deleteMultiple() {
    try {
      const position_ids = filterDeletableIds(
        tableState.data,
        'position_id',
        checkedIndices,
      )

      await multiDelete({
        position_ids,
      })
        .then(checkApiResultSuccess)
      checkedIndices.clear()
      success()
      searchData()
    }
    catch {
      fail()
    }
  }

  (async () => {
    await Promise.all([
      searchData(),
    ])
  })()

  return {
    tableState,
    checkedIndices,
    searchData,
    deleteSingle,
    deleteMultiple,
  }
}
