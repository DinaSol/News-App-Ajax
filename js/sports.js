
/*************************************************SPORTS NEWS (sports.html)*******************************************************************/ 

let media = "";
let display = "";
let sportsNewsArray = [];
let sportsNewsContainer = "";
let sportsNewsComponent = document.getElementById('sportsContainer');


let sportsApi = new XMLHttpRequest();
sportsApi.open("GET" , "https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=9gDWXzayGJ6nQ3Lrw3HYyrmZiHw8hrGU");
sportsApi.send();
sportsApi.addEventListener("readystatechange" , function(){
    if(this.readyState == 4 && this.status == 200 ){
        sportsNewsArray = JSON.parse(this.response).results ;
        displaysports(sportsNewsArray);
        console.log( sportsNewsArray);

    }
})

//////////////////////// Display Sports News //////////////////////////

function displaysports(sportsNewsArray){
    for(let i=0 ; i < sportsNewsArray.length ;i++){

        // get the published date in format (yy - mm - dd)
        let publishedDate =sportsNewsArray[i].published_date;
        publishedDate= publishedDate.slice(0 , 10) ;

        // if there aren't media for Article hide image
        if(sportsNewsArray[i].multimedia == null){
            media='';
            display ='d-none';
        }
        else{
            media = sportsNewsArray[i].multimedia[0].url;
        }

        sportsNewsContainer += `
        <div class="col-md-3 article ">
            <div class="card">
                    <div class="card-img ">
                        <img src="`+media+`" class="card-img-top" alt="" >
                    </div>                    
                    <div class="card-body">
                    <span class="section " ><a class="section" href="sports.html" >`+ sportsNewsArray[i].section+` </a></span>
                    <h4 class="card-title"><a href="`+sportsNewsArray[i].url+`">`+sportsNewsArray[i].title+`</a></h4>
                    <span class=" date" >`+ publishedDate+`</span>
                </div>
            </div>
        </div>
        `;
    }
    sportsNewsComponent.innerHTML = sportsNewsContainer;
}

