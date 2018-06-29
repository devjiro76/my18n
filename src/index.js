var app = document.body.querySelector("#app");
var data = {
  dictionary: null,
  lang: localStorage.getItem('lang') || 'en-us'
};

function getLang() {
  return data.lang;
}

function setLang(lang) {
  if (lang) {
    localStorage.setItem('lang', lang);
    data.lang = localStorage.getItem('lang') || 'en-us';
  }
}

function loadPage(page) {
  app.innerHTML = "";

  load("./template/" +page+ ".css");
  load("./template/" +page+ ".html");
  load("./template/" +page+ ".js");
}

loadPage("temp1");