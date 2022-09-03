const loadNewsCategories = () =>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => displayNewsCategory(data.data.news_category) )
    .catch(error => console.log(error))
}

const displayNewsCategory =(categories)=>{

    // showingCountItems(categories);
    // console.log(categories)
    const newsContainerId = document.getElementById('news-categories');
    categories.forEach(category => {
        // console.log(category)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('category');
        newsDiv.innerHTML = `
            <button class="flex-sm-row btn btn-outline-light" onclick="getDetails('${category.category_id
            }')"><h6 class="text-dark">${category.category_name}</h6></button>
        `;
        newsContainerId.appendChild(newsDiv);
        

    })
}

//show item numbers from the news category

const showingCountItems = (newses) =>{
    const totalNews = newses;
    const arrLeng =totalNews.length;
    console.log(arrLeng)
    const totalNewsField = document.getElementById('total-count-field');
    totalNewsField.innerHTML = '';
    const totalNewsDiv = document.createElement('div');
    totalNewsDiv.innerHTML =`
        <h6>${arrLeng} item found for this category.</h6>
    `;
    totalNewsField.appendChild(totalNewsDiv);


}

// for getting details of news categories

const getDetails = (id) =>{
    const url =`https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data))
    .catch(error => console.log(error))
}

const displayNewsDetails =(newses) =>{
    spinnerField(true);  // spinner get started.
    showingCountItems(newses); // showing item numbers.
    const displayNewsSection = document.getElementById('news-portal');
    displayNewsSection.innerHTML = '';
    // newsArray.sort((a, b) => b.total_view - a.total_view);
    newses.forEach(news =>{
        const newsDetailsDiv = document.createElement('div');
        newsDetailsDiv.innerHTML = `
                <div class="card mb-3" style="max-width: 100%;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${news.thumbnail_url
                    }" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text my-5">${news.details.slice(0, 150) + '...'}</p>
                    </div>
                    <div class="d-flex justify-content-between justify-content-sm-around">
                        <div class="d-flex flex-sm-wrap">
                        <div><img class="rounded-circle me-3" style="width: 50px; height: 60px" src="${news.author.img}" alt=""></div>
                        <div><h4>${news.author.name ? news.author.name : 'No Data Available'}</h4></div>
                        </div>
                        <div class="d-flex">
                        <div class="me-3"><i class="fa-regular fa-eye"></i></div>
                        <h6>${news.total_view ? news.total_view : 'No Data Available'}</h6>
                        </div>
                        <div class="me-3">
                        <button onclick="getModalInfo('${news.category_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Get More
                      </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `;
        displayNewsSection.appendChild(newsDetailsDiv);
    })
    spinnerField(false); //spinner ended here.
}

// Uso of Modal
const getModalInfo = (info) => {

    fetch(`https://openapi.programming-hero.com/api/news/category/${info}`)
    .then(res => res.json())
    .then(data => displayModalInfo(data.data))
}

displayModalInfo = (modals) =>{
    // console.log(modals)
    modals.forEach(modal =>{
        const {rating, author}= modal;
        console.log(rating, author)

        const textId = document.getElementById('titleModalLabel');
        textId.innerText= author.name;
        const modalField = document.getElementById('modal-field');
        modalField.innerHTML=`
        <p>Rating Badge: ${rating.badge ? rating.badge : 'no storage data found'}</p>
        <p>Rating Number: ${rating.number ? rating.number : 'no data found'}</p>
    `;

    })
    
}

// spinner function call field
const spinnerField = isCalling =>{
    const loadingSection = document.getElementById('spinner-field');
    if(isCalling){
        loadingSection.classList.remove('d-none');
    }
    else{
        loadingSection.classList.add('d-none');
    }

}

loadNewsCategories()