<script setup lang="ts">
import Form from './components/Form.vue';
import HelloWorld from './components/HelloWorld.vue';
import No1 from './components/No1.vue'
import No2 from './components/No2.vue'
import No3 from './components/No3.vue'
import No4 from './components/No4.vue'
import No5 from './components/No5.vue'
import No6 from './components/No6.vue'
import No7 from './components/No7.vue'
import { ref } from 'vue'

import { RouterView } from 'vue-router';


const message = ref('Test')

const changeMessage = () => {
  console.log('click button');
  
}

const show = ref(false)

</script>
<template>
  <!-- <No1/>
  <hr>
  <No2/>
  <hr>
  <No3/>
  <hr>
  <No4/>
  <hr>
  <No5/>
  <hr>
<button @click="show = !show">show</button> {{ show }}
  <No6 v-if="show"></No6>
  <No5/>
  <Form 
  :messageText="message"
  :changeMessage="changeMessage"
  ></Form>
  <HelloWorld msg="hello world"/> -->

  <a href="/">Home</a> |
  <a href="/about">About</a> |
  <a href="/N5">N5</a> |
  <router-view />
  
<div>
  <Button @click="changeMessage" label="reset" icon="pi pi-search"></Button>
</div>

</template>
