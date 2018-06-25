var app = document.body.querySelector("#app");

var lang = localStorage.getItem('lang') || 'en-us';
var dictionary = {};

init(lang);

function init(_lang) {
  if (_lang) {
    localStorage.setItem('lang', _lang);
    lang = localStorage.getItem('lang') || 'en-us';
  }

  app.innerHTML = "";

  Promise.resolve()
    .then(function() {
      console.log("dictionary loading...");
      return new Promise(function (resolve) {
        var q = [];

        q.push(load('./assets/lang/en-us.json'));
        q.push(load('./assets/lang/ko-kr.json'));

        Promise.all(q)
          .then(function (res) {
            res.forEach(function (_item) {
              var item = JSON.parse(_item);
              dictionary[item.lang] = item.contents;
            });
            setTimeout(function() {
              resolve();
            }, 0);
          });
      });
    })
    .then(function () {
      console.log("dictionary loaded.");
      console.log('translator is loading...');
      return load('./trans.js', {
        translate: false
      });
    })
    .then(function () {
      console.log('translator is loaded.');
      return load('./assets/app.html');
    })
    .then(function () {
      console.log('assets(css, js) are loading.');
      load('./assets/app.css');
      load('./assets/app.js');
    });
  
  
}