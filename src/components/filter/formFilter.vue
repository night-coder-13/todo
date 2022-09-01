<template>
<div class="w-full">
    <h2 class="text-xl text-center mt-16 font-bold text-white">Authors filter</h2>
    <form action="" @submit.prevent="filter()" class="mt-4">
        <div class="grid md:grid-cols-2 grid-cols-1 w-full">
            <input type="text" :class="classError" v-model="name" class="rounded-md p-1 my-2 mx-1" placeholder="Author Name">
            <input type="text" :class="classError" v-model="email" class="rounded-md p-1 my-2 mx-1" placeholder="Author's Email">
        </div>
        <div class="grid justify-center mt-8">
            <div>
                <button type="submit" class="cursor-pointer mx-2 bg-blue-400 hover:bg-blue-500 py-1 px-6 rounded-md text-white">
                    filter
                    <i id="btn--filter" class="fa-solid fa-spinner hidden"></i>
                </button>
                <input type="button" @click="example()" value="Enter Example" class="cursor-pointer mx-2 bg-yellow-400 hover:bg-yellow-500  py-1 px-6 rounded-md text-white">
            </div>
        </div>
        
    </form>
    <hr class="my-4 bg-white">
    <div v-if="loading" class="grid justify-center">
        <img src="../../assets/gif/SimpleVUIdesign.gif" class="w-96 mt-16" alt="">
    </div>
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 text-white mt-4">

        <div v-for="task in tasks" :key="task.id" class="m-2 bg-gray-600 rounded-md px-2 py-4 text-white">
            <p class="mb-1" v-text="task.title"></p>
            <div v-for="user in users" :key="user.id">
                <div class="pl-2 mb-3" v-if="user.id === task.userId">
                    <p class="text-xs text-gray-200">Create by : {{ user.name }}</p>
                    <p class="text-xs text-gray-200">Email : {{ user.email }}</p>
                </div>
                <div v-else-if="user.id === '111'">
                    <p class="text-xs text-gray-200">create by : Mehdi Abasian</p>
                </div>
            </div>
        
            <div class="flex justify-center">
                <div @click="removeTask(task.id)">
                    <i class="text-lg text-red-400 hover:text-red-500 p-1 mx-3 cursor-pointer fa-solid fa-trash-can"></i>
                </div>
                <div @click="updateTask(task)">
                    <i class="text-lg text-blue-300 hover:text-blue-400 p-1 mx-3 cursor-pointer fa-solid fa-file-pen"></i>
                </div>
                <div @click="doTask(task)" v-if="task.completed === true">
                    <i :id="task.id" class="text-lg text-green-300 hover:text-green-500 p-1 mx-3 cursor-pointer fa-solid fa-check"></i>
                </div>
                <i v-else  class="text-lg text-green-300 hover:text-green-500 p-1 mx-3 fa-solid fa-check-double"></i>
            </div>
        </div>

        <!-- <div v-for="user in users" :key="user.id"> -->
            <!-- <div v-for="task in tasks" :key="task.id" class="m-2 bg-gray-600 rounded-md px-2 py-4 text-white">
                    <p class="mb-1" v-text="task.title"></p>
                    <div v-for="user in users" :key="user.id">
                        <div class="pl-2 mb-3" v-if="user.id === task.userId">
                            <p class="text-xs text-gray-200">Create by : {{ user.name }}</p>
                            <p class="text-xs text-gray-200">Email : {{ user.email }}</p>
                        </div>
                        <div v-else-if="user.id === '111'">
                            <p class="text-xs text-gray-200">create by : Mehdi Abasian</p>
                        </div>
                    </div> -->
                
                    <!-- <div class="flex justify-center">
                        <div @click="removeTask(task.id)">
                            <i class="text-lg text-red-400 hover:text-red-500 p-1 mx-3 cursor-pointer fa-solid fa-trash-can"></i>
                        </div>
                        <div @click="updateTask(task)">
                            <i class="text-lg text-blue-300 hover:text-blue-400 p-1 mx-3 cursor-pointer fa-solid fa-file-pen"></i>
                        </div>
                        <div @click="doTask(task)" v-if="task.completed === true">
                            <i :id="task.id" class="text-lg text-green-300 hover:text-green-500 p-1 mx-3 cursor-pointer fa-solid fa-check"></i>
                        </div>
                        <i v-else  class="text-lg text-green-300 hover:text-green-500 p-1 mx-3 fa-solid fa-check-double"></i>
                    </div> -->
               
            <!-- </div> -->
        <!-- </div> -->
    </div>
</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import Swal from 'sweetalert2';
import { useStore } from 'vuex'

const store = useStore();
let tasks = computed(()=> store.getters.allTask)
let users = computed(()=> store.getters['user/allUsers'])
let loading = computed(()=> store.state.loading)
// let filterTaskId = computed(()=> store.state.filterTaskId)
// console.log(tasks)
const name = ref('')
const email = ref('')
const classError = ref('')
let fLoder = true

function example(){
    name.value = 'Ervin Howell';
    email.value = 'Shanna@melissa.tv';
}
function filterLoder(){
    if(fLoder){
        fLoder = false
        let element=document.getElementById('btn--filter')
        element.classList.add('animate-spin')
        element.classList.remove('hidden')
        element.classList.add('inline-block')
    }else{
        fLoder = true
        let element=document.getElementById('btn--filter')
        element.classList.remove('animate-spin')
        element.classList.add('hidden')
        element.classList.remove('inline-block')
    }
    
}

const spinner= ref()
 function updateTask(task){
    Swal.fire({
        title: 'update title',
        input: 'text',
        background : '#000',
        inputAttributes: {
            autocapitalize: 'off',
            required: true,
            style:'color:#fff'
        },
        showCancelButton: true,
        confirmButtonText: 'Update',
        showLoaderOnConfirm: true,
        preConfirm: (text) => {
            task.title = text
             store.dispatch('UpdateTask', task);
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    icon: 'success',
                    title: `Update Success`,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    timer: '3000',
                    toast: true,
                    position : 'top'
                })
            }
            
        })
}

function removeTask(value){
    Swal.fire({
        icon: 'warning',
        title: 'Delete Task?',
        background : '#000',
       
        showCancelButton: true,
        confirmButtonText: 'Delete',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            store.dispatch('RemoveTask', value);
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    icon: 'success',
                    title: `Delete Success`,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    timer: '3000',
                    toast: true,
                    position : 'top'
                })
            }
            
    })
    
}

async function doTask(value){
    let element=document.getElementById(value.id)
    element.classList.remove('fa-check')
    element.classList.add('animate-spin')
    element.classList.add('fa-spinner')
    await store.dispatch('DoTask', value);
}

async function filter(){
    if(name.value === '' && email.value === ''){
        classError.value='border-red-600 border-2 bg-red-50'
        Swal.fire({
            icon: 'warning',
            title: 'Fill out the form',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: '3000',
            toast: true,
            position : 'top'
        })
    }else{
        classError.value = ''
        filterLoder()
        store.commit('changeStatusLoading')
        await store.dispatch('user/fetchUsers')
        await store.dispatch('FilterTaskByUser',{name : name.value , email : email.value});
        store.commit('changeStatusLoading')
        filterLoder()
    }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
