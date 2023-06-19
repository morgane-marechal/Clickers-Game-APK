/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
const score = document.getElementById("display-score");
const resetScore = document.getElementById("btnreset");
const btnClick = document.getElementById("click-me");
const btnSmall = document.getElementById("smallAdd");
const btnMedium = document.getElementById("mediumAdd");
const btnBig = document.getElementById("bigAdd");
let prixSmall = document.getElementById("prixsmall");
let prixMedium = document.getElementById("prixmedium");
let prixBig = document.getElementById("prixbig");
let displayInc = document.getElementById("inc");
let displayClick = document.getElementById("valueClick");
let musicRunning = false;

btnSmall.disabled = true; //desactive items trop chers
document.getElementById("mediumAdd").disabled = true;
document.getElementById("bigAdd").disabled = true;



let valueClick = 1;
let scoreClick = 0;
let disabled_btn_small = 5;
score.innerHTML = scoreClick;
const audioclick = document.getElementById("audio-click");
const audioUp = document.getElementById("audio-up");
const audioCartoon = document.getElementById("audio-cartoon");

let inc_per_second = 0;
displayInc.innerHTML = inc_per_second;
displayClick.innerHTML = valueClick;

//----------fonction régulièrement appeler pour vérifier si on bloque bouton ou pas------

//fonction pour activer boutons bonu




 btnClick.addEventListener("click", (e) =>{
     scoreClick += valueClick;
     audioclick.play();
     document.getElementById("display-score").innerHTML = scoreClick;
     console.log(scoreClick);
     displayClick.innerHTML = valueClick;
     check();
 })


  resetScore.addEventListener("click", (e) =>{
    localStorage.clear();
    valueClick = 1;
    scoreClick = 0;
    disabled_btn_small = 5;
    prixSmall.innerHTML = disabled_btn_small;
    valueMedium = 2;
    disabled_btn_medium = 50;
    prixMedium.innerHTML = disabled_btn_medium;
    disabled_btn_big = 500;
    prixBig.innerHTML = disabled_btn_big;
    score.innerHTML = 0;
    displayClick.innerHTML = valueClick;
    inc_per_second = 0;
    musicRunning = false
    check();
  })

function check() {
    addLocalStorage();
    if (scoreClick >= disabled_btn_small) {
        btnSmall.disabled = false;
    } else if (scoreClick <= disabled_btn_small) {
        btnSmall.disabled = true;
    }

    if (scoreClick >= disabled_btn_medium) {
        document.getElementById("mediumAdd").disabled = false;
    } else if (scoreClick <= disabled_btn_medium) {
        document.getElementById("mediumAdd").disabled = true;
    }

    if (scoreClick >= disabled_btn_big) {
        document.getElementById("bigAdd").disabled = false;
    } else if (scoreClick <= disabled_btn_big) {
        document.getElementById("bigAdd").disabled = true;
    }
}

//----------fonctions pour augmenter la valeur du click------

//fonction pour ajouter valeur d'un click à score
function newClick() {
    //check();
    scoreClick += valueClick;
    audioclick.play();
    document.getElementById("display-score").innerHTML = scoreClick;
    console.log(scoreClick);
    displayClick.innerHTML = valueClick;

    check();
}

//---------------variable et fonction pour le bouton le moins chers-------------

prixSmall.innerHTML = disabled_btn_small;

//fonction pour augmenter la valeure du click
function small() {
    valueClick = valueClick + 1;//la valeure du click augmente
    displayClick.innerHTML = valueClick;
    scoreClick = scoreClick - disabled_btn_small;//on soustrait prix du click
    document.getElementById("display-score").innerHTML = scoreClick;
    disabled_btn_small = disabled_btn_small * 2; //prix du bouton qu augmente
    prixSmall.innerHTML = disabled_btn_small;
    audioUp.play();
    check(); // on check pour désactiver boutons trop chers
}

//---------------variable et fonction pour le bouton moyen chers-------------

