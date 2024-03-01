// GLOBAL VARIABLE
const API_KEY1 = "AIzaSyCTBT8Lv-Z2FDQ-cZWisuQ1GJI1v3EmKMo";
let selectedVideo;
let videoIdStore;
let commentObj;
let playerInstance;
let relatedobj = [];

let clickobj = {
    likeState: false,
    dislikeState: false,
  };
const youtubeRelatedTopics = [
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
  

// Cheack API Fetch Data
const mainData1 = {
  kind: "youtube#searchResult",
  etag: "aK3Ovhj-IVQ-TxUY6wE2xbP_2TM",
  id: {
    kind: "youtube#video",
    videoId: "AEePOONyZPs",
  },
  snippet: {
    publishedAt: "2024-02-09T06:20:56Z",
    channelId: "UCMrvxKTx9hLhZcOvJkYOnAw",
    title:
      "I Am Using Hack In Free Fire ? 😨 Funny Gloo Wall Challenge In Free Fire",
    description:
      "I Am Using Hack In Free Fire ? Funny Gloo Wall Challenge In Free Fire FOLLOW ME ON INSTAGRAM ...",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/AEePOONyZPs/default.jpg",
        width: 120,
        height: 90,
      },
      medium: {
        url: "https://i.ytimg.com/vi/AEePOONyZPs/mqdefault.jpg",
        width: 320,
        height: 180,
      },
      high: {
        url: "https://i.ytimg.com/vi/AEePOONyZPs/hqdefault.jpg",
        width: 480,
        height: 360,
      },
    },
    channelTitle: "AS Gaming",
    liveBroadcastContent: "none",
    publishTime: "2024-02-09T06:20:56Z",
  },
  videoDetails: {
    viewCount: "268179",
    likeCount: "13701",
    favoriteCount: "0",
    commentCount: "546",
  },
  channelDetails: {
    kind: "youtube#channel",
    etag: "kwZuL1HCiT-tsntcBXubMHBMQeA",
    id: "UCMrvxKTx9hLhZcOvJkYOnAw",
    snippet: {
      title: "AS Gaming",
      description:
        "Welcome to AS Gaming with Sahil Rana! Dive into the thrilling world of gaming with a mix of top titles like GTA V, Free Fire, Minecraft, and more. With a community of over 20 million subscribers, we not only explore the best in mobile and PC gaming but also venture into unique product unboxings from Amazon. Proudly representing the Indian gaming community with Hindi commentary. Join the AS Gaming family for diverse gaming content and stay ahead in the gaming world! \nFor collaborations and business inquiries:asgamingsahilbusiness@gmail.com.\n",
      customUrl: "@asgamingsahil",
      publishedAt: "2016-10-26T10:35:04Z",
      thumbnails: {
        default: {
          url: "https://yt3.ggpht.com/oXowbH1wDySOINdxwTMaoaJIJiAeL3gNPRLsE8XPaOmJ1F1NfuPfBXn8krfcDj0LPrRv-5Zo2A=s88-c-k-c0x00ffffff-no-rj",
          width: 88,
          height: 88,
        },
        medium: {
          url: "https://yt3.ggpht.com/oXowbH1wDySOINdxwTMaoaJIJiAeL3gNPRLsE8XPaOmJ1F1NfuPfBXn8krfcDj0LPrRv-5Zo2A=s240-c-k-c0x00ffffff-no-rj",
          width: 240,
          height: 240,
        },
        high: {
          url: "https://yt3.ggpht.com/oXowbH1wDySOINdxwTMaoaJIJiAeL3gNPRLsE8XPaOmJ1F1NfuPfBXn8krfcDj0LPrRv-5Zo2A=s800-c-k-c0x00ffffff-no-rj",
          width: 800,
          height: 800,
        },
      },
      localized: {
        title: "AS Gaming",
        description:
          "Welcome to AS Gaming with Sahil Rana! Dive into the thrilling world of gaming with a mix of top titles like GTA V, Free Fire, Minecraft, and more. With a community of over 20 million subscribers, we not only explore the best in mobile and PC gaming but also venture into unique product unboxings from Amazon. Proudly representing the Indian gaming community with Hindi commentary. Join the AS Gaming family for diverse gaming content and stay ahead in the gaming world! \nFor collaborations and business inquiries:asgamingsahilbusiness@gmail.com.\n",
      },
      country: "IN",
    },
    statistics: {
      viewCount: "2959246831",
      subscriberCount: "20100000",
      hiddenSubscriberCount: false,
      videoCount: "1412",
    },
  },
};
console.log(mainData1);




// ONLOAD FUNCTION ,FETCHING DATA FROM LOCAL STORAGE AND RENDERING IT

