<script setup lang="ts">
import { ref, } from 'vue'

const firstname = ref('')
const lastname = ref('')
const displayValue = ref('');

const showInputValue = () => {
    displayValue.value = `${firstname.value} ${lastname.value}`;
};
</script>

<template>
    <form @click="showInputValue">
        <div>
            <FloatLabel>
                <InputText id="firstname" v-model="firstname" />
                <label for="firstname">Firstname</label>
            </FloatLabel>
        </div>

        <p>Firstname</p>
        <input type="text" v-model="firstname">
        <p>Lastname</p>
        <input type="text" v-model="lastname">
        <p>{{ displayValue.toUpperCase() }}</p>
    </form>
</template>