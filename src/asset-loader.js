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
        else if(ext === 'js' || ext === 'css') {
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
    tempDom.innerHTML = html;

    var dom;
    if (!option || option.translate) {
      dom = transDom(tempDom, lang);
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
      tranScript = transScript(content, lang);
    } else {
      tranScript = content;
    }

    script.innerHTML = tranScript;
    setTimeout(function () {
      app.append(script);
      resolve();
    }, 0);
  });
}