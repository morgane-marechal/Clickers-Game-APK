//---------------------------test animation JS --------------------
console.log("animate-file");
const lollypop = document.getElementById("lollypop");
const heart = document.getElementById("heart");
const btnBonbon = document.getElementById("btn-img");


const lollyTumbling = [
    { transform: 'rotate(0) translate3D(0, 0, 0', color: '#000' },
    { color: '#431236', offset: 0.3 },
    { transform: 'rotate(360deg) translate3D(0, 0, 0)', color: '#000' }
];


//------animation pour faire apparaitre et disparaitre bonbons------

const disappearCandy = [
    { transform: "rotate(0) scale(1)" },
    { transform: "rotate(360deg) scale(0)" },
];

const reappearCandy = [
    { transform: "rotate(0) scale(0)" },
    { transform: "rotate(360deg) scale(1)" },
];

const lollyTiming = {
    duration: 6000,
    iterations: Infinity
}

const desappearTiming = {
    duration: 500,
    iterations: 1
}

const reappearTiming = {
    delay: 10500,
    duration: 500,
    iterations: 1
}

const noneTime = {
    delay: 500,
    duration: 1000,
    iterations: 10
}

const noWhere = [
    { transform: "scale(0)" },
    { transform: "scale(0)" },
];

// ------------- click pour faire disparaitre lollypop -----------
lollypop.addEventListener("click", () => {
    audioCartoon.play();
    lollypop.animate(disappearCandy, desappearTiming);
    lollypop.animate(noWhere, noneTime);
    lollypop.animate(reappearCandy, reappearTiming);
    inc_per_second = inc_per_second + 3;

});

// ------------- animation lollypop -----------
lollypop.animate(
    lollyTumbling,
    lollyTiming
)

//------animation pour bonbon du haut gauche------

const popCandy = [
    { transform: "scale(1)" },
    { transform: "scale(1.1)" },
    { transform: "scale(1)" },
];

const popCandyTime = {
    duration: 2000,
    iterations: Infinity
}

heart.animate(
    popCandy,
    popCandyTime
)

//----------control music------

const audioMusic = document.getElementById("audio-music");
const blocMusic = document.getElementById("audio-player-container");

blocMusic.addEventListener("click", () => {
     if (musicRunning===false){
         PlayMusic();
         musicRunning = true;
     }else if (musicRunning===true){
         audioMusic.pause();
         musicRunning=false;
     }
});

const intervalMusic=setInterval(PlayMusic, 1000);

function PlayMusic(){
    if (musicRunning===true){
            if (inc_per_second<=3){
            audioMusic.playbackRate=0.7;
            audioMusic.play();
        }else if(inc_per_second<=6){
            audioMusic.playbackRate=0.8;
            audioMusic.play();
        }else if(inc_per_second<=10){
            audioMusic.playbackRate=0.9;
            audioMusic.play();
        }else if(inc_per_second<=15){
            audioMusic.playbackRate=1;
            audioMusic.play();
        }else if(inc_per_second<=20){
            audioMusic.playbackRate=1.1;
            audioMusic.play();
        }else if(inc_per_second<=25){
            audioMusic.playbackRate=1.2;
            audioMusic.play();
        }
    }else if(musicRunning===false){
        audioMusic.pause();
    }
}