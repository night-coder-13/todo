<template>
<div class="p-1">
    <button @click="formCreate()" class="btn-bg-gradient text-white grid justify-center items-center w-12 h-12 rounded-full ml-1 md:ml-2 fixed bottom-8 left-8">
       <i class="far fa-plus-square text-2xl"></i>
    </button>
   
</div>
</template>

<script setup>
const { computed }=require("@vue/runtime-core");
const { useStore }=require("vuex");
const Swal = require('sweetalert2')

const store = useStore();
let loading = computed(() => store.state.loading)
let statusMenu = computed(() => store.state.statusMenu)

function formCreate(){
    if(statusMenu.value == 'active'){
        store.commit('changeStatusMenu')
    }

    Swal.fire({
        title: 'Submit your task',
        input: 'text',
        background : '#000',
        inputAttributes: {
            autocapitalize: 'off',
            required: true,
        },
        showCancelButton: true,
        confirmButtonText: 'Send',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            submitTask(login);
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    icon: 'success',
                    title: `created`,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    timer: '3000',
                    toast: true,
                    position : 'top'
                })
            }
            
        })
}

async function submitTask(value){
    store.commit('changeStatusLoading')
    await store.dispatch('SubmitTask', value);
    store.commit('changeStatusLoading')
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-bg-gradient{
    background-image: linear-gradient(#7367f0, #6792f0);
}
</style>
