window.addEventListener("load", ()=> {
	let long;
	let lat;
	let locationTimezone = document.querySelector(".location-timezone");
	let locationRegion = document.querySelector(".location-region");
	let temperatureSection = document.querySelector(".degree-section");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let temperatureSpan = document.querySelector(".degree-section span");
	let temperatureDescription = document.querySelector(".temperature-description");
	let iconSpan = document.querySelector(".icon");

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			// lat = position.coords.latitude; -3.350787
			// long = position.coords.longitude;
			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api =`${proxy}http://api.weatherapi.com/v1/current.json?key=a146e9e5cef5412caa674340200112&q=Banjarmasin`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					let text = data.current.condition.text;
					let temp_c = data.current.temp_c;
					let temp_f = data.current.temp_f;
					let location = data.location.name;
					let region = data.location.region;
					let icon = data.current.condition.icon;
					// console.log(data);

					//Set DOM Element from API
					temperatureDegree.textContent = temp_c;
					temperatureDescription.textContent = text;
					locationTimezone.textContent = location;
					locationRegion.textContent = region;
					iconSpan.style.backgroundImage = `url("http:${icon}")`;

					//Set Icon using Skycons
					// setIcons(text, document.querySelector(".icon"));

					//change Temperature to Celcius or Fahrenheit
					changeTemperature(temp_c, temp_f);
				});
		});
	}

	// function setIcons(icon, iconID){
	// 	const skycons = new Skycons({color:"white"});
	// 	const currentIcon = icon.replace(/ /g, "_").toUpperCase();
	// 	skycons.play();
	// 	return skycons.set(iconID, Skycons[currentIcon]);
	// }

	function changeTemperature(celcius, fahrenheit){
		temperatureSection.addEventListener("click", () => {
			if(temperatureSpan.textContent === "F"){
				temperatureSpan.textContent = "C";
				temperatureDegree.textContent = celcius;
			} else {
				temperatureSpan.textContent = "F";
				temperatureDegree.textContent = fahrenheit;
			}
		});
	}
});