// Script
const rootEl = document.getElementById("container")
const selectEl = document.getElementById("selectEl")
const headerEl = document.getElementById("headerEl")
const searchBar = document.getElementById("searchBar")
const selector = document.getElementById("selector")
const showSelector = document.getElementById("showSelector")
const errorMasg = document.getElementById("errorMasg")
const counter = document.getElementById("episodeCounter")
allEpisodes = ""
allShows = getAllShows().sort((a, b) => a.name.localeCompare(b.name))

//Show all episodes button
const backBtn = document.createElement("button")
backBtn.className = "backButton"
backBtn.innerText = "Back To All Shows"
backBtn.addEventListener("click",()=>{
  setup()
  selector.value = "all-episodes"
  showSelector.value = "all-shows"
})
headerEl.appendChild(backBtn)

//Color Mode
const colorMode = document.createElement("button")
colorMode.className = "colorMode"
colorMode.innerHTML = "🌝 Light Mode"
colorMode.addEventListener("click", ()=>{
  if(colorMode.innerHTML == "🌝 Light Mode") {
    colorMode.innerHTML = "🌙 Dark Mode"
    document.body.style.backgroundColor = "#ccc5b9"
    headerEl.style.backgroundColor = "#403d39"
    colorMode.style.backgroundColor = "black"
    colorMode.style.color = "var(--white)"
    //border-left: 8px solid var(--fyellow);
    colorMode.style.borderLeft = "none"
    colorMode.style.borderRight = "10px solid var(--fyellow)"
    colorMode.style.transition = "0.5s"
  } else {
    colorMode.innerHTML = "🌝 Light Mode"
    document.body.style.backgroundColor = "var(--darkGrey)"
    headerEl.style.backgroundColor = "#000000"
    colorMode.style.backgroundColor = "var(--white)"
    colorMode.style.color = "var(--Royalblue)"
    colorMode.style.borderRight = "none"
    colorMode.style.borderLeft = "10px solid var(--fyellow)"
    colorMode.style.transition = "0.5s"
  }

})
headerEl.appendChild(colorMode)

function fetchEpisodeLive(SHOW_ID) {
fetch(`https://api.tvmaze.com/shows/${SHOW_ID}/episodes`)
.then((res) => {
  if(res.status === 200) {
    errorMasg.style.display = ""
    return res.json()
  } else {
    throw new Error('Not Found ...')
  }
  })
.then(data => {
allEpisodes = data.map((episode)=> {
  const formattedSeason = (episode.season.toString()).padStart(2, "0") 
  const formattedNumber = (episode.number.toString()).padStart(2, "0")
  const episodeCorrectFormatV2 = `S${formattedSeason}E${formattedNumber}`
  return {...episode, formattedNumber : episodeCorrectFormatV2}
})
createEpisodeCards(allEpisodes)
optionCreator(allEpisodes)
})
.catch(error => {
  errorMasg.style.display = "block"
  selector.style.display = "none"
  showSelector.style.display = "none"
  counter.innerHTML = ""
})
}

function setup() {
  showLoad(allShows)
  // createEpisodeCards(allEpisodes)
  showCreator(allShows)
  //optionCreator(allEpisodes)
  //restarting value of search input
  searchBar.value = ""
  //restarting Total episode text
  counter.innerHTML = `Total Shows: ${allShows.length}`
}