function storeddata() {
  let stringVideo = localStorage.getItem("video");
  selectedVideo = JSON.parse(stringVideo);
  console.log(selectedVideo);
  videoIdStore = selectedVideo.id.videoId;
  localStorage.clear();

  if (typeof YT === "undefined" || typeof YT.Player !== "function") {
    console.error("YouTube API is not yet loaded.");
  } else {
    // If the API is already loaded, call the function directly

    playerInstance = new YT.Player("playerdiv", {
      height: "390",
      width: "740",
      videoId: videoIdStore,
      events: {
        onReady: onPlayerReady,
      },
    });
  }
  fetchstoreVid();
}

// Automatically start playing the video when the player is ready
function onPlayerReady(event) {
  event.target.playVideo();
}

// rendering video player part
function fetchstoreVid() {
  let targetele = document.getElementsByClassName("feedVideoData")[0];
  targetele.innerHTML = "";

  let countViews;
  if (selectedVideo.videoDetails === undefined) {
    let randomNumber = Math.floor(
      Math.random() * (30000000 - 2000000) + 2000000
    );
    return (countViews = randomNumber);
  } else {
    countViews = selectedVideo.videoDetails.viewCount;
  }

  targetele.innerHTML = `
             <p>${selectedVideo.snippet.title}</p>
         <div class="playback-body">

          <div class="playbackB1">
             <img src=${
               selectedVideo.channelDetails.snippet.thumbnails.high.url
             } alt="channel loading">
             
             <div class="channelname">
                 <h4>${selectedVideo.snippet.channelTitle}</h4>
                 <p>${getsubscriber(
                   selectedVideo.channelDetails.statistics.subscriberCount
                 )}</p>
             </div> 

             <button onclick="togglesubscribe()" class="subscribe">Subscribe</button>
             
             <div onclick="togglesubscribe()" class="unsubscribe">
               <button><img src="./Video page/icons8-doorbell-24.png"> &nbsp; Subscribed &nbsp;<img  src="./Video page/icons8-down-arrow-14.png"></button> 
             </div>
         </div>

         <div class="playbackB2">
             <div class="like-dislike">
                 <img onclick="togglelike()" class="likeicon" src="./Video page/Liked.svg">
                 <img onclick="togglelike()" class="likefilled" src="./Video page/likefillled.svg">
                 <p class="likecount">${getlikecount(
                   selectedVideo.videoDetails.likeCount
                 )}</p>
                 <img onclick="toggledislike()" class="dislikeicon" src="./Video page/DisLiked.svg">
                 <img onclick="toggledislike()" class="dislikefilled" src="./Video page/likefillled.svg">
             </div>

             <button><img src="./Video page/icons8-share-24.png">Share</button>
             
             <div class="options">
                <img src="./Video page/icons8-options-24.png">
             </div>
         </div>

     </div>
     <div>
        <div class="video-description">
          <p> ${getViewnos(countViews)} , ${getTimeDifference(
    selectedVideo.snippet.publishTime
  )}</p>
          <p> ${selectedVideo.snippet.description}</p>
        </div>
     </div>
     `;

  console.log("working");
  fetchComment();
  fetchRelVideo(randomRelTopics(),30);
}

// fetching nos of subscribers
function getsubscriber(data) {
  const count = parseInt(data);

  if (count >= 1000000000) {
    const viewCount = (count / 1000000000).toFixed(1);
    return `${viewCount}  B subscribers`;
  } else if (count >= 1000000) {
    const viewCount = (count / 1000000).toFixed(1);
    return `${viewCount}  M subscribers`;
  } else if (count >= 1000) {
    const viewCount = (count / 1000).toFixed(1);
    return `${viewCount}  K subscribers`;
  } else {
    return `${count}  views`;
  }
}
// fetching likes of stored video
function getlikecount(data) {
  const count = parseInt(data);

  if (count >= 1000000000) {
    const viewCount = (count / 1000000000).toFixed();
    return `${viewCount}  B `;
  } else if (count >= 1000000) {
    const viewCount = (count / 1000000).toFixed();
    return `${viewCount}  M `;
  } else if (count >= 1000) {
    const viewCount = (count / 1000).toFixed();
    return `${viewCount}  K `;
  } else {
    return `${count} `;
  }
}

