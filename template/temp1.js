var button1 = document.querySelector("#button1");
button1.addEventListener("click", function(e) {
  alert("{{msg01}}");
});

var langChange = document.querySelectorAll(".change-lang");
langChange.forEach(function(node) {
  node.addEventListener("click", function (e) {
    var lang = this.dataset.lang;
    setLang(lang);
    console.log("lang Change: ", lang);

    translatePage("temp1");
  });
});

var apiButton = document.querySelector("#button2");
apiButton.addEventListener("click", function(e) {
  api.call('/testapi.js')
    .then(function(_res) {
      var res = JSON.parse(_res);
      var transRes = translateInterpolation(res.result);
      
      alert(transRes);
    });
});

var addRowButton = document.querySelector("#addRow");
var addRowList = document.querySelector("#addRowList");
addRowButton.addEventListener("click", function(e) {
  api.call('/testapi2.js')
    .then(function(_res) {
      var res = JSON.parse(_res);
      var data = res.result;

      if (data.trans) {
        var li = document.createElement("li");
        li.dataset.trans = "true";
        li.dataset.transId = data.transId;
        li.innerText = translate(data.transId);
        addRowList.append(li);
      }
    });
});