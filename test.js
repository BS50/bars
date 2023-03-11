
const b = '01.06.2020'

const convertData = (date) => {
    let dateList = date.split('.')
    dateList = [dateList[1], dateList[0], dateList[2]]
    return dateList.join('/')
}
// console.log(`${b.slice(4,6)}.${b.slice(1,3)}.${b.slice(7)}`)
// const a = new Date(`${b.slice(4,6)}.${b.slice(1,3)}.${b.slice(7)}`)



console.log( Date())

