// Just use to cross check API Data
const mainData = {
  kind: "youtube#searchResult",
  etag: "ZJ_-HaCzdkl5s1-KI8pwf7ql4Fk",
  id: {
    kind: "youtube#video",
    videoId: "qm3BGhdDFtI",
  },
  snippet: {
    publishedAt: "2023-02-18T10:50:00Z",
    channelId: "UCcpwiPJR_-fhJolRNcB_tBw",
    title: "Top 10 Highest Grossing Movies In The World 🌍🤩 #shorts #movies",
    description:
      "Top 10 Highest Grossing Movies In The World #shorts #movies #viralshorts #theavengers #thelionking #jurrassicworld ...",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/qm3BGhdDFtI/default.jpg",
        width: 120,
        height: 90,
      },
      medium: {
        url: "https://i.ytimg.com/vi/qm3BGhdDFtI/mqdefault.jpg",
        width: 320,
        height: 180,
      },
      high: {
        url: "https://i.ytimg.com/vi/qm3BGhdDFtI/hqdefault.jpg",
        width: 480,
        height: 360,
      },
    },
    channelTitle: "FILMY CRUSH",
    liveBroadcastContent: "none",
    publishTime: "2023-02-18T10:50:00Z",
  },
  videoDetails: {
    viewCount: "354965",
    likeCount: "20800",
    favoriteCount: "0",
    commentCount: "125",
  },
  channelDetails: {
    kind: "youtube#channel",
    etag: "Xh8AE3NCOunS6z9Ms5ZbxdF1_NM",
    id: "UCcpwiPJR_-fhJolRNcB_tBw",
    snippet: {
      title: "FILMY CRUSH",
      description:
        "GOD BLESS YOU ❤️😇\n\n\n\n\nFor Businesses Inquiries : filmycrush18@gmail.com\n\nInstagram : filmy_crush_17\n\n",
      customUrl: "@filmy_crush_17",
      publishedAt: "2022-07-28T03:05:19.923476Z",
      thumbnails: {
        default: {
          url: "https://yt3.ggpht.com/USMfCCohaNYqyzdm3xsrM7gwfDpuJiOyIS4B5SdYW8jIsrpNshYBasTE3Pkrw6yoMD1KNUd-=s88-c-k-c0x00ffffff-no-rj",
          width: 88,
          height: 88,
        },
        medium: {
          url: "https://yt3.ggpht.com/USMfCCohaNYqyzdm3xsrM7gwfDpuJiOyIS4B5SdYW8jIsrpNshYBasTE3Pkrw6yoMD1KNUd-=s240-c-k-c0x00ffffff-no-rj",
          width: 240,
          height: 240,
        },
        high: {
          url: "https://yt3.ggpht.com/USMfCCohaNYqyzdm3xsrM7gwfDpuJiOyIS4B5SdYW8jIsrpNshYBasTE3Pkrw6yoMD1KNUd-=s800-c-k-c0x00ffffff-no-rj",
          width: 800,
          height: 800,
        },
      },
      localized: {
        title: "FILMY CRUSH",
        description:
          "GOD BLESS YOU ❤️😇\n\n\n\n\nFor Businesses Inquiries : filmycrush18@gmail.com\n\nInstagram : filmy_crush_17\n\n",
      },
      country: "IN",
    },
    statistics: {
      viewCount: "175494286",
      subscriberCount: "471000",
      hiddenSubscriberCount: false,
      videoCount: "244",
    },
  },
};
console.log(mainData);

// GLOBAL VARIABLE TO STORE DATA
let realHomeData = [];
const API_KEY = "AIzaSyCTBT8Lv-Z2FDQ-cZWisuQ1GJI1v3EmKMo";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const youtubeTopics = [
  "Laptop Review",
  "random",
  "Codin",
  "Java Script",
  "Front end Developer",
  "Car Review",
  "SmartPhone Review",
  "India",
  "Trailers",
  "News",
  "Flagship killer Smartphone",
  "Mercedez",
  "Thriller Movie",
  "History",
  "Standup Comedy",
  "Travel",
  "Science",
  "Technology",
];



// FUNCTION TO LOAD RANDOM VIDEOS WHENEVER PAGE IS REFRESHED
function randomTopics(){
  // checking to see if there is any data stored in local from video HTML page
  if(localStorage.length>0){
    let storedString = localStorage.getItem("search");
    let valueString = JSON.parse(storedString);
    localStorage.clear();
    fetchVideo(valueString,27);
    let inphome = document.getElementById("homeinp");
    inphome.value=valueString;
  }
  else{
    const randomnos = 7;
    let randomNames = [];
    let duplicYTArray = youtubeTopics;
    console.log(duplicYTArray);
  

 // Randomly select three topics
  for(let i=0; i<randomnos; i++){
    const randomIndex = Math.floor(Math.random()*duplicYTArray.length);
    randomNames.push(youtubeTopics[randomIndex]);
    // Remove the selected topic to avoid duplicates
    duplicYTArray.splice(randomIndex,1);
  }

  let stringTopics = randomNames.join("+")
  fetchVideo(stringTopics,27);
}
}


