;
(function(root, fn) {
    if (typeof define === 'function' && define.amd) {
        define(fn);
    } else if (typeof exports === 'object') {
        module.exports = fn();
    } else {
        root.StringAnmt = fn();
    }
})(this, function() {

    function Main(conf) {
        this.vdo = document.getElementById(conf.videoId);
        this.cvs = document.getElementById(conf.canvasId);
        this.text = conf.text || '丨一二三十上土王田正回困国囸昌晶';
        this.fontSize = conf.fontSize || '10';
        this.color = conf.color || '#0f0';

        this.ctx = this.cvs.getContext('2d');
        this.W = this.cvs.width = this.cvs.offsetWidth;
        this.H = this.cvs.height = this.cvs.offsetHeight;
        this.rowLen = parseInt(this.W / this.fontSize);
        this.colLen = parseInt(this.H / this.fontSize);
        this.isPlay = false;
        this.raf = null;
        try {
            this.raf = requestAnimationFrame || webkitRequestAnimationFrame;
        } catch (err) {
            alert('你的浏览器真需要去升级了，不然好多好玩的特性你根本玩不了。。。')
        }

        var self = this;
        this.vdo.addEventListener('play', function() {
            self.isPlay = true
        });

        this._begin();
    }
    Main.prototype = {
        constructor: Main,

        _AddText: function(gray) {
            var d = parseInt(256 / this.text.length);
            var i = parseInt(gray / d);
            if (i > this.text.length - 1) {
                i = this.text.length - 1;
            }
            return this.text[i];
        },
        _begin: function() {
            var self = this;
            var isPlay = this.isPlay;
            var raf = this.raf;

            this.ctx.font = '0px Arial'.replace('0', this.fontSize);
            this.ctx.fillStyle = this.color;
            loop();

            function loop() {
                var isPlay=self.isPlay;
                if (isPlay) {
                    var ctx = self.ctx;
                    var W = self.W;
                    var H = self.H;
                    var colLen = self.colLen;
                    var rowLen = self.rowLen;
                    var fontSize = parseInt(self.fontSize);
                    var text = self.text;
                    var len = parseInt(256 / self.text.length);
                    var gray, k;

                    ctx.drawImage(self.vdo, 0, 0, W, H);
                    try {
                        var fm = ctx.getImageData(0, 0, W, H);
                    } catch (err) {
                        ctx.clearRect(0, 0, W, H);
                        return 
                    }
                    ctx.clearRect(0, 0, W, H);
                    var data = fm.data;
                    var str = '';
                    for (var j = 0; j < colLen; j++) {
                        str = '';
                        for (var i = 0; i < rowLen; i++) {
                            var index = (j * W + i) * fontSize;
                            index *= 4;
                            var gray = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
                            var k = parseInt(gray / len);
                            if (k > len - 1) {
                                k = len - 1;
                            }
                            str += text[k];
                        }
                        ctx.fillText(str, 0, j * fontSize, W)
                    }
                    isPlay = ctx = W = H = colLen = rowLen = fontSize = gray = k = data = str= i = j = fm = text =len = null;
                }
                raf(loop) 
            }
        },
        openCamera: function(cameraW, cameraH, audioBool) {
            var vdo = this.vdo;
            var constraints = {
                audio: audioBool,
                video: {
                    width: cameraW,
                    height: cameraH
                }
            }
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(function(mediaStream) {
                    vdo.srcObject = mediaStream;
                    vdo.onloadedmetadata = function(e) {
                        vdo.play();
                    }
                })
                .catch(function(err) {
                    alert('你的浏览器真需要去升级了，不然好多好玩的特性你根本玩不了。。。')
                });
            return this;
        },
        play: function() {
            this.isPlay = true;
        },
        pause: function() {
            this.isPlay = false;
        },
        playAndPause: function() {
            return this.isPlay = !this.isPlay;
        }
    }
    return Main
});
