/**
 * Created by Administrator on 2016/10/28.
 */
$.common = {
    base:"",
    loginUser:null,
    userPower:null,
    init:function(){
        $.ajax({
            type:"POST",
            dataType: "json",
            url: $.common.base+"/user/getUserMag.do",
            success:function(data){
                $.common.loginUser = data.loginUser;
                $.common.userPower = data.userPower;
                $.common.setDisable();
            }
        })
    },
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