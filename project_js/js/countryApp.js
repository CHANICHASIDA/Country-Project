

import Country from "./countryClass.js";


const firstCountries = [
    "israel",
    "usa",
    "france",
    "thailand",
  ];


  export const startCountries=()=>{
  document.getElementById("countryDiv").innerHTML = "";

  firstCountries.forEach(element => {
    document.getElementById("countryDiv").innerHTML = "";
    let url = `https://restcountries.com/v3.1/name/${element}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
            let country = new Country("#countryDiv", data[0], createCountry, getNameByCode);
            country.startRender();
    })
  });
  }

  export const createCountry = (input) => {

    document.getElementById("countryDiv").innerHTML = "";
    let url = `https://restcountries.com/v3.1/name/${input}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            // Results found
            console.log(data[0]);
            let country = new Country("#countryDiv", data[0], createCountry, getNameByCode);
            country.render();
        } else {
            // No results found
            document.querySelector("#countryDiv").innerHTML=`<h2 class="h2 text-center text-light">Country not found</h2>`
        }
    })
    .catch(error => {
        console.error("An error occurred:", error);
        // Handle any errors that occurred during the fetch or JSON parsing
    });
  };

  export const getNameByCode = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data[0].name.common;
  }

  const daclareEvent= ()=>{
    document.getElementById("home_id").addEventListener("click",()=>{
      startCountries();

    })
    document.getElementById("israel_country").addEventListener("click",()=>{
        createCountry("israel")
    })
    document.getElementById("USA_country").addEventListener("click",()=>{
        createCountry("USA")
    })
    document.getElementById("Tahiland_country").addEventListener("click",()=>{
        createCountry("thailand")
    })
    document.getElementById("franch_country").addEventListener("click",()=>{
        createCountry("france")
    })
    document.getElementById("submit_search").addEventListener("click",()=>{
      let country_name= document.getElementById("input_country").value
      createCountry(country_name);

    })

  }

window.onload=function(){
  daclareEvent();
}


