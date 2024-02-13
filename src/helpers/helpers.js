import { useSessionStore } from '@/stores/sessionStore.js'
import router from '@/router/router.js'


export const checkUserCredentials = () => {
  useSessionStore().isConnected = !useSessionStore().isConnected
  console.log(useSessionStore().isConnected)
}
export const isLogged = () => {
  return useSessionStore().isConnected

}