import { useState } from 'react'
import './App.css'
import axios from 'axios'
import './style.scss'


function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('')
  const [error, setError] = useState(null)  

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=7&aqi=yes&alerts=yes&units=metric&lang=tr`)
      setWeatherData(response.data)
      setError(null) 
      console.log(response)
    } catch (error) {
      setError('Şehir bulunamadı, lütfen geçerli bir şehir adı giriniz.')
      setWeatherData(null)
      console.log(error)
    }
  }
  
   
  const handleLocationChange = (event) => {
    setLocation(event.target.value)
  }

  const handleSearchClick = () => {
    if (location.trim() === '') {  
      setError('Lütfen bir şehir adı giriniz.')  
      setWeatherData(null)  
    } else {
      fetchData()
      
    }
  }
  const getDayName = (dateString) => {
    const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
    const date = new Date(dateString)
    return daysOfWeek[date.getDay()]
  }

  return (
    <>
      <div className='app-container'>
        <h1 className='app-title'>Hava Durumu Uygulaması</h1>
        <div className='input-container'>
        
         
      
          <input className='location-input' type='text' placeholder='Lokasyon' value={location} onChange={handleLocationChange}/>
          <button className='search-button' onClick={handleSearchClick}>Ara</button>

        </div>
        {error && <p className='error-message'>{error}</p>}
      </div>
      <div>
        {weatherData && (
          <div className='weather-container'>
            {weatherData.forecast.forecastday.map((day) => (
              <div className='day-container' key={day.date}>
                <h2 className='date'>{day.date}</h2>
                <h2 className='date'>{getDayName(day.date)}</h2>
                <h2 className='city-name'>{weatherData.location.name}</h2>
                <img className='weather-icon' src={day.day.condition.icon} alt={day.day.condition.text}/>
                <p className='temperature'>{day.day.avgtemp_c} °C</p>
                <p className='temperature'>{day.day.condition.text}</p>
        
              </div>
            ))}
          </div>
        )}
       
      </div>
      
    </>
  )
}

export default App
