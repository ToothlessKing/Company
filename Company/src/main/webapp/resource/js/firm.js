/**
 * Created by Administrator on 2016/11/17.
 */
var editId =null;
$(function(){
    $.map5.init();
    $("#menu").hide();
    $('#tt').tree({
        url: $.common.base+"/company/loadFirmTree.do",
        onBeforeLoad:function(node,param){
            if(param.id==null){
                param.id = 0;
            }

        },
        onClick:function(node){
            console.log(node);
            if(node.flag==="department"){
                $("#menu").hide();
                return;
            }
            if(node.companyCoordinates!=null){
                $.map5.setCenter(node.companyCoordinates.split(",")[0], node.companyCoordinates.split(",")[1]);
            }
            var obj={};
            editId = node.id;
            $("#menu").show();
            obj.companyId = node.id;
            obj.companyName = node.text;
            obj.companyAddress = node.companyAddress;
            obj.companyCoordinates = node.companyCoordinates;
            obj.companyScopeMap = node.companyScopeMap;
            $.map5.addMarker(obj);
            $.map5.addPolygon(obj);
        }
    });
    showAll();
});
function showAll(){
    $.map5.addGeoJson2($.common.base+"/company/loadTreeJson.do");
}
function saveCoor(){
    var coorX = $.map5.coorX;
    var coorY = $.map5.coorY;
    if(coorX==null||coorX==""){
        alert("没有进行修改操作，不能保存！！");
        return;
    }
    $.ajax({
        type:'POST',
        url: $.common.base+"/company/updateCoor.do",
        data:{
            coor:coorX+","+coorY,
            companyId: editId
        },
        success:function(data){
            if(data==1){
                 alert("保存成功");
            }
            $('#tt').tree('reload');
        }
    });
    console.log($.map5.coorX);
    console.log($.map5.coorY);
}
function saveScope(){
    var scope = $.map5.scopePoints;
    if(scope==null||scope==""){
        alert("范围为空！！，不能更改");
        return;
    }
    $.ajax({
        type:'POST',
        url: $.common.base+"/company/updateScope.do",
        data:{
            scope:scope,
            companyId: editId
        },
        success:function(data){
            if(data==1){
                alert("保存成功");
            }
            $('#tt').tree('reload');
        }
    });
}