<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/11/3
  Time: 13:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
    <script src="../js/Company.js"></script>
    <script>
        $(function(){
            $.Company.init();
        })


    </script>
</head>
<body>
<div>
    <table>
        <tr>
            <td>分公司号：</td>
            <td>
                <input type="text" class="easyui-textbox" id="company_id" />
            </td>
            <td>分公司名：</td>
            <td>
                <input type="text" class="easyui-textbox" id="company_name" />
            </td>
            <td><a href="#" id="findBtn" class="easyui-linkbutton" iconCls="icon-search" >查询</a></td>
        </tr>
    </table>
</div>
    <table id="treeTable" style="width:600px;height:400px" >
    </table>
    <div id="addDialog" class="easyui-dialog"  closed="true" title="新增界面" buttons="#addDialog-buttons">
        <form id="fm">
            <table cellpadding="5">
                <tr id="div1" class="easyui-panel" closed="true">
                    <td>
                        <input type="text" class="easyui-textbox" id="companyId" name="companyId"/>
                    </td>
                </tr>
                <tr>
                    <td>名称：
                    </td>
                    <td>
                        <input type="text" class="easyui-textbox" id="companyName" name="companyName"/>
                    </td>
                </tr>
                <tr>
                    <td>地址：
                    </td>
                    <td>
                          <input type="text" class="easyui-textbox" id="companyAddress" name="companyAddress"/>
                    </td>
                </tr>
                <tr>
                    <td>下设部门：
                    </td>
                    <td>
                        <select name="departmentName" id="departmentName" style="width: 100px" panelHeight="auto"></select>
                        <div id="sp">
                            <%--<c:forEach items="${Depart}" var="b">--%>
                                <%--<input type="checkbox" name="departmentName" value="b.departmentId"/>--%>
                                <%--<span>${b.departmentName}</span> </br>--%>
                            <%--</c:forEach>--%>

                        </div>
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
