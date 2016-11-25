/**
 * 分公司信息模块
 */

$.Company =
{
    editFlag:0,
    editId:null,
    userCompanyId:"",
    CompanyId:"",
    companyName:"",
    userPower:"",
    rows:0,
    page:0,
    pid:0,

    init :function(){
        $.common.init();
        $.Company.userPower = $.common.userPower.powerAction;
        var powerScope = $.common.userPower.powerScope;
        if(powerScope=="所在分公司"){
            $.Company.CompanyId= $.common.userPower.companyId;
            $.Company.userCompanyId= $.common.userPower.companyId;
        }
        $.Company.initTreeGrid();
        $.Company.initClickEvent();
        $("#editCoorBtn").hide();
        $("#saveCoorBtn").hide();
        $("#editScopeBtn").hide();
        $("#saveScopeBtn").hide();
        //$.Company.initCombo();
    },
    /*
    初始化树形表格
     */
    initTreeGrid :function(){

        $('#treeTable').treegrid({
            url: $.common.base+"/company/loadTree.do?companyId="+$.Company.userCompanyId+"&companyName="+$.Company.companyName,
            idField:'id',
            treeField:'companyName',
            rownumbers:true,
            fitColumns:true,
            pagination: true,
            pageSize: 5,
            pageList: [5,10,20],
            lines:true,
            columns:[[
                {field:'id',width:2,hidden:true},
                {title:'名称',field:'companyName',width:120},
                {title:'地址',field:'companyAddress',width:120},
                {title:'分公司id',field:'companyId',width:80},
                {title:'部门Id',field:'departmentId',width:40},
                {title:'坐标',field:'companyCoordinates',width:60,hidden:true},
                {title:'业务范围坐标',field:'companyScopeMap',width:60,hidden:true},
                {title:'公司邮箱',field:'companyEmail',width:170},
                {title:'负责人',field:'companyType',width:60},
                {title:'联系方式',field:'companyPhone',width:100},
                {title:'开始时间',field:'startTime',width:60},
                {title:'人员规模',field:'size',width:60},
                {title:'业务范围',field:'business',width:60},
                {field:'action',title:'操作',width:100,
                    formatter:function(value,row,index){
                        var html="";
                        if(row.companyId!=""&&row.companyId!=null){

                            html = '<a href="#" class="updateBtn" onclick="$.Company.clickUpdate('+row.companyId
                            +",'"+row.companyName+"','"+row.companyAddress
                            +"','"+row.companyEmail+"','"+row.companyType
                            +"','"+row.companyPhone+"','"+row.startTime
                            +"','"+row.size+"','"+row.business+"'"
                            +')">[修改]</a>'
                            +'<a href="#" class="deleBtn" onclick="$.Company.clickDele('+row.companyId+","+1+')">[删除]</a>';
                            console.log(html);
                        }
                        return html;
                    }
                }
            ]],
            onBeforeLoad: function(row,param){
                console.log(row);
                $.Company.rows = param.rows;
                $.Company.page = param.page;
                $.Company.pid = param.id;
                    if(row==null||(row._parentId!=null&&row._parentId!="")){
                        param.id = 0;
                        $.Company.pid=0;
                    }


            },
            onClickRow:function(row){
                if(row.companyId!=""&&row.companyId!=null){
                    $.Company.editId = row.companyId;
                    if($.Company.editFlag==0){
                        $("#editCoorBtn").show();
                        $("#saveCoorBtn").show();
                        $("#editScopeBtn").show();
                        $("#saveScopeBtn").show();
                    }
                    //if(row.companyCoordinates!=""&&row.companyCoordinates!=null){
                    //var coordinates= row.companyCoordinates.split(",");
                    $.map5.addMarker(row);
                    console.log("companyScopeMap:"+row.companyScopeMap);
                    if(row.companyScopeMap!=""&&row.companyScopeMap!=null){
                        $.map5.addPolygon(row);
                    }
                    //}
                }else{
                    $("#editCoorBtn").hide();
                    $("#saveCoorBtn").hide();
                    $("#editScopeBtn").hide();
                    $("#saveScopeBtn").hide();
                }
            },
            toolbar: [

                {
                    iconCls: 'icon-add',
                    text: '添加',
                        handler: function(){
                            $.Company.load();
                            $.Company.initCombo();
                            $.Company.clearForm();
                            $('#addDialog').dialog('open').dialog('setTitle','新增界面');
                        }
                }
            ],
            onLoadSuccess:function(row, data){
                if($.Company.CompanyId!=""&&$.Company.CompanyId!=null){
                    $('#formPanel').hide();
                    $('div.datagrid div.datagrid-toolbar').hide();
                }
                if($.Company.userPower.indexOf("公司修改")==-1){
                    $.Company.editFlag=1;
                    $(".updateBtn").hide();
                }
                if($.Company.userPower.indexOf("公司删除")==-1){
                    $(".deleBtn").hide();
                }
                if($.Company.pid==0){
                    $.map5.addGeoJson2( $.common.base+"/company/loadJson.do?companyId="+$.Company.userCompanyId+"&companyName="+$.Company.companyName+"&rows="+$.Company.rows+"&page="+$.Company.page+"&id="+$.Company.pid+"&flag="+"other");
                    //$.map5.addGeoJson( $.common.base+"/company/loadJson.do?companyId="+$.Company.userCompanyId+"&companyName="+$.Company.companyName+"&rows="+$.Company.rows+"&page="+$.Company.page+"&id="+$.Company.pid+"&flag="+"point");
                    //$.map5.addGeoJson2( $.common.base+"/company/loadJson.do?companyId="+$.Company.userCompanyId+"&companyName="+$.Company.companyName+"&rows="+$.Company.rows+"&page="+$.Company.page+"&id="+$.Company.pid+"&flag="+"polygo");
                    //console.log(data);
                    console.log(data.json);
                    $("#editCoorBtn").hide();
                    $("#saveCoorBtn").hide();
                    $("#editScopeBtn").hide();
                    $("#saveScopeBtn").hide();
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

            $.Company.userCompanyId= $('#company_id').textbox('getValue');
            $.Company.companyName = $('#company_name').textbox('getValue');
            $("#treeTable").treegrid({
                url: $.common.base+"/company/loadTree.do?companyId="+$.Company.userCompanyId+"&companyName="+$.Company.companyName
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
    clickUpdate:function(companyId,companyName,companyAddress,companyEmail,companyType,companyPhone,startTime,size,business){


            $.Company.load();
            $.Company.initCombo();
            $.Company.loadChecked(companyId);
            var rows = {
                companyId:companyId,
                companyName:companyName,
                companyAddress:companyAddress,
                companyEmail:companyEmail,
                companyType:companyType,
                companyPhone:companyPhone,
                startTime:startTime,
                size:size,
                business:business
            }

            $('#addDialog').dialog('open').dialog('setTitle','修改界面');
            $('#fm').form('load',rows);
            $('#companyId').textbox('setValue',rows.companyId);
            //$('#companyName').textbox('setValue',companyName);
            //$('#companyAddress').textbox('setValue',companyAddress);
    },
    /*
     点击删除事件
     */
    clickDele: function(id,count) {
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
        //alert(companyids+" : "+count);
        $.ajax({
            type: 'POST',
            url:$.common.base+"/company/removeCompanyData.do",
            data:{
                companyids:companyids,
                count:count
            },
            success:function(data){
                $.messager.alert("提示","操作成功");
                $('#treeTable').treegrid('reload');
            }
        });
    },
    /*
     添加信息
     */
    addCompanyData:function(){
        $("#companyId").textbox('setValue',0);
        $('#fm').form('submit',{
            url: $.common.base+"/company/addCompanyData.do",
            onSubmit: function () {
            //表单验证
                return $("#fm").form('validate');
            },
            success: function (data) {
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

        //$('#addDialog').dialog('close');
        //$('#treeTable').treegrid('reload');
        //var companyId  = $('#companyId').textbox('getValue');
        //var companyName  = $('#companyName').textbox('getValue');
        //var companyAddress  = $('#companyAddress').textbox('getValue');
        //var departmentId = $('#departmentName').combo('getValue');
        //var companyType = $("#companyType").textbox('getValue');
        //var companyEmail = $("#companyEmail").textbox('getValue');
        //var companyPhone = $("#companyPhone").textbox('getValue');
        //var startTime = $("#startTime").datebox('getValue');
        //var size = $("#size").combobox('getValue');
        //var business = $("#business").textbox('getValue');
        //
        //if(companyName.trim()==""||companyName==null){
        //    alert("名称不能为空！！！");
        //    return;
        //}
        //if(companyType.trim()==""||companyType==null){
        //    alert("负责人不能为空！！！");
        //    return;
        //}
        //if(companyPhone.trim()==""||companyPhone==null){
        //    alert("公司电话不能为空！！！");
        //    return;
        //}
        //if(companyAddress.trim()==""||companyAddress==null){
        //    alert("地址不能为空！！！");
        //    return;
        //}
        //
        //
        //$.ajax({
        //    type: 'POST',
        //    url:$.common.base+"/company/addCompanyData.do",
        //    data:{
        //        companyName:companyName,
        //        companyAddress:companyAddress,
        //        departmentIds:departmentId,
        //        companyType:companyType,
        //        companyEmail:companyEmail,
        //        companyPhone:companyPhone,
        //        startTime:startTime,
        //        size:size,
        //        business:business
        //    },
        //    success:function(data){
        //        if(data=="1"){
        //            $('#addDialog').dialog('close');
        //            alert(data);
        //            $('#treeTable').treegrid('reload');
        //        }
        //        else{
        //            alert("已存在该信息！！！");
        //        }
        //
        //    }
        //});
    },
    /*
     修改信息
     */
    updateCompanyData:function(){
        $('#fm').form('submit',{
            url: $.common.base+"/company/updateCompanyData.do",
            onSubmit: function () {
                //表单验证
                return $("#fm").form('validate');
            },
            success: function (data) {
                if(data=="1")
                {
                    $('#addDialog').dialog('close');
                    alert("更新成功");
                    $('#treeTable').treegrid('reload');
                    $("#treeTable").treegrid('clearSelections').treegrid('clearChecked');
                }
                else{
                    alert("更新失败");
                }
            }
        });
        //var companyId  = $('#companyId').textbox('getValue');
        //var companyName  = $('#companyName').textbox('getValue');
        //var companyAddress  = $('#companyAddress').textbox('getValue');
        //var departmentId = $('#departmentName').combo('getValue');
        //var companyType = $("#companyType").textbox('getValue');
        //var companyEmail = $("#companyEmail").textbox('getValue');
        //var companyPhone = $("#companyPhone").textbox('getValue');
        //var startTime = $("#startTime").datebox('getValue');
        //var size = $("#size").combobox('getValue');
        //var business = $("#business").textbox('getValue');
        //if(companyName.trim()==""||companyName==null){
        //    alert("名称不能为空！！！");
        //    return;
        //}
        //if(companyAddress.trim()==""||companyAddress==null){
        //    alert("地址不能为空！！！");
        //    return;
        //}
        //$.ajax({
        //    url:$.common.base+"/company/updateCompanyData.do",
        //    type: 'POST',
        //    data:{
        //        companyId:companyId,
        //        companyName:companyName,
        //        companyAddress:companyAddress,
        //        departmentIds:departmentId,
        //        companyType:companyType,
        //        companyEmail:companyEmail,
        //        companyPhone:companyPhone,
        //        startTime:startTime,
        //        size:size,
        //        business:business
        //    },
        //    success:function(data){
        //        if(data=="1")
        //        {
        //            $('#addDialog').dialog('close');
        //            alert(data);
        //            $('#treeTable').treegrid('reload');
        //            $("#treeTable").treegrid('clearSelections').treegrid('clearChecked');
        //        }
        //        else{
        //            alert("更新失败");
        //        }
        //
        //    }
        //});
    },
    /*
    对话框表单内容清除
     */
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
            //required : true,
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
    },
    /*
    修改分公司的坐标位置
     */
    saveCoor:function(){
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
                companyId: $.Company.editId
            },
            success:function(data){
                alert(data);
                $('#treeTable').treegrid('reload');
            }
        });
        console.log($.map5.coorX);
        console.log($.map5.coorY);
    },
    /*
    修改分公司市场范围
     */
    saveScope:function(){
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
                companyId: $.Company.editId
            },
            success:function(data){
                alert(data);
                $('#treeTable').treegrid('reload');
            }
        });
    }
}