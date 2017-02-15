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
        this.fontStyle = conf.fontStyle || '#0f0';

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
            return this.text[i];
        },
        _begin: function() {
            var self = this;
            var isPlay = this.isPlay;
            var raf = this.raf;
            var ctx = this.ctx;
            var W = this.W;
            var H = this.H;
            var colLen = this.colLen;
            var rowLen = this.rowLen;
            var fontSize = parseInt(this.fontSize)

            ctx.font = '0px Arial'.replace('0', this.fontSize);
            ctx.fillStyle = this.fontStyle;
            loop();

            function loop() {
                if (self.isPlay) {
                    ctx.drawImage(self.vdo, 0, 0, W, H);
                    var fm = ctx.getImageData(0, 0, W, H);
                    var data = fm.data;
                    var str = '';
                    ctx.clearRect(0, 0, W, H);
                    for (var j = 0; j < colLen; j++) {
                        str = '';
                        for (var i = 0; i < rowLen; i++) {
                            var index = (j * W + i) * fontSize;
                            index *= 4;
                            var gray = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
                            str += self._AddText(gray);
                        }
                        ctx.fillText(str, 0, j * fontSize, W)
                    }
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
        parse: function() {
            this.isPlay = false;
        },
        playAndParse: function() {
            return this.isPlay = !this.isPlay;
        }


    }
    return Main
});