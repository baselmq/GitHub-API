const devRight = document.getElementsByClassName("right")[0];
const devLeft = document.getElementsByClassName("left")[0];
const devCenter = document.getElementsByClassName("center")[0];
const btnComparison = document.getElementById("btn-comparison");
const vsComparison = document.getElementById("vs-comparison");

const formOne = document.querySelectorAll(".form")[0];
const formTwo = document.querySelectorAll(".form")[1];
const userOne = document.querySelectorAll(".username")[0];
const userTwo = document.querySelectorAll(".username")[1];
const imgOne = document.querySelectorAll(".user-image")[0];
const imgTwo = document.querySelectorAll(".user-image")[1];
const inputOne = document.getElementById("input-one");
const inputTwo = document.getElementById("input-two");
const reposOne = document.querySelectorAll(".repos")[0];
const reposTwo = document.querySelectorAll(".repos")[1];
const followingOne = document.querySelectorAll(".following")[0];
const followingTwo = document.querySelectorAll(".following")[1];
const followersOne = document.querySelectorAll(".followers")[0];
const followersTwo = document.querySelectorAll(".followers")[1];
const closeLeft = document.querySelectorAll(".close")[0];
const closeRight = document.querySelectorAll(".close")[1];
const confettiGen = document.getElementById("my-canvas");

// responsive
var mobileScreenSize = window.matchMedia("(max-width: 700px)");
var smallScreenSize = window.matchMedia(
  "(min-width: 768px) and (max-width: 1117px) "
);

// message toast
const messageEmpty = "Please enter two usernames";
const messageNotFound = "Username not found";
const messageEnterRight = "Please press Enter in the input field on the right";
const messageEnterLeft = "Please press Enter in the input field on the left";

// Search users
const clientID = "e9d4d0c3f60e969327c8";
const clientSecret = "4c941d46fb9b76e5d0b75a56122965bab8fb0947";
const baseUrl = "https://api.github.com/";

// ----------------------*** Form One ***----------------------
formOne.addEventListener("submit", function (e) {
  e.preventDefault();
  getData(inputOne, userOne, imgOne, reposOne, followingOne, followersOne);
});

// ----------------------*** Form Two ***----------------------
formTwo.addEventListener("submit", function (e) {
  e.preventDefault();
  getData(inputTwo, userTwo, imgTwo, reposTwo, followingTwo, followersTwo);
});

// ----------------------*** Button Comparison ***----------------------
btnComparison.addEventListener("click", function () {
  if (
    inputOne.value.split(" ").join("") != "" &&
    inputTwo.value.split(" ").join("") != ""
  ) {
    if (inputOne.classList.contains("data-exist")) {
      if (inputTwo.classList.contains("data-exist")) checkWinner();
      else toast(messageEnterRight, "#709193");
    } else {
      toast(messageEnterLeft, "#5c6bc0");
    }
  } else {
    toast(messageEmpty);
  }
});

// ----------------------*** close ***----------------------
closeLeft.addEventListener("click", function () {
  window.location.reload();
});
closeRight.addEventListener("click", function () {
  window.location.reload();
});

// ----------------------*** Get Data from API ***----------------------
function getData(input, username, img, repositories, following, followers) {
  const user = input.value.split(" ").join("");
  const URL = `${baseUrl}search/users?q=${user}&client_id=${clientID}&client_secret=${clientSecret}`;

  fetch(URL, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const repos = data.items[0].repos_url;
      fetch(`${data.items[0].url}`)
        .then((response) => response.json())
        .then((data) => {
          username.innerText = data.name != null ? data.name : data.login;
          img.src = data.avatar_url;
          repositories.innerText = `Repositories: ${data.public_repos}`;
          following.innerText = `Following: ${data.following}`;
          followers.innerText = `Followers: ${data.followers}`;

          // Compare the number of repositories and declare the winner
          const reposCount = data.public_repos;

          if (input.value.split(" ").join("") != "") {
            input.setAttribute("data-repos", reposCount);
            input.classList.add("data-exist");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
      toast(messageNotFound);
    });
}

// ----------------------*** check Winner ***----------------------
function checkWinner() {
  const reposCountOne = parseInt(inputOne.getAttribute("data-repos")) || 0;
  const reposCountTwo = parseInt(inputTwo.getAttribute("data-repos")) || 0;

  //   responsive mobile
  if (mobileScreenSize.matches) {
    if (reposCountOne > reposCountTwo) {
      setLeftStyle("0, 18%,20px", "0", "top: 0");
    } else if (reposCountTwo > reposCountOne) {
      setRightStyle("0, 18%,20px", "0", "top: 0");
    } else {
      setTieStyles("40px");
    }
  }
  //   responsive small Screen
  else if (smallScreenSize.matches) {
    if (reposCountOne > reposCountTwo) {
      setLeftStyle("50%, 0, 100px", "15px", "right: 50%");
    } else if (reposCountTwo > reposCountOne) {
      setRightStyle("-50%, 0, 100px", "15px", " left: 50%");
    } else {
      setTieStyles("40px");
    }
  } //   responsive Desktop
  else {
    if (reposCountOne > reposCountTwo) {
      setLeftStyle("50%, 0, 100px", "15px", "right: 50%");
    } else if (reposCountTwo > reposCountOne) {
      setRightStyle("-50%, 0, 100px", "15px", "left: 50%");
    } else {
      setTieStyles("60px");
    }
  }
}

function setLeftStyle(translation, top, position) {
  devLeft.style = `
  transform: translate3d(${translation});
  position: absolute;
  top: ${top};
  ${position};
  transition: 2s;
`;
  devRight.style.display = "none";
  devCenter.style.display = "none";
  inputOne.style.display = "none";
  confettiGen.classList.add("active");
  closeLeft.classList.add("active");
}

function setRightStyle(translation, top, position) {
  devRight.style = `
  transform: translate3d(${translation});
  position: absolute;
  top: ${top};
  ${position};
  transition: 2s;
`;
  devLeft.style.display = "none";
  devCenter.style.display = "none";
  inputTwo.style.display = "none";
  confettiGen.classList.add("active");
  closeRight.classList.add("active");
}
function setTieStyles(size) {
  vsComparison.innerText = "It's a tie!";
  vsComparison.style.fontSize = size;
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

// ----------------------*** confetti ***----------------------
var confettiSettings = { target: "my-canvas" };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();
