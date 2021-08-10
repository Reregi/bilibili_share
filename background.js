//当应用第一次安装、更新至新版本或浏览器更新至新版本时产生。
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // 注册规则，当且仅当列出的所有条件都满足时，PageStateMatcher 才会匹配网页,即当url为https://www.zybang.com ，即触发执行某个操作（目前只有 ShowPageAction）。
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "www.bilibili.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
