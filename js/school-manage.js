$(document).ready(function(){
    $("form").submit(function(e){
      alert("Submitted");

    $.post("xxxx",
    {
        name:"ppp",
        kkk:"csdvsd"
    },
        function(msg){
            alert(msg);
            if (msg.code == 200) {
                //这一步时将后台获取的data存储到obj中
                sessionStorage.obj = JSON.stringify(data);
                //登陆成功后跳转到首页
                window.location.href="../dashboard.html";
            }
            if (msg.code==400) {
                alert("登录失败");
            }
        });
    });
});