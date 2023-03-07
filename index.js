const music=document.querySelector("audio");
const play=document.getElementById("play");
const image=document.querySelector("img");
const title=document.getElementById("title");
const artist=document.getElementById("artist");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
const progress=document.getElementById("progress");
let current_time=document.getElementById("current_time");
let total_duration=document.getElementById("duration");
let progess_div=document.getElementById("progess_div");
const songs=[{name:"music_1",title:"Music 1...",artist:"Artist 1"},{name:"music_2",title:"Music 2...",artist:"Artist 2"},{name:"music_3",title:"Music 3...",artist:"Artist 3"}]
let isPlaying=false;
const playMusic=()=>{
    isPlaying=true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    image.classList.add("anime");
}
const pauseMusic=()=>{
    isPlaying=false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    image.classList.remove("anime");
}
play.addEventListener("click",()=>{
    if(isPlaying===false){
        playMusic();
    }else{
        pauseMusic();
    }
})
const loadSongs=(songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    music.src="music/"+songs.name+".mp3";
    image.src="images/"+songs.name+".jpg";
}
let songIndex=0;
const nextSong=()=>{
    songIndex=(songIndex+1)%songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
}
const prevSong=()=>{
    songIndex=(songIndex-1+songs.length)%songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
}
//Progress Js Work
music.addEventListener("timeupdate",()=>{
    const {currentTime,duration}=event.srcElement; 
    // console.log(currentTime);
    // console.log(duration);
    let progress_time=(currentTime/duration)*100
    progress.style.width=`${progress_time}%`;

    //music duration update
    let minites_duration=Math.floor(duration/60);
    let sec_duration =Math.floor(duration%60);
    if (duration){
        total_duration.textContent=`${minites_duration}:${sec_duration}`;
    }

    //current time update
    let minites_duration_1=Math.floor(currentTime/60);
    let sec_duration_1 =Math.floor(currentTime%60);
    if (currentTime){
        if (sec_duration_1<10){
            current_time.textContent=`${minites_duration_1}:0${sec_duration_1}`;
        }
        else{
            current_time.textContent=`${minites_duration_1}:${sec_duration_1}`; 
        }
    }

})

progess_div.addEventListener("click",(event)=>{
    const {duration}=music;
    let move_progress=(event.offsetX / event.srcElement.clientWidth);
    console.log(move_progress);
    music.currentTime= move_progress*duration;
})
//If music ends play the next music
music.addEventListener("ended",nextSong);
next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);
loadSongs(songs[2]);
