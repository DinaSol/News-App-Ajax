
let popularNewsComponent = document.getElementById("popularNewsContainer");
let worldComponent = document.getElementById("worldContainer");
let leftSideComponent = document.getElementById("leftSide");
let rightSideComponent = document.getElementById("rightSide");
let leftSideContainer = '';
let rightSideContainer = '';

let worldNewsArray=[];
let popularNewsArray =[]; 
let media = "";
let display = "";

// let SearchInput = document.getElementById('SearchInput');

// function toSearch(){
//     window.location.href = "search.html";

// }
/*************************************************world NEWS (index.html)*******************************************************************/ 
let worldApi = new XMLHttpRequest();
worldApi.open("GET" , "https://api.nytimes.com/svc/news/v3/content/nyt/world.json?api-key=9gDWXzayGJ6nQ3Lrw3HYyrmZiHw8hrGU");
worldApi.send();
worldApi.addEventListener("readystatechange" , function(){
    if(this.readyState == 4 && this.status == 200 ){
        worldNewsArray = JSON.parse(this.response).results ;
        displayWorldNews(worldNewsArray);
    }
})

//////////////////////// world NEWS ==> Display (Left & Right sides) //////////////////////////
function displayWorldNews(worldNewsArray){
    for(let i=0 ; i<6 ;i++){
        let publishedDate =worldNewsArray[i].published_date;
        publishedDate= publishedDate.slice(0 , 10) ;
        if(worldNewsArray[i].hasOwnProperty('multimedia')== false || worldNewsArray[i].multimedia == null  || worldNewsArray[i].title==""){
            display ='d-none';
        }
        else if(worldNewsArray[i].multimedia.length < 2 ){
                media =  worldNewsArray[i].multimedia[0].url;
        }
        else{
            media =  worldNewsArray[i].multimedia[2].url;
        }

        leftSideContainer += `
            <div class="row w-100 left-side-inner shadow-sm mb-3 bg-body rounded `+display+`">
                <div class="col-md-4 h-100">
                    <a href="`+worldNewsArray[i].url+`"> <img src="`+media+`" class="img-fluid rounded w-100 h-100" > </a>
                </div>
                <div class="col-md-6">
                    <div class="card-body p-2">
                        <h4 class="card-title"><a href="`+worldNewsArray[i].url+`"> `+worldNewsArray[i].title+` </a></h4>
                        <p class="card-text text-muted">`+worldNewsArray[i].abstract+`</p>
                        <p class="card-text"><small class=" date">`+ publishedDate+`</small></p>
                    </div>
                </div>
            </div> `;

        i= i+1 ;  // Increase i to add another Article in the Right Side
        rightSideContainer += `
        <div class="card-body shadow-sm p-2 mb-5 bg-body rounded right-side-inner `+display+`">
        <h6 class="card-title"><a href="`+worldNewsArray[i].url+`"> `+worldNewsArray[i].title+` </a></h6>
          <p class="card-text"><small class=" date">`+ publishedDate+`</small></p>
        </div>
        `;
    }
    leftSideComponent.innerHTML = leftSideContainer;
    rightSideComponent.innerHTML = rightSideContainer;

}




/*************************************************Popular NEWS (index.html)*******************************************************************/ 

let popularNewsApi = new XMLHttpRequest();
popularNewsApi.open("GET" , "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=9gDWXzayGJ6nQ3Lrw3HYyrmZiHw8hrGU");
popularNewsApi.send();
popularNewsApi.addEventListener("readystatechange" , function(){
    if(this.readyState == 4 && this.status == 200 ){
        popularNewsArray = JSON.parse(this.response).results ;
        displayPopularNews(popularNewsArray);
    }
    else{
        console.log("Not Found most popular")
    }
})

let popularNewsContainer = '';

//////////////////////// Display Popular News //////////////////////////
function displayPopularNews(popularNewsArray){
    for(let i=0 ; i<popularNewsArray.length ;i++){

        let publishedDate =popularNewsArray[i].published_date;
        publishedDate= publishedDate.slice(0 , 10) ;

        if(popularNewsArray[i].media == null){
            media='';
            display ='d-none';
        }
        else{
            media = popularNewsArray[i].media[0]["media-metadata"][2].url;
        }
        popularNewsContainer += `
        <div class="col-md-3 article `+display+`">
            <div class="card ">
                <div class="card-img ">
                    <img src="`+media+`" class="card-img-top ">
                </div>
                <div class="card-body">
                    <span class="section " ><a class="section" href="sports.html" >`+ popularNewsArray[i].section+` </a></span>
                        <h4 class="card-title"><a href="`+popularNewsArray[i].url+`"> `+popularNewsArray[i].title+` </a></h4>
                        <span class=" date" >`+ publishedDate+`</span>
                </div>
            </div>
        </div>
        `;
    }
    popularNewsComponent.innerHTML= popularNewsContainer;
}



