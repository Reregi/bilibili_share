const title = document.querySelector(".title"); //标题
const uploader_name = document.querySelector(".uploader_name span"); //up主名
const view = document.querySelector(".view"); //播放数
const qrcode = document.querySelector(".qrCode_box img"); //二维码
const sketch = document.querySelector(".sketch_box img"); //缩略图

title.onclick = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { cmd: "GetVideoInfo" },
      function (response) {
        console.log("来自content的回复：" + response);
      }
    );
  });
};
