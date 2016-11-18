<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/11/17
  Time: 10:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
    <script src="../js/map.js"></script>
    <script src="../js/firm.js"></script>
    <style>
        #dd{
            padding: 0px;
        }
    </style>
</head>
<body class="easyui-layout">
  <div id="dd" data-options="region:'west',title:'公司结构',split:true" style="width:200px;">
      <ul id="tt" >

      </ul>
  </div>
  <div data-options="region:'center'">
      <div style="background:#fafafa;" id="menu">
          <a href="#" class="easyui-menubutton" menu="#mm1" >公司位置</a>
          <a href="#" class="easyui-menubutton" menu="#mm2" >业务范围</a>
          <a href="#" class="easyui-linkbutton" plain="true"  onclick="$.map5.removeAll()">清空</a>
          <a href="#" class="easyui-linkbutton" plain="true"  onclick="showAll()">显示全部</a>
      </div>
      <div id="mm1" style="width:150px;">
          <div iconCls="icon-edit" onclick="$.map5.drawMarker()">点击修改</div>
          <div iconCls="icon-ok" onclick="saveCoor()">保存修改</div>

      </div>
      <div id="mm2" style="width:100px;">
          <div iconCls="icon-edit" onclick="$.map5.drawPolygon()">点击修改</div>
          <div iconCls="icon-ok" onclick="saveScope()">保存修改</div>
      </div>
      <div  id="mapDiv" style=" height:500px;width:900px;position:absolute;">
      </div>
  </div>
</body>
</html>
