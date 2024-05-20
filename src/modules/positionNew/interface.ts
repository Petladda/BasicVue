import type { PositionIndexResponse } from '@/erpApi/modules/position'

export type EventBusType = {
  closeModalSuccess: void
}

export interface PositionIndexData extends PositionIndexResponse {
  can_edit?: boolean
  can_delete: boolean
}
