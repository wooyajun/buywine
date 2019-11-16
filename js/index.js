
//shop
;(function ($) {
    'use strict';
    function Tshop () {
        this.url = "./data/shop.json";
        this.cont = $('.contShop').find('ul')
        // console.log(this.cont)
        this.load();
    };
    Tshop.prototype.load = function () {
        var that = this;
        ajax({
            url:this.url,
            success:function (res) {
                that.res = JSON.parse(res);
                // console.log(that.res);
                that.display();
            }
        })
    };
    Tshop.prototype.display = function () {
        var str = "";
        for(var i in this.res){
            str += `<li>
                        <a href="./xiangqing.html">
                            <img src="${this.res[i].url}" alt="">
                            <p>
                                <span>${this.res[i].msg}</span>
                                <em>${this.res[i].price}</em>
                            </p>
                        </a>
                    </li>`
        }
        // this.cont.innerHTML = str;
        $('.contShop').find('ul').html(str);
    };
    new Tshop();
})(jQuery)

;(function ($) {
    function Shop (options) {
        var {url,cont} = options;
        this.url = url;
        this.cont = cont;
        this.load();
    };
    Shop.prototype.load = function () {
        var that = this;
        ajax({
            url: this.url,
            success:(res) => {
                // console.log(res)
                this.res = JSON.parse(res)
                this.display();
            }
        })
    };
    Shop.prototype.display = function () {
        var str = "";
        for (var i in this.res) {
            str += `<li>
                        <a href="">
                            <em>${this.res[i].sym}</em>
                            <img src="${this.res[i].url}" alt="">
                            <p>${this.res[i].msg}</p>
                            <b>${this.res[i].price}</b>
                        </a>
                    </li>`
        }
        this.cont.html(str);
    };
    // new Zkshop(options);
    new Shop({
        url:"./data/maotai.json",
        cont:$('.Mright').find('ul')
    })
    
    new Shop({
        url:"./data/nflj.json",
        cont:$('.Ljright').find('ul')
    })
    
    new Shop({
        url:"./data/bjzk.json",
        cont:$('.Zkright').find('ul')
    });
    
    new Shop({
        url:"./data/ptj.json",
        cont:$('.Ptjright').find('ul')
    });
    
    new Shop({
        url:"./data/yjrm.json",
        cont:$('.Yjrmright').find('ul')
    });
    
})(jQuery);

//店长推荐商品轮播
;(function($){
    'use strict';
    var $left = $('.btn').find('.leftBtn');
    var $right = $('.btn').find('.rightBtn');
    $left.click(function(){
        // clearInterval(t);
        $right.css({
            opacity:'1'
        })
        $('.Dztjbox .ulL').stop().animate({left:-1200}).next().stop().animate({left:0})
        $left.css({
            opacity:'.6'
        })
    })
    $right.click(function(){
        // clearInterval(t);
        $left.css({
            opacity:'1'
        })
        $('.Dztjbox .ulR').stop().animate({left:1200}).prev().stop().animate({left:0})
        $right.css({
            opacity:'.6'
        })
    })
    
    var t = setInterval(() => {
        $left.click();
        setTimeout(()=>{
            $right.click();
        },1000)
    },2000)

    $('.Dztjbox').on('mouseenter',() => {
        clearInterval(t)
    })
})(jQuery);

//酒友热评数据加载
;(function($){
    "use strict";
    function Pl() {
        this.ul = $('.Plbox').find('ul');
        this.url = "./data/jyrp.json"
        this.init();
    }
    Pl.prototype.init = function () {
        var that = this;
        ajax({
            url:this.url,
            success:function (res) {
                that.res = JSON.parse(res);
                that.display();
            }
        })
    }
    Pl.prototype.display = function () {
        var str = "";
        for(var i=0;i<this.res.length;i++){
            str += `<li>
                        <a href="">
                            <img src="${this.res[i].url}" alt="">
                            <div>${this.res[i].text}</div>
                            <span>${this.res[i].yh}</span>
                            <p><em>${this.res[i].msg}</em>
                            <b>${this.res[i].price}</b></p>
                        </a>
                    </li>`
        }
        this.ul.html(str);
    }

    new Pl();
})(jQuery);

