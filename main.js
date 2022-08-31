var search = document.querySelector('.search')
var city = document.querySelector('.city')
var country = document.querySelector('.country')
var value = document.querySelector('.value')
var shortDesc = document.querySelector('.short-desc')
var visibility = document.querySelector('.visibility span')
var wind = document.querySelector('.wind span')
var sun = document.querySelector('.sun span')
var time = document.querySelector('.time')
var content = document.querySelector('.content')
var body = document.querySelector('body')


async function changeWeatherUI() {
    let capitalSearch = search.value.trim() 
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=cb8d857e9528680474d1a7a90b239fba`;
    let data = await fetch(apiURL).then(res=> res.json())
    console.log(data)

    if(data.cod == 200) {
        content.classList.remove('hide')
        city.innerText = data.name
        country.innerText = data.sys.country
        time.innerText = new Date().toLocaleString('vi')
        let temp = Math.round(data.main.temp - 273.15)
        value.innerText = temp
        shortDesc.innerText = data.weather[0] ? data.weather[0].main : ''
        visibility.innerText = data.visibility + `m`
        wind.innerText = data.wind.speed + ` m/s`
        sun.innerText = data.main.humidity + `%`

        body.setAttribute('class', 'hot')
        if(temp < 25 ) {
            body.setAttribute('class', 'cold')
        } else {
            body.setAttribute('class', 'hot')
        }
        
    } else {
        content.classList.add('hide')
    }

}

search.addEventListener('keypress', (e) => {
    if(e.code === `Enter`) {
        changeWeatherUI()
    }
})