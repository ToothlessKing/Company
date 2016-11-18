/**
 * Created by Administrator on 2016/10/27.
 */
/**
 * Created by Administrator on 2016/10/27.
 */
$.Power =
{
    userPower:"",
    powerName:"",
    powerAction:"",
    columns:[
        {field:'checkbox',checkbox:true},
        {field:'powerId',title:'编号',width:60,sortable:true},
        {field:'powerName',title:'权限组名',width:70,sortable:true},
        {field:'powerScope',title:'应用范围',width:100,sortable:true},
        {field:'powerAction',title:'拥有权限',width:580},
        {field:'action',title:'操作',width:150,
            formatter:function(value,row,index){
                var html = '<a href="#" class="updateBtn" onclick="$.Power.clickUpdate('+index+')">[修改]</a>'
                    +'<a href="#" class="deleBtn" onclick="$.Power.clickDele('+row.powerId+","+1+')">[删除]</a>';
                return html;

            }
        }
    ],
    /*
     入口方法
     */
    init:function()
    {
        $.common.init();
        $.Power.userPower = $.common.userPower.powerAction;
        $.Power.initDataGrid();
        $.Power.initClickEvent();

    },
    /*
     初始化表格 默认全部查找
     分页 每页20
     */
    initDataGrid:function()
    {
        $("#PowerGrid").datagrid({
            url:$.common.base+"/power/queryPowerData.do?powerName="+$.Power.powerName+"&powerAction="+$.Power.powerAction,
            pagination:true,
            singleSelect:false,
            columns :  [$.Power.columns] ,
            remoteSort:true,//本地排序时为false
            multiSort:true,
            fit:true,
            rownumbers:true,
            nowrap:false,
            pageSize:20,
            pageList:[10,20,30,40],
            toolbar : [
                {
                    iconCls:'icon-add',
                    text: '添加',
                    handler:function () {
                        $.Power.clearForm();
                        $('#addDialog').dialog('open').dialog('setTitle','新增界面');
                    }
                }, {
                    iconCls:'icon-remove',
                    text: '批量删除',
                    handler:function () {
                        $.Power.clickDeles();
                    }
                }

            ],
            onLoadSuccess:function(data){
                if($.Power.userPower.indexOf("权限添加")==-1){
                    $('div.datagrid div.datagrid-toolbar a').eq(0).hide();
                }
                if($.Power.userPower.indexOf("权限修改")==-1){
                    $(".updateBtn").hide();
                }
                if($.Power.userPower.indexOf("权限删除")==-1){
                    $('div.datagrid div.datagrid-toolbar a').eq(1).hide();
                    $(".deleBtn").hide();
                }
                if($.Power.userPower.indexOf("权限删除")==-1&&userPower.indexOf("权限添加")==-1){
                    $('div.datagrid div.datagrid-toolbar').hide();
                }
            }

        });
    },
    /*
     初始化点击事件
     */
    initClickEvent:function(){
        //对话框中保存按钮事件
        $('#saveBtn').click(function(){
            if($('#addDialog').panel('options').title=="新增界面"){
                $.Power.addPowerData();
            }
            else{
                $.Power.updatePowerData();
            }

        });
        //对话框取消按钮事件
        $('#cancelBtn').click(function(){
            $('#addDialog').dialog('close');
            $.Power.clearForm();
        });
        //查询按钮点击事件
        $('#findBtn').click(function(){
            $.Power.powerName = $('#power_name').textbox('getValue');
            $.Power.powerAction = $('#power_action').textbox('getValue');
            $("#PowerGrid").datagrid({
                url:$.common.base+"/power/queryPowerData.do?powerName="+$.Power.powerName+"&powerAction="+$.Power.powerAction
            });

        });
    },
    /*
     点击修改事件
     */
    clickUpdate:function(index){
        var rows = $('#PowerGrid').datagrid('getRows');
        var row = rows[index];
        if (row){
            $("#powerId").textbox("setValue",row.powerId);
            $("#powerName").textbox("setValue",row.powerName);
            var rowActions = row.powerAction.split(",");
            for(i=0 ;i< rowActions.length ;i++){
                var obj =".checkGroup[value='"+rowActions[i]+"']";
                alert(obj);
                $(obj).attr("checked",true);
            }
            $('#addDialog').dialog('open').dialog('setTitle','修改界面');
            //$('#fm').form('load',row);


        }
    },
    /*
     点击删除事件
     */
    clickDele: function(id,count) {
        $.Power.removePowerData(id,count);
    },
    /*
     点击批量删除按钮事件
     */
    clickDeles:function(){
        var row = $('#PowerGrid').datagrid('getChecked');
        //alert(row);
        var id = "";
        for(var i=0; i<row.length; i++){
            id += row[i].powerId + ',';
        }
        $.Power.removePowerData(id,row.length);
    },
    /*
     删除信息(批量删除)
     */
    removePowerData:function(powerids,count){
        alert(powerids+" : "+count);
        $.ajax({
            url:$.common.base+"/power/removePowerData.do",
            data:{
                powerids:powerids,
                count:count
            },
            success:function(data){
                alert(data);
                $('#PowerGrid').datagrid('reload');
            }
        });
    },
    /*
     添加信息
     */
    addPowerData:function(){
        var powerName  = $('#powerName').textbox('getValue');
        var powerAction="";
        var powerScope = $("#powerScope").val();
        //$('.checkGroup:checked').each(function(){
        //    powerAction += $(this).val()+",";
        //});
        alert(powerAction);
        if(powerName.trim()==""||powerName==null){
            alert("权限组名称不能为空！！！");
            return;
        }
        $(".checkGroup:checked").each(function () {
            powerAction += $(this).val()+",";
        });

        $.ajax({
            url:$.common.base+"/power/addPowerData.do",
            data:{
                powerName:powerName,
                powerAction:powerAction,
                powerScope:powerScope
            },
            success:function(data){
                if(data=="1"){
                    $('#addDialog').dialog('close');
                    alert(data);
                    $('#PowerGrid').datagrid('reload');
                }
                else{
                    alert("已存在该信息！！！");
                }

            }
        });
    },
    /*
     修改信息
     */
    updatePowerData:function(){

        var powerId  = $('#powerId').textbox('getValue');
        var powerName  = $('#powerName').textbox('getValue');
        var powerScope = $("#powerScope").val();
        var powerAction = "";
        if(powerName.trim()==""||powerName==null){
            alert("名称不能为空！！！");
            return;
        }
        $(".checkGroup:checked").each(function () {
            powerAction += $(this).val()+",";
        });
        $.ajax({
            url:$.common.base+"/power/updatePowerData.do",
            data:{
                powerId:powerId,
                powerName:powerName,
                powerAction:powerAction,
                powerScope:powerScope
            },
            success:function(data){
                if(data=="1")
                {
                    $('#addDialog').dialog('close');
                    alert(data);
                    $('#PowerGrid').datagrid('reload');
                    $("#PowerGrid").datagrid('clearSelections').datagrid('clearChecked');
                }
                else{
                    alert("更新失败");
                }

            }
        });
    },
    clearForm:function(){
        $('#fm').form('clear');
    }
}