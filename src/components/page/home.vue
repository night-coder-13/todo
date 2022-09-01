<template>
<Menu />
<div class="w-full p-4 grid">
    <div class="grid grid-cols-2">
        <div class="grid justify-start">
            <h2 class="text-xl ml-8 font-bold text-white">ToDo</h2>
            
        </div>
        <div class="hidden sm:flex justify-end pr-16">
            <router-link to="" class="text-white text-lg mx-3">About Project</router-link>
            <router-link to="" class="text-white text-lg mx-3">About Me</router-link>
        </div>
        <div class="sm:hidden flex justify-end pr-4">
            <BtnMenu />
        </div>
    </div>
    
</div>
<CreateTask />
<FilterBox />
<TaskBox />
</template>

<script setup>
import TaskBox from '../task/taskBox.vue'
import FilterBox from '../task/filter.vue'
import CreateTask from '../task/create.vue'
import BtnMenu from '../item/btnMenu.vue'
import Menu from '../item/menu.vue'

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
