<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/10/26
  Time: 9:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
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
    <script src="../js/Department.js"></script>
    <script>
      $(function(){
        $.Department.init();
      })
    </script>
</head>
<body >
    <div>
        <table>
            <tr>
                <td>部门号：</td>
                <td>
                    <input type="text" class="easyui-textbox" id="department_id" />
                </td>
                <td>部门名：</td>
                <td>
                    <input type="text" class="easyui-textbox" id="department_name" />
                </td>
                <td><a href="#" id="findBtn" class="easyui-linkbutton" iconCls="icon-search" >查询</a></td>
            </tr>
        </table>
    </div>
    <div style="width:500px;height: 500px">
      <table id="DepartmentGrid">
      </table>
    </div>
    <%--添加对话框弹出--%>
    <div id="addDialog" class="easyui-dialog" closed="true" title="新增界面" buttons="#addDialog-buttons">
        <form id="fm">
            <table cellpadding="5">
                <tr id="div1" class="easyui-panel" closed="true">
                   <td>
                       <input type="text"  class="easyui-textbox" id="departmentId"  name="departmentId"/>
                   </td>
                </tr>
                <tr>
                    <td>部门名：
                    </td>
                    <td>
                        <input type="text" class="easyui-textbox" id="departmentName" name="departmentName"/>
                    </td>
                </tr>
                <tr>
                    <td>部门说明：
                    </td>
                    <td>
                        <input class="easyui-textbox" id="departmentDescribe" name="departmentDescribe" data-options="multiline:true" style="height:60px"/>
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
