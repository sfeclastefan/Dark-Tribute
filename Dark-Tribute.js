document.addEventListener("DOMContentLoaded", function() {
  setTimeout(textTypeEffect, 600)
  for (let i = 0; i < episodesList.length; i++) {
    document.getElementById("episodes-container" + episodesList[i].season).innerHTML +=
      "<div class=\"episode-container\"> <div class=\"episode-title\"><strong>" +
      episodesList[i].episodeTitle + "</strong></div> <div><img class=\"episode-image\" src=\" " + episodesList[i].episodeImage +
      "\" /></div> <div class=\"caption-image\">" + episodesList[i].captionImage + "</div> </div> "
  }

  for (let i = 0; i < castList.length; i++) {
    document.getElementById("castContainer").innerHTML += " <div class=\"actorContainer leave\" onmouseleave=\"  hideActorDetails(" + i +
      ")  \">  <div class=\"mainImg\"> <img class=\"actorImg\" src=\" " + castList[i].mainImg + " \" onmouseenter=\"  showActorDetails(" + i +
      ") \" /> </div>      <div class=\" hiddenTextDetails\">  <p class=\"realName\"> " + castList[i].realName + "</p>  <p class=\"characterName\"> " + castList[i].characterName +
      "</br> <span class=\"characterYear\">- " + castList[i].year + "-</span> </p>  <p class=\"episodesNr\"> " + castList[i].episodesNr +
      "</p> <p class=\"manyDetails\">  <a target=\"_blank\" href=\" " + castList[i].moreDetails + "\">Read more about " + castList[i].characterName.split(" ")[0] +
      " </a> </p> </div>    <div class=\"hiddenImg\"> <img class=\"actorImg\" src=\" " + castList[i].hiddenImg + "\" />  </div> </div> "
  }

  $(this).scrollTop(0);

  actorContainer = document.getElementsByClassName("actorContainer");
  headerCast = document.getElementById("headerCast");
  var myScrollFunc = function() {
    coordsFirstActorContainer = actorContainer[0].getBoundingClientRect().top + window.scrollY;
    var y = window.scrollY;
    if (window.innerWidth < 768) {
      if (y >= coordsFirstActorContainer - 0.5 * coordsFirstActorContainer) {
        headerCast.className = "headerCast animate__animated animate__backInUp "
        headerCast.style.opacity = 1;
      }
    } else {
      if (y >= coordsFirstActorContainer - 0.12 * coordsFirstActorContainer) {
        headerCast.className = "headerCast animate__animated animate__backInUp "
        headerCast.style.opacity = 1;
      }
    }
  }
  window.addEventListener("scroll", myScrollFunc);


  onMouseLeaveClass = document.getElementsByClassName("leave");
  if (window.innerWidth < 768) {
    for (let i = 0; i < onMouseLeaveClass.length; i++)
      onMouseLeaveClass[i].setAttribute("onmouseleave", "");
  }


  function checkSizeChange() {
    let hiddenTextDetails = document.getElementsByClassName("hiddenTextDetails");
    if (window.innerWidth < 768) {
      for (let i = 0; i < onMouseLeaveClass.length; i++)
        onMouseLeaveClass[i].setAttribute("onmouseleave", "");
      for (let j = 0; j < hiddenTextDetails.length; j++)
        hiddenTextDetails[j].style.opacity = 1;

    } else {
      for (let i = 0; i < actorContainer.length; i++)
        onMouseLeaveClass[i].setAttribute("onmouseleave", "hideActorDetails(" + i + ")");
      for (let j = 0; j < hiddenTextDetails.length; j++)
        hiddenTextDetails[j].style.opacity = 0;
    }
    coordinatesHiddenText = null;
    coordinatesMainImg = null;
  }
  window.onresize = checkSizeChange;

});






var coordinatesHiddenText;
var coordinatesMainImg;

