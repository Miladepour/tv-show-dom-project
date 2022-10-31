//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const counter = document.getElementById("episodeCounter")
counter.innerHTML = `Total episode: ${allEpisodes.length}`

function setup() {
  // makePageForEpisodes(allEpisodes);
  createEpisodeCards(allEpisodes)
}

//Display all the episode in cards
function createEpisodeCards(listOfEpisodes) {
  const rootEl = document.getElementById("container")
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


  const nameEl = document.createElement('h2') 
  nameEl.className = "episode-name"
  nameEl.innerText = name
    
  const formattedSeason = (""+season).padStart(2, "0") 
  const formattedNumber = (""+number).padStart(2, "0")
  const episodeCorrectFormat = `Season: ${formattedSeason} - Episode: ${formattedNumber}`
    
  const episodeFormatH3 = document.createElement('h3')
  episodeFormatH3.className = "epi-format"
  episodeFormatH3.innerText = episodeCorrectFormat
  
    
  const episodeImg = document.createElement("img")
  episodeImg.style.height = "167px"
  episodeImg.style.width = "298px"
  episodeImg.src = image
  episodeImg.alt = `${name} - ${episodeCorrectFormat}`

  const episodeSummary = document.createElement('div')
  episodeSummary.className = "summary"
  episodeSummary.innerHTML = `Short Description:${summary}...`


  const showDuration = document.createElement('h5')
  showDuration.innerHTML = `Time: ${duration}m`

  listMaker.appendChild(nameEl)
  listMaker.appendChild(episodeImg)
  listMaker.appendChild(episodeFormatH3)
  listMaker.appendChild(episodeSummary)
  listMaker.appendChild(showDuration)
  episodeList.appendChild(listMaker)
 }) 
    
  rootEl.appendChild(episodeList)
}

//Search functionality
const searchBar = document.getElementById("searchBar")

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


window.onload = setup;