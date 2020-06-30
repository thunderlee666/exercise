window.agreeComponent = {};
// http://10.20.38.55:6060/fund/025010/关于不建议投资购买较高风险等级产品_025010_CONFIRM_20191116_02.pdf
var option = {
  color: '#49A0E2',
  title: '产品资料概要',
  readTimeout: 10,
  scrollEndCheck: true,
  type: '',
  url: '',
  alreadyTimeOut: true,
  alreadyScrollEnd: true,
  btnCanClick: false,
  agreeCallback: () => {}
}

var hasStyle = document.getElementsByTagName("style").length > 0;
var style = null;
if (hasStyle) {
  style = document.getElementsByTagName("style")[0];
} else {
  style = document.createElement("style");
  document.getElementsByTagName("head")[0].appendChild(style);
}
style.appendChild(document.createTextNode(`.agreeIframe {
  position: fixed;
  width: 100%;
  height: 90%;
  bottom: 0px;
  display: flex;
  z-index: 1000;
}`));
style.appendChild(document.createTextNode(`.agreeBoxMark {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color:rgba(0, 0, 0, 0.3);
}`));

window.agreeComponent.initComponent = function (param) {
  option = Object.assign(option, param);
  var newDiv = document.createElement("div");
  var url;
  newDiv.setAttribute('id', 'agreeParent');
  // newDiv.style.display = 'none';
  if (option.type === 'pdf') {
    url = `http://192.168.113.154:3000/static/pdf/web/viewer.html?color=${encodeURIComponent(option.color)}&file=${encodeURIComponent(option.url)}`
  } else {
    url = option.url;
  }
  newDiv.innerHTML = `
    <div class="agreeBoxMark" style="display: none"></div>
    <div class="agreeIframe" style="background-color:#FFF">
      <div style="flex-direction:row;align-items:center;justify-content:center;height: 40px;width: 100%;position: absolute;top: 0px;display:flex;">
        <p style="color: #000; font-size: 16px;">${option.title}</p>
      </div>
      <div style="flex: 1;margin-top: 40px;margin-bottom: 40px;">
        <iframe style="width: 100%;height: 100%;" src="${url}" frameborder="0"></iframe>
      </div>
      <div id='agreeBtn' style="flex-direction:row;align-items:center;justify-content:center;background-color:${option.color};height: 40px;width: 100%;position: absolute;bottom: 0px;display:flex;">
        <p id='agreeBtnText' style="color: rgb(255, 255, 255); font-size: 16px;">已阅读并确认</p>
      </div>
    </div>
  `;
  if ($('#agreeParent').length > 0) {
    $('body')[0].removeChild($('#agreeParent')[0]);
  }
  $('body')[0].appendChild(newDiv);
  var $el = $(".agreeIframe");
  var agreeBtn = $("#agreeBtn")[0];
  var agreeBtnText = $("#agreeBtnText")[0];
  var height = $el.innerHeight();
  var angle = 0;
  var step = height / 16;
  $el[0].style.transform = `translateY(${height}px)`;
  $('.agreeBoxMark').on('click', function () {
    $('.agreeBoxMark').hide();
    window.agreeComponent.hideAgree();
    return;
  })
  $("#agreeBtn").on('click', function () {
    if (option.btnCanClick) {
      typeof option.agreeCallback === 'function' && option.agreeCallback();
      $('.agreeBoxMark').hide();
      window.agreeComponent.hideAgree();
    }
    return;
  })

  var beginTimeout = function () {//倒计时处理
    var temp = option.readTimeout;
    option.alreadyTimeOut = false;
    agreeBtnText.innerText = `已阅读并确认${temp}秒`;
    var interval = setInterval(() => {
      if (--temp > 0) {
        agreeBtnText.innerText = `已阅读并确认${temp}秒`;
      } else {
        option.alreadyTimeOut = true;
        if (option.alreadyScrollEnd) {
          agreeBtnText.innerText = `已阅读并确认`;
          agreeBtn.style.backgroundColor = option.color;
          option.btnCanClick = true;
        } else {
          agreeBtnText.innerText = `请阅读至最后一页确认`;
        }
        clearInterval(interval);
      }
    }, 1000)
  }

  window.agreeComponent.hideAgree = function () {
    if (angle === 0) {
      $('#agreeParent').hide();
      return;
    }
    angle -= 1;
    var point = height - angle * step;
    $el[0].style.transform = `translateY(${point}px)`;
    window.requestAnimationFrame(window.agreeComponent.hideAgree);
  }

  var showAgree = function () {
    if (angle === 0) {
      $('.agreeBoxMark').show();
      if (option.readTimeout > 0 || option.scrollEndCheck) {
        agreeBtn.style.backgroundColor = '#cccccc';
        option.btnCanClick = false;
      } else {
        option.btnCanClick = true;
      }
      if (option.readTimeout > 0) {
        beginTimeout();
      }
      if (option.scrollEndCheck) {
        if (option.alreadyTimeOut) {
          agreeBtnText.innerText = `请阅读至最后一页确认`;
        }
        option.alreadyScrollEnd = false;
      }
    }
    angle += 1;
    if (angle > 16) {
      return;
    }
    var point = height - angle * step;
    $el[0].style.transform = `translateY(${point}px)`;
    window.requestAnimationFrame(showAgree);
  }

  window.agreeComponent.showAgree = function() {
    showAgree();
  }

  window.addEventListener('message', (ev) => {
    if (ev.data.type === 'documentloaded') {
    }
    if (ev.data.type === 'pageChange' && ev.data.currentPage == ev.data.totalPage) {
      option.alreadyScrollEnd = true;
      if (option.alreadyTimeOut) {
        agreeBtnText.innerText = `已阅读并确认`;
        agreeBtn.style.backgroundColor = option.color;
        option.btnCanClick = true;
      }
    }
  });
}