//链接轮播
;(function ($) {
    "use strict";
    function move() {
        this.ul = $('.moveUl');
        this.temp();
    }
    move.prototype.temp = function () {
        var that = this;
        
        this.t = setInterval(() => {
            this.ul.delay(1500).animate({top:-32},1000).delay(1500).animate({top:-64},1000,() => {
                $('.moveUl').css('top','0')
            })
            
        })
        
    }
    new move();
})(jQuery);

//搜索跳转
;(function ($) {
    'use strict';
    var text = $('#search_cont');
    var serBtn = $('#search');
    serBtn.on('click',() => {
        if(text[0].value == "茅台"){
            open("./shoplist.html");
        }
    })
})(jQuery);


//商品分类排序，加购物车
;(function ($) {
    'use strict';
    function Pro() {
        this.ul = $('#list-ul');
        this.url = "./data/product.json";
        this.btn = $('#sort');
        this.cont = $('.product-list')
        this.type = 1;
        this.init();
        // this.sort();
        this.add();
    }
    Pro.prototype.init = function () {
        var that = this;
        ajax({
            url:this.url,
            success:(res) => {
                this.res = JSON.parse(res);
                this.sort();
                this.display();
            }
        })
    }
    Pro.prototype.sort = function () {
        // console.log(this.type)
       
            this.btn.on('click',() => {
                if(this.type === 1) {
                    this.res.sort((a,b) => {
                        return a.price - b.price;
                    })
                    this.type = 0;
                    this.display();
                }else if (this.type === 0) {
                    this.res.sort((a,b) => {
                        return b.price - a.price;
                    })
                    this.type = 1;
                    this.display();
                }
            })

        
    }
    Pro.prototype.display = function () {
        var str = "";
        for(var i=0;i<this.res.length;i++){
            str += `<li index='${this.res[i].id}'>
                        <img src="${this.res[i].url}" alt="">
                        <p>${this.res[i].msg}</p>
                        <span>￥${this.res[i].price}</span>
                        <input type="button" value="加入购物车" class="add">
                    </li>`
        }
        this.ul.html(str);
    }
    Pro.prototype.add = function () {
        // 点击添加
        this.cont.on('click',(eve) => {
            // console.log(111)
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "add") {
                this.id = target.parentNode.getAttribute('index');
                // 准备加入购物车
                this.setCookie();
            }
        })
    }
    Pro.prototype.setCookie = function () {
        // 处理数据
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        // 查看有没有goods数据
        if(this.goods.length < 1) {
            this.goods.push({
                id:this.id,
                num:1
            })
        }else{
            var onoff = 1;
            // 判断是不是第一次存该数据
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].id === this.id){
                    this.goods[i].num++;
                    onoff = 0;
                }
            }
            if(onoff == 1) {
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }
        }
        setCookie("goods",JSON.stringify(this.goods))
        alert("加入购物车成功");
    }
    new Pro();
})(jQuery);

