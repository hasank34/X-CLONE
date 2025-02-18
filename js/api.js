// Base Url
const baseURL = "https://twitter-api45.p.rapidapi.com";

// options
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "eed126f9bcmshc5525da323f2af8p1ab61fjsn34753381407b",
    "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
  },
};
// Api istekleri için bir class
export class API {
  // kurucu metod
  constructor() {}
  // kullanıcı verilerini al
  async getUser(username) {
    try {
      const res = await fetch(
        `
        https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
        options
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  // diğer api istekleri
  async fetchData(endpoint, paramName, paramValue) {
    try {
      const res = await fetch(
        `${baseURL}${endpoint}?${paramName}=${paramValue}`,
        options
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
