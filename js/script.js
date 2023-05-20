// Use destructuring to assign variables to DOM elements
const usernameInput = document.getElementById("search-user");
const form = document.querySelector("form");
const imageUser = document.getElementById("user-image");
const imageUserNav = document.getElementById("nav-user-img");
const nameUser = document.querySelector(".name-user");
const username = document.getElementById("user-name");
const repoList = document.querySelector(".repositories");
const follower = document.querySelectorAll(".span-follow")[0];
const following = document.querySelectorAll(".span-follow")[1];
const locationUser = document.getElementsByClassName("location")[0];

// Search users
const clientID = "e9d4d0c3f60e969327c8";
const clientSecret = "4c941d46fb9b76e5d0b75a56122965bab8fb0947";
const baseUrl = "https://api.github.com/";

// message toast
const messageEmpty = "Please enter a username";
const messageNotFound = "Username not found";
const messageNoRepositories = "There is no repositories";

// load user
const user = "baselmq";
getUser(user);

// request data
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const user = usernameInput.value.trim();
  if (user != "") {
    getUser(user);
  } else {
    toast(messageEmpty);
  }
});

// ----------------------*** Get Data from API ***----------------------
function getUser(user) {
  // Use template literals instead of string concatenation
  const URL = `${baseUrl}search/users?q=${user}&client_id=${clientID}&client_secret=${clientSecret}`;

  fetch(URL, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Use dot notation to set the attributes and textContent of DOM elements
      fetch(`${data.items[0].url}`)
        .then((response) => response.json())
        .then((userData) => {
          imageUser.src = userData.avatar_url;
          imageUserNav.src = userData.avatar_url;
          nameUser.textContent = userData.name;
          username.textContent = userData.login;
          follower.innerHTML = ` <img src="assets/icon/user.svg" alt="follower" /> ${userData.followers} follower `;
          following.textContent = ` ${userData.following} following`;
          locationUser.innerHTML = `${
            userData.location == null
              ? ""
              : `<img src="assets/icon/location.svg" alt="location" /> ${userData.location}`
          }   `;
        })
        .catch((error) => {
          console.error(error);
          toast(messageNotFound);
        });

      // ------------------------------*** Get repositories ***------------------------------
      const repos = data.items[0].repos_url;
      fetch(`${repos}?per_page=100`)
        .then((response) => response.json())
        .then((reposData) => {
          document.querySelectorAll(".repo").forEach((el) => el.remove());
          for (let i = 0; i < 6; i++) {
            const listItem = document.createElement("div");
            listItem.classList.add("repo");
            const color = dotLanguageColor(reposData[i].language);
            listItem.innerHTML = `
            <div class="name-repo">
            <span>${reposData[i].name}</span>
            <div>public</div>
            </div>
            <div class="lang-programming"><span class="dot-lang" style="background-color:${color}"></span>${
              reposData[i].language == null ? "" : reposData[i].language
            }</div>`;
            repoList.appendChild(listItem);
          }
        })
        .catch((error) => {
          console.error(error);
          toast(messageNoRepositories);
        });
    })
    .catch((error) => {
      console.error(error);
      toast(messageNotFound);
    });
}

// ----------------------*** Select the color language ***----------------------
function dotLanguageColor(lang) {
  switch (lang) {
    case "HTML":
      return "#e34c26";
    case "JavaScript":
      return "#f1e05a";
    case "CSS":
      return "#563d7c";
    case "PHP":
      return "#4f5d95";
    case "Dart":
      return "#00b4ab";
    default:
      return "#00B4AB00";
  }
}

// ----------------------*** toast ***----------------------
function toast(message, color = "#ff4640") {
  var x = document.getElementById("toast");
  x.className = "show";
  x.innerText = message;
  x.style.backgroundColor = color;
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
