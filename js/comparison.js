const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const darkMode = document.getElementById("dark-mode");
const darkModeMobile = document.getElementById("dark-mode-mobile");

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
const messageEmpty = "Please enter a username";
const messageNotFound = "Username not found";

// Search users
const clientID = "e9d4d0c3f60e969327c8";
const clientSecret = "4c941d46fb9b76e5d0b75a56122965bab8fb0947";
const baseUrl = "https://api.github.com/";

// ----------------------*** Form One ***----------------------
formOne.addEventListener("submit", function (e) {
  e.preventDefault();
  const checkInputOne = inputOne.value.trim();

  if (checkInputOne != "")
    getData(inputOne, userOne, imgOne, reposOne, followingOne, followersOne);
  else toast(messageEmpty);
});

// ----------------------*** Form Two ***----------------------
formTwo.addEventListener("submit", function (e) {
  e.preventDefault();
  const checkInputTwo = inputTwo.value.trim();

  if (checkInputTwo != "")
    getData(inputTwo, userTwo, imgTwo, reposTwo, followingTwo, followersTwo);
  else toast(messageEmpty);
});

// ----------------------*** Button Comparison ***----------------------
btnComparison.addEventListener("click", function () {
  if (inputOne.value.trim() != "" && inputTwo.value.trim() != "") checkWinner();
  else toast("Please enter two usernames");
});

// ----------------------*** close ***----------------------
closeLeft.addEventListener("click", function () {
  window.location.reload();
});
closeRight.addEventListener("click", function () {
  window.location.reload();
});
// ----------------------*** Dark Mode ***----------------------
darkMode.addEventListener("click", function () {
  const body = document.body;
  body.classList.toggle("dark-mode");
});
darkModeMobile.addEventListener("click", function () {
  const body = document.body;
  body.classList.toggle("dark-mode");
});

// ----------------------*** hamburger menu ***----------------------
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// ----------------------*** Get Data from API ***----------------------
function getData(input, username, img, repositories, following, followers) {
  const user = input.value.trim();
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

          if (input.value.trim() != "") {
            input.setAttribute("data-repos", reposCount);
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
      devLeft.style = ` position: absolute; top:0; transform: translate3d(0, 18%,20px); transition: 2s;`;
      devRight.style.display = "none";
      devCenter.style.display = "none";
      inputOne.style.display = "none";
      confettiGen.classList.add("active");
      closeLeft.classList.add("active");
    } else if (reposCountTwo > reposCountOne) {
      devRight.style = `position: absolute; top:0; transform: translate3d(0, 18%,20px); transition: 2s;`;
      devLeft.style.display = "none";
      devCenter.style.display = "none";
      inputTwo.style.display = "none";
      confettiGen.classList.add("active");
      closeRight.classList.add("active");
    } else {
      vsComparison.innerText = "It's a tie!";
      vsComparison.style.fontSize = "40px";
      // btnComparison.style.display = "none";
    }
  }
  //   responsive Desktop
  else if (smallScreenSize.matches) {
    if (reposCountOne > reposCountTwo) {
      devLeft.style = `
      transform: translate3d(50%, 0, 100px); position: absolute; top:15px; right: 50%; transition: 2s;`;
      devRight.style.display = "none";
      devCenter.style.display = "none";
      inputOne.style.display = "none";
      confettiGen.classList.add("active");
      closeLeft.classList.add("active");
    } else if (reposCountTwo > reposCountOne) {
      devRight.style = `
      transform: translate3d(-50%, 0, 100px); position: absolute;  top:15px; left: 50%; transition: 2s;`;
      devLeft.style.display = "none";
      devCenter.style.display = "none";
      inputTwo.style.display = "none";
      confettiGen.classList.add("active");
      closeRight.classList.add("active");
    } else {
      vsComparison.innerText = "It's a tie!";
      vsComparison.style.fontSize = "40px";
      // btnComparison.style.display = "none";
    }
  } else {
    if (reposCountOne > reposCountTwo) {
      devLeft.style = `
            transform: translate3d(50%, 0, 100px); position: absolute; top:15px; right: 50%; transition: 2s;`;
      devRight.style.display = "none";
      devCenter.style.display = "none";
      inputOne.style.display = "none";
      confettiGen.classList.add("active");
      closeLeft.classList.add("active");
    } else if (reposCountTwo > reposCountOne) {
      devRight.style = `
            transform: translate3d(-50%, 0, 100px); position: absolute;  top:15px; left: 50%; transition: 2s;`;
      devLeft.style.display = "none";
      devCenter.style.display = "none";
      inputTwo.style.display = "none";
      confettiGen.classList.add("active");
      closeRight.classList.add("active");
    } else {
      vsComparison.innerText = "It's a tie!";
      vsComparison.style.fontSize = "60px";
      // btnComparison.style.display = "none";
    }
  }
}
// ----------------------*** toast ***----------------------
function toast(message) {
  var x = document.getElementById("toast");
  x.className = "show";
  x.innerText = message;
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

// ----------------------*** confetti ***----------------------
var confettiSettings = { target: "my-canvas" };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

// function checkWinner() {
//   const reposCountOne = parseInt(inputOne.getAttribute("data-repos")) || 0;
//   const reposCountTwo = parseInt(inputTwo.getAttribute("data-repos")) || 0;

//   const isMobileScreen = mobileScreenSize.matches;
//   const isSmallScreen = smallScreenSize.matches;

//   if (isMobileScreen) {
//     handleMobileScreen();
//   } else if (isSmallScreen) {
//     handleSmallScreen();
//   } else {
//     handleDesktopScreen();
//   }

//   function handleMobileScreen() {
//     if (reposCountOne > reposCountTwo) {
//       setWinnerStyles(devLeft, inputOne, confettiGen, closeLeft);
//       hideElements(devRight, devCenter, inputTwo);
//     } else if (reposCountTwo > reposCountOne) {
//       setWinnerStyles(devRight, inputTwo, confettiGen, closeRight);
//       hideElements(devLeft, devCenter, inputOne);
//     } else {
//       setTieStyles();
//     }
//   }

//   function handleSmallScreen() {
//     if (reposCountOne > reposCountTwo) {
//       setWinnerStyles(devLeft, inputOne, confettiGen, closeLeft);
//       hideElements(devRight, devCenter, inputTwo);
//     } else if (reposCountTwo > reposCountOne) {
//       setWinnerStyles(devRight, inputTwo, confettiGen, closeRight);
//       hideElements(devLeft, devCenter, inputOne);
//     } else {
//       setTieStyles();
//     }
//   }

//   function handleDesktopScreen() {
//     if (reposCountOne > reposCountTwo) {
//       setWinnerStyles(devLeft, inputOne, confettiGen, closeLeft);
//       hideElements(devRight, devCenter, inputTwo);
//     } else if (reposCountTwo > reposCountOne) {
//       setWinnerStyles(devRight, inputTwo, confettiGen, closeRight);
//       hideElements(devLeft, devCenter, inputOne);
//     } else {
//       setTieStyles();
//     }
//   }

//   function setWinnerStyles(winner, input, confetti, close) {
//     winner.style = `position: absolute; top:0; transform: translate3d(0, 18%,20px); transition: 2s;`;
//     input.style.display = "none";
//     confetti.classList.add("active");
//     close.classList.add("active");
//   }

//   function hideElements(...elements) {
//     for (const element of elements) {
//       element.style.display = "none";
//     }
//   }

//   function setTieStyles() {
//     vsComparison.innerText = "It's a tie!";
//     vsComparison.style.fontSize = isMobileScreen ? "40px" : "60px";
//   }
// }