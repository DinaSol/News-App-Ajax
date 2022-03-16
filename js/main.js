
let carouselInnerComponent = document.getElementById("carouselInner");
let topStoriesArray = [];
let topStoriesContainer = '';
let media = '';
let display = '';
let publishedDate = '';


let topStoriesApi = new XMLHttpRequest();
topStoriesApi.open("GET" , "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=9gDWXzayGJ6nQ3Lrw3HYyrmZiHw8hrGU");
topStoriesApi.send();
topStoriesApi.addEventListener("readystatechange" , function(){
    if(this.readyState == 4 && this.status == 200 ){
        topStoriesArray = JSON.parse(this.response).results ;
        displayTopStories(topStoriesArray); // Display in Carousel
        displayLatestStories(topStoriesArray); // Display in the Rows
    }
})


///////////////// Display the Articles in Carousel ////////////////
function displayTopStories(topStoriesArray){
    publishedDate =topStoriesArray[0].published_date;
    publishedDate= publishedDate.slice(0 , 10) ;

    if(topStoriesArray[0].multimedia == null){
        media='';
    }
    else{
        media = topStoriesArray[0].multimedia[0].url;
    }
    topStoriesContainer += `
        <div class="carousel-item active h-100">
            <div id="imageDisplay" class="image-display d-flex justify-content-center align-items-end" style="background-image:url(`+media+`);">
            <div class="textBody rounded-2 py-2">
                <span class=" date">`+publishedDate+` </span>
                <h1 class="my-3"><a href="`+topStoriesArray[0].url+`"> `+topStoriesArray[0].title+`  </a></h1>
                <p class="lead mb-0"><a href="`+topStoriesArray[0].url+`" class="reading font-weight-bold">Continue reading...</a></p>
            </div>
            </div>
        </div>
        `;
    for(let i=1 ; i<9 ; i++){
        let publishedDate =topStoriesArray[i].published_date;
        publishedDate= publishedDate.slice(0 , 10) ;

        if(topStoriesArray[i].multimedia == null){
            display ='d-none';
            media='';
        }
        else{
            media = topStoriesArray[i].multimedia[0].url;
        }
        topStoriesContainer += `
        <div class="carousel-item h-100">
        <div id="imageDisplay" class="image-display d-flex justify-content-center align-items-end" style="background-image:url(`+media+`);">
        <div class="textBody rounded-2 py-2">
            <span class=" date ">`+publishedDate+` </span>
            <h1 class="my-3"><a href="`+topStoriesArray[i].url+`"> `+topStoriesArray[i].title+`  </a></h1>
            <p class="lead mb-0"><a href="`+topStoriesArray[i].url+`" class="reading font-weight-bold">Continue reading...</a></p>
        </div>
        </div>
    </div>
        `;
    }
    carouselInnerComponent.innerHTML = topStoriesContainer; // Add the Html code by JS in index.html
}



///////////////// Display the Articles in Rows ////////////////

let latestArticles = document.getElementById("latestArticles");
let latestArticlesContainer='';
function displayLatestStories (topStoriesArray){ 
    for(let i=10 ; i<topStoriesArray.length ; i++){
        publishedDate =topStoriesArray[i].published_date;
        publishedDate= publishedDate.slice(0 , 10) ;

        if(topStoriesArray[i].multimedia == null){
            display ='d-none';
            media='';
        }
        else{
            media = topStoriesArray[i].multimedia[0].url;
        }
        latestArticlesContainer += `
        <div class="col-md-3 article">
            <div class="card ">
                <div class="card-img  `+display+`">
                    <img src="`+media+`" class="card-img-top ">
                </div>
                <div class="card-body">
                    <span class="section " ><a class="section" href="sports.html" >`+ topStoriesArray[i].section+` </a></span>
                        <h4 class="card-title"><a href="`+topStoriesArray[i].url+`"> `+topStoriesArray[i].title+` </a></h4>
                        <span class=" date" >`+ publishedDate+`</span>
                </div>
            </div>
        </div>
        `;
    }
    latestArticles.innerHTML = latestArticlesContainer;

}
