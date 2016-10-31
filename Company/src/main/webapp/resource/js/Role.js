/**
 * Created by Administrator on 2016/10/26.
 */
$.Role =
{
    base: $.common.base,
    roleId:"",
    roleName:"",
    columns:[
                {field:'checkbox',checkbox:true},
                {field:'roleId',title:'角色id',width:50,sortable:true},
                {field:'powerId',title:'权限组id',width:100,sortable:true},
                {field:'roleName',title:'角色名',width:100},
                {field:'action',title:'操作',width:100,
                    formatter:function(value,row,index){
                        var html = '<a href="#" id="updateBtn" onclick="$.Role.clickUpdate('+index+')">[修改]</a>'
                            +'<a href="#" id="deleBtn" onclick="$.Role.clickDele('+row.roleId+","+1+')">[删除]</a>';
                        return html;

                    }
                }
            ],
    /*
    入口方法
     */
    init:function()
    {
        $.Role.initDataGrid();
        $.Role.initClickEvent();

    },
    /*
    初始化表格 默认全部查找
    分页 每页20
     */
    initDataGrid:function()
    {
        $("#RoleGrid").datagrid({
            url:$.common.base+"/role/queryRoleData.do?roleId="+$.Role.roleId+"&roleName="+encodeURI($.Role.roleName),
            //url:$.Role.base+"/role/queryRoleData.do",
            //queryParams:{roleId:$.Role.roleId,
            //            roleName:$.Role.roleName
            //},
            pagination:true,
            singleSelect:false,
            columns :  [$.Role.columns] ,
            remoteSort:true,//本地排序时为false
            multiSort:true,
            fit:true,
            rownumbers:true,
            pageSize:20,
            pageList:[10,20,30,40],
            toolbar : [
                {
                    iconCls:'icon-add',
                    text: '添加',
                    handler:function () {
                        $.Role.clearForm();
                        $('#addDialog').dialog('open').dialog('setTitle','新增界面');
                        $.Role.load();

                        //$('#powerName').combobox('setValue',1);
                    }
                }, {
                    iconCls:'icon-remove',
                    text: '批量删除',
                    handler:function () {
                        $.Role.clickDeles();
                    }
                }

            ]

        }).datagrid('getPager').pagination({
            beforePageText :'第',
            afterPageText :'页 共{pages}页',
            displayMsg:   '共{total}条记录'
        });
    },
    /*
    初始化点击事件
     */
    initClickEvent:function(){
        //对话框中保存按钮事件
        $('#saveBtn').click(function(){
            if($('#addDialog').panel('options').title=="新增界面"){
                $.Role.addRoleData();
            }
            else{
                $.Role.updateRoleData();
            }

        });
        //对话框取消按钮事件
        $('#cancelBtn').click(function(){
            $('#addDialog').dialog('close');
            $.Role.clearForm();
        });
        //查询按钮点击事件
        $('#findBtn').click(function(){
            $.Role.roleId = $('#role_id').textbox('getValue');
            $.Role.roleName = $('#role_name').textbox('getValue');
            $("#RoleGrid").datagrid({
                url:$.common.base+"/role/queryRoleData.do?roleId="+$.Role.roleId+"&roleName="+$.Role.roleName
            });

        });
        $("#powerName").combobox({
            onChange: function (newVal, oldVal) {
                $("#powerId").textbox('setValue', newVal);
            }
        });
    },
    /*
    点击修改事件
     */
    clickUpdate:function(index){
        var rows = $('#RoleGrid').datagrid('getRows');
        var row = rows[index];
        if (row){
            $.Role.load();
            $('#addDialog').dialog('open').dialog('setTitle','修改界面');
            $('#fm').form('load',row);
            $('#powerName').combobox('select',row.powerId);
            //$('#powerName').val(row.powerName);
        }
    },
    /*
    点击删除事件
     */
    clickDele: function(id,count) {
        $.Role.removeRoleData(id,count);
    },
    /*
    点击批量删除按钮事件
     */
    clickDeles:function(){
        var row = $('#RoleGrid').datagrid('getChecked');
        //alert(row);
        var id = "";
        for(var i=0; i<row.length; i++){
            id += row[i].roleId + ',';
        }
        $.Role.removeRoleData(id,row.length);
    },
    /*
    删除部门信息(批量删除)
    @param 部门编号（多个则中间用，隔开）
    @param 个数
     */
    removeRoleData:function(roleids,count){
        alert(roleids+" : "+count);
        $.ajax({
            type: 'POST',
            url:$.common.base+"/role/removeRoleData.do",
            data:{
                roleids:roleids,
                count:count
            },
            success:function(data){
                alert(data);
                $('#RoleGrid').datagrid('reload');
            }
        });
    },
    /*
    添加部门信息
     */
    addRoleData:function(){
        var roleName  = $('#roleName').textbox('getValue');
        var powerId = $('#powerId').textbox('getValue');
        if(roleName.trim()==""||roleName==null){
            alert("名称不能为空！！！");
            return;
        }
        if(powerId.trim()==""||powerId==null){
            alert("权限不能为空！！！");
            return;
        }

        $.ajax({
            type: 'POST',
            url:$.common.base+"/role/addRoleData.do",
            data:{
                roleName:roleName,
                powerId:powerId
            },
            success:function(data){
                if(data=="1"){
                    $('#addDialog').dialog('close');
                    alert(data);
                    $('#RoleGrid').datagrid('reload');
                }
                else{
                    alert("已存在该信息！！！");
                }

            }
        });
    },
    /*
    修改角色信息
     */
    updateRoleData:function(){
        var roleId  = $('#roleId').textbox('getValue');
        var roleName  = $('#roleName').textbox('getValue');
        var powerId = $('#powerId').textbox('getValue');
        if(roleName.trim()==""||roleName==null){
            alert("名称不能为空！！！");
            return;
        }
        if(powerId.trim()==""||powerId==null){
            alert("权限不能为空！！！");
            return;
        }
        $.ajax({
            url:$.common.base+"/role/updateRoleData.do",
            type: 'POST',
            data:{
                roleId:roleId,
                roleName:roleName,
                powerId:powerId
            },
            success:function(data){
                if(data=="1")
                {
                    $('#addDialog').dialog('close');
                    alert(data);
                    $('#RoleGrid').datagrid('reload');
                    $("#RoleGrid").datagrid('clearSelections').datagrid('clearChecked');
                }
                else{
                    alert("更新失败");
                }

            }
        });
    },
    clearForm:function(){
        $('#fm').form('clear');
    },
    load:function(){
        //$.ajax({
        //    type:"POST",
        //    url:$.common.base+"/power/queryAllPower.do",
        //    dataType: "json",
        //    success:function(json){
        //
        //       alert(json.length);
        //        $('#powerName').combobox({
        //            data : json,
        //            valueField:'powerName',
        //            textField: 'powerName'
        //
        //        });
        //        $('#powerName').combobox('setText',"普通员工");
        //    }
        //})
        $("#powerName").combobox({
            url: $.common.base+"/power/queryAllPower.do",
            valueField: "powerId",
            textField: "powerName",
            panelHeight: "auto",
            editable: false,
            onLoadSuccess: function (data) { //加载完成后,设置选中第一项
                //alert(data[0].powerId);
                //$('#powerName').combobox('setValue',data[0].powerId);
                $('#powerName').combobox('select',3);
                //$('#powerName').combobox('setValue',1);
                //var val = $(this).combobox("getData");
                //for (var item in val) {
                //    if (item == "ID") {
                //        $(this).combobox("select", val[0][item]);
                //    }
                //}
            }
        });
    }
}