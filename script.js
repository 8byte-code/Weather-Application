const apiKey = "6787beb74c4048d8a3d132052240512";
let city;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    
    try {
        const response = await fetch(apiUrl);

        // Check if the response is valid
        if (!response.ok) {
            throw new Error("City not found or API error");
        }

        let data = await response.json();

        // Check if the data returned is valid
        if (!data.location) {
            throw new Error("City not found ");
        }

        // Updating the UI with weather information
        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".region").innerHTML = data.location.region;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

        // Update weather icon based on conditions
        if (data.current.condition.text == "Sunny" || data.current.condition.text == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.current.condition.text == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.current.condition.text == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.current.condition.text == "Clouds" || data.current.condition.text == "Overcast") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.current.condition.text == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }

        // Display the weather information
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        // Handle error case
        console.error(error.message);
        document.querySelector(".weather").style.display = "none";  // Hide weather info if there's an error
        alert("Error: " + error.message);  // Show an error message to the user
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
