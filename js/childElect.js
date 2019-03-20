const timetypes = {
    Time12: '1',
    Time34: '2',
    Time56: '3',
    Time78: '4'
}

const weekDayTime = {
    Mon: "Mon",
    Tue: "Tue",
    Wed: "Wed",
    Thu: "Thu",
    Fri: "Fri",
    Sat: "Sat",
    Sun: "Sun"
}
$(document).ready(function () {

    $.ajax({
        url: sessionStorage.host + 'getCourses',
        xhrFields: {
            withCredentials: true
        },
        credentials: "include",
        type: 'post',
        offline: false,
        success: function (msg) {
            // alert(msg);

            var tbody = $("tbody");
            for (var i = 0; i < msg.length; i++) {
                // console.log(msg[i]);
                var tr = $("<tr id=\"tr" + msg[i]["id"] + "\"></tr>");
                tr.appendTo(tbody);
                var courseId = $("<td>" + msg[i]["id"] + "</td>");

                var courseName = $("<td class=\"cname\">" + msg[i]["name"] + "</td>");

                var courseWeekday = msg[i]["day"];

                var courseCTime = msg[i]["dayTime"];

                var timeType = "";
                var timeCourse = "";
                // alert(courseCTime);
                switch (courseCTime) {
                    case timetypes.Time12:
                        timeType = " ctime1 ctime2";
                        timeCourse = "一二节";
                        break;
                    case timetypes.Time34:
                        timeType = " ctime3 ctime4";
                        timeCourse = "三四节";

                        break;
                    case timetypes.Time56:
                        timeType = " ctime5 ctime6";
                        timeCourse = "五六节";

                        break;
                    case timetypes.Time78:
                        timeType = " ctime7 ctime8";
                        timeCourse = "七八节";

                        break;
                    default:
                        alert("illegal timeType");
                }

                switch (courseWeekday) {
                    case weekDayTime.Mon:
                        timeDay = "周一";
                        break;
                    case weekDayTime.Tue:
                        timeDay = "周二";
                        break;
                    case weekDayTime.Wed:
                        timeDay = "周三";
                        break;
                    case weekDayTime.Thu:
                        timeDay = "周四";
                        break;
                    case weekDayTime.Fri:
                        timeDay = "周五";
                        break;
                    case weekDayTime.Sat:
                        timeDay = "周六";
                        break;
                    case weekDayTime.Sun:
                        timeDay = "周日";
                        break;
                    default:
                        alert("illegal day!");
                }

                var courseTime = $("<td class=\"time " + courseWeekday + timeType + "\">" + timeDay + " 【" + timeCourse + "】</td>");

                var courseAdr = $("<td>" + msg[i]["campus"] + "</td>");

                var courseTea = $("<td>" + msg[i]["teacherName"] + "</td>");

                var edit = $("<td></td>");
                var add_button = $("<button class='btn btn-primary' id=\"add" + i + "\" onclick=\"addSelect(this);\"></button>");
                var add_button_i = $("<i class= 'glyphicon glyphicon-plus icon-white'></i>");
                add_button.appendTo(edit);
                add_button_i.appendTo(add_button);

                var delete_button = $("<button class='btn btn-danger' id=\"delete" + i + "\" onclick=\"deleteSelect(this);\"></button>");
                var delete_button_i = $("<i class= 'glyphicon glyphicon-trash icon-white'></i>");
                delete_button.appendTo(edit);
                delete_button_i.appendTo(delete_button);
                tr.append(courseId, courseName, courseTime, courseAdr, courseTea, edit);
                $("#delete" + i).hide();
            }
        }
    })


});

function addSelect(ob) {
    // 子页面编辑按钮状态更新
    var id = $(ob).attr("id").slice("add".length);
    $(ob).hide();
    $("#delete" + id).show();

    // 获取该表格的html
    var tr = $("#tr" + id);
    tr_txt = tr.clone().html();
    var p_tr = "<tr id=\"p_tr" + id + "\">" + tr_txt + "</tr>";

    // 父页面添加表格项
    var selectList = window.opener.document.getElementById("SelectedList");
    var selectTbody = $(selectList.childNodes[3]);
    selectTbody.append(p_tr);

    // 父页面的编辑按钮状态更新
    selectTbody.find("#delete" + id).hide();
    selectTbody.find("#add" + id).show();
}

function deleteSelect(ob) {
    // 子页面编辑按钮状态更新
    var id = $(ob).attr("id").slice("delete".length);
    $(ob).hide();
    $("#add" + id).show();

    // 父页面删去表格项
    var p_tr_id = "p_tr" + id;
    var selectTr = $(window.opener.document.getElementById(p_tr_id));
    selectTr.remove();
}