import React, {useState} from "react";

// api key
const api = {
  key: "e49c229d324aaae55075f461db81698f",
  baseURL: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // search function to get the weather
  // simple fecth get request
  // get the api base -> ${api.baseURL}
  // set the weather -> weather
  // get the query, units, etc -> q=${query}, units
  // send a get request to the baseURL 
  // get the json from the result 
  const searchWeather = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`).then(res => res.json())
      .then(result => {
        setWeather(result);
        // set to an empty string upon search
        setQuery('');
        console.log(result);
      })
    }
  }

  const dateBuilder = (getDate) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // return a number bewteen 0 and 6 to get the day of the week
    // look through the index in the array
    let day = days[getDate.getDay()];

    // return a number between 0 and 30 to get the date 
    let date = getDate.getDate();

    // return a number between 0 and 11 to get the month of the year
    // look through the index in the array
    let month = months[getDate.getMonth()];

    // return year
    let year = getDate.getFullYear();

    return `${day} ${month} ${date}, ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warmBackground' : 'app coolBackground')  : 'app'}>
      <main>
        <div className="searchBox">
          <input type="text" className="searchBar" placeholder="Search Location" 
          // get the value of the typed input
          onChange={e => setQuery(e.target.value)} value={query}
          onKeyPress={searchWeather}>
          </input>
        </div>

        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="locationBox">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{(dateBuilder(new Date()))}</div>
          </div>
          <div className="weatherBox">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="showWeather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}  
        
      </main> 
    </div>
  );
}

export default App;
