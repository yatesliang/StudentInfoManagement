var selectedList = [];

$(document).ready(function () {
    

   
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
    newWindow = window.open('childElect.html', 'new', 'location=no, toolbar=no');
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
    var temp = timeTd.attr("class");
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
    if (index > -1) {
        list.splice(index, 1);
    }

}

function save() {
    $.ajax({
        url: sessionStorage.host+'applyCourse',
        data: {
            list:selectedList
        },
        type: 'post',
        offline: false,
        dataType: "json",
        success: function (msg) {
            // alert(msg);
            if (msg=="OK") {
                alert("保存课表成功");
            }
            if (msg=="Wrong") {
                alert("保存课表失败");
            }
        }
    })
    alert("保存课表成功");
}