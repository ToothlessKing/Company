/**
 * Created by Administrator on 2016/11/2.
 */
$.Repass = {

    init:function(){
        $.ajax({
            type:"POST",
            async:false,
            dataType: "json",
            url: $.common.base+"/user/getUserMag.do",
            success:function(data){
                alert(data.loginUser.password);
                $.common.loginUser = data.loginUser;
                $.common.userPower = data.userPower;
                //$.common.setDisable();

            }
        });
        $("#password1").textbox('setValue',$.common.loginUser.password);
        $("#username").textbox('setValue',$.common.loginUser.employeeName);

        $('#editBtn').bind('click',function(){
            var password1 = $('#password1').textbox('getValue');
            var username = $('#username').textbox('getValue');
            var password = $('#password').textbox('getValue');
            var newpass = $('#newpass').textbox('getValue');
            var repass = $('#repass').textbox('getValue');
            if(password==('')||newpass==('')||repass==('')){
                $.messager.alert("错误提示", "请输入完整信息！");
                return;
            }
            if(password1!=password){
                $.messager.alert("错误提示", "原密码输入错误！");
                return;
            }
            if(newpass!=repass){
                $.messager.alert("错误提示", "确认密码与新密码不一致！");
                return;
            }
            $.ajax({
                type: 'POST',
                url:$.common.base+"/employee/updateEmployeeData.do",
                data:{
                    employeeId:$.common.loginUser.employeeId,
                    departmentId:0,
                    roleId:0,
                    companyId:0,
                    employeeName:$.common.loginUser.employeeName,
                    employeeSex:$.common.loginUser.employeeSex,
                    employeePhone:$.common.loginUser.employeePhone,
                    //departmentName:departmentName,
                    //companyName:companyName,
                    //roleName:roleName,
                    employeeEmail:$.common.loginUser.employeeEmail,
                    password:newpass,
                    action:"editPass"
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