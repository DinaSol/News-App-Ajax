
let media = "";
let display = "";
let technologyNewsArray = [];
let technologyNewsContainer = "";
let technologyNewsComponent = document.getElementById('technologyContainer');


let sportsApi = new XMLHttpRequest();
sportsApi.open("GET" , "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=9gDWXzayGJ6nQ3Lrw3HYyrmZiHw8hrGU");
sportsApi.send();
sportsApi.addEventListener("readystatechange" , function(){
    if(this.readyState == 4 && this.status == 200 ){
        technologyNewsArray = JSON.parse(this.response).results ;
        displayTechnology(technologyNewsArray);
        console.log( technologyNewsArray);

    }
})

//////////////////////// Display Sports News //////////////////////////

function displayTechnology(technologyNewsArray){
    for(let i=0 ; i < technologyNewsArray.length ;i++){

        // get the published date in format (yy - mm - dd)
        let publishedDate =technologyNewsArray[i].published_date;
        publishedDate= publishedDate.slice(0 , 10) ;

        // if there aren't media for Article hide image
        if(technologyNewsArray[i].multimedia == null){
            media='';
            display ='d-none';
        }
        else{
            media = technologyNewsArray[i].multimedia[0].url;
        }

        technologyNewsContainer += `
        <div class="col-md-3 article ">
            <div class="card">
                    <div class="card-img ">
                        <img src="`+media+`" class="card-img-top" alt="" >
                    </div>                    
                    <div class="card-body">
                    <span class="section " ><a class="section" href="sports.html" >`+ technologyNewsArray[i].section+` </a></span>
                    <h4 class="card-title"><a href="`+technologyNewsArray[i].url+`">`+technologyNewsArray[i].title+`</a></h4>
                    <span class=" date" >`+ publishedDate+`</span>
                </div>
            </div>
        </div>
        `;
    }
    technologyNewsComponent.innerHTML = technologyNewsContainer;
}

