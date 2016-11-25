/**
 *公共信息管理
 */
$.common = {
    //地址前缀
    base:"/Company",
    loginUser:null,
    userPower:null,
    /*
     初始化
     获取用户的信息
     */
    init:function(){
        $.ajax({
            type:"POST",
            dataType: "json",
            async:false,
            url: $.common.base+"/user/getUserMag.do",
            success:function(data){
                $.common.loginUser = data.loginUser;
                $.common.userPower = data.userPower;
                $.common.setDisable();
            }
        })
    },
    /*
    设置模块禁用
    根据当前用户的拥有权限，对其无法使用的模块进行禁用
     */
    setDisable:function(){
        var userPower = $.common.userPower.powerAction;
        if(userPower.indexOf("员工浏览")==-1){
            $("#accordion").accordion(
                'remove',"员工管理"
            )
        }
        if(userPower.indexOf("部门浏览")==-1){
            $("#accordion").accordion(
                'remove',"部门管理"
            )
        }if(userPower.indexOf("公司浏览")==-1){
            $("#accordion").accordion(
                'remove',"分公司管理"
            )
        }
        if(userPower.indexOf("角色浏览")==-1){
            $("#pUl li:first-child").remove();
        }
        if(userPower.indexOf("权限浏览")==-1){
            $("#pUl li:last-child").remove();
        }
        if(userPower.indexOf("角色浏览")==-1&&userPower.indexOf("权限浏览")==-1){
            $("#accordion").accordion(
                'remove',"权限管理"
            )
        }
    }
};