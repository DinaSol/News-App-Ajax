
/*************************************************BUSINESS NEWS (Business.html)*******************************************************************/ 
let businessNewsArray =[];
let businessNewsComponent = document.getElementById("businessNewsContainer");
let businessNewsContainer = "";
let media = "";
let display = "";




var businessApi = new XMLHttpRequest();
businessApi.open("GET" , "https://api.nytimes.com/svc/topstories/v2/business.json?api-key=9gDWXzayGJ6nQ3Lrw3HYyrmZiHw8hrGU");
businessApi.send();
businessApi.addEventListener("readystatechange" , function(){
    if(this.readyState == 4 && this.status == 200 ){
        businessNewsArray = JSON.parse(this.response).results ;
        displayBusinessArticles(businessNewsArray);
        console.log( businessNewsArray);

    }
})


function displayBusinessArticles(businessNewsArray){

    for(let i=0 ; i < businessNewsArray.length ;i++){

        // get the published date in format (yy - mm - dd)
        let publishedDate =businessNewsArray[i].published_date;
        publishedDate= publishedDate.slice(0 , 10) ;

        // if there aren't media for Article hide image
        if(businessNewsArray[i].multimedia == null){
            media='';
            display ='d-none';
        }
        else{
            media = businessNewsArray[i].multimedia[0].url;
        }
        businessNewsContainer += `
        <div class="col-md-3 article ">
            <div class="card">
                    <div class="card-img rounded-2 ">
                        <img src="`+media+`" class="card-img-top " alt="" >
                    </div>
                    <div class="card-body">
                    <span class="section " ><a class="section" href="business.html" >`+ businessNewsArray[i].section+` </a></span>
                    <h4 class="card-title"><a href="`+businessNewsArray[i].url+`">`+businessNewsArray[i].title+`</a></h4>
                    <span class=" date" >`+ publishedDate+`</span>
                </div>
            </div>
        </div>`;
    }
    businessNewsComponent.innerHTML = businessNewsContainer;
}



