function loadingScreen() {

  let content = document.getElementById("content")
  content.style.display = "block"
  let preloader = document.getElementById("preloader")
  preloader.style.display = "none";
  setTimeout(textTypeEffect, 600)

  $(document).ready(function() {
    $(this).scrollTop(0);
  });


  actorContainer = document.getElementsByClassName("actorContainer");
  headerCast = document.getElementById("headerCast");
  var myScrollFunc = function() {
    coorsFirstActorContainer = actorContainer[0].getBoundingClientRect().top + window.scrollY;
    var y = window.scrollY;
    if (y >= coorsFirstActorContainer - 0.12 * coorsFirstActorContainer) {
      headerCast.className = "headerCast animate__animated animate__backInUp "
      headerCast.style.opacity = 1;
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
}

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
