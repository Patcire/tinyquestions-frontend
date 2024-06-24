
export const formatDate = (date) =>{

  const noHours = date.split(" ")
  const prepDate = noHours[0].split('-').reverse()
  return `${prepDate[0]}/${prepDate[1]}/${prepDate[2].substring(2)}`
}


export const apiDirection = "https://159.69.150.218:8001"
//export const apiDirection = "http://localhost:8001" // to run on local uncomment this and comment the other


export const socketDirection = "https://159.69.150.218:3200"
// //export const apiDirection = "http://localhost:3200" // to run on local uncomment this and comment the other