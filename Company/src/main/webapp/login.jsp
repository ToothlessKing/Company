<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>后台管理登录</title>
    <link href="resource/css/admin_login.css" rel="stylesheet" type="text/css" />
    <script src="resource/tool/jquery-easyui-1.4/jquery.min.js"></script>
    <script src="resource/js/common.js"></script>
    <script src="resource/js/login.js"></script>
    <script>
        $.login.init();

    </script>
    <style>
        body {
            background: url("resource/tool/images/login3.jpg");
            background-repeat: no-repeat;
        }
    </style>
</head>
<body >
<div class="admin_login_wrap">
    <h1>登陆界面</h1>
    <div class="adming_login_border">
        <div class="admin_input">
            <form  class="form" id="loginFm">
                <ul class="admin_items">
                    <li>
                        <label for="user">用户名：</label>
                        <input type="text" name="username" value="" onfocus="" placeholder="请输入用户名或员工号" id="username" size="35" class="admin_input_style" />
                    </li>
                    <li>
                        <label for="pwd">密码：</label>
                        <input type="password" name="password" value="" id="password" placeholder="请输入密码" size="35" class="admin_input_style" />
                    </li>
                    <li>
                        <input type="button" tabindex="3" value="提交" onclick="$.login.initSumbit()" class="btn btn-primary" />
                    </li>
                </ul>
            </form>
        </div>
    </div>
    
</div>
</body>
</html>
