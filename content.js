// //监听扩展程序或背景脚本发送的请求
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == "GetVideoInfo") {
    //视频页
    if (location.href.includes("/video/")) {
      //获取标题、up主名、播放量、视频封面
      const title = document.querySelector(".tit").innerText;
      const uploader_name = document.querySelector(
        ".up-info .up-info_right .name .username"
      ).innerText;
      const view = document
        .querySelector(".video-info .video-data span")
        .innerText.replace(" · ", "");
      const sketch = document
        .querySelector('meta[itemprop="image"]')
        .getAttribute("content");
      //发送回扩展程序
      sendResponse({
        title,
        uploader_name,
        view,
        sketch,
        href: location.href,
      });
    }
    //非视频页
    else {
      sendResponse("");
    }
  }
});
