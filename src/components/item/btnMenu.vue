<template>
    <div @click="addActive($event)" :class="menu" id="hamber--menu">
        <span id="line-menu1" class="line--menu"></span>
        <span id="line-menu2" class="line--menu"></span>
        <span id="line-menu3" class="line--menu"></span>
    </div>
</template>

<script setup>
// import { ref } from '@vue/reactivity'
const { computed }=require("@vue/runtime-core");
const { useStore }=require("vuex");

const store = useStore()
const menu = computed(() => store.state.statusMenu);

function addActive(e){
    store.commit('changeStatusMenu')
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line--menu{
    width: 30px;
    height: 4px;
    display: block;
    margin: 5px 0;
    border-radius: 2px;
    background-color: #fff;
    /* transform: rotateX(60deg); */
}
#hamber--menu.active #line-menu2{
    visibility: hidden;
    animation-duration: 0s !important;
}
#hamber--menu.active #line-menu1 , #hamber--menu.active #line-menu3{
    background-color: rgb(220, 33, 20);
    animation-duration: .5s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
}
#hamber--menu.active #line-menu1 {
    animation-name: R_hamber1;
}
#hamber--menu.active #line-menu3 {
    animation-name: R_hamber2;
}

#line-menu1{
    animation-name: hamber;
    animation-duration: 1s;
    animation-iteration-count: 99999;
    animation-timing-function: ease-in-out;
    
}
#line-menu2{
    animation-name: hamber2;
    animation-duration: 1s;
    animation-iteration-count: 99999;
    animation-timing-function: ease-in-out;
}
#line-menu3{
    animation-name: hamber3;
    animation-duration: 1s;
    animation-iteration-count: 99999;
    animation-timing-function: ease-in-out;
}
@keyframes hamber{
    0%{
        transform: scaleX(1.08);
    }
    23%{
        transform: scaleX(1);
    }
}
@keyframes hamber2{
    20%{
        transform: scaleX(1.08);
    }
    43%{
        transform: scaleX(1);
    }
}
@keyframes hamber3{
    40%{
        transform: scaleX(1.08);
    }
    63%{
        transform: scaleX(1);
    }
}
@keyframes R_hamber1{
    0%{
        background-color: rgb(255, 255, 255);
        transform: rotateZ(0);
    }
    100%{
        background-color: rgb(192, 30, 19);
        transform: rotateZ(55deg);
    }
}
@keyframes R_hamber2{
    0%{
        background-color: rgb(255, 255, 255);
        transform: rotateZ(0);
    }
    100%{
        background-color: rgb(192, 30, 19);
        transform: rotateZ(-55deg) translateY(-8px) translateX(9px);
    }
}
</style>
