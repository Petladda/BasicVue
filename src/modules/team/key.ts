import { InjectionKey } from "vue";
import {EventTeam} from './interface'
import { Emitter } from 'mitt'

export const TeamEventSymbol: InjectionKey<Emitter<EventTeam>> = Symbol('TeamEventSymbol')