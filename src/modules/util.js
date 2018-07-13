var api = {};

(function (){
  api.call = function(url) {
    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function () {
        if (xhr.status == 200) {
          var _res = xhr.response;
          resolve(_res);
        }
      };
      xhr.send();
    });
  };
})();
