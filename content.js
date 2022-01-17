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
      const avatar = document
        .querySelector(".r-con .bili-avatar-face")
        .getAttribute("src");
      //发送回扩展程序
      sendResponse({
        title,
        uploader_name,
        view,
        sketch,
        avatar,
        href: location.href.split("?")[0],
      });
    }
    //番组
    else if (location.href.includes("/bangumi/")) {
      const title = document.querySelector('meta[property="og:title"]').content;
      const uploader_name = "bilibili番剧";
      const view = document
        .querySelector(".media-count")
        .innerText.split("·")[0];
      const sketch = document.querySelector(
        'meta[property="og:image"]'
      ).content;
      //发送回扩展程序
      sendResponse({
        title,
        uploader_name,
        view,
        sketch,
        href: location.href.split("?")[0],
      });
    }
    //直播
    else if (location.href.includes("live")) {
      const title = document.querySelector(
        '.live-title .title-length-limit'
      ).innerText;
      const uploader_name = document.querySelector(
        ".room-owner-username"
      ).innerText;
      const view = document.querySelectorAll('.action-text')[2].innerText;
      const sketch =
        "https://i0.hdslb.com/bfs/live/d63e78ade2319108390b1d6a59a81b2abe46925d.png";
      //发送回扩展程序
      sendResponse({
        title,
        uploader_name,
        view,
        sketch,
        href: location.href.split("?")[0],
      });
    }
    //非视频页
    else {
      sendResponse("");
    }
  }
});