function showActorDetails(n) {

  if (!coordinatesHiddenText) {
    coordinatesHiddenText = document.getElementsByClassName("hiddenTextDetails")[n].getBoundingClientRect().x;
    coordinatesMainImg = document.getElementsByClassName("mainImg")[n].getBoundingClientRect().x;
  }
  let hoverDifferenceCoords = coordinatesMainImg - coordinatesHiddenText + "px";

  let hoverCordsMainImgTranslateX = "translateX(-" + hoverDifferenceCoords + ")"
  document.getElementsByClassName("mainImg")[n].style.transform = hoverCordsMainImgTranslateX;

  let hoverCordsHiddenTxtTranslateX = "translateX(" + hoverDifferenceCoords + ")";

  hiddenTextDetails = document.getElementsByClassName("hiddenTextDetails")[n];
  hiddenTextDetails.style.cssText = "transform:" + hoverCordsHiddenTxtTranslateX + "; opacity:1";


  hiddenImg = document.getElementsByClassName("hiddenImg")[n];
  if (hiddenImg.style.opacity == 0) {
    hiddenImg.style.cssText = "transform:translateX(85%); transition: transform 0.1s";
    setTimeout(function() {
      hiddenImg.style.cssText = "opacity:1; transform:translateX(0%); transition: transform 1.5s, opacity 2s";
    }, 200)
  }

}


function goToSeasons() {
  let coordsSeasonsContainer = document.getElementById("seasonsContainer");
  coordsSeasonsContainer.scrollIntoView(true);
}


function hideActorDetails(n) {
  document.getElementsByClassName("mainImg")[n].style.transform = "translateX(0%)";
  document.getElementsByClassName("hiddenTextDetails")[n].style.cssText = "transform: translateX(0%); opacity:0; transition: transform 2s, opacity 0.8s;";
  hiddenImg = document.getElementsByClassName("hiddenImg")[n];
  hiddenImg.style.cssText = "transform: translateX(85%); opacity:0; transition: transform 0.7s, opacity 0.3s";
}


var text1Counter = 0;
var text2Counter = 0;

function textTypeEffect() {
  let text1 = "The question is not where, but";
  let text2 = " when.";

  let takeSpace = document.getElementById("takeSpace");
  takeSpace.style.display = "none";

  if (text1Counter < text1.length) {
    document.getElementById("quote").innerHTML += text1.charAt(text1Counter);
    text1Counter++;
    setTimeout(textTypeEffect, 150);
  } else if (text2Counter < text2.length) {
    document.getElementById("when").innerHTML += text2.charAt(text2Counter);
    text2Counter++;
    setTimeout(textTypeEffect, 150);
  }
}


function hiddenSeason(id) {

  let seasonsButton = document.getElementById("showHideSeasonButton" + id);
  let episodeContainer = document.getElementById("episodes-container" + id);
  let episodeTitle = episodeContainer.getElementsByClassName("episode-title")[0];

  if (window.innerWidth < 768) {
    if (episodeContainer.style.display == "block") {

      seasonsButton.className = "animate__animated animate__fadeInDown"

      episodeContainer.style.display = "none";
      episodeContainer.className = "animate__animated animate__pulse"

      episodeTitle.style.visibility = "hidden"

      seasonsButton.disabled = true;
      setTimeout(function() {
        seasonsButton.disabled = false
      }, 1500);

    } else {
      episodeContainer.style.display = "block";
    }
  } else {
    if (episodeContainer.style.display == "none") {

      seasonsButton.className = "animate__animated animate__fadeInDown"

      episodeContainer.style.display = "block";
      episodeContainer.className = "animate__animated animate__pulse"

      episodeTitle.style.visibility = "hidden"

      seasonsButton.disabled = true;
      setTimeout(function() {
        seasonsButton.disabled = false
      }, 1500);

    } else {
      episodeContainer.style.display = "none";
    }
  }

  setTimeout(function() {
    episodeContainer.className = "episodes-container"
  }, 1800);

  setTimeout(function() {
    seasonsButton.className = "showHideSeasonButton"
  }, 1800);

  setTimeout(function() {
    episodeTitle.style.visibility = "visible"
  }, 1700);

}




