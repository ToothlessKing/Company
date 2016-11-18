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
    <script src="../tool/jquery-easyui-1.4/locale/easyui-lang-zh_CN.js"></script>
    <!--下面的使easyui datagrid 行拖拽插件-->
    <script src="../tool/jquery-easyui-1.4/datagrid-dnd.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/UserInfo.js"></script>
    <script>
      $(function(){
        $.UserInfo.init();
      })
    </script>
</head>
<body>
<div style="width: 1050px;">
  <div id="ff" class="easyui-panel" title="个人信息" style="width: 800px;">
    <table cellpadding="5">
      <tr id="tr1" class="easyui-panel" closed="true">

          <td>
              <input class="easyui-textbox" type="text" id="password" style="width: 100px; "/>
          </td>
      </tr>
        <tr>
            <td>员工号:</td>
            <td><input class="easyui-textbox" type="text" id="employeeId" style="width: 100px;" readonly="true" />
            </td>
        </tr>
      <tr>
        <td>姓名:</td>
        <td><input class="easyui-textbox" type="text" id="employeeName" style="width: 100px;"/>
        </td>
      </tr>

      <tr>
        <td>性别:</td>
        <td>
            <select name=employeeSex" id="employeeSex" class="easyui-combobox"  style="width:100px;" panelHeight="auto">
                <option value="男">男</option>
                <option value="女">女</option>
            </select>
        </td>
      </tr>
      <tr>
        <td>联系电话:</td>
        <td>
          <input class="easyui-textbox" type="text" id="employeePhone" style="width: 100px;"/>
        </td>
      </tr>
      <tr>
        <td>电子邮件:</td>
        <td>
          <input class="easyui-textbox" type="text" id="employeeEmail" style="width: 100px;"/>
        </td>
      </tr>
      <tr>
        <td> <a href="javascript:void(0)" class="easyui-linkbutton"
                data-options="iconCls:'icon-ok'" id="editInfoBtn">修改</a>
        </td>
      </tr>

    </table>
  </div>
</div>
</body>
</html>
