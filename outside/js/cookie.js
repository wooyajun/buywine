function setCookie(key,val,options){
    options = options || {};
    var path = "";
    if(options.path){
        path = ";path=" + options.path;
    }
    var expires = "";
    if(options.expires){
        var d = new Date();
        d.setDate(d.getDate()+options.expires);
        expires = ";expires=" + d;
    }
    document.cookie = key + "="+ val + path + expires;
}

function removeCookie(key,options){
    options = options || {};
    options.expires = -1;
    setCookie(key,132,options);
}

function getCookie(key){
    var arr = document.cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        if(arr[i].split("=")[0] === key){
            return arr[i].split("=")[1];
        }
    }
    return "";
}