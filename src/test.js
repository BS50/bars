
// const b = '01.06.2020'



import dayjs from "dayjs";

const convertData = (date) => {
    let dateList = date.split('.')
    dateList = [dateList[1], dateList[0], dateList[2]]
    return dateList.join('/')
}
// console.log(`${b.slice(4,6)}.${b.slice(1,3)}.${b.slice(7)}`)
// const a = new Date(`${b.slice(4,6)}.${b.slice(1,3)}.${b.slice(7)}`)



const a = [
    {title: 'раз'},
    {title: 'два'},
    {title: 'три'},
    {title: 'четыре'},
    {title: 'пять'},
    {title: 'шесть'},
    {title: 'семь'},
    {title: 'восемь'},
    {title: 'девять'},
    {title: 'десять'},
]

const b = [
    {title: 'четыре'},
    {title: 'десять'},
    {title: 'семь'},
]

const c = a.filter((obj) => {
    if (!(b.some((item) => obj.title === item.title))) {
        return obj
    }
})

// const a = ['g', 'w', 'f', 'q', 'j', 'o']
// const b = ['f', 'r', 'q']
//
// const c = a.filter((item) => {
//     if (!b.includes(item)) {
//         return item
//     }
// })

const date = new Date()
console.log(date)