// FETCHING 25NOS OF VIDEO DATA FROM API
async function fetchVideo(searchTerm, videoNos) {
  try {
    const response = await fetch(
      `${BASE_URL}/search?key=${API_KEY}&q=${searchTerm}&maxResults=${videoNos}&part=snippet`
    );
    const res = await response.json();
    const dataVideos = res.items;

    // Adding video details to main array
    const videoDetailsPromises = dataVideos.map(async (video) => {
      return {
        ...video,
        videoDetails: await videoViews(video.id.videoId),
      };
    });
    const videoFinalPromise = await Promise.all(videoDetailsPromises);

    // Adding channels details to main array
    const channelLogo = videoFinalPromise.map(async (channel) => {
      return {
        ...channel,
        channelDetails: await channelInfo(channel.snippet.channelId),
      };
    });

    realHomeData = await Promise.all(channelLogo);
    console.log(realHomeData);
    renderVideos();
  } catch (err) {
    console.err;
  }
}


// Adding Video object to render Array
async function videoViews(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?key=${API_KEY}&part=statistics&id=${id}`
    );
    const res = await response.json();
    let ans = res.items[0].statistics;
    return ans;
  } catch (err) {
    console.err;
  }
}

// Adding Channel object to render Array
async function channelInfo(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/channels?key=${API_KEY}&part=statistics&part=snippet&id=${id}`
    );
    const res = await response.json();
    return res.items[0];
  } catch (err) {
    console.err;
  }
}

// Getting time difference for every video
function getTimeDifference(publishTime) {
  // convert the publishTime string to a Date object
  const publishDate = new Date(publishTime);
  const currentDate = new Date();

  const timeDiff = currentDate - publishDate;

  // calculate the difference in days, months, and years
  const daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const monthsDifference = Math.floor(daysDifference / 30);
  const yearsDifference = Math.floor(daysDifference / 365);

  if (daysDifference < 30) {
    if (daysDifference == 0) {
      let randomNumber = Math.floor(Math.random() * (23 - 1) + 1);
      return `${randomNumber} hrs ago`;
    } else {
      return `${daysDifference} days ago`;
    }
  } else if (monthsDifference < 12) {
    return `${monthsDifference} months ago`;
  } else {
    return `${yearsDifference} years ago`;
  }
}

// Getting Views nos of every video
function getViewnos(nos) {
  const count = parseInt(nos);

  if (count >= 1000000000) {
    const viewCount = (count / 1000000000).toFixed(1);
    return `${viewCount}  B views`;
  } else if (count >= 1000000) {
    const viewCount = (count / 1000000).toFixed(1);
    return `${viewCount}  M views`;
  } else if (count >= 1000) {
    const viewCount = (count / 1000).toFixed(1);
    return `${viewCount}  K views`;
  } else {
    return `${count}  views`;
  }
}

// STORE VIDEODATA IN LOCAL STORAGE

function storeVideodata(data) {
  localStorage.clear();
  let stringData = JSON.stringify(data);
  localStorage.setItem("video", stringData);
  window.location.href = "./video.html";
}

// RENDER THE VIDEO DATA ON HOME PAGE
function renderVideos() {
  let targetdiv = document.getElementsByClassName("videosection")[0];
  targetdiv.innerHTML = "";

  realHomeData.forEach((videoR) => {
    let countCheck;
    if (videoR.videoDetails === undefined) {
      let randomNumber = Math.floor(
        Math.random() * (30000000 - 2000000) + 2000000
      );
      return (countCheck = randomNumber);
    } else {
      countCheck = videoR.videoDetails.viewCount;
    }

    let divt = document.createElement("div");
    divt.classList.add("videoCard");
    divt.addEventListener("click", () => {
      storeVideodata(videoR);
    });

    divt.innerHTML = `
        <div class="videoImg">
           <img  src=${
             videoR.snippet.thumbnails.medium.url
           } alt="thumbnail loading">
        </div>
        <div class="videobody">
            <img src=${videoR.channelDetails.snippet.thumbnails.high.url}>
            <div>
                <p>
                 ${videoR.snippet.title}
                </p>
            </div>
        </div>
         <div class="videoFooter">
           <p>${videoR.snippet.channelTitle}</p>
       
          <p>${getViewnos(countCheck)} ${getTimeDifference(
      videoR.snippet.publishTime
    )}</p>

         </div>
        `;
    targetdiv.appendChild(divt);
  });
}

// DISPLAY SEARCH VIDEOS ON HOMEPAGE
function searchVideo() {
  let inphome = document.getElementById("homeinp").value;
  if (inphome !== "") {
    fetchVideo(inphome, 27);
  }
}

// NAVIGATE TO HOME PAGE ON CLICKING LOGO
function clickLogo() {
  window.location.href = "./index.html";
}
