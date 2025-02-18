import { API } from "./api.js";
import { setLocal } from "./helper.js";
import { authEle } from "./ui.js";
// api örneğini aldık
const api = new API();
// Regex: Regex belirli şartları kontrol etmek için sorgu yapılarını içeren koddur.
// * Enaz 6 karakter,1 küçük harf,1 büyük harf,birde sayı
const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

// form kontrolü sırasında hataları render eden fonksiyon
const renderWarns = (nameWarning, passWarning) => {
  // İsim kısmı
  if (nameWarning) {
    authEle.nameArea.innerHTML = `
  <p class="warning">${nameWarning}</p>
  `;
  } else {
    authEle.nameArea.innerHTML = "";
  }
  // Şifre kısmı
  if (passWarning) {
    authEle.passArea.innerHTML = `
  <p class="warning">${passWarning}</p>
  `;
  } else {
    authEle.passArea.innerHTML = "";
  }
};

// Auth sayfasında yer alan form gönderildiğinde çalışacak fonksiyon
authEle.loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Giriş formunda verilerin alınması
  const name = authEle.nameInp.value;
  const pass = authEle.passwordInp.value;

  let nameWarning = null;
  let passWarning = null;
  // Formdaki isim kısmını kontrol et
  if (!name) {
    nameWarning = "İsim kısmı boş bırakılamaz.";
  } else if (name.length < 5) {
    nameWarning = "İsim 5 karakterden kısa olamaz.";
  } else {
    nameWarning = null;
  }
  // Formdaki şifre kısmını kontrol et
  if (!pass) {
    passWarning = "Şifre kısmı boş bırakılamaz.";
  } else if (pass.length < 6) {
    passWarning = "Şifre 6 karakterden kısa olamaz.";
  } else if (!regex.test(pass)) {
    passWarning = "Zayıf Şifre";
  } else {
    passWarning = null;
  }
  renderWarns(nameWarning, passWarning);

  if (!nameWarning && !passWarning) {
    // api'den kullanıcı bilgisini çekip local storage'a kaydet
    const userData = await api.getUser(name);
    setLocal("user", userData);
    // beni ana sayfaya yönlendir
    // ana sayfaya yönlendirme
    window.location = "/";
  }
});
