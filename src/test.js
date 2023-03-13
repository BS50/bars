
// const b = '01.06.2020'





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

const convertFormatData = (date) => {
    let dateList = date.split('.')
    dateList = [dateList[1], dateList[0], dateList[2]]
    return dateList.join('/')
}

const date = '01.03.2023'
const dateNew = convertFormatData(date)
console.log(new Date(dateNew).getTime())


// const millisecond1 = event.dateRange[0].$d.getTime();
// const millisecond2 = event.dateRange[1].$d.getTime();

// 1677665121764 1682849121764

// SimpleDateFormat template = new Date("yyyy/MM/dd")
//
// const answer = template.parse(date)
// console.log(answer)
const ab = ['Привет', 'камень', 'кукуруза']
// console.log(ab[0].toLowerCase().includes('РИВ'.toLowerCase()))
