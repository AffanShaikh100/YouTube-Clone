

// CREATING FUNCTIONALITY TO TOGGLE THE WHOLE ASIDE BAR
function asidetoggle() {
  let open = document.getElementById("asideopen");
  let close = document.getElementById("asideclose");
  let videoBig = document.querySelectorAll("videoCard");
  let videosec = document.getElementById("homepart2");
  open.classList.toggle("asidebarc");
  close.classList.toggle("asidebaro");
  videosec.classList.toggle("videosectoggle");
  videoBig.classList.toggle("videoBig");
}

// CREATING FUNCTIONALITY TO TOGGLE ASIDEBAR SECTION 2
function aside2slider() {
  let ptagdiv = document.getElementById("aside2-popup");
  let div = document.getElementsByClassName("aside2-popup")[0];
  let aside2 = document.getElementsByClassName("aside2")[0];
  aside2.insertBefore(div, ptagdiv);
  div.classList.toggle("aside2displayshow");
}

// CREATING FUNCTIONALITY TO TOGGLE ASIDEBAR SECTION 3
function aside3slider() {
  let ptagdiv = document.getElementById("aside3clickdiv");
  let div = document.getElementsByClassName("aside3-popup")[0];
  let aside3 = document.getElementsByClassName("aside3")[0];
  aside3.insertBefore(div, ptagdiv);

  div.classList.toggle("aside3-popup-open");
}

// BUTTON DIV JS

let buttons = document.querySelectorAll(".buttonbar>button");
// logic to apply active class o respective buttons
function removeActive() {
  buttons.forEach((button) => {
    button.classList.remove("activebutton");
  });
}
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    removeActive();
    button.classList.add("activebutton");
    // console.log(button.innerText);
    let inphome = document.getElementById("homeinp");
    inphome.value = "";
    fetchVideo(button.innerText, 29);
  });
});


// SCROLL BUTTON BAR LOGIC 
let buttondiv = document.getElementsByClassName("buttonbar")[0];
let rigtharrow = document.getElementsByClassName("rightarrow")[0];
let leftarrow = document.getElementsByClassName("leftarrow")[0];

function manageScroll() {
  if (buttondiv.scrollLeft >= 20) {
    leftarrow.classList.add("activearrow");
  } else {
    leftarrow.classList.remove("activearrow");
  }
  let masterScroll = buttondiv.scrollWidth - buttondiv.clientWidth - 20;
  if (buttondiv.scrollLeft >= masterScroll) {
    rigtharrow.classList.remove("activearrow");
  } else rigtharrow.classList.add("activearrow");
}

rigtharrow.addEventListener("click", () => {
  buttondiv.scrollLeft += 200;
  manageScroll();
});

leftarrow.addEventListener("click", () => {
  buttondiv.scrollLeft -= 200;
  manageScroll();
});
