/**
 * 个人信息的展示修改模块.
 */
$.UserInfo =
{
    init:function(){
        $.ajax({
            type:"POST",
            async:false,
            dataType: "json",
            url: $.common.base+"/user/getUserMag.do",
            success:function(data){
                $.common.loginUser = data.loginUser;
                $.common.userPower = data.userPower;
                //$.common.setDisable();
            }
        });
        $("#password").textbox('setValue',$.common.loginUser.password);
        $("#employeeId").textbox('setValue',$.common.loginUser.employeeId);
        $("#employeeName").textbox('setValue',$.common.loginUser.employeeName);
        $("#employeeSex").combobox('setValue',$.common.loginUser.employeeSex);
        $("#employeePhone").textbox('setValue',$.common.loginUser.employeePhone);
        $("#employeeEmail").textbox('setValue',$.common.loginUser.employeeEmail);

        $('#editInfoBtn').bind('click',function(){
            var password = $('#password').textbox('getValue');
            var employeeId = $('#employeeId').textbox('getValue');
            var employeeName = $('#employeeName').textbox('getValue');
            var employeeSex = $('#employeeSex').combobox('getValue');
            var employeePhone = $('#employeePhone').textbox('getValue');
            var employeeEmail = $('#employeeEmail').textbox('getValue');
            alert(employeeSex);
            if(!employeePhone.match(/^[0-9]+$/) || employeePhone.length != 11){
                alert("手机号格式有误！！");
                return;
            }
            if(!employeeEmail.match(/^[\d,a-z]([\w\.\-]+)@([a-z0-9\-]+).([a-z\.]+[a-z])$/i)){
                alert("邮箱格式格式有误！！");
                return;
            }
            if(employeeName==""){
                alert("名称不能为空！！");
                return;
            }
            $.ajax({
                type: 'POST',
                url:$.common.base+"/employee/updateEmployeeData.do",
                data:{
                    employeeId:employeeId,
                    departmentId:0,
                    roleId:0,
                    companyId:0,
                    employeeName:employeeName,
                    employeeSex:employeeSex,
                    employeePhone:employeePhone,
                    //departmentName:departmentName,
                    //companyName:companyName,
                    //roleName:roleName,
                    employeeEmail:employeeEmail,
                    password:password,
                    action:"editInfo"
                },
                success:function(data){
                    if(data=="1")
                    {
                        alert("更新成功");
                    }
                    else{
                        alert("更新失败");
                    }
                }
            });
        })

    }
}