import { useSessionStore } from '@/stores/sessionStore.js'

export const callAPI= async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${useSessionStore().user.token ?? ''}`
    }
  })
  return await response.json()
}

export const postAPI= async (url, body) => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${useSessionStore().user.token}`
    },
    body: JSON.stringify(body)
  })
}

export const deleteAPI = async (url) => {
  return await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${useSessionStore().user.token}`
    }
  })
}

export const updateAPI = async (url, body) => {
  return await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${useSessionStore().user.token}`
    },
    body: JSON.stringify(body)
  });
};