//购物车数据加载
;(function ($) {
    'use strict';
    function Car () {
        this.url = "./data/product.json";
        this.box = $('.proBox');
        this.shopNum = $('.shopNum');
        this.jinE = $('.jinE');
        this.checkAll = $('#checkAll');
        this.delAll = $('.delAll');
        this.buy = $('.buy');
        this.load();
        this.addEvent();
        this.pay();
    }
    Car.prototype.pay = function () {
        var that = this;
        this.buy.on('click',function () {
            var MY = getCookie('MY');
            // console.log(MY)
            if(MY == 1){
                if(!that.sum){
                    setCookie('price',0)
                    alert('您还没有选择商品。')
                    return
                }else{
                    setCookie('price',that.sum);
                }
                //获取到所有被选中的商品的id和数量，设置cookie
                // $('.check:checked')
                this.order = getCookie('order') ? JSON.parse(getCookie('order')) : [];
                // console.log(this.order)
                for(var i=0;i<$('.check:checked').length;i++){
                    this.orderId = $('.check:checked')[i].parentNode.parentNode.getAttribute('index');
                    if(this.order.length < 1) {
                        this.order.push({
                            id:this.orderId
                        })
                    }else{
                        var onoff = 0;
                        for(var j in this.order){
                            if(this.order[j].id == this.orderId){
                                onoff = 1;
                            }
                        }
                        if(onoff == 0){
                            this.order.push({
                                id:this.orderId
                            })
                        }
                    }
                    
                }
                setCookie("order",JSON.stringify(this.order))
                open("./pay.html");
            }else{
                alert('请先进行登录');
            }
            
        })
    }
    Car.prototype.checkedAll = function () {
        this.checkItem = $('.check');
        // console.log(this.checkItem);
        var that = this;
        // 子按钮全部选中时，全选按钮被选中
        $('.check').on('click',function () {
            // this.addClass('checked');
            var s = $('.check').length;
            // console.log(s);
            var a = $('.check:checked').length;
            // console.log(a);
            if(s == a) {
                that.checkAll.prop('checked',true);
            } else {
                that.checkAll.prop('checked',false);
            }
        })
        this.sumPrice($('.check'));
        //全选按钮被选中时，所有的子按钮被选中
        this.checkAll.on('click',function () {
            if(this.checked == true) {
                // console.log(1)
                // console.log(this.checked)
                $('.check').prop('checked',true);
            } else if(this.checked == false) {
                // console.log(2)
                $('.check').prop('checked',false);
            }
        })
        this.sumPrice(this.checkAll)
        //通过选择的按钮来计算应付的金额
        this.delPro();
    }
    Car.prototype.delPro = function () {
        var that = this;
        this.arr = [];
        this.delAll.on('click', () =>  {
            for(var i=0;i<$('.check').length;i++) {
                if($('.check')[i].checked == true) {
                    this.id = $('.check')[i].parentNode.parentNode.getAttribute('index');
                    this.arr.push(that.id)
                }
            }
            //根据保存出来的Id删除对应的cookie
            // that.delItem();
            for(var i=0;i<this.arr.length;i++) {
                for(var j in this.goods) {
                    if(this.arr[i] == this.goods[j].id) {
                        this.goods.splice(j,1);
                    }
                }
            }
            setCookie("goods",JSON.stringify(this.goods));
            this.display();
        })
        this.sumPrice(this.delAll);
    }
    Car.prototype.sumPrice = function (item) {
        // var sum = 0;
        item.on('click',() => {
            this.sum = 0;
            for(var i=0;i<$('.check').length;i++) {
                if($('.check')[i].checked == true) {
                   this.sum += parseInt($('.check')[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.replace("￥","")) * parseInt($('.check')[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.value);
                    // console.log(1)
                }
                // console.log($('.check')[i])
            }
            this.jinE.find('span').html("￥" + this.sum);
            // this.pay();
        })
    }
    Car.prototype.addEvent = function () {
        var that = this;
        this.box.on("click",function (eve) {
            // console.log(111)
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.id === "del") {
                //保存要删除的商品的id
                that.id = target.parentNode.getAttribute('index');
                console.log(that.id)
                target.parentNode.remove();
                that.removeCookie();
            }
        })
        //修改数量
        this.box.on("input",function (eve) {
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.type == "number") {
                that.id = target.parentNode.parentNode.getAttribute("index");
                console.log(that.id)
                that.val = target.value;
                that.updateCookie();
                that.sumPrice(that.box);
            }
        })
    }
    Car.prototype.updateCookie = function () {
        var i = 0;
        var onoff = this.goods.some((val,index) => {
            i = index;
            return val.id == this.id;
        })
        if(onoff) {
            this.goods[i].num = this.val;
        }
        setCookie("goods",JSON.stringify(this.goods));
        this.load();
    }
    Car.prototype.removeCookie = function () {
        var i = 0;
        var onoff = this.goods.some((val,index) => {
            i = index;
            return val.id == this.id;
        })
        if(onoff) {
            this.goods.splice(i,1)
        }
        setCookie("goods",JSON.stringify(this.goods));

        this.load()
    }
    Car.prototype.load = function () {
        ajax({
            url:this.url,
            success:(res) => {
                this.res = JSON.parse(res);
                // console.log(this.res);
                this.getCookie();
            }
        })
    }
    Car.prototype.getCookie = function () {
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        this.display();
    }
    Car.prototype.display = function () {
        // console.log(this.goods)
        var str = "";
        var shopNum = 0;
        var sum = 0;
        for(var i=0;i<this.res.length;i++) {
            for(var j=0;j<this.goods.length;j++) {
                if(this.res[i].id == this.goods[j].id){
                    str += `<div index="${this.goods[j].id}">
                                <span><input type="checkbox" class="check"></span>
                                <span>
                                    <img src="${this.res[i].url}" alt="">
                                </span>
                                <span>${this.res[i].msg}</span>
                                <span>￥${this.res[i].price}</span>
                                <span><input type="number" value="${this.goods[j].num}" min=1 /></span>
                                <span>￥${this.res[i].price * this.goods[j].num}</span>
                                <span id="del">删除</span>
                            </div>`
                    // console.log(this.goods[j].num*1)
                    shopNum += this.goods[j].num*1; 
                }
            }
        }
        setCookie('shopNum',JSON.stringify(shopNum));
        this.shopNum.html(shopNum);
        if(str == "") {
            this.box.html('您的购物车还没有商品哦，快去选购吧~ ~ ~')
        }else {
            this.box.html(str);
        }
        this.checkedAll();
    }
    new Car();
})(jQuery);


