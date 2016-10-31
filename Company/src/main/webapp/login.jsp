<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>后台管理登录</title>
    <link href="resource/css/admin_login.css" rel="stylesheet" type="text/css" />
    <script src="resource/js/login.js"></script>
</head>
<body>
<div class="admin_login_wrap">
    <h1>后台管理</h1>
    <div class="adming_login_border">
        <div class="admin_input">
            <form  class="form">
                <ul class="admin_items">
                    <li>
                        <label for="user">用户名：</label>
                        <input type="text" name="username" value="" onfocus="" id="username" size="40" class="admin_input_style" />
                    </li>
                    <li>
                        <label for="pwd">密码：</label>
                        <input type="password" name="password" value="" id="password" size="40" class="admin_input_style" />
                    </li>
                    <li>
                        <input type="button" tabindex="3" value="提交" onclick="login()" class="btn btn-primary" />
                    </li>
                </ul>
            </form>
        </div>
    </div>
    
</div>
</body>
</html>
