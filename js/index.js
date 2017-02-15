// ;
// (function(root, fn) {
//     if (typeof define === 'function' && define.amd) {
//         define(fn);
//     } else if (typeof exports === 'object') {
//         module.exports = fn();
//     } else {
//         root.Ent = fn();
//     }
// })(this, function() {
//     function Main() {
//         this.data = {};
//     }
//     Main.prototype.set = function(name, data) {
//         this.data[name] = data;
//     }
//     Main.prototype.get = function(name) {
//         return this.data[name];
//     }
//     Main.prototype.remove = function(name) {
//         delete this.data[name];
//     }
//     return Main;
// });
// var ENT = new Ent();

// ;
// (function() {
//     ENT.set('video', document.getElementById('vdo'));
//     ENT.set('canvas', document.getElementById('cvs'));
//     ENT.set('btn', document.getElementById('btn'));
//     ENT.set('canvas-height', ENT.get('canvas').height);
//     ENT.set('canvas-width', ENT.get('canvas').width);
//     ENT.set('font-size', '10')
// })();

// ;
// (function() {
//     var video = ENT.get('video');
//     var constraints = {
//         video: {
//             width: 1280,
//             height: 720
//         }
//     }
//     navigator.mediaDevices
//         .getUserMedia(constraints)
//         .then(function(mediaStream) {
//             video.srcObject = mediaStream;
//             video.onloadedmetadata = function(e) {
//                 video.play();
//             }
//         }).catch(function(err) {
//             alert('你的浏览器真需要去升级了，不然好多好玩的特性你根本玩不了。。。')
//         })
// })();

// ;
// (function() {
//     var cvs = ENT.get('canvas');
//     var vdo = ENT.get('video');
//     var btn = ENT.get('btn');
//     var ctx = cvs.getContext('2d');
//     var isPlay = false;
//     var raf = null;
//     var H = ENT.get('canvas-height');
//     var W = ENT.get('canvas-width');
//     var fontsize = ENT.get('font-size');
//     ctx.font = "0px Arial".replace('0', fontsize);
//     ctx.fillStyle = "#0f0";

//     try {
//         raf = requestAnimationFrame || webkitRequestAnimationFrame;

//     } catch (err) {
//         alert('你的浏览器真需要去升级了，不然好多好玩的特性你根本玩不了。。。')
//     }

//     vdo.addEventListener('play', function() {
//         isPlay = true
//     });
//     btn.addEventListener('click', function() {
//         isPlay = !isPlay;
//     })
//     loop();

//     function loop() {
//         if (isPlay) {
//             ctx.drawImage(vdo, 0, 0, 800, 600);
//             var fm = ctx.getImageData(0, 0, 800, 600);
//             var data = fm.data;
//             var str = '';
//             ctx.clearRect(0, 0, W, H);
//             for (var j = 0; j < 60; j++) {
//                 str = '';
//                 for (var i = 0; i < 80; i++) {
//                     var index = j * 10 * 800 + i * 10;
//                     index *= 4;
//                     var gray = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114
//                     str += addText(gray);
//                 }
//                 ctx.fillText(str, 0, j * 12, 800);
//             }
//         }
//         raf(loop);

//         function addText(gray) {
//             var text = '丨一二三十上土王田正回困国囸昌品晶畾';
//             var i = parseInt(gray / 16);
//             return text[i];
//         }
//     }
// })();

var StrAnmt = new StringAnmt({
    videoId: 'vdo',
    canvasId: 'cvs',
});
StrAnmt.openCamera(
    window.screen.width,
    window.screen.height,
    false
)