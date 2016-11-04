/**
 * Created by Administrator on 2016/11/3.
 */

$.Company =
{

    init :function(){
        $.Company.initTreeGrid();
        $.Company.initClickEvent();
        //$.Company.initCombo();
    },
    initTreeGrid :function(){
        $('#treeTable').treegrid({
            url: $.common.base+"/company/loadTree.do?companyId="+""+"&companyName="+"",
            idField:'companyId',
            treeField:'companyName',
            rownumbers:true,
            fitColumns:true,
            rownumbers: true,
            pagination: true,
            pageSize: 5,
            pageList: [5,10,20],
            //lines:true,
            columns:[[
                {title:'名称',field:'companyName',width:120},
                {title:'地址',field:'companyAddress',width:120},
                {title:'分公司id',field:'companyId',width:80},
                {title:'部门Id',field:'departmentId',width:60},
                {field:'action',title:'操作',width:100,
                    formatter:function(value,row,index){
                        var html="";
                        if(row.companyId!=""&&row.companyId!=null){
                            html = '<a href="#" id="updateBtn" onclick="$.Company.clickUpdate('+row.companyId+",'"+row.companyName+"','"+row.companyAddress+"'"+')">[修改]</a>'
                            +'<a href="#" id="deleBtn" onclick="$.Company.clickDele('+row.companyId+","+1+')">[删除]</a>';

                        }
                        return html;
                    }
                }
            ]],
            onBeforeLoad: function(row,param){
                console.log(row);
                console.log(param)
                if (!row) {	// load top level rows
                    param.id = 0;	// set id=0, indicate to load new page rows
                }
            },
            toolbar: [{
                iconCls: 'icon-add',
                text: '添加',
                handler: function(){
                    $.Company.load();
                    $.Company.initCombo();
                    $('#addDialog').dialog('open').dialog('setTitle','新增界面');
                }
             }]

    }).datagrid('getPager').pagination({
            beforePageText :'第',
            afterPageText :'页 共{pages}页',
            displayMsg:   '共{total}条记录'
        });

    },/*
    初始化点击事件
    */
    initClickEvent:function(){
        //对话框中保存按钮事件
        $('#saveBtn').click(function(){
            if($('#addDialog').panel('options').title=="新增界面"){
                $.Company.addCompanyData();
            }
            else{
                $.Company.updateCompanyData();
            }

        });
        //对话框取消按钮事件
        $('#cancelBtn').click(function(){
            $('#addDialog').dialog('close');
            $.Company.clearForm();
        });
        //查询按钮点击事件
        $('#findBtn').click(function(){
            var company_id= $('#company_id').textbox('getValue');
            var company_name = $('#company_name').textbox('getValue');
            $("#treeTable").treegrid({
                url: $.common.base+"/company/loadTree.do?companyId="+company_id+"&companyName="+company_name
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
    clickUpdate:function(companyId,companyName,companyAddress){
            $.Company.load();
            $.Company.initCombo();
            $.Company.loadChecked(companyId);

            $('#addDialog').dialog('open').dialog('setTitle','修改界面');
            //$('#fm').form('load',row);
            $('#companyId').textbox('setValue',companyId);
            $('#companyName').textbox('setValue',companyName);
            $('#companyAddress').textbox('setValue',companyAddress);
    },
    /*
     点击删除事件
     */
    clickDele: function(id,count) {
        alert(id);
        $.Company.removeCompanyData(id,count);
    },
    /*
     点击批量删除按钮事件
     */
    clickDeles:function(){
        var row = $('#treeTable').treegrid('getChecked');
        //alert(row);
        var id = "";
        for(var i=0; i<row.length; i++){
            id += row[i].roleId + ',';
        }
        $.Company.removeCompanyData(id,row.length);
    },
    /*
     删除信息(批量删除)
     */
    removeCompanyData:function(companyids,count){
        alert(companyids+" : "+count);
        $.ajax({
            type: 'POST',
            url:$.common.base+"/company/removeCompanyData.do",
            data:{
                companyids:companyids,
                count:count
            },
            success:function(data){
                alert(data);
                $('#treeTable').treegrid('reload');
            }
        });
    },
    /*
     添加信息
     */
    addCompanyData:function(){
        var companyId  = $('#companyId').textbox('getValue');
        var companyName  = $('#companyName').textbox('getValue');
        var companyAddress  = $('#companyAddress').textbox('getValue');
        var departmentId = $('#departmentName').combo('getValue');
        if(companyName.trim()==""||companyName==null){
            alert("名称不能为空！！！");
            return;
        }
        if(companyAddress.trim()==""||companyAddress==null){
            alert("地址不能为空！！！");
            return;
        }
        console.log(departmentId);
        
        $.ajax({
            type: 'POST',
            url:$.common.base+"/company/addCompanyData.do",
            data:{
                companyName:companyName,
                companyAddress:companyAddress,
                departmentIds:departmentId
            },
            success:function(data){
                if(data=="1"){
                    $('#addDialog').dialog('close');
                    alert(data);
                    $('#treeTable').treegrid('reload');
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
    updateCompanyData:function(){
        var companyId  = $('#companyId').textbox('getValue');
        var companyName  = $('#companyName').textbox('getValue');
        var companyAddress  = $('#companyAddress').textbox('getValue');
        var departmentId = $('#departmentName').combo('getValue');
        if(companyName.trim()==""||companyName==null){
            alert("名称不能为空！！！");
            return;
        }
        if(companyAddress.trim()==""||companyAddress==null){
            alert("地址不能为空！！！");
            return;
        }
        $.ajax({
            url:$.common.base+"/company/updateCompanyData.do",
            type: 'POST',
            data:{
                companyId:companyId,
                companyName:companyName,
                companyAddress:companyAddress,
                departmentIds:departmentId
            },
            success:function(data){
                if(data=="1")
                {
                    $('#addDialog').dialog('close');
                    alert(data);
                    $('#treeTable').treegrid('reload');
                    $("#treeTable").treegrid('clearSelections').treegrid('clearChecked');
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
    /*
    加载下拉复选框
     */
    load:function(){
        $.ajax({
            type:'POST',
            async:false,
            dataType:'json',
            url: $.common.base+"/department/queryAll.do",
            success:function(data){
                var html ="";

                console.log(data.length);
                for(var i=0 ;i<data.length;i++){
                    html +='<input type="checkbox" name="departmentName" value="'+data[i].departmentId+'"/>'
                    +'<span>'+data[i].departmentName+'</span><br/>';
                    console.log(data[i].departmentName);
                }
                $('#sp').html(html);
                //$.common.initCombo();
            }
        });

    },
    /*
    修改界面中加载下拉复选框选中值
     */
    loadChecked:function(companyId){
        $.ajax({
            type:'POST',
            url: $.common.base+"/department/queryBy.do",
            async:false,
            dataType:'json',
            data:{
                companyId:companyId
            },
            success:function(data){
                for(var i=0;i<data.length;i++){
                    $("input:checkbox[name='departmentName'][value='"+data[i].departmentId+"']").attr('checked',true);
                    var _value = "";
                    var _text = "";
                    $("[name=departmentName]:input:checked").each(function() {

                        _value += $(this).val() + ",";

                        _text += $(this).next("span").text() + ",";
                    });
                    //设置下拉选中值
                    $('#departmentName').combo('setValue', _value).combo(
                        'setText', _text);
                }
            }
        });
    },
    /*
    初始化下拉复选框点击事件
     */
    initCombo:function(){
        $('#departmentName').combo({
            required : true,
            editable : true,
            multiple : true
        });
        $('#sp').appendTo($('#departmentName').combo('panel'));

        $("#sp input")
            .click(
            function() {
                var _value = "";
                var _text = "";
                $("[name=departmentName]:input:checked").each(function() {

                    _value += $(this).val() + ",";

                    _text += $(this).next("span").text() + ",";
                });
                //设置下拉选中值
                $('#departmentName').combo('setValue', _value).combo(
                    'setText', _text);
            });
    }
}