import axios from "axios"
import Swal from "sweetalert2"

const user = {
    namespaced : true,
    state:{
        users : []
    },
    getters:{
        allUsers(state){
            return state.users
        }
    },
    mutations:{
        setUser(state , users){
            state.users = users;
        }
    },
    actions:{
        async fetchUsers({commit}){
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/users')
                commit('setUser',response.data)
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
        }
    }
}

export default user