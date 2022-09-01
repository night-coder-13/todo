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

    <Form />
    <router-link :to="{name : 'Home'}" class="btn-bg-gradient text-white grid justify-center items-center w-12 h-12 rounded-full ml-1 md:ml-2 fixed bottom-8 left-8">
       <i class="text-2xl fas fa-long-arrow-alt-left"></i>
    </router-link>
</div>
</template>

<script setup>
import BtnMenu from '../item/btnMenu.vue'
import Menu from '../item/menu.vue'
import Form from './formFilter.vue'

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-bg-gradient{
    background-image: linear-gradient(#7367f0, #6792f0);
}
</style>
