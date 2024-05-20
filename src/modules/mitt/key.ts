import { InjectionKey } from "vue";

import { Emitter } from 'mitt'
import { EventList} from './interface'

export const symbolMitt : InjectionKey<Emitter<EventList>> = Symbol('symbolMitt')