//episode option creator
function optionCreator(listOfEpisodes) {
  selector.innerHTML = ""
  listOfEpisodes.forEach(episode => { 
    const selectionOption = document.createElement("option")
    selectionOption.innerHTML= `${episode.formattedNumber} - ${episode.name}`
    selector.appendChild(selectionOption)
  })
}
  //add event listener to selector
  selector.addEventListener("change",filterEpisodeBySelect)
  // function of filterEpisodeBySelect
  function filterEpisodeBySelect() {
    let selectorValue = selector.value
    let filteredEpisodes;
    
    if (selectorValue === "all-episodes") {
      filteredEpisodes = allEpisodes
    } else {
      filteredEpisodes = allEpisodes.filter(episode => 
        selectorValue.includes(episode.formattedNumber) 
      ); 
    }
    createEpisodeCards(filteredEpisodes)
    //change number of displaying episode
    counter.innerHTML = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`
  }

function showCreator(listOfShow) {
  listOfShow.forEach(shows => { 
    const showSelection = document.createElement("option")
    showSelection.innerHTML= `${shows.name}`
    showSelection.value = shows.id
    showSelector.appendChild(showSelection)
  })
}
  //add event listener to show selector
  showSelector.addEventListener("change",filterShowsBySelect)
  // function of filterEpisodeBySelect
  function filterShowsBySelect() {
    let showValue = showSelector.value
    fetchEpisodeLive(showValue)
    if(showValue === "all-shows"){
      setup()
    }
  }

//Display all the shows in cards
  function showLoad(listOfShow) {
    selector.style.display = "none"
    showSelector.style.display = ""
    backBtn.style.display = "none"
    errorMasg.style.display = ""
    rootEl.innerHTML = ""

    const episodeList = document.createElement("ul")
      
    listOfShow.forEach(shows => {
      const listMaker = document.createElement('li')
      listMaker.className = "episode-card"
      const 
        name = shows.name,
        summary = shows.summary?.substring(0,200) || "",
        image = shows.image?.medium || "Images/no_image.jpg",
        moreSummary = shows.summary?.substring(0,400) || ""
      //Show seasons and numbers
      const nameEl = document.createElement('h2') 
      nameEl.className = "episode-name"
      nameEl.innerText = `${name}`
      nameEl.addEventListener("click",()=>{
        let showValue = showImg.value
        fetchEpisodeLive(showValue)
      })
  
      //Show image 
      const showImg = document.createElement("img")
      showImg.style.height = "330px" //298
      showImg.style.width = "100%" //167
      showImg.src = image
      showImg.alt = `${name}`
      showImg.value = shows.id
      showImg.addEventListener("click",()=>{
        let showValue = showImg.value
        fetchEpisodeLive(showValue)
      })

      //Show summery
      const showSummary = document.createElement('div')
      showSummary.className = "summary"
      showSummary.innerHTML = `Short Description:${summary}`

      // Show rate
      const showRate = document.createElement('h5') 
      showRate.className = "showRate"
      showRate.innerHTML = `Rate: ${shows.rating.average}`
      
      // Status 
      const showStatus = document.createElement('div') 
      showStatus.className = "showStatus"
      showStatus.innerHTML = `Status: ${shows.status}`

      // Genres
      const showGenres = document.createElement('div') 
      showGenres.className = "showGenres"
      showGenres.innerHTML = `Genres: ${shows.genres}`

      // Runtime
      const showRunTime = document.createElement('div') 
      showRunTime.className = "showRunTime"
      showRunTime.innerHTML = `Runtime: ${shows.runtime}`

      //like button
      const likeBtn = document.createElement("img")
      likeBtn.classList = "likeBtn"
      likeBtn.src = "Images/heart.png"
      likeBtn.addEventListener("click",()=>{
        if (likeBtn.src.includes("Images/heart.png")) {
          likeBtn.src = "Images/heart (1).png"
        } else {
          likeBtn.src = "Images/heart.png"
        }
      })

      //Read more
      const showMoreSummary = document.createElement('div')
      showMoreSummary.className = "more-summary"
      showMoreSummary.innerHTML = `...Read more`
      showMoreSummary.addEventListener("click",()=>{
          showMoreSummary.innerHTML = ""
          showSummary.innerHTML = `Full Description:${moreSummary}`
      })

      //append list
      listMaker.appendChild(nameEl)
      listMaker.appendChild(showImg)
      listMaker.appendChild(showRate)
      listMaker.appendChild(showSummary)
      listMaker.appendChild(showMoreSummary)
      listMaker.appendChild(showStatus)
      listMaker.appendChild(showGenres)
      listMaker.appendChild(showRunTime)
      listMaker.appendChild(likeBtn)
      episodeList.appendChild(listMaker)
      selectEl.appendChild(selector)  
   }) 
    rootEl.appendChild(episodeList)
    counter.innerHTML = `Displaying ${allShows.length} Shows`
  }



//Display all the episode in cards
function createEpisodeCards(listOfEpisodes) {
  window.scrollTo(0,0);
  selector.style.display = ""
  showSelector.style.display = "none"
  backBtn.style.display = ""
  rootEl.innerHTML = ""

  const episodeList = document.createElement("ul")
    
  listOfEpisodes.forEach(episode => {
    const listMaker = document.createElement('li')
    listMaker.className = "episode-card"
    const 
      name = episode.name,
      season = episode.season,
      number = episode.number,
      summary = episode.summary.substring(0,200) || "",
      image = episode.image.medium || "Images/no_image.jpg",
      duration = episode.runtime

    //Episode seasons and numbers
    const nameEl = document.createElement('h2') 
    nameEl.className = "episode-name"
    nameEl.innerText = `${name} - ${episode.formattedNumber}`

    //Episode image 
    const episodeImg = document.createElement("img")
    episodeImg.style.height = "167px"
    episodeImg.style.width = "298px"
    episodeImg.src = image
    episodeImg.alt = `${name} - ${episode.formattedNumber}`
    episodeImg.addEventListener("click",function(){
      window.location.assign(episode.url);
      });
    //Episode summery
    const episodeSummary = document.createElement('div')
    episodeSummary.className = "summary-episode"
    episodeSummary.innerHTML = `Short Description:${summary}...`

    // episode duration (improvment needed)
    const showDuration = document.createElement('h5')
    showDuration.innerHTML = `Time: ${duration}m`

    //like button
      const likeBtn = document.createElement("img")
      likeBtn.classList = "likeBtn"
      likeBtn.src = "Images/heart.png"
      likeBtn.addEventListener("click",()=>{
        if (likeBtn.src.includes("Images/heart.png")) {
          likeBtn.src = "Images/heart (1).png"
        } else {
          likeBtn.src = "Images/heart.png"
        }
      })

    //append list
    listMaker.appendChild(nameEl)
    listMaker.appendChild(episodeImg)
    listMaker.appendChild(episodeSummary)
    listMaker.appendChild(showDuration)
    listMaker.appendChild(likeBtn)
    episodeList.appendChild(listMaker)
    selectEl.appendChild(selector)  
 }) 
    
  rootEl.appendChild(episodeList)
    counter.innerHTML = `Displaying ${allEpisodes.length} episodes`
    
}

  //Search functionality
  searchBar.addEventListener("keyup", (e)=>{
    const searchString = e.target.value.toLowerCase();
    if(showSelector.value === "all-shows" ){
      const filteredEpisodes = allShows.filter(episode => {
        return (
          episode.name.toLowerCase().includes(searchString) ||
          episode.summary.toLowerCase().includes(searchString)
          )
          })
          showSelector.value = "all-shows" 
          rootEl.innerHTML = ""
          showLoad(filteredEpisodes)
    
    counter.innerHTML = `Displaying ${filteredEpisodes.length}/${allShows.length} shows`
    
    } else {
      selector.value = "all-episodes" 
      const filteredEpisodes = allEpisodes.filter(episode => {
         return (
           episode.name.toLowerCase().includes(searchString) ||
           episode.summary.toLowerCase().includes(searchString)
           )
     })
     createEpisodeCards(filteredEpisodes)
     
     counter.innerHTML = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`
    }
  });
  

//start window
window.onload = setup;