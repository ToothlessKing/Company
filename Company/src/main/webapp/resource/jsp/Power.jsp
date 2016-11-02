<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/10/26
  Time: 9:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<html>
<head>
  <title>部门信息</title>
  <link rel="stylesheet" href="../tool/jquery-easyui-1.4/themes/default/easyui.css">
  <link rel="stylesheet" href="../tool/jquery-easyui-1.4/themes/icon.css">
  <script src="../tool/jquery-easyui-1.4/jquery.min.js"></script>
  <script src="../tool/jquery-easyui-1.4/jquery.easyui.min.js"></script>
  <!--下面的使easyui datagrid 行拖拽插件-->
  <script src="../tool/jquery-easyui-1.4/datagrid-dnd.js"></script>
  <script src="../js/common.js"></script>
  <script src="../js/Power.js"></script>
  <script>
    $(function(){
      $.Power.init();
    })
  </script>
</head>
<body>
<div>
  <table>
    <tr>
      <td>权限组：</td>
      <td>
        <input type="text" class="easyui-textbox" id="power_name" />
      </td>
      <td>包含权限：</td>
      <td>
        <input type="text" class="easyui-textbox" id="power_action" />
      </td>
      <td><a href="#" id="findBtn" class="easyui-linkbutton" iconCls="icon-search" >查询</a></td>
    </tr>
  </table>
</div>
<div style="width:auto;height:500px">
  <table id="PowerGrid">
  </table>
</div>
<%--添加对话框弹出--%>
<div id="addDialog" class="easyui-dialog" closed="true" title="新增界面" style="width: 450px" buttons="#addDialog-buttons">
  <table cellpadding="5">
    <tr id="div1" class="easyui-panel" closed="true">
      <td>
        <input type="text"  class="easyui-textbox" id="powerId"  name="powerId"/>
      </td>
    </tr>
    <tr>
      <td>权限组名：</td>
      <td>
        <input type="text" class="easyui-textbox" id="powerName" />
      </td>
    </tr>
    <tr>
      <td>应用范围：</td>
      <td> <input type="radio" class="radioGroup" name="powerScope" value="整个公司" />整个公司&nbsp
        <input type="radio" class="radioGroup" name="powerScope" value="所在分公司" />所在分公司&nbsp</td>
    </tr>
    <tr>
      <td>&nbsp部门管理</td>
      <td>
        <input type="checkbox" class="easyui-checkbox checkGroup" value="部门浏览" />浏览&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="部门添加" />添加&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="部门修改" />修改&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="部门删除" />删除
      </td>
    </tr>
    <tr>
      <td>&nbsp员工管理</td>
      <td>
        <input type="checkbox" class="easyui-checkbox checkGroup" value="员工浏览" />浏览&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="员工添加" />添加&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="员工修改" />修改&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="员工删除" />删除
      </td>
    </tr>
    <tr>
      <td>&nbsp公司管理</td>
      <td>
        <input type="checkbox" class="easyui-checkbox checkGroup" value="公司浏览" />浏览&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="公司添加" />添加&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="公司修改" />修改&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="公司删除" />删除
      </td>
    </tr>
    <tr>
      <td>&nbsp角色管理</td>
      <td>
        <input type="checkbox" class="easyui-checkbox checkGroup" value="角色浏览" />浏览&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="角色添加" />添加&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="角色修改" />修改&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="角色删除" />删除
      </td>
    </tr>
    <tr>
      <td>&nbsp权限管理</td>
      <td>
        <input type="checkbox" class="easyui-checkbox checkGroup" value="权限浏览" />浏览&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="权限添加" />添加&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="权限修改" />修改&nbsp
        <input type="checkbox" class="easyui-checkbox checkGroup" value="权限删除" />删除
      </td>
    </tr>
  </table>
</div>
<div id="addDialog-buttons">
  <a href="#" id="saveBtn" class="easyui-linkbutton" iconCls="icon-ok" >保存</a>
  <a href="#" id="cancelBtn" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
</div>
</body>
</html>
