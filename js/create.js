var urole;
// sessionStorage.host = "http://192.168.1.106:8080/";

$(document).ready(function () {

});


$.ajaxSetup({
    xhrFiled: {
        'withCredentials': true
    }
})

// $.ajax({
//     url: sessionStorage.host,
//     method: "get",
//     success: function (data) {
//         console.log(data)
//     }
// });
function get($scope, $http) {
    $http.post(url, { v1: 'name_eu' }, { 'withCredentials': true }).success(function (data) {
        $scope.var = data;
    });
}

function addStu() {
    var stuJson = $("#stuForm").serializeObject();
    console.log(stuJson);
    $.ajax({
        url: sessionStorage.host + 'createStudent',
        xhrFields: {
            withCredentials: true
        },
        data: stuJson,
        credentials: "include",
        type: 'get',
        offline: false,
        success: function (msg) {
            alert(msg);
            if (msg.code == 200) {
                alert("注册学生成功，该学生学号为：" + msg.data.id);
            }
            if (msg.code == 400) {
                alert("注册学生失败");
            }
        }
    })

}

function addFirm() {
    // var firmJson = $("#firmForm").serializeObject();
    // console.log(firmJson);
    // $.ajax({
    //     url: sessionStorage.host + 'createFirm',
    //     data: firmJson,
    //     type: 'post',
    //     offline: false,
    //     success: function (msg) {
    //         alert(msg);
    //         if (msg.code == 200) {
    //             alert("注册学生成功，该学生学号为：" + msg.data.id);
    //         }
    //         if (msg.code == 400) {
    //             alert("注册学生失败");
    //         }
    //     }
    // })
    alert("注册公司成功！");
}

function addTea() {
    var teaJson = $("#teaForm").serializeObject();
    console.log(teaJson);
    $.ajax({
        url: sessionStorage.host + 'registerTeacher',
        data: teaJson,
        type: 'post',
        offline: false,
        success: function (msg) {
            alert(msg);
            if (msg=="Ok") {
                alert("注册老师成功");
            }
            if (msg=="error") {
                alert("注册老师失败");
            }
        }
    })
    // alert("注册教师成功！");

}

function addMajor() {
    var majorJson = $("#majorForm").serializeObject();
    console.log(majorJson);
    $.ajax({
        url: sessionStorage.host + 'createMajor',
        data: majorJson,
        type: 'get',
        offline: false,
        success: function (msg) {
            alert(msg);
            alert(typeof(msg));
            if (msg.code == 200) {
                alert("注册学生成功，该学生学号为：" + msg.data.id);
            }
            if (msg.code == 400) {
                alert("注册学生失败");
            }
        }
    })

}

function addSub() {
    var subJson = $("#subjectForm").serializeObject();
    console.log(subJson);
    $.ajax({
        url: sessionStorage.host + 'createCourse',
        data: subJson,
        type: 'post',
        offline: false,
        success: function (msg) {
            alert(msg);
            if (msg>-1) {
                alert("注册课程成功，该课程课号为：" + msg);
                window.location.href = "../createSubject.html";
            }
            if (msg<0) {
                alert("注册课程失败");
            }
        }
    })

}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};