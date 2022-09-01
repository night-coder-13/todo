import axios from "axios";
import Swal from "sweetalert2";
import { createStore } from "vuex";
import user from "./modules/user.js"

const store =  createStore({
    state:{
        tasks:[],
        loading : false,
        statusEditTask: false,
        statusMenu: '',
        filterTask: []
    },
    getters:{
        allTask(state){
            return state.tasks
        },
        allFilterTask(state){
            return state.filterTask
        }
    },
    mutations:{
        setTasks(state,tasks){
            state.tasks = tasks;
        },
        setFilterTasks(state,tasks){
            state.filterTask = tasks;
        },
        newTasks(state,task){
            state.tasks.unshift(task)
        },
        changeStatusLoading(state){
            state.loading = state.loading === false ? true : false;
        },
        changeStatusMenu(state){
            state.statusMenu = state.statusMenu === 'active' ? '' : 'active';
        },
        changeStatusEdit(state){
            state.statusEditTask = state.statusEditTask === false ? true : false;
            // console.log(state.statusEditTask)
        },
        updateTasks(state , uptask){
            const index = state.tasks.findIndex(task => task.id == uptask.id)
            if(index !== -1){
                state.tasks.splice(index , 1 ,uptask)
            }

            // console.log(state.statusEditTask)
        },
        removeTask(state , id){
            state.tasks = state.tasks.filter(task => task.id !== id)
        },
        filterTask(state , userId){
            state.filterTaskId = userId
        }
    },
    actions:{
        async fetchTasks({commit}){
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
                commit('setTasks',response.data)
                // console.log(response)
            }catch(error){
                Swal.fire({
                    icon: 'warning',
                    title: error,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    timer: '3000',
                    toast: true,
                    position : 'top'
                })
            }
        },
        async FilterTask({commit} , limit){
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit='+limit)
                commit('setTasks',response.data)
                // console.log(response)
            }catch(error){
                Swal.fire({
                    icon: 'warning',
                    title: error,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    timer: '3000',
                    toast: true,
                    position : 'top'
                })
            }
        },
        async SubmitTask({commit} , title){
            try{
                const response = await axios.post('https://jsonplaceholder.typicode.com/todos',{
                    title : title,
                    userId : 111,
                    completed : false
                })
                commit('newTasks',response.data)
                // console.log(response)
            }catch(error){
                Swal.fire({
                    icon: 'warning',
                    title: error,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    timer: '3000',
                    toast: true,
                    position : 'top'
                })
            }
        },
        async DoTask({commit} , task){
            
            try{
                const response = await axios.put('https://jsonplaceholder.typicode.com/todos/'+task.id,{
                    title : task.title,
                    userId : task.userId,
                    id : task.id,
                    completed : !task.completed
                })
                commit('updateTasks',response.data)
                // console.log(response)
            }catch(error){
                Swal.fire({
                    icon: 'warning',
                    title: error,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    timer: '3000',
                    toast: true,
                    position : 'top'
                })
            }
        },
        async UpdateTask({commit} , task){
            try{
                const response = await axios.put('https://jsonplaceholder.typicode.com/todos/'+task.id,{
                    title : task.title,
                    userId : task.userId,
                    id : task.id,
                    completed : task.completed
                })
                commit('updateTasks',response.data)
                // console.log(response)
            }catch(error){
                Swal.fire({
                    icon: 'warning',
                    title: error,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    timer: '3000',
                    toast: true,
                    position : 'top'
                })
            }
        },
        async RemoveTask({commit} , id){
            try{
                const response = await axios.delete('https://jsonplaceholder.typicode.com/todos/'+id)
                commit('removeTask',id)
                // console.log(response)
            }catch(error){
                Swal.fire({
                    icon: 'warning',
                    title: error,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    timer: '3000',
                    toast: true,
                    position : 'top'
                })
            }
        },
        async FilterTaskByUser({commit,state},target){
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
            const u = user.state.users.filter(user => user.name === target.name || user.email === target.email)
            const t = response.data
            let tt=[];
            let userid=0
            u.forEach((user => {
                t.forEach((task , id)=>{
                    if(task.userId === user.id){
                        tt.push({
                            id : task.id,
                            userId : task.userId,
                            title : task.title,
                            completed: task.completed
                        })
                    }
                })
                userid = user.id
            }))
            
            commit('setTasks',tt)
            
            
        }
        
        
    },
    modules:{
        user
    }

})

export default store
