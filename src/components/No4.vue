<script setup lang="ts">
    import { ref } from 'vue'

    const count = ref("No4")
    interface Type<T,U=string> {
    id: T;
    name: U;
}
    const teamList: Type<number>[]= [
    { id: 1, name: 'Web Dev' },
    { id: 2, name: 'Mobile Dev' },
    { id: 3, name: 'Sale' },
    { id: 4, name: 'Support' },
    { id: 5, name: 'Business Analyst' },
  ]
  
  const positionList:Type<number>[] = [
    { id: 1, name: 'Tester' },
    { id: 2, name: 'UX/UI' },
    { id: 3, name: 'Full-Stack' },  
    { id: 4, name: 'Front-End' },
    { id: 5, name: 'Back-End' },
  ]
  const selectedTeam = ref(teamList[0].id)
  const selectedPosition = ref(positionList[0].id)
</script>
<template>
   
    <p>{{ count }} </p> 
    <p>Team</p>
    <select v-model="selectedTeam" >
        <option v-for="team in teamList" :key="team.id" :value="team.id">
            {{ team.name }}
        </option>
    </select>
    <p>Position</p>
    <select v-model="selectedPosition" >
        <option  v-for="position in positionList" :key="position.id" :value="position.id"> 
            {{ position.name }}
        </option>
    </select>

</template>