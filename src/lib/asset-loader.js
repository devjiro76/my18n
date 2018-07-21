function load(url, option) {
  return new Promise(function(resolve) {
    var ext = url.split(".").pop();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status == 200) {

        if (ext === 'html') {
          render(xhr.response, option)
            .then(function() {
              resolve();
            });
        }
        else if(ext === 'js') {
          inject(xhr.response, ext, option)
            .then(function () {
              resolve();
            });
        }
        else if(ext === 'css') {
          inject(xhr.response, ext, option)
            .then(function () {
              resolve();
            });
        } 
        else {
          resolve(xhr.response);
        }
      }
    };
    xhr.send();
  });
}

function render(html, option) {
  return new Promise(function (resolve) {
    var tempDom = document.createElement("div");
    tempDom.innerHTML = translateInterpolation(html);

    var dom;
    if (!option || option.translate) {
      dom = translateDom(tempDom);
    } else {
      dom = tempdom;
    }

    setTimeout(function () {
      app.append(dom);
      resolve();
    }, 0);
  });
}

function inject(content, ext, option) {
  return new Promise(function (resolve) {
    var script;
    if (ext === 'js') {
      script = document.createElement("script");
      script.setAttribute('type', 'text/javascript');
    }
    
    else if (ext === 'css') {
      script = document.createElement("style");
    }
    
    var tranScript;
    if (!option || option.translate) {
      tranScript = translateInterpolation(content);
    } else {
      tranScript = content;
    }

    script.innerHTML = tranScript;
    setTimeout(function () {
      if (option && option.target) {
        option.target.append(script);
      } else {
        app.append(script);
      }
      resolve();
    }, 0);
  });
}