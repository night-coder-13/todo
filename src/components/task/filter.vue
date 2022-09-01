<template>
<div class="p-1 flex items-end">
    <div>
        <p class="text-white ml-2">Filter :</p>
        <select name="" v-model="number" :disabled="loading" @change="FilterTask()" class="w-64 ml-4 p-1 rounded-lg text-gray-600 my-4" id="selection">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
        </select>
    </div>
    <router-link :to="{name:'FilterPro'}" class="mx-5 pb-5 relative text-2xl">
        <i style="top:4px;z-index:-1" class="fas fa-filter -z-10 animate-ping absolute text-white"></i>
        <i  style="z-index:-1 "  class="fas fa-filter -z-10 relative text-white"></i>
    </router-link>
    
</div>
</template>

<script setup>
const { computed, ref }=require("@vue/runtime-core");
const { useStore }=require("vuex");

const store = useStore();
const number = ref(5);
let loading = computed(()=> store.state.loading)

async function FilterTask(){
    store.commit('changeStatusLoading')
    await store.dispatch('FilterTask', number.value);
    store.commit('changeStatusLoading')
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
