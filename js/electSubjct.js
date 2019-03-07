var selectedList = [];

$(document).ready(function () {
    var tes = ["a", "b", "c"];
    removeVal(tes, "a");
    alert(tes);

    var str = sessionStorage.obj;
    if (str == null) {
        window.location.href = "School_Manage.html";
    } else {
        var stuId = $.parseJSON(str).id;
        $.ajax({
            url: 'getCur',
            data: {
                id=stuId,
                selected: selectedList
            },
            type: 'post',
            offline: false,
            success: function (msg) {
                alert(msg);
                if (msg.code == 200) {
                    console.log("success to get curriculum");
                    for (var i = 0; i < msg.length; i++) {
                        insertCourse(msg[i]);
                    }
                }
                if (msg.code == 400) {
                    console.log("fail to get curriculum");
                }
            }
        })
    }


});

function insertCourse(cou) {
    for (var i = 0; i < cou.time.length; i++) {
        var weekDay = (cou.time[i]).weekDay;
        for (var j = 0; j < weekDay.cTimes.length; i++) {
            var ctime=weekDay.cTimes[j];
            $("#myCurriculum").find("."+weekDay+"."+ctime).text(cou.name);
        }
    }
    
}

function show() {
    newWindow = window.open('childElect.html', 'new', 'location=no, toolbar=no')
}

function closeChild() {
    newWindow.close();
}

function addSelect(ob) {
    // 更新按键状态
    var id = $(ob).attr("id").slice("add".length);
    $(ob).hide();
    $("#delete" + id).show();

    var tr = $("#p_tr" + id);
    var cname = tr.find(".cname").text();

    var timeTd = tr.find(".time");
    var timeArr = timeTd.attr("class").split(" ");
    var cTimes = [];
    var weekDay = timeArr[1];
    selectedList.push(id);
    for (var i = 2; i < timeArr.length; i++) {
        cTimes.push(timeArr[i]);
    }

    for (var i = 0; i < cTimes.length; i++) {
        var ctime = cTimes[i];
        $("#myCurriculum").find("." + ctime + "." + weekDay).text(cname);
    }
}

function deleteSelect(ob) {
    // 更新按键状态
    var id = $(ob).attr("id").slice("delete".length);
    $(ob).hide();
    $("#add" + id).show();

    var tr = $("#p_tr" + id);
    var timeTd = tr.find(".time");
    var timeArr = timeTd.attr("class").split(" ");
    var weekDay = timeArr[1];
    var cTimes = [];
    var weekDay = timeArr[1];

    for (var i = 2; i < timeArr.length; i++) {
        cTimes.push(timeArr[i]);
    }

    for (var i = 0; i < cTimes.length; i++) {
        var ctime = cTimes[i];
        $("#myCurriculum").find("." + ctime + "." + weekDay).text("");
    }

    removeVal(selectedList, id);

}
function getIndex(list, val) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == val) {
            return i;
        }
    }
    return -1;
}

function removeVal(list, val) {
    var index = getIndex(list, val);
    if (val > -1) {
        list.split(index, 1);
    }
}

function save() {
    $.ajax({
        url: 'saveCur',
        data: selectedList,
        type: 'put',
        offline: false,
        success: function (msg) {
            alert(msg);
            if (msg.code == 200) {
                alert("修改课表成功");
            }
            if (msg.code == 400) {
                alert("修改课表失败");
            }
        }
    })
}