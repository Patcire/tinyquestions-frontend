import router from '@/router/router.js'

export async function  goTo (url){
  await router.push(url)
}