// ASIDE SECTION FUNCTION
function videoAsidetoggle() {
  let close = document.getElementById("videoasideclose");
  let open = document.getElementById("videoasideopen");
  let videosec = document.getElementsByClassName("videoPlayer")[0];
  open.classList.toggle("videoasidec");
  close.classList.toggle("videoasideo");
  videosec.classList.toggle("videopageopen");
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

// FUNCIONS TO TOGGLE SUBSCRIBE,LIKE AND DISLIKE BUTTON
function togglesubscribe() {
  let subscibe = document.getElementsByClassName("subscribe")[0];
  let unsubscribe = document.getElementsByClassName("unsubscribe")[0];
  subscibe.classList.toggle("displaynone");
  unsubscribe.classList.toggle("displayblock");
}

function togglelike() {
  let likecount = document.getElementsByClassName("likecount")[0];
  let like = document.getElementsByClassName("likeicon")[0];
  let likefilled = document.getElementsByClassName("likefilled")[0];

  if (clickobj.dislikeState === true) {
    let dislike = document.getElementsByClassName("dislikeicon")[0];
    let dislikefilled = document.getElementsByClassName("dislikefilled")[0];
    dislike.classList.remove("displaynone");
    dislikefilled.classList.remove("displaylb");
    selectedVideo.videoDetails.likeCount++;
    likecount.innerHTML = `
        ${getlikecount(selectedVideo.videoDetails.likeCount)}
        `;
  }

  if (clickobj.likeState === false) {
    like.classList.toggle("displaynone");
    likefilled.classList.toggle("displaylb");
    selectedVideo.videoDetails.likeCount++;
    likecount.innerHTML = `
        ${getlikecount(selectedVideo.videoDetails.likeCount)}
        `;
  } else {
    like.classList.remove("displaynone");
    likefilled.classList.remove("displaylb");
    selectedVideo.videoDetails.likeCount--;
    likecount.innerHTML = `
        ${getlikecount(selectedVideo.videoDetails.likeCount)}
        `;
  }
  clickobj.likeState = !clickobj.likeState;
}

function toggledislike() {
  let likecount = document.getElementsByClassName("likecount")[0];
  let dislike = document.getElementsByClassName("dislikeicon")[0];
  let dislikefilled = document.getElementsByClassName("dislikefilled")[0];

  if (clickobj.likeState === true) {
    let like = document.getElementsByClassName("likeicon")[0];
    let likefilled = document.getElementsByClassName("likefilled")[0];
    like.classList.remove("displaynone");
    likefilled.classList.remove("displaylb");
    selectedVideo.videoDetails.likeCount--;
    likecount.innerHTML = `
        ${getlikecount(selectedVideo.videoDetails.likeCount)}
        `;
  }
  if (clickobj.dislikeState === false) {
    dislike.classList.toggle("displaynone");
    dislikefilled.classList.toggle("displaylb");
    selectedVideo.videoDetails.likeCount--;
    likecount.innerHTML = `
        ${getlikecount(selectedVideo.videoDetails.likeCount)}
        `;
  } else {
    dislike.classList.remove("displaynone");
    dislikefilled.classList.remove("displaylb");
    selectedVideo.videoDetails.likeCount++;
    likecount.innerHTML = `
        ${getlikecount(selectedVideo.videoDetails.likeCount)}
        `;
  }

  clickobj.dislikeState = !clickobj.dislikeState;
}


// FUNCTION TO LOAD RANDOM VIDEOS WHENEVER PAGE IS REFRESHED
function randomRelTopics(){
  const randomnos = 3;
  let randomNames = [];
  let duplicYTArray = youtubeRelatedTopics;
  console.log(duplicYTArray);

 // Randomly select three topics
  for(let i=0; i<randomnos; i++){
    const randomIndex = Math.floor(Math.random()*duplicYTArray.length);
    randomNames.push(youtubeRelatedTopics[randomIndex]);
    // Remove the selected topic to avoid duplicates
    duplicYTArray.splice(randomIndex,1);
  }

  let stringTopics = randomNames.join(",");
  console.log(stringTopics);
  return stringTopics;
}

//FUNCTION TO SHOW RELATED VIDEOS ON RIGHT SIDE

// fetching data from api
async function fetchRelVideo(key, vos) {
  try {
    const response = await fetch(
      `${BASE_URL}/search?key=${API_KEY}&q=${key}&maxResults=${vos}&part=snippet`
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

    relatedobj = await Promise.all(channelLogo);
    relatablevideos(relatedobj);
  } catch (err) {
    console.err;
  }
}

// Rendering data of related videos on right side of page
function relatablevideos(data) {
  let relatedtarget = document.getElementsByClassName("relatedvideo")[0];
  relatedtarget.innerHTML = "";

  data.forEach((videosRl) => {
    let countCheck;
    if (videosRl.videoDetails === undefined) {
      let randomNumber = Math.floor(
        Math.random() * (30000000 - 2000000) + 2000000
      );
      return (countCheck = randomNumber);
    } else {
      countCheck = videosRl.videoDetails.viewCount;
    }

    let divt = document.createElement("div");
    divt.classList.add("rvideo");
    divt.addEventListener("click", () => {
      playRelatedVideo(videosRl);
    });

    divt.innerHTML = `
           <div class="rvideo-1">
                <img src= ${
                  videosRl.snippet.thumbnails.high.url
                } alt="please wait">
            </div>

           <div class="rvideo-2">
              <h4>${videosRl.snippet.title}</h4>
              <p> ${videosRl.snippet.channelTitle}</p>
              <p>${getViewnos(countCheck)} &bull;  ${getTimeDifference(
      videosRl.snippet.publishTime
    )}  </p>
            </div>
        `;
    relatedtarget.appendChild(divt);
  });
}
