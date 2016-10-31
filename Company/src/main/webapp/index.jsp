<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>首页</title>
    <link rel="stylesheet" href="resource/tool/jquery-easyui-1.4/themes/default/easyui.css">
    <link rel="stylesheet" href="resource/tool/jquery-easyui-1.4/themes/icon.css">
    <link rel="stylesheet" href="resource/css/index.css">
    <script src="resource/tool/jquery-easyui-1.4/jquery.min.js"></script>
    <script src="resource/tool/jquery-easyui-1.4/jquery.easyui.min.js"></script>
    <!--下面的使easyui datagrid 行拖拽插件-->
    <script src="resource/tool/jquery-easyui-1.4/datagrid-dnd.js"></script>
    <script src="resource/js/common.js"></script>
    <script src="resource/js/index.js"></script>
    <script>
        $(function(){
            $.index.init();
        });
    </script>
</head>
<body class="easyui-layout">
<!-- begin of header -->
<div class="wu-header"  style="background-color: #0070a9" data-options="region:'north',border:false,split:true">
    <div class="wu-header-left">
        <h1 style="font-style: inherit">公司管理系统</h1>
    </div>
    <div class="wu-header-right">
        <p><strong id="showuser"  >${loginUser.employeeName}</strong>，欢迎您！</p>
        <p><a href="#" id="dd">【帮助中心】</a>|<a href="#" onclick="addTab('密码修改','Repass.html','icon-users',1);" >【修改密码】</a>|<a href="#" onclick="$.index.exitSys()">【安全退出】</a></p>
    </div>

</div>
<!-- end of header -->
<!-- begin of sidebar -->
<div class="wu-sidebar" data-options="region:'west',split:true,border:true,title:'导航菜单'"  style="overflow:hidden;">
    <div class="easyui-accordion" data-options="border:false,fit:false,multiple:true">

        <div title="员工管理" data-options="iconCls:'icon-application-form-edit'" style="padding:5px;">
            <ul class="easyui-tree wu-side-tree">
                <li><a href="javascript:void(0)" id="dds">dsdsdsd</a> </li>
                <li iconCls="icon-chart-organisation"><a href="javascript:void(0)" data-icon="icon-chart-organisation" data-link="DataGrid.jsp" iframe="1">员工信息</a></li>
            </ul>
        </div>
        <div title="部门管理" data-options="iconCls:'icon-cart'" style="padding:5px;">
            <ul class="easyui-tree wu-side-tree">
                <li iconCls="icon-chart-organisation"><a href="javascript:void(0)" data-icon="icon-chart-organisation" data-link="resource/jsp/Department.jsp" iframe="1">部门信息</a></li>

            </ul>
        </div>
        <div title="分公司管理" data-options="iconCls:'icon-creditcards'" style="padding:5px;">
            <ul class="easyui-tree wu-side-tree">
                <li iconCls="icon-chart-organisation"><a href="javascript:void(0)" data-icon="icon-chart-organisation" data-link="treeTable.jsp" iframe="1">异步树表</a></li>
                <li iconCls="icon-users"><a href="javascript:void(0)" data-icon="icon-users" data-link="treeTable2.jsp" iframe="1">同步树表</a></li>
            </ul>
        </div>
        <div title="权限管理" data-options="iconCls:'icon-creditcards'" style="padding:5px;">
            <ul class="easyui-tree wu-side-tree">
                <li iconCls="icon-chart-organisation"><a href="javascript:void(0)" data-icon="icon-chart-organisation" data-link="treeTable.jsp" iframe="1">角色管理</a></li>
                <li iconCls="icon-users"><a href="javascript:void(0)" data-icon="icon-users" data-link="treeTable2.jsp" iframe="1">权限管理</a></li>
            </ul>
        </div>
        <div title="个人信息管理" data-options="iconCls:'icon-creditcards'" style="padding:5px;">
            <ul class="easyui-tree wu-side-tree">
                <li iconCls="icon-chart-organisation"><a href="javascript:void(0)" data-icon="icon-chart-organisation" data-link="treeTable.jsp" iframe="1">个人信息</a></li>
                <li iconCls="icon-users"><a href="javascript:void(0)" data-icon="icon-users" data-link="treeTable2.jsp" iframe="1">修改密码</a></li>
            </ul>
        </div>


    </div>
</div>
<!-- end of sidebar -->
<!-- begin of main -->
<div class="wu-main" data-options="region:'center'">
    <div id="wu-tabs" class="easyui-tabs" data-options="border:false,fit:true" style="overflow: hidden">
        <div title="首页" > <iframe id="menuFrame" name="menuFrame" src="resource/jsp/main.jsp" style="overflow:hidden;"
                                  scrolling="yes" frameborder="no" width="100%" height="100%"></iframe></div>
    </div>
</div>
<!-- end of main -->
<!-- begin of footer -->
<div class="wu-footer" data-options="region:'south',border:true,split:true">
    &copy; 2016 liqijin All Rights Reserved
</div>
<div id="tab_rightmenu" class="easyui-menu" style="width:120px; display:none">
    <div name="tab_menu-tabcloseall" id="closeAll">
        关闭全部标签
    </div>

    <div name="tab_menu-tabcloseother" id="closeOthor">
        关闭其他标签
    </div>

    <div class="menu-sep"></div>

    <div name="tab_menu-tabcloseright" id="closeRight">
        关闭右侧标签
    </div>
    <div name="tab_menu-tabcloseleft" id="closeLeft">
        关闭左侧标签
    </div>
</div>

</body>
</html>