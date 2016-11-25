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
<div class="li-header"  style="background-color: #0070a9" data-options="region:'north',border:false,split:true">
    <div class="li-header-left">
        <h1 style="font-style: inherit">公司管理系统</h1>
    </div>
    <div class="li-header-right">
        <p><strong id="sholiser"  >${loginUser.employeeName}</strong>，欢迎您！</p>
        <p><a href="#" onclick="$.index.addTab('修改密码','resource/jsp/Repass.jsp','icon-users',1);" >【修改密码】</a>|<a href="#" onclick="$.index.exitSys()">【安全退出】</a></p>
    </div>

</div>
<!-- end of header -->
<!-- begin of sidebar -->
<div class="li-sidebar" data-options="region:'west',split:true,border:true,title:'导航菜单'"  style="overflow:hidden;">
    <div class="easyui-accordion" id="accordion" data-options="border:false,fit:false,multiple:true">

        <div title="员工管理" data-options="iconCls:'icon-application-form-edit'" id="eMessage" display="none" style="padding:5px;">
            <ul class="easyui-tree li-side-tree">
                <li iconCls="icon-users"><a href="javascript:void(0)" data-icon="icon-users" data-link="resource/jsp/Employee.jsp" iframe="1">员工信息</a></li>
            </ul>
        </div>
        <div title="部门管理" data-options="iconCls:'icon-cart'" id="dMessage" style="padding:5px;">
            <ul class="easyui-tree li-side-tree">
                <li iconCls="icon-chart-organisation"><a href="javascript:void(0)" data-icon="icon-chart-organisation" data-link="resource/jsp/Department.jsp" iframe="1">部门信息</a></li>

            </ul>
        </div>
        <div title="分公司管理" data-options="iconCls:'icon-creditcards'" id="cMessage" style="padding:5px;">
            <ul class="easyui-tree li-side-tree">
                <li iconCls="icon-shape-group"><a href="javascript:void(0)" data-icon="icon-shape-group" data-link="resource/jsp/Company.jsp" iframe="1">分公司信息</a></li>
                <li iconCls="icon-map"><a href="javascript:void(0)" data-icon="icon-map" data-link="resource/jsp/firm.jsp" iframe="1">分公司结构</a></li>

            </ul>
        </div>
        <div title="权限管理" data-options="iconCls:'icon-computer'" id="pMessage" style="padding:5px;">
            <ul class="easyui-tree li-side-tree" id="pUl">
                <li iconCls="icon-cog" title="ss" style="display:none"  id="pt"><a href="javascript:void(0)" data-icon="icon-cog" data-link="resource/jsp/Role.jsp" iframe="1">角色管理</a></li>
                <li iconCls="icon-book"><a href="javascript:void(0)" data-icon="icon-book" data-link="resource/jsp/Power.jsp" iframe="1">权限管理</a></li>
            </ul>
        </div>
        <div title="个人信息管理" data-options="iconCls:'icon-wrench'" style="padding:5px;">
            <ul class="easyui-tree li-side-tree">
                <li iconCls="icon-user-group"><a href="javascript:void(0)" data-icon="icon-user-group" data-link="resource/jsp/UserInfo.jsp" iframe="1">个人信息</a></li>
                <li iconCls="icon-users"><a href="javascript:void(0)" data-icon="icon-users" data-link="resource/jsp/Repass.jsp" iframe="1">修改密码</a></li>
            </ul>
        </div>


    </div>
</div>
<!-- end of sidebar -->
<!-- begin of main -->
<div class="li-main" data-options="region:'center'">
    <div id="li-tabs" class="easyui-tabs" data-options="border:false,fit:true" style="overflow: hidden">
        <div title="首页" > <iframe id="menuFrame" name="menuFrame" src="resource/jsp/main.jsp" style="overflow:hidden;"
                                  scrolling="yes" frameborder="no" width="100%" height="100%"></iframe></div>
    </div>
</div>
<!-- end of main -->
<!-- begin of footer -->
<div class="li-footer" data-options="region:'south',border:true,split:true">
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