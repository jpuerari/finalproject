import React, { useState, useEffect } from 'react';
import { openWeather, cityName } from '../utils/API'

const App = () => {
  const [state, setState] = useState({
    search: 'France',
    image: '',
    name: ''
  })


  useEffect(() => {
    const fetchData = async () => {
      const { data: city } = await cityName(state.search)
      const { data: weather } = await openWeather(state.search)
      console.log(weather)
      console.log(city)
    }
    fetchData()
  }, [state.search])


  return (
    <div className="App">
      City Name is {state.name}
      <img src={state.image} />
    </div>
  )
};

export default App;