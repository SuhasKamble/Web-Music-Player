const musicContainer = document.querySelector('.music-container');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const cover = document.querySelector('#cover');
const audio = document.querySelector('#audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const title = document.querySelector('#title');

// list of songs 
const songs = ["hey","summer","ukulele"];

// track of songs
let songIndex = 2;

// initialoize the song 
loadSong(songs[songIndex]);

// load the details
function loadSong(song){
    title.innerHTML = song;
    audio.src =  `music/${song}.mp3`;
    cover.src =  `images/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong(){
    songIndex--;
    if(songIndex< 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong()
}

function nextSong(){
    songIndex++;
    if(songIndex> songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong()
}

function updateProgress(e){
    const {duration,currentTime} = e.srcElement;
    const progressPercentage = (currentTime/duration) *100
    progress.style.width = `${progressPercentage}%`
}

function setProgress(e){
    const width  = this.clientWidth;
    const clienX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clienX/width) * duration
}

// Event Listeners 
playBtn.addEventListener("click",()=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
})

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener('click',setProgress)


