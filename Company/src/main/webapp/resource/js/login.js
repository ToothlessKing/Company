/**
 * 登陆模块
 */
$.login =
{
    init : function ()
    {
        $(document).keydown(function(event)
        {
                if(event.keyCode==13) {
                    //$("button.btn-primary").click();
                    $.login.initSumbit();
                }
        });

    },
    /*
    登陆验证
     */
    initSumbit:function()
    {
        var username = $('#username').val();
        var password = $("#password").val();
        if(username==null||username.trim()==""){
            alert("用户名不能为空");
            return;
        }
        if(password==null||password.trim()==""){
            alert("密码不能为空");
            return;
        }
        $.ajax({
            type:'POST',
            url: $.common.base + "/user/login.do",
            data:{
                username:username,
                password:password
            },
            success:function(data){
                if(data == 1){
                    window.location.href="index.jsp";
                }
                else if(data == 0){
                    alert("密码错误！！！");
                }
                else{
                    alert("用户名错误");
                }
            }
        });

    }

}