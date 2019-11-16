;(function($){
    'use strict';
    $.fn.extend({
        Banner:function(options){
            new Banner(options)
        }
    })
    function Banner(options){
        var {target,imgs,left,right,list,autoplay,index,delay,duration} = options;
        this.target = target;
        this.imgs = imgs;
        this.left = left;
        this.right = right;
        this.list = list;
        this.autoplay = autoplay ? autoplay : true;
        this.index = index;
        this.delay = delay || 3000;
        this.duration = duration || 300;
        this.len = this.imgs.length;
        this.type = 1;
        console.log(this.len)
        this.display();
        this.creatElement();
        this.autoPlay();
        this.suspend();
    }
    Banner.prototype.suspend = function(){
        var that = this;
        this.target.hover(function(){
            clearInterval(that.t);
        },function(){
            that.autoPlay();
        })
    }
    Banner.prototype.autoPlay = function(){
        
        this.t = null;
        this.t = setInterval( () => {
            if(this.type == 0){
                if(this.index == 0){
                    this.index = this.len - 1;
                }else {
                    this.index--;
                }
            }
            if(this.type == 1){
                if(this.index == this.len - 1){
                    this.index = 0;
                }else{
                    this.index++;
                }
            }
            this.init();
        },this.delay)
    }
    Banner.prototype.creatElement = function(){
        var str = '';
        for(var i=0;i<this.len;i++){
            str += `<li>${i+1}</li>`
        }
        this.list.html(str);
        //默认小圆点的颜色
        this.list.find('li').eq(this.index).addClass('active');
        this.slid();
    }
    Banner.prototype.slid = function () {
        var that = this;
        that.list.find('li').on('mouseenter',function () {
            // this.addClass('active')
            that.index = $(this).index();
            that.init();
        })
    }
    Banner.prototype.display = function(){
        var that = this;
        // 设置默认的显示
        this.init();
        
        this.left.on('click',function(){
            if(that.index == 0){
                that.index = that.len-1;
            }else{
                that.index--;
            }
            that.type = 0;
            that.init();
        })
        this.right.on('click',function(){
            if(that.index == that.len - 1){
                that.index = 0;
            }else{
                that.index++;
            }
            that.type = 1;
            that.init();
        })
    }
    Banner.prototype.init = function(){
        this.imgs.eq(this.index).stop().fadeIn(this.duration).siblings().stop().fadeOut(this.duration);
        this.list.find('li').eq(this.index).addClass('active').siblings().removeClass('active');
    }
})(jQuery);