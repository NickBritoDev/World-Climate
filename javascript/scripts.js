const apiKey = "31c84243a77727cf5ea54e93b100b3fb"
const apiCountryURL = "https://countryflagsapi.com/png/"

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')
const weatherContainer = document.querySelector('#weather-data')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature')
const descElement = document.querySelector('#container')
const weatherElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')


const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    return data
}

const showInputData = async (city) => {
   const data = await getWeatherData(city)

   weatherContainer.classList.remove('hide')

   cityElement.innerText = data.name
   tempElement.innerText = parseInt(data.main.temp)
   descElement.innerText = data.weather[0].description
   weatherElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
   countryElement.setAttribute('src', apiCountryURL + data.sys.country)
   umidityElement.innerText = `${data.main.humidity}%`
   windElement.innerText = `${data.wind.speed}KM/H`
}

//input field capture event for button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const city = cityInput.value

    showInputData(city)
})

//input field capture event for enter
cityInput.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
    const city = e.target.value

    showInputData(city)
}
})