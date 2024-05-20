import type { Emitter } from 'mitt'
import type { InjectionKey } from 'vue'
import type { EventBusType } from './interface'

export const positionEventBusSymbol: InjectionKey<Emitter<EventBusType>> = Symbol('positionEventBus')
