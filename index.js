//
const weatherForm = document.querySelector(".weatherForm");
const textBox = document.querySelector(".textBox");
const card = document.querySelector(".card");
const apiKey = "7663244b26914ebd73412f1a8b8c78b3";

weatherForm.addEventListener("submit",  async event => {
    event.preventDefault();

    let capitalizeCity = (city) => {
        return city.charAt(0).toUpperCase() + city.slice(1);
    };
    
    let city = textBox.value;
    city = capitalizeCity(city)

    if(city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error) {
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Enter a city")
    }

    textBox.value = "";
})

async function getWeatherData(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    

    const res = await fetch(url);

    if(!res.ok) {
        throw new Error("Could not fetch a response");
    }

    return await res.json();

}
function displayWeatherData(data) {

    card.textContent = "";
    
    console.log(data)

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{id, description}],
           sys: {country}} = data;

    const emojiDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("h1");
    const cityDisplay = document.createElement("h1");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");

    emojiDisplay.textContent = displayEmoji(id);
    tempDisplay.textContent = `${temp.toFixed(0)}℃`
    cityDisplay.textContent = `${city}, ${country}`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;

    emojiDisplay.classList.add("emojiDisplay");
    tempDisplay.classList.add("tempDisplay");
    cityDisplay.classList.add("cityDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    
    card.appendChild(emojiDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(cityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(humidityDisplay);
}
function displayEmoji(weatherid) {
    
    switch(true) {
        case(weatherid >= 200 && weatherid < 300):
            return "⛈️";
        case(weatherid >= 300 && weatherid < 400):
            return "⛈️";
        case(weatherid >= 500 && weatherid < 600):
            return "🌧️";
        case(weatherid >= 600 && weatherid < 700):
            return "❄️";
        case(weatherid >= 700 && weatherid < 800):
            return "🌫";
        case(weatherid == 800):
            return "☀️";
        case(weatherid > 800 && weatherid < 900):
            return "☁️";
    }
}
function displayError(message) {
    const displayError = document.createElement("p")
    displayError.textContent = message;
    displayError.classList.add("displayError")

    card.textContent = "";
    card.appendChild(displayError)
}