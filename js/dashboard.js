const usertypes = {
    ADMIN: '2',
    STUDENT: '0',
    TEACHER: '1',
    COMPANY: '3'
}

$(document).ready(function(){

    var str = sessionStorage.obj;
    
        if(str==null){
            window.location.href="School_Manage.html";
        }else{
            var usertype = str;
            
            switch(usertype){
                case usertypes.ADMIN:
                    setAdmDom();
                    break;

                case usertypes.COMPANY:
                    setComDom();
                    break;

                case usertypes.STUDENT:
                    setStuDom();
                    break;

                case usertypes.TEACHER:
                    setTeaDom();
                    break;

                default:
                    alert("illegal usertype");
            }
        }
});

function setAdmDom(){
    $("#index_print").remove();
    $("#stu_elect_sub").remove();
    $("#add_from_file").remove();
    $("#view_my_record").remove();
    $("#add_stu_child").remove();
}

function setComDom(){
    $("#index_class").remove();
    $("#index_subject").remove();
    $("#index_teacher").remove();
    $("#index_stu").remove();
    $("#index_record").remove();
    $("#index_grade").remove();
    $("#index_email").remove();
    $("#index_print").remove();
    $("#index_com").remove();
    $("#userType").text("公司");
    $("#view_record").remove();
    $("#nav-grades").remove();
    $("#nav-records").remove();
    $("#nav-course").remove();
}

function setStuDom(){
    $("#index_stu").remove();
    $("#index_teacher").remove();
    $("#index_class").remove();
    // $("#index_subject").remove();
    $("#add_stu_child").remove();
    $("#create_grade").remove();
    $("#tea_grade").remove();
    $("#index_com").remove();
    $("#index_verify").remove();
    $("#userType").text("学生");
    $("#view_record").remove();
}

function setTeaDom(){
    $("#index_class").remove();
    $("#stu_elect_sub").remove();
    $("#index_stu").remove();
    $("#index_record").remove();
    $("#index_com").remove();
    $("#stu_grade").remove();
    $("#index_verify").remove();
    $("#index_print").remove();
    $("#userType").text("教师");
    $("#view_record").remove();
    $("#nav-grades").remove();
    $("#nav-records").remove();
    $("#index_teacher").remove();
}