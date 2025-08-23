const apiKey = "70eda467c1494dd992a151714250406";
const baseUrl = "https://api.weatherapi.com/v1/";
export const getWeather = (city) => {
  const completeUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}`;
  return fetch(completeUrl);
};