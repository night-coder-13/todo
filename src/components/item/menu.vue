<template>
<div id="body--menu" :class="menu" class="w-full h-full sm:hidden fixed text-white">
    <div class="w-10/12 h-full fixed z-10 bg-dark">
        <div id="hed--profile" class="flex justify-center">
            <img src="../../assets/avtar.png" class="w-24 mt-10" alt="">
        </div>
        <hr class="mt-4 mb-1">
        <div class="p-4" id="body--profile">
            <p class="text-lg my-1 font-bold"> <i class="fas fa-user"></i> Mehdi Abasian</p>
            <p class="text-lg my-1"> <i class="fab fa-instagram"></i> abasian9731</p>
            <p class="text-lg my-1"> <i class="fas fa-phone"></i> +98 0990 277 4517</p>
        </div>
    </div>
    <div class="w-full h-full" @click="close"></div>
</div>
    
</template>

<script setup>
const { computed }=require("@vue/runtime-core");
const { useStore }=require("vuex");

const store = useStore()
const menu = computed(() => store.state.statusMenu);

function close(e){
    store.commit('changeStatusMenu')
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#body--menu{
    left: -105%;
    transition: 1s;
}
#body--menu.active{
    left: 0;
}
</style>
