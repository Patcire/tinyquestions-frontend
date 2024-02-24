
export const callAPI= async (url) => {
  const response = await fetch(url)
  return await response.json()
}

export const postAPI= async (url, body) => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

