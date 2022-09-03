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
            <div>${category.category_name}</div>
        `;
        newsContainerId.appendChild(newsDiv);

    })
}

loadNewsCategories()