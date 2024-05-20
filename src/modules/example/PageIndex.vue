<template>
    <div class="pageindex">
        <div class="button">
            <h1>Button</h1>
            <div class="">
                <p>Size: sm</p>
                <div class="button-sm">
                    <Button text="Primary" size="sm"></Button>
                    <Button text="Primary" :disabled="true" size="sm"></Button>
                    <Button text="Primary" size="sm">
                        <template v-slot:icon-left>
                            <Plus></Plus>
                        </template>
                    </Button>
                    <Button text="Primary" size="sm">
                        <template v-slot:icon-right>
                            <Plus></Plus>
                        </template>
                    </Button>
                </div>
            </div>
            <div class="">
                <p>Size: md</p>
                <div class="button-md">
                    <Button text="Primary" size="md"></Button>
                    <Button text="Primary" :disabled="true" size="md"></Button>
                    <Button text="Primary" size="md">
                        <template v-slot:icon-left>
                            <Plus></Plus>
                        </template>
                    </Button>
                    <Button text="Primary" size="md">
                        <template v-slot:icon-right>
                            <Plus></Plus>
                        </template>
                    </Button>
                </div>
            </div>

        </div>
        <div class="button-outline">
            <h1>Button Outline</h1>
            <div class="">
                <p>Size: sm</p>
                <div class="button-sm">
                    <ButtonOutline text="Primary" size="sm"></ButtonOutline>
                    <ButtonOutline text="Primary" :disabled="true" size="sm"></ButtonOutline>
                    <ButtonOutline text="Create" size="sm">
                        <template v-slot:icon-left>
                            <Plus></Plus>
                        </template>
                    </ButtonOutline>
                    <ButtonOutline text="Create" size="sm">
                        <template v-slot:icon-right>
                            <Plus></Plus>
                        </template>
                    </ButtonOutline>
                </div>
            </div>
            <div class="">
                <p>Size: md</p>
                <div class="button-md">
                    <ButtonOutline text="Primary" size="md"></ButtonOutline>
                    <ButtonOutline text="Primary" :disabled="true" size="md"></ButtonOutline>
                    <ButtonOutline text="Create" size="md">
                        <template v-slot:icon-left>
                            <Plus></Plus>
                        </template>
                    </ButtonOutline>
                    <ButtonOutline text="Create" size="md">
                        <template v-slot:icon-right>
                            <Plus></Plus>
                        </template>
                    </ButtonOutline>
                </div>
            </div>

        </div>
        <div class="">
            <h1>Icon Button</h1>
            <div class="icon-button">
                <div>
                    <p>Size: sm</p>
                    <div class="button-sm">
                        <IconButton size="sm">
                            <Edit></Edit>
                        </IconButton>
                        <IconButton size="sm" :disabled="true">
                            <Edit></Edit>
                        </IconButton>
                    </div>
                </div>

                <div>
                    <p>Size: md</p>
                    <div class="button-md">
                        <IconButton size="md">
                            <ArrowBack></ArrowBack>
                        </IconButton>
                        <IconButton size="md" :disabled="true">
                            <ArrowBack></ArrowBack>
                        </IconButton>
                    </div>
                </div>


            </div>

        </div>
        <div>
            <h1>Link</h1>
            <Link text="www.siamcommercial.com">
            </Link>
        </div>
        <div class="checkbox">
            <h2>CheckBox</h2>
            <div class="checkbox-btn">
                <Checkbox v-model:checkValue="isSelected"></Checkbox>
                <Checkbox v-model:checkValue="isSelected" :disabled="true"></Checkbox>
                <Checkbox v-model:checkValue="isSelected"></Checkbox>
                <Checkbox v-model:checkValue="isSelected" :disabled="true"></Checkbox>
            </div>

        </div>
        <div class="switch">
            <h2 >Switch</h2>
            <div class="switch-btn" >
                <Switch v-model:switch-value="isSwitch" ></Switch> 
                <Switch v-model:switch-value="isSwitch" :disabled="true" ></Switch>
                <Switch v-model:switch-value="isSwitch"  ></Switch>   
                <Switch v-model:switch-value="isSwitch" :disabled="true" ></Switch> 
            </div>
        </div>

        <div class="switch-tab">
            <h2>SwitchTab</h2>
            <SwitchTab :tabs="tabs" :activeTab="activeTab" />
            <br>
            <cui-switch-tabs v-model="select" :items="[{ text: 'Tab1', value: '1', isIcon: false }, { text: 'Tab2', value: '2',isIcon:false }]" />
            <div>value: {{ select }}</div>
        </div>

        <div style="padding-top: 20px;">
            <h2>Notification</h2>
            <cui-toast-notification />
            <cui-button-success @click="showToast" />
            <cui-button-caution text="Fail" @click="showToastFail" />

        </div>
        <div style="padding-top: 20px;">
            <h2 style="padding-bottom: 10px;">OpenModal</h2>
            <Button text="Create" size="md" @click="showModal = true">
                <template v-slot:icon-left>
                    <Plus></Plus>
                </template>
            </Button>
            <br>
            <cui-button-default text="Open Modal" @click="showModal = true" />
            <cui-modal :show="showModal" size="md" @close="showModal = false" footerAlign="right">
                <template v-slot:header>
                    Create Something
                </template>
                <template v-slot:body>
                    <div>
                        <p>Firstname</p>
                        <cui-input-text placeholder="input Firstname sa!" />
                        <p>Lastname</p>
                        <cui-input-text placeholder="input Lastname sa!" />
                    </div>

                </template>
                <template v-slot:footer>
                    <div> 
                       <cui-button text="Cancel" @click="showModal = false" />
                        <cui-button text="OK" variant="primary" @click="Confirm()" />

                    </div>
                </template>
            </cui-modal>
            <!-- <cui-modal-confirm :show="showModal" @confirm="Confirm" @close="showModal = false" title="Create Something" message="Modal Body"/> -->
        </div>
        <div style="padding-top: 20px;">
            <h2 style="padding-bottom: 10px;">HyperLink</h2>
            <cui-hyper-link text="gogo !!" href="https://www.youtube.com/" target="_blank" />
        </div>
        <div style="padding-top: 20px;">
            <h2 style="padding-bottom: 10px;">DropDown</h2>
            <cui-dropdown-multiselect-tag placeholder="Choose what u want..." v-model="dropdownValue1" :options="dropdownOptions" />
        </div>
        <div style="padding-top: 20px;">
            <h2 style="padding-bottom: 10px;">Pagination</h2>
            <cui-pagination v-model="page" />
        </div>
        <div style="padding-top: 20px;">
            <h2 style="padding-bottom: 10px;">DatePicker</h2>
            <cui-input-filter-date v-model="filterDate" placeholder="Date..."   variant="primary" />
        </div>

    </div>


