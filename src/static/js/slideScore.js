//封装滑动选分数的方法
window.slideScore = {
    init : function (config) {
        var self = this;
        //定义初始值
        self.fullScore = config.fullScore;
        self.step = config.step;
        self.disabled = (config.disabled !== undefined) ? config.disabled : false;

        var $oScore = $('.correct_score .score'),
            $oSpan = $oScore.find('span'),
            $oMyScore = $('.correct_score strong'),
            minScore = (self.step) ? self.step : 0.5,
            full = self.fullScore;
        
        //启用状态才绑定事件
        if(!this.disabled && full !== 0) { 
            $oSpan.mousedown(function(ev){
                //初始化
                var disX = ev.clientX - this.offsetLeft;
                var score = 0;

                $(document).mousemove(function(ev){
                    var x = ev.clientX - disX;
                    var count = full/minScore + 1;

                    var arrs = [];
                    for (var i=0;i<count;i++) {
                        arrs.push(minScore*i);
                    }

                    var sWidth = ($oScore[0].offsetWidth - $oSpan[0].offsetWidth)/ (arrs.length - 1)  ;
                    
                    for (var i=0; i<arrs.length; i++) {
                        
                        if (x >= i*sWidth && x<(i+1)*sWidth) {
                            x = i*sWidth;   //区段            
                            score = arrs[i];
                        }
                    }
                
                    if ( x <= 0 ) {x = 0; score = 0;}
                    if ( x >= $oScore[0].offsetWidth - $oSpan[0].offsetWidth ) { x = $oScore[0].offsetWidth - $oSpan[0].offsetWidth; score = full } 

                    $oSpan[0].style.left = x + 'px';
                    if(config.callback !== undefined && angular.isFunction(config.callback)) config.callback.apply(this,[score]);//调用回调函数
                });
                
                $(document).mouseup(function(){
                    $(document).unbind('mousemove');
                    $(document).unbind('mouseup');
                });
            })
        }
        return self;
    },
    disabled : function () {
        this.disabled = true;   
    },
    ensabled : function () {
        this.disabled = false;  
    },
    //设置分数
    setScore : function (score,callback) {
        var score = parseFloat(score);
        //分数
        if (score) {
            //通过分数来设置拉杆的left值
            var full = this.fullScore,
                minScore = this.step,
                count = full / minScore +   1,
                arrs = [],
                $oScore = $('.correct_score .score'),
                $oSpan = $oScore.find('span');
                
            for (var i = 0; i < count; i++) {
                arrs.push(minScore * i);
            }

            var sWidth = ($oScore.eq(0).innerWidth() - $oSpan.eq(0).innerWidth()) / (arrs.length - 1);
            var x = 0;
            for (var i = 0; i < arrs.length; i++) {
                if (arrs[i] == score) {
                    x = i * sWidth;
                    break;
                }
            }

            $oSpan[0].style.left = x + 'px';
            if(callback !== undefined && angular.isFunction(callback)) callback.apply(this,[score]);//调用回调函数
        }
        return this;
    }
};