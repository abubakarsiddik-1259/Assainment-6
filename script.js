

const categoriContainer = document.getElementById("categoriContainer")


const newsContainer = document.getElementById("newsContainer")

const bookmarkContainer = document.getElementById("bookmarkContainer")

const detailsBox = document.getElementById("details-container")

// const my_modal = document.getElementById("my_modal")



let bookmarks = []; 

const loadCategory = () => {
    fetch ("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {

        console.log(data.categories);
        const categories =data.categories
        showCategory(categories)
    })
    .catch((err) => {
        console.log(err);
        
    })
}









const showCategory = (categories) => {
    categories.forEach(cat => {
        categoriContainer.innerHTML +=`
              
                <li class = 'text-base hover:bg-green-500 cursor-pointer text-[#1F2937]  px-2 py-1' id ="${cat.id}" >${cat.category_name}</li>
            
        
        
        `
    })

    categoriContainer.addEventListener('click' , (e) => {

        const allLi = document.querySelectorAll('li')

        allLi.forEach(li => {
            li.classList.remove('bg-green-800')
            li.classList.remove('text-white')
            
        })
        if(e.target.localName === 'li'){
            showLoading ()
            console.log(e.target.id);
            e.target.classList.add("bg-green-800")
            e.target.classList.add("text-white")
            loadNewsCategory(e.target.id)
        }
        
    })
}







const loadNewsCategory = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)

    .then(res => res.json())
    .then(data => {
        console.log(data.plants);
        showsByCategories(data.plants);
        
    })
       .catch((err) => {
        console.log(err);
        
    })

}







const loadAllNews = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => showsByCategories(data.plants))
    showLoading ()
    .catch(err => console.log(err));
};












const showsByCategories = (plants) => {
    
    newsContainer.innerHTML = " ";
    
    console.log(plants);
    plants.forEach(plant => {
        
        newsContainer.innerHTML +=`
        
<div class="card bg-base-100 w-auto shadow-sm px-5 py-3">
  <div>
    <img class="rounded-lg w-full h-64 object-cover "
      src="${plant.image}"
       />
  </div>
  <div class="card-body p-0">
    <h2 onclick="loadDetailse(${plant.id})" class="card-title text-base cursor-pointer text-[#1F2937] font-semibold pt-2 ">${plant.name}</h2>
    <p class="text-[#1F2937]">${plant.description
}</p>
    <div id = '${plant.id}' class="flex justify-between items-center">
        <h2 class="text-[#15803D] bg-green-100 px-2 py-1 font-semibold  rounded-2xl text-base">${plant.category}</h2>
        <h2 class="font-semibold text-base ">${plant.price}</h2>
    </div>

    <div class="card-actions justify-end">
      <button class="btn  w-full rounded-3xl bg-[#15803D] text-white">Add to Cart</button>
    </div>
  </div>
</div>


        
        
        `
    })
    
}



//  ............ MODUL ....... 




const loadDetailse = async  (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`

    // console.log(url);
    const res = await fetch(url);
    const details = await res.json() ;
    displyaPlantsDetails (details.plants)
    

}



const displyaPlantsDetails = (myPlant) => {
console.log(myPlant);

myPlant.forEach(showsPlans => {
detailsBox.innerHTML=`


<div class="card  py-6 mx-auto h-auto">
    <h1 class="text-xl font-semibold pb-2 ">Banyan Tree</h1>
  <div>
    <img class ='rounded-lg w-full h-50 object-cover'
      src="${showsPlans.image}"
      alt="Shoes" />
  </div>
  <div class="card-body">

    <h2 class="text-base"><span class="text-lg font-semibold">Catogory : </span> shade Tree</h2>

    <h2 class=""><span class="text-lg font-semibold" >Price :</span> 1200</h2>

    <p> <span class="text-lg font-semibold">Desecription :</span>A card component has a figure, a body part, and inside body there are title and actions parts</p>
   
    </div>
  </div>
</div>










`
})
my_modal.showModal();


}









newsContainer.addEventListener('click' , (e) => {
    console.log(e.target);
    if(e.target.innerText === 'Add to Cart') {
       
        console.log(bookmarks );
        handleBookmarks(e)
    }
    
})








const handleBookmarks = (e) => {
     const title = e.target.parentNode.parentNode.children[0].innerText;

        const id = e.target.parentNode.parentNode.children[2].id

        const price = e.target.parentNode.parentNode.children[2].children[1].innerText;

        bookmarks.push({
            title : title,
            id : id,
            price : price


        })

        showBookmaark (bookmarks)

}







const showBookmaark = (bookmarks) => {
console.log(bookmarks);
bookmarkContainer.innerHTML='';

bookmarks.forEach(bookmark => {
    bookmarkContainer.innerHTML +=`
    
    
       <div class="bg-[#F0FDF4] p-2 m-2 flex justify-between items-center shadow-sm ">
                    <div class="">
                         <h1 class="text-[#1F2937] font-semibold text-base">${bookmark.title}</h1>
                    <h2>৳${bookmark.price}</h2>
                    </div>
                    <button onClick = "heandleDeleteBookmark(${bookmark.id})"><i class="fa-solid fa-xmark text-gray-400 cursor-pointer"></i></button>
                    
                   
                </div>
    
    
    
    
    
    `
})

}



// const handelBookmark = (bookmarkId) => {
//     console.log(bookmarkId);
    
//     const filterBookmark = bookmarks.filter (bookmark => bookmark.id == bookmarkId)
//     bookmarks = filterBookmark
//     showBookmaark (bookmarks)
// }



const heandleDeleteBookmark = (bookmarId) => {
    const filtereBookmarks = bookmarks.filter(bookmark => bookmark.id != bookmarId)
    bookmarks = filtereBookmarks
        showBookmaark(bookmarks)
}







const showLoading = () => {
    newsContainer.innerHTML = `
    

 <div class=" text-center items-center col-span-4"><span class="loading loading-bars mx-auto loading-xl"></span></div>

    
    
    
    
    
    
    
    `
}












 loadCategory()

 loadAllNews ()
