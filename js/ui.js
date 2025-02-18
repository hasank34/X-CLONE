export const authEle = {
  loginForm: document.querySelector("#login"),
  nameInp: document.querySelector("#name"),
  passwordInp: document.querySelector("#password"),
  nameArea: document.querySelector(".name-warning"),
  passArea: document.querySelector(".pass-warning"),
};
// moment.locale("tr"); // Türkçe dilini ayarla

export const mainEle = {
  logoutBtn: document.querySelector("#logout-btn"),
  tweetsarea: document.querySelector(".tweets-area"),
  main: document.querySelector("main"),
  searchForm: document.querySelector(".news form"),
  userName: document.querySelector("#user-name"),
  userTagName: document.querySelector("#user-tag"),
  userImage: document.querySelectorAll("#user-img"),
};

// kullanıcı detaylarını render eden fonksiyon
export const renderUserInfo = (user) => {
  mainEle.userName.innerHTML = user.name;
  mainEle.userTagName.innerHTML = user.profile;
  mainEle.userImage.forEach((img) => (img.src = user.avatar));
};

// Ekrana Loader render edecek fonksiyon

export const renderLoader = (outlet) => {
  outlet.innerHTML = `
   <div class='d-flex justify-content-center mt-5'>
     <div class="spinner-grow" role="status">
     <span class="visually-hidden">Loading...</span>
     </div>
    </div>
  `;
};

// tweet detay sayfasındaki loader
export const renderEmptyLoader = () => {
  mainEle.main.innerHTML = `
  <div class="top">
      <i class="bi bi-arrow-left"></i>
      <h3>Gönderi</h3>
  </div>
<div>
  <div class='d-flex justify-content-center mt-5'>
  <div class="spinner-grow" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>
 </div>


  `;
};
// media etiketini render eden fonksiyon
const getMedia = (media) => {
  if (media.photo) `<img src=${media.photo[0].media_url_https} />`;
  if (media.video) {
    //mp4leri al
    const filter = media.video[0].variants.filter(
      (item) => item.content_type === "video/mp4"
    );
    return `<video src=${filter[0].url} controls ></video>`;
  }
  return "";
};
// tweetleri render edecek fonksiyon
export const renderTimeLine = (user, tweets, outlet) => {
  let timeLineHTML = tweets.map(
    (tweet, i) => `
  <div class="tweet">
  <!-- User image -->
  <img src=${
    user ? user.avatar : `https://picsum.photos/seed/${i}/200/300`
  } class="tweet-img" />
  <!-- tweet body -->
    <div class="body">
        <a class="user" href="?user#${
          user ? user.profile : tweet.screen_name
        }" >
            <div class="info">
            <h6>${user ? tweet?.author?.name : tweet.screen_name}</h6>
              <p>@${user ? tweet?.author?.screen_name : tweet.screen_name}</p>
              <p>${moment(tweet.created_at).fromNow()}</p>
            </div>
            <i class="bi bi-three-dots"></i>
        </a>
        <a href="?status/${user ? user.profile : tweet.screen_name}#${
      tweet.tweet_id
    }" class="content" >
           <p>${tweet.text}</p>
          ${getMedia(tweet.media)} 
        </a>
        <div class="buttons">
            <button><i class="bi bi-chat"></i> <span>${
              tweet.replies
            }</span></button>
            <button><i class="bi bi-recycle"></i> <span>${
              tweet.retweets
            }</span></button>
            <button><i class="bi bi-suit-heart"></i> <span>${
              tweet.favorites
            }</span></button>
            <button><i class="bi bi-bookmark"></i> <span>${
              tweet.bookmarks
            }</span></button>
        </div>
    </div>
  </div>
`
  );
  outlet.innerHTML = timeLineHTML.join("");
};

// tweet detaylarını render edecek fonksiyon
export const renderInfo = (info, userName) => {
  console.log(info);
  const html = `
  <div class="info-area">
  
  <div class="top">
  
  <a href="/">
  <i class="bi bi-arrow-left"></i></a>
  
  <h3>Gönderi</h3>
  
  </div>
  
  <div class="tweet-info">
  <div class="user">
  <div class="info">

  <img src="../images/default.png"/>

  <h6>${info.author.name}</h6>
  <p>@${info.author.screen_name}</p>

  </div>
  
  <button>Abone Ol</button>
  </div>
  

  <div class="content" >
      <p class="content-text" >${info.text}</p>
  </div>

  <div class="data">
    
      <p>
          <span class="count">${info.retweets}</span>
          <span>Yeniden Gönderi </span>
      </p>
    
      <p>
      <span class="count">${info.quotes}</span>
      <span>Alıntılar</span>
      </p>
    
      <p>
      <span class="count">${info.likes}</span>
      <span>Beğeni </span>
      </p>
    
      <p>
      <span class="count">${info.bookmarks}</span>
      <span>Yer İşareti</span>
      </p>
    
      </div>
      
      <div class="buttons">
           <button><i class="bi bi-chat"></i> <span>${info.bookmarks}</span></button>
           <button><i class="bi bi-recycle"></i> <span>${info.bookmarks}</span></button>
           <button><i class="bi bi-suit-heart"></i> <span>${info.bookmarks}</span></button>
           <button><i class="bi bi-bookmark"></i> <span>${info.bookmarks}</span></button>
     </div>
 
   </div>
  </div>
  `;

  mainEle.main.innerHTML = html;
};

// kullanıcı detay sayfası render edecek fonksiyon
export const renderUserPage = (user) => {
  mainEle.main.innerHTML = `
  <div class="user-page">

    <div class="top"> 
       <a href="/">
       <i class="bi bi-arrow-left"></i></a>
       <h3>${user.name}</h3>
    </div>
  
    <div class="banner">
        <img src="${user.header_image}"/>
        <img src="${user.avatar}" class="user-pp"/>
    </div>

    <div class="buttons">

     <div class="icon">
       <i class="bi bi-three-dots"></i>
     </div>

     <div class="icon">
       <i class="bi bi-envelope"></i>
     </div>

     <button class="followBtn">Takip Et</button>
    </div>

    <div class="user-page-info">
  
      <h4>${user.name}</h4>

      <p>@${user.profile}</p>
    
  
    <p class="">${user.desc}</p>


    <div>
  
      <p>
        <span class="user-count">${user.friends}</span>
        <span>Takip Edilen</span>
      </p>
  
      <p>
        <span class="user-count">${formatNumber(user.sub_count)}</span>
        <span>Takipçi</span>
      </p>
      </div>
    </div>
  </div>

  <div class="user-tweets">
  
  
  </div>
  `;
};

const formatNumber = (number) => {
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(2) + "M";
  }
};
