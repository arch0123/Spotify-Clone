console.log("Welcome to Spotify")

//  Initializes the variables 
let songIndex = 0;
let audioElement = new Audio ('song/6.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItem = Array.from(document.getElementsByClassName('songItem'))
let masterSongName = document.getElementById('masterSongName')
let volumeContainer = Array.from(document.getElementsByClassName('volumeContainer'))
let muteIcon = document.getElementById('muteIcon')
let volumeBar = document.getElementById('volumeBar')
let muteButton = document.getElementById('muteIcon')
let soundElement = document.getElementById('sound')



let songs = [
    {songName : "Prefect - Ed Sheeran" ,filePath :"song/1.mp3", coverPath : "cover/5.jpg"},
    {songName : "Dekh Lena - Arijit Singh" ,filePath : "song/2.mp3", coverPath : "cover/4.jpg"},
    {songName : "Shayad - Arijit Singh" ,filePath : "song/3.mp3", coverPath : "cover/3.jpg"},
    {songName : "Tere Vaaste - Sachin-Jigar " ,filePath : "song/4.mp3", coverPath : "cover/6.jpg"},
    {songName : "Husn - Anuv jain" ,filePath : "song/5.mp3", coverPath : "cover/2.jpg"},
    {songName : "Let Me Love You - Justin Bieber" ,filePath : "song/6.mp3", coverPath : "cover/1.jpg"},
 
]

songItem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

// audioElement.play();
 
// Handle Play / Pause Click 

masterPlay.addEventListener('click',function(){
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        console.log("play is Working..");
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
    }

    else{
        audioElement.pause();
        console.log("pause is Working..");
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0; 

    }
});



// Listen to Events  
audioElement.addEventListener('timeupdate',()=>{

    // updateSeekbar

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;

});  

myProgressBar.addEventListener( 'change', ()=>{

    audioElement.currentTime = myProgressBar.value *audioElement.duration/100;


})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0 ;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        
    })

})

document.getElementById('next').addEventListener('click',()=>{

    if(songIndex>=9){
        songIndex = 0 
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0 ;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')

})

document.getElementById('previous').addEventListener('click',()=>{

    if(songIndex<=0){
        songIndex = 0 
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0 ;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')

})
audioElement.volume = 0.5;

// Update volume bar based on audio volume
function updateVolumeBar() {
    var volume = audioElement.volume;
    volumeBar.style.width = (volume * 100) ; // Add '%' sign to represent the percentage
}

// Update volume bar on initial load
updateVolumeBar();

// Handle volume bar clicks
volumeBar.addEventListener('click', function (event) {
    var rect = volumeBar.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var newVolume = mouseX / rect.width;
    audioElement.volume = newVolume;
    updateVolumeBar();
});

// Toggle mute on button click
muteButton.addEventListener('click', function () {
    audioElement.muted = !audioElement.muted;

    if (audioElement.muted) {
        volumeBar.style.width = '0%';
        soundElement.classList.remove('fa-volume-high');
        soundElement.classList.add('fa-volume-xmark');
    } else {
        updateVolumeBar();
        soundElement.classList.remove('fa-volume-xmark');
        soundElement.classList.add('fa-volume-high');
    }
});   

// Update volume bar when volume changes
audioElement.addEventListener('volumechange', updateVolumeBar);

