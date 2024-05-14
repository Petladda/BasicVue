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
            <h3>CheckBox</h3>
            <div class="checkbox-btn">
                <Checkbox v-model:checkValue="isSelected"></Checkbox>
                <Checkbox v-model:checkValue="isSelected" :disabled="true"></Checkbox>
                <Checkbox v-model:checkValue="isSelected"></Checkbox>
                <Checkbox v-model:checkValue="isSelected" :disabled="true"></Checkbox>
            </div>

        </div>

        <div class="switch-tab">
            <h3>SwitchTab</h3>
            <SwitchTab :tabs="tabs" :activeTab="activeTab"/>
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
// import { IconButton, Button } from '@clicknext/ui'

const isSelected = ref(true)
const tabs = ref<string[]>(['Tab 1', 'Tab 2', 'Tab 3']);
const activeTab = ref<number>(1);
</script>
<style lang="scss" scoped>
.pageindex {
    padding: 60px 0 0 34px;
    margin-bottom: 150px;
    p {
        color: $medium-grey;
        margin-bottom: 4px;
        margin-top: 6
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

    .switch-tab{
        margin-top: 8px;
    }
}
</style>