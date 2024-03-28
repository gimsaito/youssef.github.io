const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const tutorialbtn =document.querySelector(".buttons .tutorial");
const aproposbtn =document.querySelector(".buttonsdiv .apropos");

function playAudio() {
  var audio = document.getElementById("myAudio");
  audio.play()
    .then(function() {
      // Audio playback started successfully
      sessionStorage.setItem("audioPlayed", "true");
    })
    .catch(function(error) {
      // Handle error
      console.error('Failed to play audio:', error);
    });
}

document.getElementById("startButton").addEventListener("click", function() {
  var audioPlayed = sessionStorage.getItem("audioPlayed");
  if (!audioPlayed) {
    playAudio();
  }
});
aproposbtn.onclick = ()=>{
  window.location.href = "jouiniprofile.html";
}

start_btn.onclick = ()=>{
  info_box.classList.add("activeInfo");
  suj.style.display="none";
}
continue_btn.onclick = ()=>{
    window.location.href = "youssef.html";
}
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    suj.style.display="block";
}

tutorialbtn.onclick=()=>{
  window.location.href = "video.html";
}


