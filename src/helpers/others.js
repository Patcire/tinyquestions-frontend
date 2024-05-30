
export const formatDate = (date) =>{

  const noHours = date.split(" ")
  const prepDate = noHours[0].split('-').reverse()
  return `${prepDate[0]}/${prepDate[1]}/${prepDate[2].substring(2)}`
}