var episodes = `
[  {
     "season" : 1,
     "episodeTitle": "1. Secrets",
     "episodeImage": "img/Seasons/1-1.jpg",
     "captionImage": "In 2019, a local boy's disappearance stokes fear in the residents of Winden, a small German town with a strange and tragic history."
   },
   {
     "season" : 1,
     "episodeTitle": "2. Lies",
     "episodeImage": "img/Seasons/1-2.jpg",
     "captionImage": "When a grim discovery leaves the police baffled, Ulrich seeks a search warrant for the power plant. A mysterious stranger checks into the hotel."
   },
   {
     "season" : 1,
     "episodeTitle": "3. Past and Present",
     "episodeImage": "img/Seasons/1-3.jpg",
     "captionImage": "It's 1986, and Ulrich's brother, Mads, has been missing for a month. Confusion reigns as past and present intertwine."
   },
   {
     "season" : 1,
     "episodeTitle": "4. Double Lives",
     "episodeImage": "img/Seasons/1-4.jpg",
     "captionImage": "Bizarre occurrences give Charlotte a sense of déjà vu, and she suspects Peter is hiding something. Franziska snaps when Magnus confronts her."
   },
   {
     "season" : 1,
     "episodeTitle": "5. Truths",
     "episodeImage": "img/Seasons/1-5.jpg",
     "captionImage": "Hannah takes her obsession with Ulrich too far. The stranger asks Regina to deliver an important package. Martha is torn between Jonas and Bartosz."
   },
   {
     "season" : 1,
     "episodeTitle": "6. Sic Mundus Creatus Est",
     "episodeImage": "img/Seasons/1-6.jpg",
     "captionImage": "Ulrich looks to the past for answers and dredges up disturbing family secrets. Armed with new tools, Jonas probes the cave's murky depths."
   },
   {
     "season" : 1,
     "episodeTitle": "7. Crossroads",
     "episodeImage": "img/Seasons/1-7.jpg",
     "captionImage": "Ulrich questions a frail and frightened Helge in the nursing home. Jonas searches for Mikkel, but the stranger warns him about meddling with the past."
   },
   {
     "season" : 1,
     "episodeTitle": "8. As You Sow, so You Shall Reap",
     "episodeImage": "img/Seasons/1-8.jpg",
     "captionImage": "In 1953, the disfigured bodies of two boys are exhumed at a construction site, the future location of Winden's nuclear power plant."
   },
   {
     "season" : 2,
     "episodeTitle": "1. Beginnings and Endings",
     "episodeImage": "img/Seasons/2-1.jpg",
     "captionImage": "Six months after the disappearances, the police form a task force. In 2052, Jonas learns that most of Winden perished in an apocalyptic event."
   },
   {
     "season" : 2,
     "episodeTitle": "2. Dark Matter",
     "episodeImage": "img/Seasons/2-2.jpg",
     "captionImage": "Clausen and Charlotte interview Regina. The Stranger takes Hannah to 1987, where Claudia has an unnerving encounter and Egon visits an old nemesis."
   },
   {
     "season" : 2,
     "episodeTitle": "3. Ghosts",
     "episodeImage": "img/Seasons/2-3.jpg",
     "captionImage": "In 1954, a missing Helge returns, but he'll only speak to Noah. In 1987, Claudia brings the time machine to Tannhaus, and Egon questions Ulrich again."
   },
   {
     "season" : 2,
     "episodeTitle": "4. The Travelers",
     "episodeImage": "img/Seasons/2-4.jpg",
     "captionImage": "Jonas meets an ominous figure. While the kids comb the cave for answers, the adults gather in the bunker to share what they know about the travelers."
   },
   {
     "season" : 2,
     "episodeTitle": "5. Lost and Found",
     "episodeImage": "img/Seasons/2-5.jpg",
     "captionImage": "In 1987, Ulrich seizes an opportunity. The kids return to the cave with the time machine, and Jonas learns of a loophole that could change the future."
   },
   {
     "season" : 2,
     "episodeTitle": "6. An Endless Cycle",
     "episodeImage": "img/Seasons/2-6.jpg",
     "captionImage": "Armed with a plan to prevent the apocalypse, Jonas travels to 2019. During the Nielsens' anniversary party, Ulrich sneaks off with Hannah."
   },
   {
     "season" : 2,
     "episodeTitle": "7. The White Devil",
     "episodeImage": "img/Seasons/2-7.jpg",
     "captionImage": "Martha meets the Stranger and learns his true identity. Claudia tries to prevent Egon's death in 1987. Hannah travels to 1954 to see Ulrich."
   },
   {
     "season" : 2,
     "episodeTitle": "8. Endings and Beginnings",
     "episodeImage": "img/Seasons/2-8.jpg",
     "captionImage": "On the day of the apocalypse, Clausen executes a search warrant at the power plant as Jonas and Claudia use the time machine to connect past and future."
   },
   {
     "season" : 3,
     "episodeTitle": "1. Deja-vu",
     "episodeImage": "img/Seasons/3-1.jpg",
     "captionImage": "In 2019, Jonas emerges from the cave into a strange but familiar world: the town of Winden, reeling from the recent disappearance of a young boy."
   },
   {
     "season" : 3,
     "episodeTitle": "2. The Survivors",
     "episodeImage": "img/Seasons/3-2.jpg",
     "captionImage": "Martha travels to 1888 to warn her friends about the 2020 disaster. Winden residents past and present search for their missing loved ones."
   },
   {
     "season" : 3,
     "episodeTitle": "3. Adam and Eva",
     "episodeImage": "img/Seasons/3-3.jpg",
     "captionImage": "Charlotte and Ulrich try to piece together what happened in the bunker. In different times and worlds, Jonas and Martha work to gain each other's trust."
   },
   {
     "season" : 3,
     "episodeTitle": "4. The Origin",
     "episodeImage": "img/Seasons/3-4.jpg",
     "captionImage": "Martha and Jonas travel to 2052 and get a glimpse of a grim future. In 1954, two residents of Winden go missing, and Hannah receives surprising news."
   },
   {
     "season" : 3,
     "episodeTitle": "5. Life and Death",
     "episodeImage": "img/Seasons/3-5.jpg",
     "captionImage": "In 2020, a visitor delivers a warning to Claudia. The day before the apocalypse, Jonas begins to question Eva's motives."
   },
   {
     "season" : 3,
     "episodeTitle": "6. Light and Shadow",
     "episodeImage": "img/Seasons/3-6.jpg",
     "captionImage": "Adam holds Martha captive. On the day of the apocalypse, an increasingly frantic Martha begs Bartosz for his help."
   },
   {
     "season" : 3,
     "episodeTitle": "7. Between the Time",
     "episodeImage": "img/Seasons/3-7.jpg",
     "captionImage": "Across three centuries, Winden's residents continue their desperate quest to alter their fate and save their loved ones."
   },
   {
     "season" : 3,
     "episodeTitle": "8. The Paradise",
     "episodeImage": "img/Seasons/3-8.jpg",
     "captionImage": "Claudia reveals to Adam how everything is connected — and how he can destroy the knot."
   }

 ] `

