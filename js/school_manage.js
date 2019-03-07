var urole;
$(document).ready(function () {
    $("form").submit(function (e) {

        var uname = $("input[name='login']").val();
        var upwd = $("input[name='password']").val();

        if(uname==undefined){
            alert("请输入用户名")
            return;
        }
        if(upwd==undefined){
            alert("请输入密码")
            return;
        }
        if(urole==undefined){
            alert("请选择角色")
            return;
        }       

        $.ajax({
            url:'/login',
            data:{
                name:uname,
                password:upwd,
                role:urole
            },
            type:'post',
            offline:false,
            success:function(msg){
                alert(msg);
                msg=$.parseJSON(msg);
                if (msg.code == 200) {
                    //这一步时将后台获取的data存储到obj中
                    sessionStorage.obj = JSON.stringify(msg.data);
                    //登陆成功后跳转到首页
                    window.location.href = "../dashboard.html";
                }
                if (msg.code == 400) {
                    alert("登录失败");
                }
            }
        });       
    });
});

$(function(){
    $('#role').find('input[type=checkbox]').bind('click',function(){
        if(this.checked){
            $('#role').find('input[type=checkbox]').not(this).attr("checked",false);
            urole=$(this).attr("name").slice(2);
            console.log(urole);
        }
    })
})