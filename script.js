const appCont = document.querySelector(".app-container");
const form = document.querySelector(".form-body");
const submitBtn = document.querySelector("#submit");
const input = document.querySelector("#search");
const fullBody = document.querySelector("main");

const error = document.querySelector(".error");
const closeMsg = document.querySelector(".close");
const errorMsg = document.querySelector(".errorMsg");

const APIURL = `https://api.github.com/users/`;

const imgDom = ["github", "github2", "github3", "github4", "github5"];

let iterator = 0;

window.onload = () => {
    changeBG(iterator)
}

function changeBG(iterator){
    fullBody.style.background = `url(/BG/${imgDom[iterator]}.jpg)`;
    fullBody.style.backgroundPosition = `center top`;
    fullBody.style.backgroundSize = `cover`;
    fullBody.style.backgroundRepeat = `no-repeat`;
}


function ranNum(){
    return Math.floor(Math.random() * imgDom.length);
}

async function getUserBySearch(text){
    const serverResponse = await fetch(APIURL + text);
    const resp = await serverResponse.json();
    const response = resp;
    return response;
}

window.addEventListener("load", async() => {
    let userData = await getUserBySearch(`octocat`);
    showUserData(userData);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

submitBtn.addEventListener("click", async() => {
    if(input.value == ""){
        errorMsg.textContent = `Please enter a username!`;
        error.style.transform = `translateX(0vw)`
        setTimeout( () => {
            error.style.transform = `translateX(100vw)`
        }, 5000)
    }else{
        changeBG(ranNum());
        let userInput = input.value;
        input.value = "";
        if(userInput === "")return;
        let userData = await getUserBySearch(userInput);

        if(userData.hasOwnProperty("message") && userData.message == "Not Found"){
            errorMsg.textContent = `Sorry user not found!`;
            error.style.transform = `translateX(0vw)`
            setTimeout( () => {
                error.style.transform = `translateX(100vw)`
            }, 5000)
        }else{
            showUserData(userData);
        }
        
    }
})

function showUserData(userData){
    appCont.innerHTML = "";
    let data = userData;
    if(data === null || data == undefined || data == "") return;
    let creationDate = data.created_at.slice(0,10);
    let creationYear = creationDate.slice(0,4);
    let creationMonth = creationDate.slice(5,7);
    let creationDay = creationDate.slice(8);

    const year = creationYear;
    const day = creationDay;
    let month;

    creationMonth == "01"
    ? month = 'Jan'
    : creationMonth == "02"
    ? month = `Feb`
    : creationMonth == "03"
    ? month = `Nar`
    : creationMonth == "04"
    ? month = `Apr`
    : creationMonth == "05"
    ? month = `May`
    : creationMonth == "06"
    ? month = `Jun`
    : creationMonth == "07"
    ? month = `Jul`
    : creationMonth == "08"
    ? month = `Aug`
    : creationMonth == "09"
    ? month = `Sep`
    : creationMonth == "10"
    ? month = `Oct`
    : creationMonth == "11"
    ? month = `Nov`
    : month = `Dec`

    appCont.innerHTML = `
        <div class="first-section">
            <div class="img-cont">
                <img src=${data.avatar_url}" alt="" class="user-img">
            </div>
            <div class="user-pro">
                <div class="users-name">${data.name}</div>
                <div class="user-username">@${data.login}</div>
                <div class="user-join">Joined ${day} ${month} ${year}</div>
            </div>
        </div>

        <div class="second-section">
            <div class="user-bio">
                ${data.bio === null ? `Not Available Now!` : data.bio}
            </div>
            <div class="user-repos">
                <span class="one">
                    <span class="mean">Repos</span>
                    <span class="num">${data.public_repos}</span>
                </span>
                <span class="one">
                    <span class="mean">Followers</span>
                    <span class="num">${data.followers}</span>
                </span>
                <span class="one">
                    <span class="mean">Following</span>
                    <span class="num">${data.following}</span>
                </span>
            </div>
        </div>

        <div class="third-section">
            <div class="locate">
                <span class="icon"><i class="fa fa-map-marker" aria-hidden="true"></i></span>
                <span class="content">${data.location === null ? `Not Availabel` : data.location}</span>
            </div>
            <div class="link">
                <span class="icon"><i class="fa fa-link" aria-hidden="true"></i></span>
                <span class="content">${data.url}</span>
            </div>
            <div class="TwitterAcc">
                <span class="icon"><i class="fa fa-twitter" aria-hidden="true"></i></span>
                <span class="content">${data.twitter_username === null ? `Not Available` : data.twitter_username}</span>
            </div>
            <div class="homepage">
                <span class="icon"><i class="fa fa-building-o" aria-hidden="true"></i></span>
                <span class="content">${data.company === null ? `Not Available` : data.company}</span>
            </div>
        </div>
    `
}

closeMsg.addEventListener("click", () => {
    error.style.transform = `translateX(100vw)`
})