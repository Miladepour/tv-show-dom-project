//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootEl = document.getElementById("container")
const selectEl = document.getElementById("selectEl")
const headerEl = document.getElementById("headerEl")
const searchBar = document.getElementById("searchBar")
const selector = document.getElementById("selector")
const counter = document.getElementById("episodeCounter")


function setup() {
  // makePageForEpisodes(allEpisodes);
  createEpisodeCards(allEpisodes)
  //restarting value of search input
  searchBar.value = ""
  //restarting Total episode text
  counter.innerHTML = `Total episode: ${allEpisodes.length}`
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
    summary = episode.summary?.substring(0,200) || "",
    image = episode.image?.medium || "Images/no_image.jpg",
    duration = episode.runtime

//Episode seasons and numbers
  const nameEl = document.createElement('h2') 
  nameEl.className = "episode-name"
  nameEl.innerText = name
    
  const formattedSeason = (""+season).padStart(2, "0") 
  const formattedNumber = (""+number).padStart(2, "0")
  const episodeCorrectFormat = `Season: ${formattedSeason} - Episode: ${formattedNumber}`
  const episodeCorrectFormatV2 = `S${formattedSeason}E${formattedNumber}`
  
  const episodeFormatH3 = document.createElement('h3')
  episodeFormatH3.className = "epi-format"
  episodeFormatH3.innerText = episodeCorrectFormat
  
 //Episode image 
  const episodeImg = document.createElement("img")
  episodeImg.style.height = "167px"
  episodeImg.style.width = "298px"
  episodeImg.src = image
  episodeImg.alt = `${name} - ${episodeCorrectFormat}`

  //Episode summery
  const episodeSummary = document.createElement('div')
  episodeSummary.className = "summary"
  episodeSummary.innerHTML = `Short Description:${summary}...`

  //Episode select option
  const selectionOption = document.createElement("option")
  const targetSelect = selector.value;
  selectionOption.innerHTML= `${episodeCorrectFormatV2} - ${name}`

//** BUGS!! line 69-76 (in some brower it doesn't work)
  selectionOption.addEventListener("click",filterEpisodeBySelect)
  function filterEpisodeBySelect() {
    setup()
    const filteredEpisodes = allEpisodes.filter(episode => {
      return episode.name.includes(selector.value.substring(9))
    }); createEpisodeCards(filteredEpisodes)
    //change number of displaying episode
    counter.innerHTML = `Displaying ${filteredEpisodes.length}`
  }
// episode duration (improvment needed)
  const showDuration = document.createElement('h5')
  showDuration.innerHTML = `Time: ${duration}m`

  //append list
  listMaker.appendChild(nameEl)
  listMaker.appendChild(episodeImg)
  listMaker.appendChild(episodeFormatH3)
  listMaker.appendChild(episodeSummary)
  listMaker.appendChild(showDuration)
  episodeList.appendChild(listMaker)
  selector.appendChild(selectionOption)
  selectEl.appendChild(selector)  
 }) 
    
  rootEl.appendChild(episodeList)
}

//Search functionality
searchBar.addEventListener("keyup", (e)=>{
 const searchString = e.target.value.toLowerCase();
 const filteredEpisodes = allEpisodes.filter(episode => {
  return (
  episode.name.toLowerCase().includes(searchString) ||
  episode.summary.toLowerCase().includes(searchString)
  
  );
})
createEpisodeCards(filteredEpisodes)
counter.innerHTML = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`
});

//Show all episodes button
const backBtn = document.createElement("button")
backBtn.className = "backButton"
backBtn.innerText = "Show all episodes"
backBtn.addEventListener("click",setup)
headerEl.appendChild(backBtn)

//start window
window.onload = setup;