//付款页面
;(function ($) {
    'use strict';
    function Pay() {
        this.type = 0;
        this.payBtn = $('#payBtn');
        this.txt = $('#pay');
        this.payAll = $('.payAll');
        this.init();
        this.test();
    }
    Pay.prototype.init = function () {
        $('.payAll').find('span').html(getCookie('price'));
        this.dizhi = getCookie('dizhi') ? getCookie('dizhi') : '';
        $('#DZ').html(this.dizhi + '<span>√</span>');
        this.addEvent();
        // console.log(getCookie('price'))
    }
    Pay.prototype.addEvent = function () {
        $('#xiugai').on('click',() => {
            open('./personal.html');
        })
        $('#ok').on('click',() => {
            this.type = 1;
            // alert('地址已确认，请付款');
            $('#DZ').find('span').show();
            $('#DZ').css({
                color:'lightseagreen'
            })
        })
        // console.log(this.type)
    }
    Pay.prototype.test = function () {
        this.payBtn.on('click',() => {
            console.log(this.type)
            // console.log(this.type)
            console.log(getCookie('dizhi'))
            if(this.type == 0 || getCookie('dizhi') == ""){
                if(!this.type){
                    confirm('请确认您的收货地址!')
                }else{
                    confirm('请设置您的默认收货地址！')
                }
            }else{

                this.value = parseInt($('#pay')[0].value);
                this.price = parseInt(getCookie("price"));
                if(this.value == this.price) {
                    $('.success').show(0).delay(1000).hide(500);
                    $('.err').hide();
                    this.order = getCookie('order') ? JSON.parse(getCookie('order')) : [];
                    // console.log(this.order)
                    this.orderArr = getCookie('orderArr') ? JSON.parse(getCookie('orderArr')) : [];
                    if(this.orderArr.length < 1){
                        for(var i in this.order){
                            this.orderArr[i] = this.order[i];
                        }
                    }else{
                        for(var i in this.order){
                            for(var j in this.orderArr){
                                if(this.order[i].id == this.orderArr[j].id){
                                    this.order.splice(i,1);
                                }
                            }
                        }
                        for(var k=0;k<this.order.length;k++){
                            this.orderArr.push({
                                id:this.order[k].id
                            })
                        }
                    }
                    setCookie('orderArr',JSON.stringify(this.orderArr))
                    removeCookie('order');
                    this.goods = getCookie('goods') ? JSON.parse(getCookie('goods')) : [];
                    for(var i in this.goods){
                        for(var j in this.orderArr){
                            if(this.goods[i].id == this.orderArr[j].id){
                                this.goods.splice(i,1)
                            }
                        }
                    }
                    console.log(this.goods)
    
    
                    setCookie('goods',JSON.stringify(this.goods));
    
                    // console.log(getCookie('goods'))
                    setCookie('price','0')
                    // console.log(this.orderArr);
                    // this.init();
                    setTimeout(() => {
    
                        history.go(0);
                    },1500)
                } else {
                    $('.err').show(0).delay(1000).hide(500);
                    $('.success').hide();
                    $('#errBtn').on('click',() => {
                        $('.err').hide();
                    })
                }
            }
        })
    }
    new Pay();
})(jQuery);

//商品详情中数据加入购物车
;(function ($) {
    function Add () {
        this.url = "./data/product.json"
        this.init();
    }
    Add.prototype.init = function () {
        $('.jg').on('click' , () => {
            this.load();
        })
    }
    Add.prototype.load = function () {
        var that = this;
        ajax({
            url:this.url,
            success:function (res) {
                that.res = JSON.parse(res);
                // console.log(that.res)
                that.setCookie();
            }
        })
    }
    Add.prototype.setCookie = function () {
        this.id = "sss";
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        // 查看有没有goods数据
        if(this.goods.length < 1) {
            this.goods.push({
                id:this.id,
                num:1
            })
        }else{
            var onoff = 1;
            // 判断是不是第一次存该数据
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].id === this.id){
                    this.goods[i].num++;
                    onoff = 0;
                }
            }
            if(onoff == 1) {
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }
        }
        setCookie("goods",JSON.stringify(this.goods))
        alert("加入购物车成功");
    }
    new Add();
})(jQuery);

