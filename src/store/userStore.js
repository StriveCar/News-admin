import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', ()=>{
  const userInfo = ref({})
  const getUserInfo = async ()=>{
    
  } 

  return {
    userInfo,
    getUserInfo
  }
},{
  persistent: true,
})
