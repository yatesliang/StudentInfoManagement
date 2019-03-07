$(document).ready(function(){
    
    var tbody = $("tbody");

    for(var i=0;i<3;i++){
        // tr_id is course_id
        var tr=$("<tr id=\"tr"+i+"\"></tr>");
        tr.appendTo(tbody);          
        var courseId=$("<td>" + 1 + "</td>");
        
        var courseName=$("<td class=\"cname\">" + 1 + "</td>");
        
        var courseTime=$("<td class=\"time Mon ctime1 ctime2\">" + 1 + "</td>");
        
        var courseAdr=$("<td>" + 1 + "</td>");
        
        var courseTea=$("<td>" + 1 + "</td>");
        
        var edit=$("<td></td>");
        var add_button = $("<button class='btn btn-primary' id=\"add"+i+"\" onclick=\"addSelect(this);\"></button>");
        var add_button_i = $("<i class= 'glyphicon glyphicon-plus icon-white'></i>");
        add_button.appendTo(edit);
        add_button_i.appendTo(add_button);

        var delete_button = $("<button class='btn btn-danger' id=\"delete"+i+"\" onclick=\"deleteSelect(this);\"></button>");
        var delete_button_i = $("<i class= 'glyphicon glyphicon-trash icon-white'></i>");
        delete_button.appendTo(edit);
        delete_button_i.appendTo(delete_button);
        tr.append(courseId,courseName,courseTime,courseAdr,courseTea,edit);
        $("#delete"+i).hide();
    }
});

function addSelect(ob){
    // 子页面编辑按钮状态更新
    var id = $(ob).attr("id").slice("add".length);
    $(ob).hide();
    $("#delete"+id).show();

    // 获取该表格的html
    var tr = $("#tr"+id);
    tr_txt = tr.clone().html();
    var p_tr ="<tr id=\"p_tr"+id+"\">"+tr_txt+"</tr>";

    // 父页面添加表格项
    var selectList = window.opener.document.getElementById("SelectedList");
    var selectTbody = $(selectList.childNodes[3]);
    selectTbody.append(p_tr);

    // 父页面的编辑按钮状态更新
    selectTbody.find("#delete"+id).hide();
    selectTbody.find("#add"+id).show();
}

function deleteSelect(ob){
    // 子页面编辑按钮状态更新
    var id = $(ob).attr("id").slice("delete".length);
    $(ob).hide();
    $("#add"+id).show();

    // 父页面删去表格项
    var p_tr_id = "p_tr"+id;
    var selectTr =$(window.opener.document.getElementById(p_tr_id));
    selectTr.remove();
}