</template>

<script setup lang="ts">

import { ref } from 'vue';
import Checkbox from '../../components/Input/Checkbox.vue'
import SwitchTab from '../../components/SwitchTab/SwitchTab.vue';
import Button from '../../components/Button/Button.vue';
import Plus from '../../components/Icons/Plus.vue';
import ButtonOutline from '../../components/Button/ButtonOutline.vue';
import IconButton from '../../components/Button/IconButton.vue';
import Edit from '../../components/Icons/Edit.vue';
import ArrowBack from '../../components/Icons/ArrowBack.vue';
import Link from '../../components/Link/Link.vue';
import Switch from '../../components/Input/Switch.vue'
import { useToastNotification } from '@clicknext/ui'

const page = ref<PaginatedResult<any>>({ pageIndex: 0, pageSize: 20, data: [], rowCount: 100 })
const showModal = ref(false)
const select = ref('1')
const filterDate = ref({})



function Confirm() {
    alert('Confirm')
    showModal.value = false
}
const { success, fail } = useToastNotification()

async function showToast() {
    await success({ msg: 'Success Test su!!', timeout: 2000 })
}
async function showToastFail() {
    await fail({ msg: 'Fail la!!', timeout: 2000 })
}
const isSelected  = ref(true)
const isSwitch  = ref(true)
const tabs = ref<string[]>(['Tab 1', 'Tab 2', 'Tab 3']);
const activeTab = ref<number>(1);
const dropdownValue1 = ref([])
const dropdownOptions = ref([
    { text: 'มะนาว', value: '1' },
    { text: 'ส้ม', value: '2' },
    { text: 'ลิ้นจี่', value: '3' },
    { text: 'มะพร้าว', value: '4' },
    { text: 'ไวน์', value: '5' },
])



</script>
<style lang="scss" scoped>
.pageindex {
    padding: 60px 34px 0 34px;
    margin-bottom: 150px;

    p {
        color: $medium-grey;
        margin-bottom: 4px;
        margin-top: 6px;
    }

    Button {
        margin-right: 10px;
    }

    .button-sm {
        display: flex;
        margin-bottom: 4px;

    }

    .button-md {
        display: inline-flex;
        margin-bottom: 4px;
    }

    .icon-button {
        display: flex;
        width: 20%;
        justify-content: space-between;
        margin: 8px 0 8px 0;
    }


    .checkbox {
        margin-top: 8px;

        .checkbox-btn {
            display: flex;
            width: 10%;
            justify-content: space-between;
        }
    }

    .switch-tab {
        margin-top: 8px;
    }

    .switch-btn{
        padding-top: 8px;
        display: flex;
        justify-content: space-between;
        width: 20%;
    }
}
</style>