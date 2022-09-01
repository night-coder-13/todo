<template>
<div class="text-white">
    <input type="text" v-model="title">
    <button @click="updateTask()">edit</button>
</div>
</template>

<script setup>
const { computed, ref }=require("@vue/runtime-core");
const { useStore }=require("vuex");
// const Swal = require('sweetalert2')

const store = useStore();
let loading = computed(() => store.state.loading)
let title = ref('')
let statusEditTask = computed(() => store.state.statusEditTask)

async function updateTask(value){
    store.commit('changeStatusLoading')
    await store.dispatch('UpdateTask', value);
    store.commit('changeStatusLoading')
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-bg-gradient{
    background-image: linear-gradient(#7367f0, #6792f0);
}
</style>