let valueMedium = 2;
let disabled_btn_medium = 50;
prixMedium.innerHTML = disabled_btn_medium;

function medium() {
    inc_per_second = inc_per_second + valueMedium;
    scoreClick = scoreClick - disabled_btn_medium;//on soustrait prix du click
    check();
    disabled_btn_medium = disabled_btn_medium * 3;
    prixMedium.innerHTML = disabled_btn_medium;
    audioUp.play();
}

//---------------variable et fonction pour bouton le plus chers-------------

let disabled_btn_big = 500;
prixBig.innerHTML = disabled_btn_big;

function big() {
    inc_per_second = inc_per_second * 2;
    scoreClick = scoreClick - disabled_btn_big;//on soustrait prix du click
    check();
    disabled_btn_big = disabled_btn_big * 5;
    prixBig.innerHTML = disabled_btn_big;
    audioUp.play();
}

//---------------fonction pour rentrer valeurs en local.storage-------------

//fonction ajoute variables dans local storage
function addLocalStorage() {
    var strScore = scoreClick.toString();//données sur le score
    //console.log("score " + strScore);
    localStorage.setItem('score', strScore);
    localStorage.setItem('valueClick', valueClick);
    localStorage.setItem('disabled_btn_small', disabled_btn_small);
    localStorage.setItem('disabled_btn_medium', disabled_btn_medium);
    localStorage.setItem('disabled_btn_big', disabled_btn_big);
    localStorage.setItem('valueMedium', valueMedium);
    localStorage.setItem('inc_per_second', inc_per_second);
    //console.log(localStorage);
}

//fonction pour récupérer variable du local storage
function getLocalStorage() {
    if (localStorage.getItem('score') != null) {
        console.log("get score " + localStorage.getItem('score'));
        scoreClick = localStorage.getItem('score');
        scoreClick = parseInt(scoreClick);
    }
    if (localStorage.getItem('valueClick') != null) {
        valueClick = localStorage.getItem('valueClick');
        valueClick = parseInt(valueClick);
    }
    if (localStorage.getItem('disabled_btn_small') != null) {
        disabled_btn_small = localStorage.getItem('disabled_btn_small');
        disabled_btn_small = parseInt(disabled_btn_small);
        prixSmall.innerHTML = disabled_btn_small;
    }
    if (localStorage.getItem('disabled_btn_medium') != null) {
        disabled_btn_medium = localStorage.getItem('disabled_btn_medium');
        disabled_btn_medium = parseInt(disabled_btn_medium);
        prixMedium.innerHTML = disabled_btn_medium;
    }
    if (localStorage.getItem('disabled_btn_big') != null) {
        disabled_btn_big = localStorage.getItem('disabled_btn_big');
        disabled_btn_big = parseInt(disabled_btn_big);
        prixBig.innerHTML = disabled_btn_big;
    }
    if (localStorage.getItem('valueMedium') != null) {
        valueMedium = localStorage.getItem('valueMedium');
        valueMedium = parseInt(valueMedium);
    }

    if (localStorage.getItem('inc_per_second') != null) {
        inc_per_second = localStorage.getItem('inc_per_second');
        inc_per_second = parseInt(inc_per_second);
    }
}

//fonction pour quand on rafraichit la page
window.onload = (event) => {
    getLocalStorage()
    document.getElementById("display-score").innerHTML = scoreClick
    displayInc.innerHTML = inc_per_second;
    displayClick.innerHTML = valueClick;
    check();
};

function perSecond() {
    scoreClick = scoreClick + Math.round(inc_per_second / 4);
    score.innerHTML = scoreClick;
    displayInc.innerHTML = inc_per_second;
    check();
}

const intervalId = setInterval(perSecond, 250);

//fonction pour reset les valeurs
function reset() {

}

/*
              /\         /\
             /  \       /  \

               ___      ___


                 |_____|
                   |_|

*/

// __________________________________________________________________________

//---------------------------test animation JS --------------------

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