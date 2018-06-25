var button1 = document.querySelector("#button1");

button1.addEventListener("click", function(e) {
  alert("{{msg01}}");
});

var langChange = document.querySelectorAll(".change-lang");

langChange.forEach(function(node) {
  node.addEventListener("click", function (e) {
    var lang = this.dataset.lang;
    console.log("lang Change: ", lang);

    init(lang);
  });
});

var apiButton = document.querySelector("#button2");

apiButton.addEventListener("click", function(e) {
  api('./assets/api.js')
    .then(function(_res) {
      var res = JSON.parse(_res);
      var transRes = transScript(res.result, lang);

      alert("원본Result: " + res.result);
      alert("번역Result: " + transRes);
    });
});

function api(url) {
  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(xhr.response);
      }
    };
    xhr.send();
  });
}