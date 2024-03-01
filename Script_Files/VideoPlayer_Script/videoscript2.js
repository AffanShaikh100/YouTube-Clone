// GLOBAL VARIABLES
let comments = [];
let commentcount;
const API_KEY2 = "AIzaSyCTBT8Lv-Z2FDQ-cZWisuQ1GJI1v3EmKMo";
let clickCommentobj = {
  likeState: false,
  dislikeState: false,
};


// Cheack API Fetch Data
let samplecomment = {
  kind: "youtube#commentThread",
  etag: "6Ko1HNEvDX1bIXYXo5s0SqhVzlI",
  id: "Ugw3tTnhKhvjEdEYidZ4AaABAg",
  snippet: {
    channelId: "UCffh6IaDaZDMwSycr3pXaaQ",
    videoId: "xWH3AcSerm0",
    topLevelComment: {
      kind: "youtube#comment",
      etag: "ZrAlvqqK-ZtRYZALOZs48elJnGI",
      id: "Ugw3tTnhKhvjEdEYidZ4AaABAg",
      snippet: {
        channelId: "UCffh6IaDaZDMwSycr3pXaaQ",
        videoId: "xWH3AcSerm0",
        textDisplay: "Sab fake he ye real nhi khel raha i don&#39;t believe",
        textOriginal: "Sab fake he ye real nhi khel raha i don't believe",
        authorDisplayName: "@Ramprakashpanwar1111",
        authorProfileImageUrl:
          "https://yt3.ggpht.com/ytc/AIf8zZRXdkZkSRkfcFYWp9JFVVUtCaoI6r93Hl1X1Ny-117mn9UTIoYrS-IUCmY4Ho0Q=s48-c-k-c0x00ffffff-no-rj",
        authorChannelUrl: "http://www.youtube.com/@Ramprakashpanwar1111",
        authorChannelId: {
          value: "UCxiqgUzgpx2P7uEyTJP-8jA",
        },
        canRate: true,
        viewerRating: "none",
        likeCount: 0,
        publishedAt: "2024-02-13T23:41:16Z",
        updatedAt: "2024-02-13T23:41:16Z",
      },
    },
    canReply: true,
    totalReplyCount: 0,
    isPublic: true,
  },
};
console.log(samplecomment);




// GETTING COMMENT FROM API AND RENDER IT ON DOM
async function fetchComment() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoIdStore}&part=snippet&key=${API_KEY2}&maxResults=50`
    );
    const res = await response.json();
    comments = res.items;
    console.log(comments);
    commentcount = res.pageInfo.totalResults;
  } catch (err) {
    console.log(err);
  }

  let targetdiv = document.getElementsByClassName("commentsection")[0];
  let ptag = document.createElement("p");
  ptag.classList.add("commentnos");
  targetdiv.innerHTML = "";
  ptag.innerHTML = `${commentcount} comments`;
  targetdiv.appendChild(ptag);

  let divu = document.createElement("div");
  divu.classList.add("usercomment");
  divu.innerHTML = `
        <img src="./Home page/User-r-4.png">
        <input type="text" placeholder="Add a comment..." > 
    `;
  targetdiv.appendChild(divu);

  comments.forEach((comment, i) => {
    let divt = document.createElement("div");
    divt.classList.add("ytcomment");
    divt.innerHTML = `

            <div class="ytcommentpic">
               <img src=${
                 comment.snippet.topLevelComment.snippet.authorProfileImageUrl
               }>
            </div>
    
            <div class="ytcommentbody">
    
              <p>${
                comment.snippet.topLevelComment.snippet.authorDisplayName
              } <span>${getTimeDifference(
      comment.snippet.topLevelComment.snippet.publishedAt
    )}</span></p>
              <p class="actualcomment">
                 ${comment.snippet.topLevelComment.snippet.textOriginal}
              </p>
              <div class="commentclick">
                  <img  class="likecicon" src="./Video page/Liked.svg">
                  <img class="likecfilled" src="./Video page/likefillled.svg">
                  <p class="comment">${
                    comment.snippet.topLevelComment.snippet.likeCount
                  }</p>
                  <img class="dislikecicon" src="./Video page/DisLiked.svg">
                  <img class="dislikecfilled" src="./Video page/likefillled.svg">
                  <button>Reply</button>
              </div>
    
            </div>

        `;
    targetdiv.appendChild(divt);
  });
}

// FUNCTION TO BE CALLED WHEN WE SEARCH ON VIDEO HTML PAGE
function videohtmlSearch() {
  let videohome = document.getElementById("videoplayerhome").value;
  if (videohome !== "") {
  localStorage.clear();
  let stringData = JSON.stringify(videohome);
  localStorage.setItem("search", stringData);
    window.location.href = "./index.html";
  }
}

// FUNCTION TO RENDER WHEN WE CLICK RELATED VIDEO
function playRelatedVideo(vid) {
  selectedVideo = vid;
  videoIdStore = vid.id.videoId;

  if (typeof YT === "undefined" || typeof YT.Player !== "function") {
    console.error("YouTube API is not yet loaded.");
  } else {
    playerInstance.loadVideoById(videoIdStore);
  }
  fetchstoreVid();
}
