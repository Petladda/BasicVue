<script setup lang="ts">
  import Form from './components/Form.vue';
  import HelloWorld from './components/HelloWorld.vue';
  import No1 from './components/No1.vue'
  import No2 from './components/No2.vue'
  import No3 from './components/No3.vue'
  import No4 from './components/No4.vue'
  import No5 from './components/No5.vue'
  import {ref} from 'vue'

  
  const message = ref('Test')

  const changeMessage = (newmessage:string) =>{
    message.value = newmessage
  }

</script>
<template>
  <No1/>
  <hr>
  <No2/>
  <hr>
  <No3/>
  <hr>
  <No4/>
  <hr>
  <No5/>
  <hr>

  
  <Form 
  :messageText="message"
  :changeMessage="changeMessage"
  ></Form>
  <HelloWorld msg="hello world"/>
</template>