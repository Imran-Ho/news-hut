const loadNewsCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayNewsCategory(data.data.news_category) )
}

const displayNewsCategory =(categories)=>{
    const newsContainerId = document.getElementById('news-categories');
    categories.forEach(category => {
        console.log(category)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('category');
        newsDiv.innerHTML = `
            <div onclick="getDetails('${category.category_id
            }')">${category.category_name}</div>
        `;
        newsContainerId.appendChild(newsDiv);

    })
}

loadNewsCategories()

// for getting details of news categories

const getDetails = async id =>{
    const url =`https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data)
}

const displayNewsDetails =(newses) =>{
    const displayNewsSection = document.getElementById('news-portal');
    // for(news of newses){
    //     console.log(news)
    // }
    newses.forEach(news =>{
        
        console.log(news);
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
                    <div class="d-flex justify-content-between">
                        <div class="d-flex">
                        <img class="rounded-circle me-3" style="width: 50px; height: 60px" src="${news.author.img}" alt="">
                        <h4>${news.author.name ? news.author.name : 'No Data Available'}</h4>
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
    
}

const getModalInfo = (info) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${info}`)
    .then(res => res.json())
    .then(data => console.log(data.data))
}

displayModalInfo = (modals) =>{
    // console.log(modals)
    modals.forEach(modal =>{
        const {name, published_date} = modal;
        console.log(published_date)
    })
}