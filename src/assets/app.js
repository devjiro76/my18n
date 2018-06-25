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
