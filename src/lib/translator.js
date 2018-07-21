(function getDicitoary(global) {
  var dictionary = {};

  var q = [];
  q.push(load('./assets/lang/en-us.json'));
  q.push(load('./assets/lang/ko-kr.json'));

  Promise.all(q)
    .then(function (res) {
      res.forEach(function (_item) {
        var item = JSON.parse(_item);
        dictionary[item.lang] = item.contents;
      });
      global.data.dictionary = dictionary;
    });
})(this);

function translate(message) {
  var dic = data.dictionary[getLang()];
  var transMessage = dic[message] || undefined;
  return transMessage;
}

function translateDom(dom) {
  var cloneDom = dom.cloneNode(true);

  cloneDom.querySelectorAll("[data-trans='true']")
    .forEach(function (node) {
      var transId = node.dataset.transId;
      node.dataset.currentLang = getLang();
      node.innerText = translate(transId) || node.innerText;
  });

  return cloneDom;
}

function translateInterpolation(script) {
  var reg = /{{(.*?)}}/g;

  var cloneScript = script.replace(reg, function (p1, p2) {
    return translate(p2) || p1;
  });

  return cloneScript;
}

function translatePage(page) {
  load("./template/" +page+ ".css");
  app.innerHTML = clearScriptCSS(translateDom(app)).innerHTML;
  load("./template/" +page+ ".js");
}

function clearScriptCSS(dom) {
  var cloneDom = dom.cloneNode(true);

  cloneDom.querySelectorAll("script")
    .forEach(function (node) {
      node.remove(node);
    });

  cloneDom.querySelectorAll("style")
    .forEach(function (node) {
      node.remove(node);
    });

  return cloneDom;
}