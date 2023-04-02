import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
    
  //  let parts = search.split("=")
    //  let getCity = parts[1];
    //  return getCity;
  
    let city = new URLSearchParams(search);
    return city.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const res = await fetch(config.backendEndpoint + "/adventures?city=" + city );
    const data = await res.json();
    return data;
   }
catch(e){
    return null;
   }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for(let i = 0; i < adventures.length; i++)
  {
    let cards = document.createElement("div")
    cards.className = "col-6 col-lg-3 mb-3";  
    cards.innerHTML = `
                 <a href="detail/?adventure=${adventures[i].id}" id="${adventures[i].id}">
          <div class="category-banner">${adventures[i].category}</div>
                <div class="activity-card">
                     <img class="img-responsive" src="${adventures[i].image}"/>
                         <div class="container d-flex flex-wrap justify-content-between mt-3">
                              <h5>${adventures[i].name}</h5>
                              <p>${adventures[i].currency} ${adventures[i].costPerHead}</p>
                          </div>
                      <div class="container d-flex flex-wrap justify-content-between">
                            <h5>Duration</h5>
                             <p>${adventures[i].duration} Hours</p>
                       </div>                
                </div>
            </a>`;
   
   document.getElementById("data").appendChild(cards);
  }
     
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(item => item.duration >= low && item.duration <= high)
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
   return list.filter(item => categoryList.includes(item.category))
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
     let filteredList = 0
  if(filters["duration"].length > 0 && filters.category.length > 0 )
  {
    let filterValue = filters.duration;
    let parts = filterValue.split("-")
    let low = parseInt(parts[0])
    let high = parseInt(parts[1])
    filteredList = filterByDuration(list, low, high)
    // filteredByCategory(list,filters.category) : list --> filteredList = filterByDuration(list, low, high)
    filteredList = filterByCategory(filteredList, filters.category)
    return filteredList
  }
  
else if(filters.category.length > 0)
    {
       return filterByCategory(list,filters.category)
    }
 else if(filters["duration"].length > 0)
    {
      let filterValue = filters.duration;
      let parts = filterValue.split("-")
      let low = parseInt(parts[0])
      let high = parseInt(parts[1])
      return filterByDuration(list, low, high)
    }      
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  // 
  return localStorage.setItem("filters", JSON.stringify(filters));;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
     const category = document.getElementById("category-list")
     for (let i = 0; i < filters.category.length; i++) 
     {
      const pill = document.createElement("div");
      pill.className ="category-filter";
      pill.textContent=filters.category[i]
      /** To remove individual pill-category */
      // let removePill = document.createElement("span")
      // removePill.innerHTML =`
      //        <span id="remove-pill" style="position:relative; bottom:10px; left:10px; z-index:1; color:black; cursor: pointer;">x</span>
      //        `;
      //  pill.append(removePill);
       category.appendChild(pill);
     }  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
