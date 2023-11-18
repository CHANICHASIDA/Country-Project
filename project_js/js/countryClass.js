 export default  class CountryClass{
    
    constructor(_parent,_item, createCountry,getNameByCode){

        this.createCountry=createCountry
        this.getNameByCode=getNameByCode
        this.parent = _parent
        this.name=_item.name.common;
        this.population= `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
        this.capital = _item.capital ? _item.capital : "none";
        this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
         this.flag = _item.flags.png;
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
        this.countryCode = _item.cca3;
        this.borders = _item.borders;
        this.region= _item.region
        }

    render(){
        let div = document.createElement("div");
        document.querySelector(this.parent).append(div);
        document.querySelector(this.parent).className="row";
        div.innerHTML = `           
        <div class="row justify-content-center" data-aos="fade-up" data-aos-duration="2000">
        <div class="col-4 border border-dark shadow card p-4">
            <img src="${this.flag}" alt="flag" width=100%>
        </div>
        <div class="col-4 border border-dark text-start p-4 shadow card">
            <h1 class="h2 text-dark ">${this.name}</h1>
            <p>POP: ${this.population}</p>
            <p>region: ${this.region}</p>
            <p>Languges: ${this.languages}</p>
            <p>Capital:${this.capital}</p>
            <p id="id_borders">States with borders: </p>
        </div>
        <div class="Mymap col-4">
            <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
            src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=es&z=14&amp;output=embed">
            </iframe>
           </div>
    </div>
        `
        if (this.borders) {
            this.borders.forEach(async (item) => {
              if (item != "PSE") {
                let fullNmae = await this.getNameByCode(item);
                let span = document.createElement("span");
                span.className = "lank"
                span.innerHTML = `${fullNmae}, `;
                document.querySelector("#id_borders").append(span);
                span.addEventListener("click", () => {
                this.createCountry(fullNmae);
                });
                
              }
            });
        } 
        else { document.querySelector("#id_borders").innerHTML += "none" }
    }

    startRender() {
        let myDiv = document.createElement("div");
        myDiv.className = "d-flex justify-content-center my-3 text-center";
        document.querySelector(this.parent).append(myDiv);
        document.querySelector(this.parent).className = "row row-cols-lg-4 justify-content-around"
        myDiv.innerHTML += `
        <div class="card Box h-100" data-aos="fade-down" data-aos-duration="1000" >
        <div class=" shadow  d-flex justify-content-center" style="width: 100%;
        height: 100%; object-fit: cover; 
        ">
        <img src="${this.flag}" alt="flag" width=100%>
        </div>
        <div class="card-body">
        <p class="pnew card-text Mcard-text m-0 p-3">Name: ${this.name} </p>
        </div>
        </div>
        `;
        myDiv.querySelector(".Box").addEventListener("click", () => {
          document.querySelector("#countryDiv").innerHTML = "";
          this.render();
        });
    }
 }