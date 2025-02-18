// localstorage kayıt yapacak fonksiyon
export const setLocal = (key, data) => {
  // verileri stringe çevir
  const strData = JSON.stringify(data);
  // localstorage'a kayıt yapıyoruz
  localStorage.setItem(key, strData);
};

// localstorage verileri silen fonksiyon

export const removeLocal = (key) => {
  // localstorage'dan verileri siliyoruz
  localStorage.removeItem(key);
};

// localstorage'daki verileri alan fonksiyon

export const getLocal = (key) => {
  // localstorage'daki verileri alıyoruz
  let strData = localStorage.getItem(key);
  // string ifadesi objeye dönüştürüyoruz
  const data = JSON.parse(strData);

  return data;
};
