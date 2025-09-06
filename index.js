//API
// https://news-api-fs.vercel.app/api/popular
// Go
// Categories
// https://news-api-fs.vercel.app/api/categories
// Go
// News by Categories
// https://news-api-fs.vercel.app/api/categories/{categoryId}
// Details News
// https://news-api-fs.vercel.app/api/news/{id}

//promise , pending ,resolve success, reject error
///header
const categoryContainer=document.getElementById('categoryContainer')
const newsContainer=document.getElementById('newsContainer')
const bookmarkContainer=document.getElementById('bookmarkContainer')
const bookmarkCount=document.getElementById('bookmarkCount')
const modalContainer=document.getElementById('modalContainer')
const newsDetailsContainer=document.getElementById('news-details-modal')
let bookmarks=[]
const loadCategory=()=>{
   fetch('https://news-api-fs.vercel.app/api/categories')
   .then(res=> res.json())
   .then(data=>{
    const categories=data.categories
    //    console.log(categories) 
   showCategory(categories)
})
.catch(arr=>{///error dhorar jonno
    console.log(arr)
}) 
}
const showCategory = (categories) => {
    categories.forEach(cat=>{
    // console.log(cat.title)
    categoryContainer.innerHTML +=`
    <li id="${cat.id}" class="hover:border-b-4 hover:border-red-800 cursor-pointer border-red-700">${cat.title}</li>  
    `
    })
    ///header end
    //  li a chap dile underline hoi thakbe
    categoryContainer.addEventListener('click',(e)=>{
    const allLi=document.querySelectorAll('li')
    allLi.forEach(li=>{
    li.classList.remove('border-b-4')
    })

    if(e.target.localName === "li"){
        // atar kaj 128 line
     showLoading()
       // 128
    e.target.classList.add('border-b-4')
    loadNewsByCategory(e.target.id)
    }
    })
}
////category te click korle news dhekhabe (im) showcategory te id nichi
const loadNewsByCategory=(categoryId)=>{
      console.log(categoryId)
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data.articles)
        showNewsByCategory(data.articles)
    })
    .catch(err=>{
     console.log(err)
     showError()
    })
}
showNewsByCategory=(articles)=>{
    if(articles.length ===0){//145 line
       showEmptyMessage() 
       return;
    }
// console.log(articles)
 newsContainer.innerHTML=""
articles.forEach(articles=>{
    newsContainer.innerHTML +=`
    <div class="border border-gray-300 rounded-sm">
    <div>
    <img  src="${articles.image.srcset[5].url}">
    </div>
    <div id="${articles.id}" class="p-2">
     <h1 class="font-bold">${articles.title}</h1>
    <p class="text-sm">${articles.time}</p>
       <button class="btn">Bookmark</button>
        <button class="btn">View Details</button>
    </div>
 
    </div>
    `
})
}
// bookmark option a click 
newsContainer.addEventListener('click',(e)=>{
    // console.log(e.target)
    if(e.target.innerText === 'Bookmark'){
        // console.log('bookmark btn click')
        handleBookmarks(e)
    }
        if(e.target.innerText === 'View Details'){
        handleViewDetails(e)
    }
})
const handleBookmarks=(e)=>{
    const title=e.target.parentNode.children[0].innerText
    const id=e.target.parentNode.id
    // console.log(id)

    bookmarks.push({
        title: title,
        id:id,   
    })
    // console.log(bookmarks)
    showBookmarks(bookmarks)
}
const showBookmarks=(bookmarks)=>{
    bookmarkContainer.innerHTML=""
bookmarks.forEach(bookmark=>{
    bookmarkContainer.innerHTML +=`
    <div class="p-2 border border-gray-300 my-2">
     <h1>${bookmark.title}</h1>
     <button onclick="handleDeleteBookmark('${bookmark.id}')" class="btn btn-xs">Delete</button>
    </div>
    `
})
    bookmarkCount.innerText=bookmarks.length
}
//delete bookmark
const handleDeleteBookmark=(bookmarkId)=>{
//  console.log(bookmarkId)
const filteredBookmarks = bookmarks.filter(bookmark=>bookmark.id !== bookmarkId)
bookmarks = filteredBookmarks
 showBookmarks(bookmarks)
}
// bookmark option a click end
// view details
handleViewDetails=(e)=>{
const id=e.target.parentNode.id
// newsDetailsContainer.showModal()
fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
.then(res=>res.json())
.then(data=>{
    console.log(data)
    showDetailsNews(data.article)
})
.catch(err=>{
    console.log(err)
})
}

const showDetailsNews=(article)=>{
//  console.log(article)
newsDetailsContainer.showModal()
modalContainer.innerHTML=`
<h1>${article.title}</h1>
 <img src="${article.images[0].url}"/>
 <p>${article.content.join("")}</p>
`
}

// loading
const showLoading=()=> {
newsContainer.innerHTML=`
 <div class="bg-green-500 p-3">Loading...</div>
`
}

const  showError=()=>{
    newsContainer.innerHTML=`
    <div class="bg-red-500 p-3">Something went wrong...</div>
    `
}
const showEmptyMessage=()=>{
 newsContainer.innerHTML=`
    <div class="bg-red-500 p-3">No News found for this category</div>
    `
}
 loadCategory()
///header end answer dicliar

// auto matic akta section age theke thake jabe main ta
loadNewsByCategory('main')


























// const loadCategoryAsync=async()=>{
//     //alkhane error dhekhanor jonno try catch beboher korte hobe
//     try{
//         const res=await fetch('https://news-api-fs.vercel.app/api/categories');
//         const data=await res.json()
//         console.log(data)
//     } catch(error){
//    console.log(error)
//     }

// }
// loadCategoryAsync()

