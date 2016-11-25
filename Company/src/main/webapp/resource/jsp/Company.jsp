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
    <link rel="stylesheet" type="text/css" href="../tool/Map5/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../tool/Map5/Map5.min.css">
    <script src="../tool/jquery-easyui-1.4/jquery.min.js"></script>
    <script src="../tool/jquery-easyui-1.4/jquery.easyui.min.js"></script>
    <script src="../tool/jquery-easyui-1.4/locale/easyui-lang-zh_CN.js"></script>
    <!--下面的使easyui datagrid 行拖拽插件-->
    <script src="../tool/jquery-easyui-1.4/datagrid-dnd.js"></script>
    <script type="text/javascript" src="../tool/Map5/bootstrap.min.js"></script>
    <script type="text/javascript" src="../tool/Map5/Map5.min.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/Company.js"></script>
    <script src="../js/map.js"></script>
    <script>
        $(function(){
            $.map5.init();
            $.Company.init();

        })

    </script>
    <style type="text/css">
        .datagrid .panel-body  {
            padding: 0px;
        }
        .dialog-button{
            padding: 0px;
        }
        .panel-title{
            font-size: 8px;
        }
        *{
            font-family: '微软雅黑', '宋体'
        }
        #formTb {
            display: table;
            border-collapse: separate;
            border-spacing: 8px;
            border-color: grey;
        }
    </style>
</head>
<body>
    <div  class="" title="  " id="formPanel" style="width: 100%" >
        <table>
            <tr>
                <td>&nbsp;分公司号：</td>
                <td>
                    <input type="text" class="easyui-textbox" id="company_id" />
                </td>
                <td>&nbsp;分公司名：</td>
                <td>
                    <input type="text" class="easyui-textbox" id="company_name" />
                </td>
                <td>&nbsp;<a href="#" id="findBtn" class="easyui-linkbutton" iconCls="icon-search" >查询</a></td>
            </tr>
        </table>
    </div>

    <table id="treeTable" style="width:100%;height:28%" >
    </table>
    <div id="addDialog" class="easyui-dialog"  closed="true" title="新增界面" buttons="#addDialog-buttons">
        <form id="fm" method="post" >
            <table cellpadding="5" id="formTb" >
                <div id="div1" class="easyui-panel" closed="true">
                        <input type="text" class="easyui-textbox" id="companyId" name="companyId"/>
                </div>
                <tr>
                    <td>公司名称：
                    </td>
                    <td>
                        <input type="text" class="easyui-textbox" id="companyName" data-options="required:true" name="companyName"/>
                    </td>
                </tr>

                <tr>
                    <td>公司地址：
                    </td>
                    <td>
                          <input type="text" class="easyui-textbox" id="companyAddress" data-options="required:true" name="companyAddress"/>
                    </td>
                </tr>
                <tr>
                    <td>下设部门：
                    </td>
                    <td>
                        <select name="departmentName" id="departmentName"  style="width: 100px" panelHeight="auto"></select>
                        <div id="sp">
                            <%--<c:forEach items="${Depart}" var="b">--%>
                                <%--<input type="checkbox" name="departmentName" value="b.departmentId"/>--%>
                                <%--<span>${b.departmentName}</span> </br>--%>
                            <%--</c:forEach>--%>
                        </div>
                    </td>
                </tr>
                 <tr>
                     <td>负责人：</td>
                     <td>
                         <input type="text" class="easyui-textbox" id="companyType" data-options="required:true" name="companyType"/>
                     </td>
                 </tr>
                <tr>
                    <td>公司邮箱：</td>
                    <td>
                        <input data-options="prompt:'输入邮箱。。。',validType:'email',required:true" class="easyui-textbox" id="companyEmail" name="companyEmail"/>
                    </td>
                </tr>
                <tr>
                    <td>联系方式：</td>
                    <td>
                        <input type="text" class="easyui-textbox" data-options="required:true" id="companyPhone" name="companyPhone"/>
                    </td>
                </tr>
                <tr>
                    <td>创建时间：</td>
                    <td>
                        <input type="text" class="easyui-datebox" data-options="sharedCalendar:'#cc'" id="startTime" name="startTime"/>
                        <div id="cc" class="easyui-calendar"></div>
                    </td>
                </tr>
                <tr>
                    <td>人员规模：</td>
                    <td>
                        <select name="size" id="size" class="easyui-combobox" panelHeight="auto">
                            <option value="小于100人">小于100人</option>
                            <option value="100-500人">100-500人</option>
                            <option value="500-1000人">500-1000人</option>
                            <option value="1000-2000人">1000-2000人</option>
                            <option value="大于2000人">大于2000人</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>业务描述：</td>
                    <td>
                        <input type="text" class="easyui-textbox" id="business" name="business"/>
                    </td>
                </tr>
            </table>
        </form>
                    <%--<div id="div1" class="easyui-panel" closed="true">--%>
                            <%--<input type="text" class="easyui-textbox" id="companyId" name="companyId"/>--%>
                    <%--</div>--%>
                    <%--公司名称：<input type="text" class="easyui-textbox" id="companyName" name="companyName"/><br/>--%>
                    <%--公司地址：<input type="text" class="easyui-textbox" id="companyAddress" name="companyAddress"/><br/>--%>
                    <%--下设部门：<select name="departmentName" id="departmentName" style="width: 100px" panelHeight="auto"></select>--%>
                                <%--<div id="sp">--%>
                                <%--&lt;%&ndash;<c:forEach items="${Depart}" var="b">&ndash;%&gt;--%>
                                <%--&lt;%&ndash;<input type="checkbox" name="departmentName" value="b.departmentId"/>&ndash;%&gt;--%>
                                <%--&lt;%&ndash;<span>${b.departmentName}</span> </br>&ndash;%&gt;--%>
                                <%--&lt;%&ndash;</c:forEach>&ndash;%&gt;</div>--%>
   </div>

    <div id="addDialog-buttons">
        <a href="#" id="saveBtn" class="easyui-linkbutton" iconCls="icon-ok" >保存</a>
        <a href="#" id="cancelBtn" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
    </div>
    </div>
    <%-- --%>
    <button class="easyui-linkbutton" id="editCoorBtn" onclick="$.map5.drawMarker()">点击修改分公司位置</button>
    <button class="easyui-linkbutton" id="saveCoorBtn" onclick="$.Company.saveCoor()">确认修改分公司位置</button>
    <button class="easyui-linkbutton" id="editScopeBtn" onclick="$.map5.drawPolygon()">点击修改分公司市场范围</button>
    <button class="easyui-linkbutton" id="saveScopeBtn" onclick="$.Company.saveScope()">确认修改分公司市场范围</button>
    <button class="easyui-linkbutton" onclick="$.map5.removeAll()">清空</button>
    <div  id="mapDiv" style=" height:500px;width:900px;position:absolute;top:400px;left:25px">
    </div>
</body>
</html>
