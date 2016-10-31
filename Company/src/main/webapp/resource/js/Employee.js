/**
 * Created by Administrator on 2016/10/27.
 */
$.Employee =
{
    employeeNo:"",
    employeeName:"",
    columns:[
        {field:'checkbox',checkbox:true},
        {field:'employee_id',title:'员工号',width:50,sortable:true},
        {field:'employee_name',title:'员工名',width:100,sortable:true},
        {field:'department_id',title:'所属部门',width:100,sortable:true},
        {field:'company_name',title:'分公司公司名',width:100,sortable:true},
        {field:'employee_sex',title:'员工性别',width:100,sortable:true},
        {field:'employee_phone',title:'联系方式',width:100,sortable:true},
        {field:'employee_email',title:'邮箱地址',width:100,sortable:true},
        {field:'role_name',title:'系统角色',width:100,sortable:true},
        {field:'action',title:'操作',width:100,
            formatter:function(value,row,index){
                var html = '<a href="#" id="updateBtn" onclick="$.Employee.clickUpdate('+index+')">[修改]</a>'
                    +'<a href="#" id="deleBtn" onclick="$.Employee.clickDele('+row.department_id+","+1+')">[删除]</a>';
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

    },
    /*
     初始化表格 默认全部查找
     分页 每页20
     */
    initDataGrid:function()
    {
        $("#EmployeeGrid").datagrid({
            url:"/department/queryEmployeeDate.do?departmentNo="+$.Employee.departmentNo+"&departmentName="+$.Employee.departmentName,
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
            $.Employee.departmentNo = $('#departmentId').textbox('getValue');
            $.Employee.departmentName = $('#departmentName').textbox('getValue');
            $("#EmployeeGrid").datagrid({
                url:"/department/queryEmployeeDate.do?departmentNo="+$.Employee.departmentNo+"&departmentName="+$.Employee.departmentName
            });

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
            id += row[i].department_id + ',';
        }
        $.Employee.removeEmployeeData(id,row.length);
    },
    /*
     删除部门信息(批量删除)
     @param 部门编号（多个则中间用，隔开）
     @param 个数
     */
    removeEmployeeData:function(departmentids,count){
        alert(departmentids+" : "+count);
        $.ajax({
            url:"/department/removeEmployeeData.do",
            data:{
                departmentids:departmentids,
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
        var department_name  = $('#department_name').textbox('getValue');
        var department_describe = $('#department_describe').textbox('getValue');
        if(department_name.trim()==""||department_name==null){
            alert("部门名称不能为空！！！");
            return;
        }
        $.ajax({
            url:"/department/addEmployeeData.do",
            data:{
                department_name:department_name,
                department_describe:department_describe
            },
            success:function(data){
                if(data=="1"){
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
        var department_id  = $('#department_id').textbox('getValue');
        var department_name  = $('#department_name').textbox('getValue');
        var department_describe = $('#department_describe').textbox('getValue');
        if(department_name.trim()==""||department_name==null){
            alert("部门名称不能为空！！！");
            return;
        }
        $.ajax({
            url:"/department/updateEmployeeData.do",
            data:{
                department_id:department_id,
                department_name:department_name,
                department_describe:department_describe
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
    }
}