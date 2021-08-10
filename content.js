// //监听扩展程序或背景脚本发送的请求
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == "GetVideoInfo") {
    //视频页
    if (location.href.includes("/video/")) {
      sendResponse(document.querySelector(".tit").innerText);
    }
    //非视频页
    else {
      sendResponse("");
    }
  }
});
