const usertypes = {
    ADMIN: 'admin',
    STUDENT: 'student',
    TEACHER: 'teacher',
    COMPANY: 'company'
}

$(document).ready(function(){

    // var str = sessionStorage.obj;
    //     if(str==null){
    //         window.location.href="School Manage.html";
    //     }else{
    //         var obj = $.parseJSON(str);
    //         // 获取用户类型
    //         var usertype = obj.usertype;
            
    //         // if (usertype==usertypes.ADMIN)
    //         switch(usertype){
    //             case usertypes.ADMIN:
    //                 setAdmDom();
    //                 break;

    //             case usertypes.COMPANY:
    //                 setComDom();
    //                 break;

    //             case usertypes.STUDENT:
    //                 setStuDom();
    //                 break;

    //             case usertypes.TEACHER:
    //                 setTeaDom();
    //                 break;

    //             default:
    //                 alert("illegal usertype");
    //         }
    //     }
});

function setAdmDom(){
    $("#index_print").remove();
}

function setComDom(){
    $("#index_class").remove();
    $("#index_subject").remove();
    $("#index_stu").remove();
    $("#index_record").remove();
    $("#index_grade").remove();
    $("#index_email").remove();
    $("#index_print").remove();
    $("#index_com").remove();
}

function setStuDom(){
    $("#index_class").remove();
    $("#index_subject").remove();
    $("#create_grade").remove();
    $("#tea_grade").remove();
    $("#index_com").remove();
    $("#index_verify").remove();
}

function setTeaDom(){
    $("#index_class").remove();
    $("#index_subject").remove();
    $("#index_stu").remove();
    $("#index_record").remove();
    $("#index_com").remove();
    $("#stu_grade").remove();
    $("#index_verify").remove();
    $("#index_print").remove();
}