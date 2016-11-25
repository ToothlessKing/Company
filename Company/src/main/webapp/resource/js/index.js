/**
 * 主页的初始化
 */
$.index =
{
    init: function()
    {
        $.common.init();
        //var oUl=document.getElementById("_easyui_tree_6");
        //$("#test").tree('remove',oUl);
        //$("#pt").hide();
        //$("#_easyui_tree_6").remove();
        //$("#pUl li:first-child").remove();
        $.index.onClickTree();
        $.index.contextMenu();
        $.index.onClickMenu();
    },
    /*
        菜单的点击事件
     */
    onClickTree:function(){
        $('.li-side-tree a').bind("click",function(){
            var title = $(this).text();
            var url = $(this).attr('data-link');
            var iconCls = $(this).attr('data-icon');
            var iframe = $(this).attr('iframe')==1?true:false;
            $.index.addTab(title,url,iconCls,iframe);
        });
    },
    /**
     * Name 添加菜单选项
     * Param title 名称
     * Param href 链接
     * Param iconCls 图标样式
     * Param iframe 链接跳转方式（true为iframe，false为href）
     */
    addTab:function(title,url,iconCls,iframe){
        var tabPanel = $('#li-tabs');
        if(!tabPanel.tabs('exists',title)){
            var content = '<iframe  frameborder="0" src="'+ href +'" style="width:100%;height:100%;overflow:hidden;"></iframe>';
            if(iframe){
                tabPanel.tabs('add',{
                    title:title,
                    content:content,
                    iconCls:iconCls,
                    fit:true,
                    cls:'pd3',
                    closable:true
                });
            }
            else{
                tabPanel.tabs('add',{
                    title:title,
                    href:href,
                    iconCls:iconCls,
                    fit:true,
                    cls:'pd3',
                    closable:true
                });
            }
        }
        else
        {
            tabPanel.tabs('select',title);
        }
    },
    /*
    右键选项卡的菜单项
     */
    contextMenu:function(){
        $("#li-tabs").tabs({
            onContextMenu:function(e, title) {
                //在每个菜单选项中添加title值
                var $divMenu = $("#tab_rightmenu div[id]");
                $divMenu.each(function() {
                    $(this).attr("id", title);
                });

                //显示menu菜单
                $('#tab_rightmenu').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
                e.preventDefault();
            }
        });
    },
    onClickMenu:function(){
        //实例化menu点击触发事件
        $('#tab_rightmenu').menu({
            "onClick":function(item) {
                $.index.closeTab(item.id,item.text);
            }
        });
    },
    /*
     关闭选项卡
     1、关闭所有
     2、关闭其他
     3、关闭右侧
     4、关闭左侧
     */
    closeTab:function(title, text) {
        if(text == '关闭全部标签') {
            $(".tabs li").each(function(index, obj) {
                //获取所有可关闭的选项卡
                var tabTitle = $(".tabs-closable", this).text();
                $("#li-tabs").tabs("close", tabTitle);
            });
        }

        if(text == '关闭其他标签') {
            $(".tabs li").each(function(index, obj) {
                //获取所有可关闭的选项卡
                var tabTitle = $(".tabs-closable", this).text();
                if(tabTitle != title) {
                    $("#li-tabs").tabs("close", tabTitle);
                }
            });
        }

        if(text == '关闭右侧标签') {
            var $tabs = $(".tabs li");
            // alert($tabs.length);
            for(var i = $tabs.length - 1; i >= 0; i--) {
                //获取所有可关闭的选项卡
                var tabTitle = $(".tabs-closable", $tabs[i]).text();
                //  alert(tabTitle);
                if(tabTitle != title) {
                    $("#li-tabs").tabs("close", tabTitle);
                } else {
                    break;
                }
            }
        }

        if(text == '关闭左侧标签') {
            var $tabs = $(".tabs li");
            for(var i = 0; i < $tabs.length; i++) {
                //获取所有可关闭的选项卡
                var tabTitle = $(".tabs-closable", $tabs[i]).text();
                if(tabTitle != title) {
                    $("#li-tabs").tabs("close", tabTitle);
                } else {
                    break;
                }
            }
        }
    },
    /*
    添加选项卡
     */
    addTab:function(title, href, iconCls, iframe){
        var tabPanel = $('#li-tabs');
        if(!tabPanel.tabs('exists',title)){
            var content = '<iframe  frameborder="0" src="'+ href +'" style="width:100%;height:100%;overflow:hidden;"></iframe>';
            if(iframe){
                tabPanel.tabs('add',{
                    title:title,
                    content:content,
                    iconCls:iconCls,
                    fit:true,
                    cls:'pd3',
                    closable:true
                });
            }
            else{
                tabPanel.tabs('add',{
                    title:title,
                    href:href,
                    iconCls:iconCls,
                    fit:true,
                    cls:'pd3',
                    closable:true
                });
            }
        }
        else
        {
            tabPanel.tabs('select',title);
        }
    },
    /*
    退出系统
    返回登陆页
     */
    exitSys:function(){
        var flag = confirm("确认退出系统？");
        if(flag){
            $.ajax({
                url: $.common.base+"/user/exitSys.do",
                success:function(data){
                    window.location.href="login.jsp";
                }
            });
        }
    }

}

