<template>
<div v-if="loading" class="grid justify-center">
    <img src="../../assets/gif/SimpleVUIdesign.gif" class="w-96 mt-16" alt="">
</div>
<div v-else class="grid md:grid-cols-2 lg:grid-cols-3">
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
</div>

</template>

<script setup>

const { computed, ref }=require("@vue/runtime-core");
const { default: Swal }=require("sweetalert2");
const { useStore }=require("vuex");

const store = useStore();
let tasks = computed(()=> store.getters.allTask)
let users = computed(()=> store.getters['user/allUsers'])
let loading = computed(()=> store.state.loading)
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
async function fechTask(){
    store.commit('changeStatusLoading')
    await store.dispatch('fetchTasks');
    await store.dispatch('user/fetchUsers')
    store.commit('changeStatusLoading')
}
fechTask()
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
