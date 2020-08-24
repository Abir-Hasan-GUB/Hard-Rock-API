// declare a emty array for receved artist name and song title
let artistArray = [];
let songTitleArray = [];

// Add listener ini search button
const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", function () {
    let artistInput = document.getElementById("artist-input").value;
    findLyrics(artistInput); //call function and pass valu of search
})

//find artist name and album name and pass all value for pick lyrics
function findLyrics(title) {
    fetch(`https://api.lyrics.ovh/suggest/${title}`)
        .then(response => response.json())
        .then(data => {
            let len = document.querySelectorAll(".author").length;
            for (let i = 0; i < len; i++) {
                let titleName = data.data[i].title;
                songTitleArray.push(titleName);//push title to an array
                document.querySelectorAll(".song-title")[i].innerHTML = titleName; //set title to p tag in html
                let artistName = data.data[i].artist.name;
                artistArray.push(artistName);//push artist name to an array
                document.querySelectorAll(".album-name")[i].innerHTML = artistName; //set artist name to p tag in html
            }
        });
}

// get lyrics button
let lyricBtnLen = document.querySelectorAll(".getLyrics").length;
for (let j = 0; j < lyricBtnLen; j++) {
    document.querySelectorAll(".getLyrics")[j].addEventListener("click", function () {
        document.querySelector(".main-taitle").innerText = songTitleArray[j];
        getLyricsByAPI(artistArray[j], songTitleArray[j]);
    })
}

// Pick lyrics and set lyrics 
function getLyricsByAPI(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(response => response.json())
        .then(data => {
            if (data.lyrics == undefined) {
                document.getElementById("full-lyric").innerText = "Lyrics Not Found"
            } else {
                document.getElementById("full-lyric").innerText = data.lyrics;
            }
        })
}