//其它页面中，购物车上标显示购物车内物品数量
;(function ($) {
    'use strict';
    function ShopNum () {
        // this.item = $('.itemNum');
        this.init();
        this.addEvent();
    }
    ShopNum.prototype.init = function () {
        var shopNum = 0;
        this.goods = getCookie('goods') ? JSON.parse(getCookie('goods')) : [];
        for(var i in this.goods){
            shopNum += parseInt(this.goods[i].num);
        }
        // console.log(shopNum);
        $('.itemNum').html(shopNum);
        // history.go(0);
    }
    ShopNum.prototype.addEvent = function () {
        var that = this;
        document.onclick = function () {
            that.init();
        }
    }
    new ShopNum();
})(jQuery);

//头部个人信息
;(function ($) {
    function User() {
        this.addEvent();
        this.init();
    }
    User.prototype.init = function () {
        console.log(getCookie('login'));
        if(getCookie('login') == '') {
            $('#userMsg').html(
                `<em>Hi,请</em>
                <a href="./login.html">登录</a>
                <em>/</em>
                <a href="./register.html">注册</a>
                <span>|</span>
                `
            )
        }else{
            $('#userMsg').html(
                `<em>Hi,${getCookie('login')}</em>
                <input type="button" value="退出" />
                `
            )
        }
        
    }
    User.prototype.addEvent = function () {
        $('#userMsg').on('click',(eve) => {
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.type == "button") {
                removeCookie('login');
                removeCookie('MY');
                this.init();
            }
        })
    }
    new User();
})(jQuery);

//订单页面渲染
;(function ($) {
    'use strict';
    $.fn.extend({
        Order:function(options){
            new Order(options)
        }
    })
    function Order(options) {
        this.options = options;
        this.url = "./data/product.json";
        this.load();
    }
    Order.prototype.load = function () {
        ajax({
            url:this.url,
            success:(res) => {
                // console.log(JSON.parse(res));
                this.res = JSON.parse(res)
                this.display();
            }
        })
    }
    Order.prototype.display = function () {
        var str = "";
        this.orderArr = getCookie('orderArr') ? JSON.parse(getCookie('orderArr')) : [];
        // console.log(this.order)
        for(var i=0;i<this.res.length;i++) {
            for(var j=0;j<this.orderArr.length;j++) {
                if(this.res[i].id == this.orderArr[j].id) {
                    str += `<li>
                                <div class="imgBox"><img src="${this.res[i].url}" alt=""></div>
                                <div class="msg">${this.res[i].msg}</div>
                                <div class="price">￥${this.res[i].price}</div>
                                <div class="Fk"><p>${this.options.msg}</p></div>
                            </li>`
                }
            }
        }
        $('.orderPro1').html(str);
    }
    // new Order({msg:'未付款'});
})(jQuery);

;(function ($) {
    'use strict';
    function Dd() {
        this.url = "./data/product.json";
        this.load();
    }
    Dd.prototype.load = function () {
        ajax({
            url:this.url,
            success:(res) => {
                // console.log(JSON.parse(res));
                this.res = JSON.parse(res)
                this.display();
            }
        })
    }
    Dd.prototype.display = function () {
        var str = "";
        this.order = getCookie('order') ? JSON.parse(getCookie('order')) : [];
        // console.log(this.order)
        for(var i=0;i<this.res.length;i++) {
            for(var j=0;j<this.order.length;j++) {
                if(this.res[i].id == this.order[j].id) {
                    str += `<li>
                                <div class="imgBox"><img src="${this.res[i].url}" alt=""></div>
                                <div class="msg">${this.res[i].msg}</div>
                                <div class="price">￥${this.res[i].price}</div>
                                <div class="Fk"><p>未付款</p></div>
                            </li>`
                }
            }
        }
        if(str == ""){
            str = "<p>您还没有订单,快去选择商品吧~~~</p>";
            $('.orderPro2').html(str);
        }else{
            $('.orderPro2').html(str);
        }
    }
    // new Order({msg:'未付款'});
    new Dd();
})(jQuery);
//结束