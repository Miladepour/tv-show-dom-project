// //You can edit ALL of the code here
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

function fetchEpisodeLive(SHOW_ID) {
fetch(`https://api.tvmaze.com/shows/${SHOW_ID}/episodes`)
.then((res) => {
  if(res.status === 200) {
    errorMasg.style.display = "none"
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
setup()
})
.catch(error => errorMasg.style.display = "block")
}
// call fetchEpisodeLive to get the API and change the allEpisodes
fetchEpisodeLive(167)


function setup() {

  // makePageForEpisodes(allEpisodes);
  createEpisodeCards(allEpisodes)
  //optionCreator(allEpisodes)
  showCreator(allShows)
  optionCreator(allEpisodes)
  //restarting value of search input
  searchBar.value = ""
  //restarting Total episode text
  counter.innerHTML = `Total episodes: ${allEpisodes.length}`
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
    console.log(selectorValue);
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
  listOfShow.forEach(episode => { 
    const showSelection = document.createElement("option")
    showSelection.innerHTML= `${episode.name}`
    showSelection.value = episode.id
    showSelector.appendChild(showSelection)
  })
}
  //add event listener to show selector
  showSelector.addEventListener("change",filterShowsBySelect)
  // function of filterEpisodeBySelect
  function filterShowsBySelect() {
    let showValue = showSelector.value
    console.log(showValue);
    fetchEpisodeLive(showValue)
  }



//Display all the episode in cards
function createEpisodeCards(listOfEpisodes) {
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

    //Episode summery
    const episodeSummary = document.createElement('div')
    episodeSummary.className = "summary"
    episodeSummary.innerHTML = `Short Description:${summary}...`

    // episode duration (improvment needed)
    const showDuration = document.createElement('h5')
    showDuration.innerHTML = `Time: ${duration}m`

    //append list
    listMaker.appendChild(nameEl)
    listMaker.appendChild(episodeImg)
    listMaker.appendChild(episodeSummary)
    listMaker.appendChild(showDuration)
    episodeList.appendChild(listMaker)
    selectEl.appendChild(selector)  
 }) 
    
  rootEl.appendChild(episodeList)
}

//Search functionality
searchBar.addEventListener("keyup", (e)=>{
  selector.value = "all-episodes" 
 const searchString = e.target.value.toLowerCase();
 const filteredEpisodes = allEpisodes.filter(episode => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
      )
})
createEpisodeCards(filteredEpisodes)
counter.innerHTML = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`
});

//Show all episodes button
const backBtn = document.createElement("button")
backBtn.className = "backButton"
backBtn.innerText = "Clear my search"
backBtn.addEventListener("click",()=>{
  setup()
  selector.value = "all-episodes"
  showSelector.value = "all-shows"
  // need to write more code to update the option list
})
headerEl.appendChild(backBtn)

//start window
window.onload = setup;