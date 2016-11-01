<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/10/27
  Time: 11:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>员工信息</title>
    <link rel="stylesheet" href="../tool/jquery-easyui-1.4/themes/default/easyui.css">
    <link rel="stylesheet" href="../tool/jquery-easyui-1.4/themes/icon.css">
    <script src="../tool/jquery-easyui-1.4/jquery.min.js"></script>
    <script src="../tool/jquery-easyui-1.4/jquery.easyui.min.js"></script>
    <!--下面的使easyui datagrid 行拖拽插件-->
    <script src="../tool/jquery-easyui-1.4/datagrid-dnd.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/Employee.js"></script>
    <script>
      $(function(){
        $.Employee.init();
      })
    </script>
</head>
<body >
  <div>
    <table>
      <tr>
        <td>员工号：</td>
        <td>
          <input type="text" class="easyui-textbox" id="employee_id" />
        </td>
        <td>员工名：</td>
        <td>
          <input type="text" class="easyui-textbox" id="employee_name" />
        </td>
        <td><a href="#" id="findBtn" class="easyui-linkbutton" iconCls="icon-search" >查询</a></td>
      </tr>
    </table>
  </div>
  <div style="height: 500px">
    <table id="EmployeeGrid">
    </table>
  </div>
  <%--添加对话框弹出--%>
  <div id="addDialog" class="easyui-dialog" closed="true" title="新增界面" buttons="#addDialog-buttons">
    <form id="fm">
      <table cellpadding="5">
        <tr id="div1" class="easyui-panel" closed="true">
          <td>
            <input type="text"  class="easyui-textbox" id="employeeId"  name="employeeId"/>
          </td>
          <td>
            <input type="text" class="easyui-textbox" id="departmentId" name="departmentId"/>
          </td>
          <td>
            <input type="text" class="easyui-textbox" id="roleId" name="roleId"/>
          </td>
          <td>
            <input type="text" class="easyui-textbox" id="companyId" name="companyId"/>
          </td>
          <td>
            <input type="text" class="easyui-textbox" id="password" name="password"/>
          </td>
        </tr>
        <tr>
          <td>员工名：
          </td>
          <td>
            <input type="text" class="easyui-textbox" id="employeeName" name="employeeName"/>
          </td>
        </tr>
        <tr>
          <td>性别：
          </td>
          <td>
            <%--<input type="text" class="easyui-textbox" id="employeeSex" name="employeeSex"/>--%>
            <select name=employeeSex" id="employeeSex" class="easyui-combobox"  style="width:100px;" panelHeight="auto">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>联系方式：
          </td>
          <td>
            <input type="text" class="easyui-textbox" id="employeePhone" name="employeePhone"/>
          </td>
        </tr>
        <tr>
          <td>地址邮箱：
          </td>
          <td>
            <input type="text" class="easyui-textbox" id="employeeEmail" name="employeeEmail"/>
          </td>
        </tr>
        <tr>
          <td>部门名：
          </td>
          <td>
            <input type="text" class="easyui-combobox" id="departmentName" name="departmentName"/>
          </td>
        </tr>
        <tr>
          <td>分公司名：
          </td>
          <td>
            <input type="text" class="easyui-combobox" id="companyName" name="companyName"/>
          </td>
        </tr>
        <tr>
          <td>角色：
          </td>
          <td>
            <input type="text" class="easyui-combobox" id="roleName" name="roleName"/>
          </td>
        </tr>
      </table>
    </form>
  </div>
  <div id="addDialog-buttons">
    <a href="#" id="saveBtn" class="easyui-linkbutton" iconCls="icon-ok" >保存</a>
    <a href="#" id="cancelBtn" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
  </div>
</body>
</html>
