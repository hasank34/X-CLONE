import { API } from "./api.js";
import { getLocal, removeLocal } from "./helper.js";
import {
  mainEle,
  renderEmptyLoader,
  renderInfo,
  renderLoader,
  renderTimeLine,
  renderUserInfo,
  renderUserPage,
} from "./ui.js";
// sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener("DOMContentLoaded", () => {
  renderUserInfo(user);
});
// kullanıcı verilerini al
const user = getLocal("user");
//
const api = new API();

// kullanıınınkonumuna erişme
const controlURL = async () => {
  // kullanıcı konumuna erişme
  const path = location.search.split("/")[0];
  const userName = location.search.split("/")[1];
  const id = location.hash.replace("#", "");

  // kullanıcı yoksa giriş sayfaya yönlendir
  if (!user) location = "/auth.html";

  // url anasayfada ise tweetleri ekrana bas
  if (!path) {
    // loader
    renderLoader(mainEle.tweetsarea);
    // Tweetleri al ve ekrana bas
    const data = await api.fetchData(
      "/timeline.php",
      "screenname",
      user.profile
    );
    renderTimeLine(user, data.timeline, mainEle.tweetsarea);
  }

  // tweet detay sayfasındaysa ve id varsa tweet detayını ekrana bas

  if (path == "?status" && id) {
    // loader ekrana bas
    renderEmptyLoader();

    // api'ye istek at
    const info = await api.fetchData("/tweet.php", "id", id);
    renderInfo(info, userName);
  }

  // kullanıcı detay sayfasındaysa ve id varsa
  if (path == "?user" && id) {
    // loader ekrana bas

    // apiden verileri al
    const userInfo = await api.getUser(id);

    // kullanıcı detaylarını render et
    renderUserPage(userInfo);

    //kullanıcının tweetlerini render edeceği kısıma eriş
    const outlet = document.querySelector(".user-tweets");
    // loader bas
    renderLoader(outlet);
    //
    const userTweets = await api.fetchData("/timeline.php", "screenname", id);
    renderTimeLine(userInfo, userTweets.timeline, outlet);
  }
  // başka bir path'e girildiğinde anasayfaya yönlendir
  if (path == "?search" && id) {
    // aratılan değeri apiden al
    const data = await api.fetchData("/search.php", "query", id);
    renderLoader(mainEle.main);
    // apiden alınan değere göre tweet rendrelr
    renderTimeLine(null, data.timeline, mainEle.main);
  }
};
// hem sayfa yüklendiğinde hem de hastag kısmı değiştiğinde çalışır
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlURL);
});
// hashchange url kısmında # ile bir parametre geçişini kontrol ediyor. Bizim burada birde load
// olay izleyicisini izlememiz gerekir.Bu iki olayı bir dizi içerisinde tutarak bunları forEach ile döndük.

// çıkış yap fonksiyonu
mainEle.logoutBtn.addEventListener("click", () => {
  removeLocal("user");
  // giriş sayfasına yönlendirme
  window.location = "/auth.html";
});
// formun göndderilmesini izleyen fonksiyon
mainEle.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //
  const query = e.target[0].value;
  // inputun değerini url parametre olarak ekle
  location = `/?search#${query}`;
});
