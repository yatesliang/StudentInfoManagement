var urole;
sessionStorage.host="http://192.168.1.53:8080/";
$(document).ready(function () {
    
});

function login(){
    var uname = $("input[name='id']").val();
    var upwd = $("input[name='password']").val();
    var urole1 =urole;
        if(uname==undefined){
            alert("请输入用户名")
            return;
        }
        if(upwd==undefined){
            alert("请输入密码")
            return;
        }
        if(urole1==undefined){
            alert("请选择角色")
            return;
        }       
        var dataJson={"id":uname,
            "password":upwd,
            "role":urole1};

        $.ajax({
            type:'get',
            url:sessionStorage.host+'login',
            dataType:'json',
            data: dataJson,
            offline:false,
            success:function(msg){
                console.log(msg);
                if (msg>-1) {
                    //这一步时将后台获取的data存储到obj中
                    sessionStorage.obj = msg;
                    //登陆成功后跳转到首页
                    window.location.href = "dashboard.html";
                }else{
                    alert("登录失败");
                }
            }
        });       
}

$(function(){
    $('#role').find('input[type=checkbox]').bind('click',function(){
        if(this.checked){
            $('#role').find('input[type=checkbox]').not(this).attr("checked",false);
            urole=$("input[type='checkbox']:checked").val();
            // console.log(urole);
        }
    })
})