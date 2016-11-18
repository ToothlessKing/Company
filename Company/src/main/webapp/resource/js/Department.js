/**
 * Created by Administrator on 2016/10/26.
 */
$.Department =
{
    base: $.common.base,
    departmentNo:"",
    departmentName:"",
    userCompanyId:"",
    userPower:"",
    columns:[
                {field:'checkbox',checkbox:true},
                {field:'departmentId',title:'部门号',sortable:true},
                {field:'departmentName',title:'部门名称',sortable:true},
                {field:'departmentDescribe',title:'部门职责描述'},
                {field:'action',title:'操作',
                    formatter:function(value,row,index){
                        var html = '<a href="#" class="updateBtn" onclick="$.Department.clickUpdate('+index+')">[修改]</a>'
                            +'<a href="#" class="deleBtn" onclick="$.Department.clickDele('+row.departmentId+","+1+')">[删除]</a>';
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
        $.Department.userPower = $.common.userPower.powerAction;
        var powerScope = $.common.userPower.powerScope;
        if(powerScope=="所在分公司"){
            $.Department.userCompanyId= $.common.userPower.companyId;
        }
        $.Department.initDataGrid();
        $.Department.initClickEvent();
    },
    /*
    初始化表格 默认全部查找
    分页 每页20
     */
    initDataGrid:function()
    {
        $("#DepartmentGrid").datagrid({
            url:$.Department.base+"/department/queryDepartmentData.do?departmentNo="+$.Department.departmentNo+"&departmentName="+encodeURI($.Department.departmentName)+"&companyId="+$.Department.userCompanyId,
            //url:$.Department.base+"/department/queryDepartmentData.do",
            //queryParams:{departmentNo:$.Department.departmentNo,
            //            departmentName:$.Department.departmentName
            //},
            pagination:true,
            singleSelect:false,
            columns :  [$.Department.columns] ,
            remoteSort:true,//本地排序时为false
            multiSort:true,
            fit:true,
            fitcolumns:true,
            rownumbers:true,
            pageSize:20,
            pageList:[10,20,30,40],
            toolbar : [
                {
                    id:"addBar",
                    iconCls:'icon-add',
                    text: '添加',
                    handler:function () {
                        $.Department.clearForm();
                        $('#addDialog').dialog('open').dialog('setTitle','新增界面');
                    }
                }, {
                    id:"removeBar",
                    iconCls:'icon-remove',
                    text: '批量删除',
                    handler:function () {
                        $.Department.clickDeles();
                    }
                }

            ],
            onLoadSuccess:function(data){
                if($.Department.userPower.indexOf("部门添加")==-1){
                    $('div.datagrid div.datagrid-toolbar a').eq(0).hide();
                }
                if($.Department.userPower.indexOf("部门修改")==-1){
                    $(".updateBtn").hide();
                }
                if($.Department.userPower.indexOf("部门删除")==-1){
                    $('div.datagrid div.datagrid-toolbar a').eq(1).hide();
                    $(".deleBtn").hide();
                }
                if($.Department.userPower.indexOf("部门删除")==-1&&userPower.indexOf("部门添加")==-1){
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
                $.Department.addDepartmentData();
            }
            else{
                $.Department.updateDepartmentData();
            }

        });
        //对话框取消按钮事件
        $('#cancelBtn').click(function(){
            $('#addDialog').dialog('close');
            $.Department.clearForm();
        });
        //查询按钮点击事件
        $('#findBtn').click(function(){
            $.Department.departmentNo = $('#department_id').textbox('getValue');
            $.Department.departmentName = $('#department_name').textbox('getValue');
            $("#DepartmentGrid").datagrid({
                url:$.Department.base+"/department/queryDepartmentData.do?departmentNo="+$.Department.departmentNo+"&departmentName="+$.Department.departmentName+"&companyId="+$.Department.userCompanyId
            });

        });
    },
    /*
    点击修改事件
     */
    clickUpdate:function(index){
        var rows = $('#DepartmentGrid').datagrid('getRows');
        var row = rows[index];
        if (row){
            $('#addDialog').dialog('open').dialog('setTitle','修改界面');
            $('#fm').form('load',row);
        }
    },
    /*
    点击删除事件
     */
    clickDele: function(id,count) {
        $.Department.removeDepartmentData(id,count);
    },
    /*
    点击批量删除按钮事件
     */
    clickDeles:function(){
        var row = $('#DepartmentGrid').datagrid('getChecked');
        //alert(row);
        var id = "";
        for(var i=0; i<row.length; i++){
            id += row[i].departmentId + ',';
        }
        $.Department.removeDepartmentData(id,row.length);
    },
    /*
    删除部门信息(批量删除)
    @param 部门编号（多个则中间用，隔开）
    @param 个数
     */
    removeDepartmentData:function(departmentids,count){
        alert(departmentids+" : "+count);
        $.ajax({
            type: 'POST',
            url:$.Department.base+"/department/removeDepartmentData.do",
            data:{
                departmentids:departmentids,
                count:count
            },
            success:function(data){
                alert(data);
                $('#DepartmentGrid').datagrid('reload');
            }
        });
    },
    /*
    添加部门信息
     */
    addDepartmentData:function(){
        var departmentName  = $('#departmentName').textbox('getValue');
        var departmentDescribe = $('#departmentDescribe').textbox('getValue');
        if(departmentName.trim()==""||departmentName==null){
            alert("部门名称不能为空！！！");
            return;
        }
        $.ajax({
            type: 'POST',
            url:$.Department.base+"/department/addDepartmentData.do",
            data:{
                departmentName:departmentName,
                departmentDescribe:departmentDescribe
            },
            success:function(data){
                if(data=="1"){
                    $('#addDialog').dialog('close');
                    alert(data);
                    $('#DepartmentGrid').datagrid('reload');
                }
                else{
                    alert("已存在该信息！！！");
                }

            }
        });
    },
    /*
    修改部门信息
     */
    updateDepartmentData:function(){
        var departmentId  = $('#departmentId').textbox('getValue');
        var departmentName  = $('#departmentName').textbox('getValue');
        var departmentDescribe = $('#departmentDescribe').textbox('getValue');
        if(departmentName.trim()==""||departmentName==null){
            alert("部门名称不能为空！！！");
            return;
        }
        $.ajax({
            url:$.Department.base+"/department/updateDepartmentData.do",
            type: 'POST',
            data:{
                departmentId:departmentId,
                departmentName:departmentName,
                departmentDescribe:departmentDescribe
            },
            success:function(data){
                if(data=="1")
                {
                    $('#addDialog').dialog('close');
                    alert(data);
                    $('#DepartmentGrid').datagrid('reload');
                    $("#DepartmentGrid").datagrid('clearSelections').datagrid('clearChecked');
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