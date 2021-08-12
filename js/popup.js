const intro_box = document.querySelector(".intro_box"); //分享界面
const title = document.querySelector(".title"); //标题
const uploader_name = document.querySelector(".uploader_name span"); //up主名
const view = document.querySelector(".view"); //播放数
const qrcode = document.querySelector(".qrCode_box"); //二维码
const sketch = document.querySelector(".sketch_box img"); //视频封面
const get = document.querySelector(".get"); //获取按钮
const copy = document.querySelector(".copy"); //复制按钮

//点击获取按钮
get.onclick = function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id, {
        cmd: "GetVideoInfo"
      },
      async function (response) {
        if (response != "") {
          //生成页面
          title.innerText = response.title;
          uploader_name.innerText = response.uploader_name;
          view.innerText = response.view;
          sketch.src = await getBase64(response.sketch);
          //生成二维码
          new QRCode(qrcode, {
            text: response.href,
            correctLevel: QRCode.CorrectLevel.L,
          });
          //展示
          intro_box.classList.remove("hidden");
          copy.classList.remove("hidden");
          get.classList.add("hidden");
          //生成图片
          setTimeout(() => {
            html2canvas(intro_box).then((canvas) => {
              document.querySelector('.share_img img').src = (canvas.toDataURL());
              intro_box.classList.add("hidden");
            })
          }, 300)

        } else {
          alert("请确认打开的是哔哩哔哩视频页");
        }
      }
    );
  });
};

//点击复制按钮
copy.onclick = function () {
  writeDataToClipboard();
}

/**
 * 处理图片格式
 *
 * @param   {[string]}  url  [图片地址]
 *
 * @return  {[type]}       [base64格式图片]
 */
function getBase64(url) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement("CANVAS"),
      ctx = canvas.getContext("2d");
    img = new Image();
    img.src = url;
    img.crossOrigin = "Anonymous"; // 重点！设置image对象可跨域请求
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL("image/png");
      canvas = null;
      resolve(dataURL);
    };
  });
}


/**
 * [获取剪贴板权限]
 *
 * @return  {[string|boolean]}  [权限]
 */
async function askWritePermission() {
  try {
    const {
      state
    } = await navigator.permissions.query({
      name: "clipboard-write",
    });
    return state === "granted";
  } catch (error) {
    return false;
  }
}

/**
 * [图片写入剪贴板]
 *
 * @return  {[type]}  [return description]
 */
function writeDataToClipboard() {
  if (askWritePermission()) {
    if (navigator.clipboard && navigator.clipboard.write) {
      //图片转为-blob才能被复制-此处直接在转换blob的回调进行复制
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      const img = document.querySelector('.share_img img')
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      //转换成blob格式
      canvas.toBlob(async function (imageBlob) {
        //创建剪贴板对象写入图片blob数据
        try {
          const item = new ClipboardItem({
            [imageBlob.type]: imageBlob,
          });
          await navigator.clipboard.write([item]);
          alert("复制成功！");
        } catch (error) {
          alert("复制成功！"+error);

        }
      });

    }
  }
}