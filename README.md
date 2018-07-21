# translate

HTML, JS, CSS 를 지원하는 다국어 번역 라이브러리

## 기본 아이디어

- asset-loader.js 는 html, js, css 가 최초 로드될 때, 사전을 이용해 번역을 거친 뒤 render/inject 한다.

- 화면에 이미 렌더된 뒤에는 interpolation 을 이용해 번역을 진행한다.

## HTML 모양

### 기본

```
<div class="wrap">
  <h4>css psuedo (CSS Interpolation)</h4>
  <ul>
    <li
      class="robot"
      data-trans="true"
      data-trans-id="ul01"
    >I'm a robot</li>

    <li>I don't like oil</li>
  </ul>
</div>
```

data-trans="true" 와 data-trans-id="u101"은
이 innerText 가 앞으로 번역될 것이라는 것을 암시한다.

### CSS Psudo 지원

```
<li class="apple"
  data-trans="true"
  data-trans-psudo-after="{{msg01}}"
>I like apple</li>
```

이 `li`는 css 를 위해 data-trans-psudo-after 라는 태그를 별도로 갖고 있다.
이는 css 에서

```
.apple[data-trans='true']::after {
  font-style: italic;
  color: #ccc;
  content: attr(data-trans-psudo-after);
}
```

에서 활용된다.

### API 를 호출하고 다이나믹하게 추가된 요소

```
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
```

api 는 transId 정보도 함께 반환해야한다.
그리고 이 정보를 엘리먼트에 dataset.transId 로 지정해주어
이후 번역의 영향권에 들어갈 수 있도록 한다.
