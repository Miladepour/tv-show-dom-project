//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  // makePageForEpisodes(allEpisodes);
  createEpisodeCards(allEpisodes)

}


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
    image = episode.image?.medium || "Images/no_image.jpg"


  const nameEl = document.createElement('h2') 
  nameEl.className = "episode-name"
  nameEl.innerText = name
    
  const formattedSeason = (""+season).padStart(2, "0") 
  const formattedNumber = (""+number).padStart(2, "0")
  const episodeCorrectFormat = `Season: ${formattedSeason} - Episode: ${formattedNumber}`
    
  const episodeFormatH3 = document.createElement('h3')
  episodeFormatH3.innerText = episodeCorrectFormat
    
  const episodeImg = document.createElement("img")
  episodeImg.style.height = "167px"
  episodeImg.style.width = "298px"
  episodeImg.src = image
  episodeImg.alt = `${name} - ${episodeCorrectFormat}`

  const episodeSummary = document.createElement('div')
  episodeSummary.className = "summary"
  episodeSummary.innerHTML = `${summary}.....`

  listMaker.appendChild(nameEl)
  listMaker.appendChild(episodeImg)
  listMaker.appendChild(episodeFormatH3)
  listMaker.appendChild(episodeSummary)
  episodeList.appendChild(listMaker)
 }) 
    
  rootEl.appendChild(episodeList)
}

window.onload = setup;