var cast = ` [{
"mainImg": "img/Cast/cast_1-1.jpg",
"hiddenImg": "img/Cast/cast_1-2.jpg",
"realName": "Louis Hofmann",
"characterName": "Jonas Kahnwald",
"year": 2019,
"episodesNr": 23,
"moreDetails": "https://dark-netflix.fandom.com/wiki/Jonas_Kahnwald"
}, {
  "mainImg": "img/Cast/cast_2-1.jpg",
  "hiddenImg": "img/Cast/cast_2-2.jpg",
  "realName": "Lisa Vicari",
  "characterName": "Martha Nielsen",
  "year": 2019,
  "episodesNr": 20,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Martha_Nielsen"
}, {
  "mainImg": "img/Cast/cast_3-1.jpg",
  "hiddenImg": "img/Cast/cast_3-2.jpg",
  "realName": "Karoline Eichhorn",
  "characterName": "Charlotte Doppler",
  "year": 2019,
  "episodesNr": 22,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Charlotte_Doppler"
}, {
  "mainImg": "img/Cast/cast_4-1.jpg",
  "hiddenImg": "img/Cast/cast_4-2.jpg",
  "realName": "Maja Schöne",
  "characterName": "Hannah Kahnwald",
  "year": 2019,
  "episodesNr": 20,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Hannah_Kahnwald"
}, {
  "mainImg": "img/Cast/cast_5-1.jpg",
  "hiddenImg": "img/Cast/cast_5-2.jpg",
  "realName": "Stephan Kampwirth",
  "characterName": "Peter Doppler",
  "year": 2019,
  "episodesNr": 20,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Peter_Doppler"
}, {
  "mainImg": "img/Cast/cast_6-1.jpg",
  "hiddenImg": "img/Cast/cast_6-2.jpg",
  "realName": "Jördis Triebel",
  "characterName": "Katharina Nielsen",
  "year": 2019,
  "episodesNr": 20,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Katharina_Nielsen"
}, {
  "mainImg": "img/Cast/cast_7-1.jpg",
  "hiddenImg": "img/Cast/cast_7-2.jpg",
  "realName": "Andreas Pietschmann",
  "characterName": "The Stranger (Jonas Kahnwald)",
  "year": 2019,
  "episodesNr": 23,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Jonas_Kahnwald"
}, {
  "mainImg": "img/Cast/cast_8-1.jpg",
  "hiddenImg": "img/Cast/cast_8-2.jpg",
  "realName": "Paul Lux",
  "characterName": "Bartosz Tiedemann",
  "year": 2019,
  "episodesNr": 18,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Bartosz_Tiedemann"
}, {
  "mainImg": "img/Cast/cast_9-1.jpg",
  "hiddenImg": "img/Cast/cast_9-2.jpg",
  "realName": "Moritz Jahn",
  "characterName": "Magnus Nielsen",
  "year": 2019,
  "episodesNr": 18,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Magnus_Nielsen"
}, {
  "mainImg": "img/Cast/cast_10-1.jpg",
  "hiddenImg": "img/Cast/cast_10-2.jpg",
  "realName": "Oliver Masucci",
  "characterName": "Ulrich Nielsen",
  "year": 2019,
  "episodesNr": 17,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Ulrich_Nielsen"
}, {
  "mainImg": "img/Cast/cast_11-1.jpg",
  "hiddenImg": "img/Cast/cast_11-2.jpg",
  "realName": "Gina Stiebitz",
  "characterName": "Franziska Doppler",
  "year": 2019,
  "episodesNr": 17,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Franziska_Doppler"
}, {
  "mainImg": "img/Cast/cast_12-1.jpg",
  "hiddenImg": "img/Cast/cast_12-2.jpg",
  "realName": "Deborah Kaufmann",
  "characterName": "Regina Tiedemann",
  "year": 2019,
  "episodesNr": 16,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Regina_Tiedemann"
}, {
  "mainImg": "img/Cast/cast_13-1.jpg",
  "hiddenImg": "img/Cast/cast_13-2.jpg",
  "realName": "Daan Lennard Liebrenz",
  "characterName": "Mikkel Nielsen",
  "year": 2019,
  "episodesNr": 14,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Michael_Kahnwald"
}, {
  "mainImg": "img/Cast/cast_14-1.jpg",
  "hiddenImg": "img/Cast/cast_14-2.jpg",
  "realName": "Julika Jenkins",
  "characterName": "Claudia Tiedemann",
  "year": 1987,
  "episodesNr": 14,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Claudia_Tiedemann"
}, {
  "mainImg": "img/Cast/cast_15-1.jpg",
  "hiddenImg": "img/Cast/cast_15-2.jpg",
  "realName": "Carlotta von Falkenhayn",
  "characterName": " Elisabeth Doppler",
  "year": 2019,
  "episodesNr": 14,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Elisabeth_Doppler"
}, {
  "mainImg": "img/Cast/cast_16-1.jpg",
  "hiddenImg": "img/Cast/cast_16-2.jpg",
  "realName": "Dietrich Hollinderbäumer",
  "characterName": "Adam",
  "year": 1921,
  "episodesNr": 13,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Adam"
}, {
  "mainImg": "img/Cast/cast_17-1.jpg",
  "hiddenImg": "img/Cast/cast_17-2.jpg",
  "realName": "Mark Waschke",
  "characterName": "Noah",
  "year": 2019,
  "episodesNr": 12,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Hanno_Tauber"
}, {
  "mainImg": "img/Cast/cast_18-1.jpg",
  "hiddenImg": "img/Cast/cast_18-2.jpg",
  "realName": "Christian Pätzold",
  "characterName": " Egon Tiedemann",
  "year": 1986,
  "episodesNr": 12,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Egon_Tiedemann"
}, {
  "mainImg": "img/Cast/cast_19-1.jpg",
  "hiddenImg": "img/Cast/cast_19-2.jpg",
  "realName": "Lisa Kreuzer",
  "characterName": "Claudia Tiedemann",
  "year": 2052,
  "episodesNr": 9,
  "moreDetails": "https://dark-netflix.fandom.com/wiki/Claudia_Tiedemann"
}

] `

var episodesList = JSON.parse(episodes);
var castList = JSON.parse(cast);
