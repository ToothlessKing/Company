/**
 * Created by Administrator on 2016/10/27.
 */
$.Employee =
{
    employeeId:"",
    employeeName:"",
    columns:[
        {field:'checkbox',checkbox:true},
        {field:'employeeId',title:'员工号',width:50,sortable:true},
        {field:'employeeName',title:'员工名',width:100,sortable:true},
        {field:'departmentId',title:'部门id',width:100,sortable:true},
        {field:'departmentName',title:'部门姓名',width:100,sortable:true},
        {field:'companyId',title:'分公司id',width:100,sortable:true},
        {field:'companyName',title:'分公司名',width:100,sortable:true},
        {field:'employeeSex',title:'员工性别',width:100,sortable:true},
        {field:'employeePhone',title:'联系方式',width:100,sortable:true},
        {field:'employeeEmail',title:'邮箱地址',width:100,sortable:true},
        {field:'roleId',title:'角色id',width:100,sortable:true},
        {field:'roleName',title:'系统角色',width:100,sortable:true},
        {field:'password',title:'系统角色',width:100,sortable:true,hidden:true},
        {field:'action',title:'操作',width:100,
            formatter:function(value,row,index){
                var html = '<a href="#" id="updateBtn" onclick="$.Employee.clickUpdate('+index+')">[修改]</a>'
                    +'<a href="#" id="deleBtn" onclick="$.Employee.clickDele('+row.employeeId+","+1+')">[删除]</a>';
                return html;
            }
        }
    ],
    /*
     入口方法
     */
    init:function()
    {
        $.Employee.initDataGrid();
        $.Employee.initClickEvent();
        $.Employee.loadCombobox();
    },
    /*
     初始化表格 默认全部查找
     分页 每页20
     */
    initDataGrid:function()
    {
        $("#EmployeeGrid").datagrid({
            url:$.common.base+"/employee/queryEmployeeData.do?employeeId="+$.Employee.employeeId+"&employeeName="+$.Employee.employeeName,
            pagination:true,
            singleSelect:false,
            columns :  [$.Employee.columns] ,
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
                        $.Employee.clearForm();
                        $('#addDialog').dialog('open').dialog('setTitle','新增界面');
                    }
                }, {
                    iconCls:'icon-remove',
                    text: '批量删除',
                    handler:function () {
                        $.Employee.clickDeles();
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
                $.Employee.addEmployeeData();
            }
            else{
                $.Employee.updateEmployeeData();
            }

        });
        //对话框取消按钮事件
        $('#cancelBtn').click(function(){
            $('#addDialog').dialog('close');
            $.Employee.clearForm();
        });
        //查询按钮点击事件
        $('#findBtn').click(function(){
            $.Employee.employeeId = $('#employee_id').textbox('getValue');
            $.Employee.employeeName = $('#employee_name').textbox('getValue');
            $("#EmployeeGrid").datagrid({
                url:$.common.base+"/employee/queryEmployeeData.do?employeeId="+$.Employee.employeeId+"&employeeName="+$.Employee.employeeName
            });

        });
        $("#departmentName").combobox({
            onChange: function (newVal, oldVal) {
                $("#departmentId").textbox('setValue', newVal);
            }
        });
        $("#companyName").combobox({
            onChange: function (newVal, oldVal) {
                $("#companyId").textbox('setValue', newVal);
            }
        });
        $("#roleName").combobox({
            onChange: function (newVal, oldVal) {
                $("#roleId").textbox('setValue', newVal);
            }
        });
    },
    /*
     点击修改事件
     */
    clickUpdate:function(index){
        var rows = $('#EmployeeGrid').datagrid('getRows');
        var row = rows[index];
        if (row){
            $('#addDialog').dialog('open').dialog('setTitle','修改界面');
            $('#fm').form('load',row);
            $('#employeeSex').combobox('select',row.employeeSex);
            if(row.departmentId!=null&&row.departmentId!=""&&row.departmentId!="null"){
                $('#departmentName').combobox('select',row.departmentId);
            }
            if(row.companyId!=null&&row.companyId!=""&&row.companyId!="null"){
                $('#companyName').combobox('select',row.companyId);
            }
            if(row.roleId!=null&&row.roleId!=""&&row.roleId!="null"){
                $('#').combobox('select',row.roleId);
            }


        }
    },
    /*
     点击删除事件
     */
    clickDele: function(id,count) {
        $.Employee.removeEmployeeData(id,count);
    },
    /*
     点击批量删除按钮事件
     */
    clickDeles:function(){
        var row = $('#EmployeeGrid').datagrid('getChecked');
        //alert(row);
        var id = "";
        for(var i=0; i<row.length; i++){
            id += row[i].employee_id + ',';
        }
        $.Employee.removeEmployeeData(id,row.length);
    },
    /*
     删除部门信息(批量删除)
     @param 部门编号（多个则中间用，隔开）
     @param 个数
     */
    removeEmployeeData:function(employeeids,count){
        alert(employeeids+" : "+count);
        $.ajax({
            url:$.common.base+"/employee/removeEmployeeData.do",
            data:{
                employeeids:employeeids,
                count:count
            },
            success:function(data){
                alert(data);
                $('#EmployeeGrid').datagrid('reload');
            }
        });
    },
    /*
     添加部门信息
     */
    addEmployeeData:function(){
        var employeeId  = $('#employeeId').textbox('getValue');
        var departmentId  = $('#departmentId').textbox('getValue');
        var roleId  = $('#roleId').textbox('getValue');
        var companyId  = $('#companyId').textbox('getValue');
        var employeeName  = $('#employeeName').textbox('getValue');
        var employeeSex  = $('#employeeSex').textbox('getValue');
        var employeePhone  = $('#employeePhone').textbox('getValue');
        var employeeEmail = $("#employeeEmail").textbox('getValue');
        //var departmentName = $('#departmentName').textbox('getValue');
        //var companyName = $('#companyName').textbox('getValue');
        //var roleName = $('#roleName').textbox('getValue');
        //var password = $('#password').textbox('getValue');
        var password = "123456";
        if(employeeName.trim()==""||employeeName==null){
            alert("名称不能为空！！！");
            return;
        }
        $.ajax({
            type: 'POST',
            url:$.common.base+"/employee/addEmployeeData.do",
            data:{
                //employeeId:employeeId,
                departmentId:departmentId,
                roleId:roleId,
                companyId:companyId,
                employeeName:employeeName,
                employeeSex:employeeSex,
                employeePhone:employeePhone,
                //departmentName:departmentName,
                //companyName:companyName,
                //roleName:roleName,
                employeeEmail:employeeEmail,
                password:password
            },
            success:function(data){
                if(data!="0"&&data!=0){
                    $('#addDialog').dialog('close');
                    alert(data);
                    $('#EmployeeGrid').datagrid('reload');
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
    updateEmployeeData:function(){
        var employeeId  = $('#employeeId').textbox('getValue');
        var departmentId  = $('#departmentId').textbox('getValue');
        var roleId  = $('#roleId').textbox('getValue');
        var companyId  = $('#companyId').textbox('getValue');
        var employeeName  = $('#employeeName').textbox('getValue');
        var employeeSex  = $('#employeeSex').textbox('getValue');
        var employeePhone  = $('#employeePhone').textbox('getValue');
        var employeeEmail = $("#employeeEmail").textbox('getValue');
        //var departmentName = $('#departmentName').textbox('getValue');
        //var companyName = $('#companyName').textbox('getValue');
        //var roleName = $('#roleName').textbox('getValue');
        var password = $('#password').textbox('getValue');
        if(employeeName.trim()==""||employeeName==null){
            alert("名称不能为空！！！");
            return;
        }
        $.ajax({
            type: 'POST',
            url:$.common.base+"/employee/updateEmployeeData.do",
            data:{
                employeeId:employeeId,
                departmentId:departmentId,
                roleId:roleId,
                companyId:companyId,
                employeeName:employeeName,
                employeeSex:employeeSex,
                employeePhone:employeePhone,
                //departmentName:departmentName,
                //companyName:companyName,
                //roleName:roleName,
                employeeEmail:employeeEmail,
                password:password
            },
            success:function(data){
                if(data=="1")
                {
                    $('#addDialog').dialog('close');
                    alert(data);
                    $('#EmployeeGrid').datagrid('reload');
                    $("#EmployeeGrid").datagrid('clearSelections').datagrid('clearChecked');
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
    loadCombobox:function(){
        $("#departmentName").combobox({
            url: $.common.base+"/department/queryAll.do",
            valueField: "departmentId",
            textField: "departmentName",
            panelHeight: "auto",
            editable: false,
            onLoadSuccess: function (data) { //加载完成后,设置选中第一项
                $('#departmentName').combobox('select', data[0].departmentId);
            }
        });
        $("#companyName").combobox({
            url: $.common.base+"/company/queryAll.do",
            valueField: "companyId",
            textField: "companyName",
            panelHeight: "auto",
            editable: false,
            onLoadSuccess: function (data) { //加载完成后,设置选中第一项
                $('#companyName').combobox('select', data[0].companyId);
            }
        });
        $("#roleName").combobox({
            url: $.common.base+"/role/queryAll.do",
            valueField: "roleId",
            textField: "roleName",
            panelHeight: "auto",
            editable: false,
            onLoadSuccess: function (data) { //加载完成后,设置选中第一项
                $('#roleName').combobox('select', data[0].roleName);
            }
        });
    }
}