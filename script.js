
let currentSong = new Audio;
let songs;
let currFolder;
let songName = [];
let currAlbum;

function SecondsToTimeFormat(seconds) {
    seconds = Math.round(seconds); // Round to nearest whole number
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    // Adding leading zeros if minutes or seconds are less than 10
    if (minutes < 10) minutes = '0' + minutes;
    if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;

    return minutes + ':' + remainingSeconds;
}


async function getSongs(folder) {
    currFolder = folder;
    let response = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let htmlContent = await response.text();

    let div = document.createElement("div");
    div.innerHTML = htmlContent;

    let as = div.getElementsByTagName("a");

    songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }

    // console.log("Songs:", songs);

    songName = [];
    for (let i = 0; i < songs.length; i++) {
        var element = songs[i];
        // console.log(decodeURI(element).split("/").pop().split(".mp3")[0]);
        songName.push(decodeURI(element).split("/").pop().split(".mp3")[0]);
    }
    // console.log(songName);

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = "";
    for (let i = 0; i < songName.length; i++) {
        const song = songName[i];
        const songUrl = songs[i];

        var artist;

        const jsmediatags = window.jsmediatags;

        // jsmediatags.read(songUrl, {
        //     onSuccess: function (tags) {
        //         console.log(tags);
        //     },
        //     onError: function (error) {
        //         console.log(error);
        //     }
        // })

        songUL.insertAdjacentHTML('beforeend',
            `
            <li>
                <div class="flex info">
                    <img class="invert" src="/svg/music.svg" alt="">
                    <div >
                        <div>${song}</div>
                        <div>${currAlbum}</div>
                    </div>
                </div>
                <img class="playNow invert" src="/svg/play.svg" alt="">
            
            </li>`
        );
    }
    for (const song of songName) {
        // songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20", " ")} </li>`;
        // songUL.insertAdjacentHTML('beforeend',
        //     `
        //     <li>
        //         <div class="flex info">
        //             <img class="invert" src="/svg/music.svg" alt="">
        //             <div >
        //                 <div>${song}</div>
        //                 <div>Artist</div>
        //             </div>
        //         </div>
        //         <img class="playNow invert" src="/svg/play.svg" alt="">

        //     </li>`
        // );
    }
    //select the first song at start
    playMusic(songName[0], false);


    // attach an event listner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e.getElementsByTagName("div")[2]);
            playMusic(e.getElementsByTagName("div")[2].innerHTML);
        })
    })
}


function playMusic(track, playing = true) {
    currentSong.src = currFolder + track + ".mp3";
    
    if (playing) currentSong.play();
    if (!currentSong.paused) play.src = "https://img.icons8.com/ios-filled/50/circled-pause.png";
    
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {

    let response = await fetch(`http://127.0.0.1:5500/songs/`);
    let htmlContent = await response.text();

    let div = document.createElement("div");
    div.innerHTML = htmlContent;
    // console.log(div)
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer");

    Array.from(anchors).forEach(async e => {
        if (e.href.includes("/songs") && !e.href.endsWith(".jpg") && !e.href.endsWith("songs")) {
            // console.log(e.href.split("/").slice(-1)[0])
            let album = e.href.split("/").slice(-1)[0];
            // get meta data

            let jsonResponse = await fetch(`http://127.0.0.1:5500/songs/${album}/info.json`);
            let info = await jsonResponse.json();
            // console.log(info);

            cardContainer.innerHTML = cardContainer.innerHTML + `
                <div data-folder="${album}" class="card rounded">
                    <div  class="play">
                        <div class="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="#000000">
                                <path
                                    d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                    stroke="#000000" stroke-width="2" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <img src="/songs/${album}/cover.jpg" alt="">
                    <h3>${info.title}</h3>
                    <p>${info.description}</p>
                </div>
            `;

        }
    })

    // console.log(anchors)
}

async function main() {
    currFolder = "/songs/punjabi/";
    await displayAlbums()
    getAlbum();
    await getSongs(currFolder);
    console.log(songs[0]);

    //display all albums in page



    // playing first song
    // var audio = new Audio(songs[6]);
    // audio.play();


    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     // console.log(duration, audio.currentTime);
    // });

    // Attach an event Listner to play, next and previous 
    // var play = document.getElementById("play");
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "https://img.icons8.com/ios-filled/50/circled-pause.png";
        }
        else {
            currentSong.pause();
            play.src = "https://img.icons8.com/ios-filled/50/play-button-circled--v1.png";
        }
    })

    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration);

        document.querySelector(".songtime").innerHTML = `${SecondsToTimeFormat(currentSong.currentTime)} /
                                                         ${SecondsToTimeFormat(currentSong.duration)}`

        document.querySelector(".slider").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekBar").addEventListener("click", e => {
        let seektime = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        document.querySelector(".slider").style.left = seektime + "%";

        currentSong.currentTime = (seektime * currentSong.duration) / 100;
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%";
    })

    prev.addEventListener("click", () => {
        currentSong.pause();

        let index = songName.indexOf(currentSong.src.split("/").splice(-1)[0].replaceAll("%20", " ").split(".mp3")[0]);
        if (index - 1 >= 0) playMusic(songName[index - 1]);
    })

    next.addEventListener("click", () => {
        currentSong.pause();

        let index = songName.indexOf(currentSong.src.split("/").splice(-1)[0].replaceAll("%20", " ").split(".mp3")[0]);
        if (index + 1 < (songName.length)) playMusic(songName[index + 1]);
    })



    document.querySelector(".volRange").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        // console.log(e, e.target, e.target.value);
        currentSong.volume = e.target.value / 100;
    })

    let vol = document.querySelector(".volRange").getElementsByTagName("input")[0].value;
    volBtn.addEventListener("click", () => {
        if (currentSong.muted) {
            currentSong.muted = false;
            volBtn.src = "/svg/volume-high.svg";
            document.querySelector(".volRange").getElementsByTagName("input")[0].value = vol;
        }
        else {
            currentSong.muted = true;
            volBtn.src = "/svg/volume-off.svg";
            vol = document.querySelector(".volRange").getElementsByTagName("input")[0].value;
            document.querySelector(".volRange").getElementsByTagName("input")[0].value = 0;
        }

    })

    async function getAlbum(){
        let jsonResponse = await fetch(`http://127.0.0.1:5500/${currFolder}/info.json`);
        let info = await jsonResponse.json();
        currAlbum = info.title;
    }

    // load playlist according to clicked card
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            play.src = "https://img.icons8.com/ios-filled/50/play-button-circled--v1.png";

            currFolder = `/songs/${item.currentTarget.getAttribute("data-folder")}/`;
            getAlbum();

            await getSongs(`songs/${item.currentTarget.getAttribute("data-folder")}/`);
        })
    })
}

main()
