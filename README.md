## StringAnmt
一个在web开启你的摄像头，然后将视频处理成字符串的动画的简单封装库。  
这里是[demo](https://Char-Ten.github.io/StringAnmt)
---
* 快速使用：
```html
<canvas id="cvs"></canvas>
<video id="vdo" style="display:none"></video>
<script src="StringAnmt.js"></script>
<script>
var StrAnmt = new StringAnmt({
    videoId: 'vdo',
    canvasId: 'cvs',
    text: ['    ', '氵', '水', '淼'],
    fontSize: '18'
});
StrAnmt.openCamera(
    window.screen.width,
    window.screen.height,
    false
)
</script>
```

* `StringAnmt`参数说明
  * `videoId`：`video`标签的id;
  * `canvasId`：`canvas`标签的id;
  * `text`：想要渲染成动画的字符串或数组，从左到右是黑到白，不推荐字母、数字、汉字混编，尽量选用字符宽度差不多的字符，以免输出失真;
  * `fontSize`：字符大小，字符串类型;
  * `color`: 输出的字符颜色

* `StringAnmt`方法：
   * `openCamera(width,height,isAudio)`：开启摄像头
        * `width`: 摄像头宽度
        * `height`: 摄像头高度
        * `isAudio`: 是否开启麦克风
   * `play()`：播放
   * `pause()`：暂停
   * `playAndPause()`：若是播放状态则暂停，若是暂停状态则播放（可用于截图）

---
## 注意事项，
* 请放在本地或者https协议的服务器里，这样方能开启摄像头。
* 请在高版本浏览器下使用
* 不对ff做兼容
* 拒绝IE，从我做起
* 据了解，微信以及腾讯系的移动浏览器内核X5在读取视频流的时候有卡顿的bug
* webGL版本请访问:[StringAnmt2](https://github.com/Char-Ten/webglLearningDemoes/tree/master/learnningWebSite/StringAnmt2)，除X5内核外，其他兼容的移动端浏览器均可流畅跑webGL版本
