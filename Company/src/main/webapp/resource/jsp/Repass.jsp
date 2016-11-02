<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/11/2
  Time: 16:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <link rel="stylesheet" href="../tool/jquery-easyui-1.4/themes/default/easyui.css">
    <link rel="stylesheet" href="../tool/jquery-easyui-1.4/themes/icon.css">
    <script src="../tool/jquery-easyui-1.4/jquery.min.js"></script>
    <script src="../tool/jquery-easyui-1.4/jquery.easyui.min.js"></script>
    <!--下面的使easyui datagrid 行拖拽插件-->
    <script src="../tool/jquery-easyui-1.4/datagrid-dnd.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/Repass.js"></script>
    <script>
      $(function(){
        $.Repass.init();
      })
    </script>
</head>
<body>
<div style="width: 1050px;">
  <div id="ff" class="easyui-panel" title="密码修改" style="width: 800px;">
    <table cellpadding="5">
      <tr id="tr1" class="easyui-panel" closed="true">
        <td>原来密码:</td>
        <td>
          <input class="easyui-textbox" type="text" id="password1" style="width: 100px; "></input>
        </td>
      </tr>
      <tr>
        <td>用户名:</td>
        <td><input class="easyui-textbox" type="text" id="username" style="width: 100px;"readonly="true" ></input>
        </td>
      </tr>

      <tr>
        <td>原来密码:</td>
        <td>
          <input class="easyui-textbox" type="password" id="password" style="width: 100px;"></input>
        </td>
      </tr>
      <tr>
        <td>新密码:</td>
        <td>
          <input class="easyui-textbox" type="password" id="newpass" style="width: 100px;"></input>
        </td>
      </tr>
      <tr>
        <td>确认密码:</td>
        <td>
          <input class="easyui-textbox" type="password" id="repass" style="width: 100px;"></input>
        </td>
      </tr>
      <tr>
        <td> <a href="javascript:void(0)" class="easyui-linkbutton"
                data-options="iconCls:'icon-ok'" id="editBtn">修改</a>
        </td>
      </tr>

    </table>
  </div>
</div>
</body>
</html>
