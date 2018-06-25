function trans(message, lang) {
  var dic = dictionary[lang];
  var transMessage = dic[message] || null;
  return transMessage;
}

function transDom(_dom, lang) {
  var cloneDom = _dom.cloneNode(true);

  cloneDom.querySelectorAll("[data-istrans='true']").forEach(function (node) {
    var transId = node.dataset.transId;
    node.innerText = trans(transId, lang) || node.innerText;
  });

  return cloneDom;
}

function transScript(script, lang) {
  var reg = /{{(.*?)}}/g;

  var cloneScript = script.replace(reg, function (p1, p2) {
    return trans(p2, lang) || p1;
  });

  return cloneScript;
}