let searchComponent = document.getElementById("searchContainer");
let search =[]; 
let media = "";
let display = "";
let imgUrl ="https://static01.nyt.com/";


let SearchBtn = document.getElementById("SearchBtn");
let SearchInput = document.getElementById('SearchInput');
SearchBtn.addEventListener("click", function(){
    console.log(SearchInput);
})
console.log(SearchInput.innerText);

let searchApi = new XMLHttpRequest();
searchApi.open("GET" , `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=`+SearchInput.value+`&api-key=9gDWXzayGJ6nQ3Lrw3HYyrmZiHw8hrGU`);
searchApi.send();
searchApi.addEventListener("readystatechange" , function(){
    if(this.readyState == 4 && this.status == 200 ){
        search = JSON.parse(this.response).response.docs;
        console.log(search);
        displaySearchedArticles(search);
    }
    else{
        console.log("Not Found")
        console.error();
    }
})

let searchContainer = '';
function displaySearchedArticles(search){
    for(let i=0 ; i<search.length ;i++){
 
        let publishedDate =search[i].pub_date;
        publishedDate= publishedDate.slice(0 , 10) ;

        if(search[i].hasOwnProperty('multimedia')== false || search[i].multimedia == null  || search[i].multimedia[0] == undefined  || search[i].title==""){
            media='';
            display ='d-none';
        }
        else{
            media = imgUrl+search[i].multimedia[0].url;
        }
        searchContainer += `

        <div class="row w-75 left-side-inner shadow p-2 mb-3 bg-body rounded h-100 `+display+`">
            <div class="col-md-4 h-100">
                <img src="`+media+`" class="img-fluid rounded-start w-100 pb-0 h-100" alt="...">
            </div>
        <div class="col-md-6">
          <div class="card-body mt-0  w-100">
            <h4 class="card-title"><a href="`+search[i].url+`"> `+search[i].headline.main+` </a></h4>
            <p class="card-text text-muted">`+search[i].abstract+`</p>
            <p class="card-text"><small class=" date">`+ publishedDate+`</small></p>
          </div>
        </div>
      </div>

        `;

    }
    searchComponent.innerHTML= searchContainer;
}


