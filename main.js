let hey = document.querySelector(".myclass");
let searchBar = document.querySelector(".input-field");
let playing = false;
let audio;
let updateTimer;
let curr_time;
let total_duration;
let seek_slider;
let table;
let modal1;
let table1;
let issearch = false;
let i;
let track_list = [
    {
      name: "First Song",
      artist: "Rachit1",
      path: "https://www.chosic.com/wp-content/uploads/2021/02/happy-clappy-ukulele.mp3"
    },
    {
      name: "Second Song",
      artist: "Rachit2",
      path: "https://www.chosic.com/wp-content/uploads/2020/06/John_Bartmann_-_09_-_Happy_Clappy-1.mp3"
    },
    {
      name: "Third Song",
      artist: "Rachit3",
      path: "https://www.chosic.com/wp-content/uploads/2020/07/keys-of-moon-cheer-up.mp3",
    },
    {
        name: "Fourth Song",
        artist: "Rachit4",
        path: "https://www.chosic.com/wp-content/uploads/2021/02/6-Happy-Commercial-Piano.mp3"
    },
    {
        name: "Fifth Song",
        artist: "Rachit5",
        path: "https://www.chosic.com/wp-content/uploads/2021/01/春のテーマ-Spring-field-.mp3",
    },
    {
        name: "Sixth Song",
        artist: "Rachit6",
        path: "https://www.chosic.com/wp-content/uploads/2020/06/TRG_Banks_-_12_-_No_room_at_the_inn.mp3"
    },
    {
        name: "Seventh Song",
        artist: "Rachit7",
        path: "https://www.chosic.com/wp-content/uploads/2021/04/happy-media-music-opener.mp3",
    },
  ];
  //whever i am clicking on a new song go and clear the updatetimer(update the seekslider at every 1000ms)
  //than play the song and now seekupdate with the new song
let addButton = document.querySelector(".oneone");
let modalVisible = false;
addButton.addEventListener("click",showtable);
function showtable(e){
    if(!modalVisible){
        if(issearch == true){
            document.querySelector("table").remove();
            modal1.innerHTML="";
        }
        table = document.createElement("table");
        for (let row = 0; row < track_list.length; row++) {
            let tr = document.createElement("tr");
            for (let cell = 0; cell < 2; cell++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                if(cell == 0){
                    td.classList.add("cell1");
                    td.innerHTML = track_list[row].name;
                }
                else{
                    td.innerHTML = track_list[row].artist;
                }
            }
            table.appendChild(tr);
        }
        modal1 = document.createElement("div");
        modal1.classList.add("five");
        modal1.innerHTML = `
        <div class="buttons">
            <div class="prev-track">
                <div class="material-icons two">skip_previous</div>
            </div>
            <div class="playpause-track">
                <div class="material-icons two">play_arrow</div>
            </div>
            <div class="next-track">
                <div class="material-icons two">skip_next</div>
            </div>
        </div>
        <div class="slider_container1">
            <div class="current-time">00:00</div>
            <input type="range" min="1" max="100" value="0" class="seek_slider" onchange="seekTo()">
            <div class="total-duration">00:00</div>
        </div>
        <div class="slider_container2">
            <div class="material-icons three">volume_down</div>
            <input id="volume-control" type="range" min="0" max="100" value="50">
            <div class="material-icons four">volume_up</div>
        </div>`
        hey.append(table);
        hey.append(modal1);
        modalVisible = true;
        let papa = document.querySelector(".playpause-track");
        let range = document.querySelector("#volume-control");
        curr_time = document.querySelector(".current-time");
        total_duration = document.querySelector(".total-duration");
        seek_slider = document.querySelector(".seek_slider");
        let elementsArray = document.querySelectorAll(".cell1");
        let prevtrack = document.querySelector(".prev-track");
        let nexttrack = document.querySelector(".next-track");
        let updateTimer;
        console.log(elementsArray);
        elementsArray.forEach(function(elem) {
            elem.addEventListener("click", function() {
                let sound1 = elem.innerText;
                console.log(sound1);
                if(playing == false){
                    for(i=0; i<track_list.length; i++){
                        if(track_list[i].name == sound1){
                            //track_list[i].path
                            clearInterval(updateTimer);
                            resetValues();
                            audio = new Audio(track_list[i].path);
                            audio.play();
                            updateTimer = setInterval(seekUpdate, 1000);
                            playing = true;
                            papa.innerHTML = `<div class="material-icons two">pause</div>`;
                            break;
                       }
                    }
                }
                else{
                    audio.pause();
                    papa.innerHTML = `<div class="material-icons two">play_arrow</div>`
                    playing = false;
                }
            });
        });
        papa.addEventListener("click",function(){
            if(playing){
                audio.pause();
                papa.innerHTML = `<div class="material-icons two">play_arrow</div>`
                playing = false;
            }
            else{
                papa.innerHTML = `<div class="material-icons two">pause</div>`
                audio.play();
                playing = true;
            }
        });
        range.addEventListener("change", function(e) {
            audio.volume = e.currentTarget.value / 500 ;
        })
        nexttrack.addEventListener("click", function(e) {
            audio.pause();
            if(i < track_list.length-1){
                i += 1;
            }
            else{
                i = 0;
            }
            audio = new Audio(track_list[i].path);
            audio.play();
        })
        prevtrack.addEventListener("click", function(e) {
            audio.pause();
            if(i > 0){
                i -= 1;
            }
            else{
                i = track_list.length-1;
            }
            audio = new Audio(track_list[i].path);
            audio.play();
        })
        searchBar.addEventListener("keyup", function(e){
            if (e.keyCode === 13) {
                let searchString = e.target.value; 
                for(let j=0; j<track_list.length; j++){
                    if(track_list[j].name == searchString){
                        issearch = true;
                        document.querySelector("table").remove();
                        document.querySelector(".five").remove();
                        modalVisible = false;
                        table1 = document.createElement("table");
                        for (let row = 0; row < 1; row++) {
                            let tr = document.createElement("tr");
                            for (let cell = 0; cell < 2; cell++) {
                                let td = document.createElement("td");
                                tr.appendChild(td);
                                if(cell == 0){
                                    td.classList.add("cell1");
                                    td.innerHTML = track_list[j].name;
                                }
                                else{
                                    td.innerHTML = track_list[j].artist;
                                }
                            }
                            table1.appendChild(tr);
                        }
                        hey.append(table1);
                        hey.append(modal1);
                    }
                }
            }
        });

    }
    else{
        document.querySelector("table").remove();
        document.querySelector(".five").remove();
        modalVisible = false;
    }
}
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
//jab slide karke rakh diya kahi au slider ko to isske wajah se audio ka current time change ho rha hai 
function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = audio.duration * (seek_slider.value / 100);
   
    // Set the current track position to the calculated seek position
    audio.currentTime = seekto;
}

//isi ki wajah se har second current time is updating
function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(audio.duration)) {
      seekPosition = audio.currentTime * (100 / audio.duration);
      seek_slider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(audio.currentTime / 60);
      let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(audio.duration / 60);
      let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
//if(modalVisible){
//    let sound = document.querySelector(".cell1");
//    let sound1 = sound.innerText;
//    console.log("hello");
//    sound.addEventListener("click",findsound);
//    function findsound(e){
//        for(let i=0; i<track_list.length; i++){
//            if(track_list[i].name == sound1){
//                console.log("hello");
                //track_list[i].path
                //var audio = new Audio('https://www.chosic.com/wp-content/uploads/2020/07/keys-of-moon-cheer-up.mp3');
                //audio.play();
//            }
//        }
//    }
//}

