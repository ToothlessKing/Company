/**
 * 地图初始化
 */
$.map5 = {
    mapObj: null,
    previousMarker:"",
    previousDraw:"",
    coorX:null,
    coorY:null,
    scopePoints:null,
    /*
    初始化
    设置地图的范围
    添加基本图层
    设置中心点
    设置地图级别（范围精度）
     */
    init: function () {
        // 1、设置地图的范围

        var extent = new GeoBeans.Envelope(-180, -90, 180, 90);

        // 2、初始化地图变量，参数分别为:
        // 地图的容器为"mapDiv",地图名称"map"，地图范围，地图的空间参考，4326为经纬度
        $.map5.mapObj = new GeoBeans.Map("mapDiv", "map", extent, 4326);
        if ($.map5.mapObj == null) {
            return;
        }

        // 3、添加一个图层
        // 定义一个QuadServer图层，作为底图，第一个参数为图层名称，第二个参数为QuadServer地址
        var layer = new GeoBeans.Layer.QSLayer("base", "http://localhost:80/QuadServer/maprequest?services=PGIS_vector");
        //http://localhost:81/Map5/QuadServer/maprequest?services=world_vector
        // 添加图层

        // 添加图层
        $.map5.mapObj.addLayer(layer);

        // 4、设置中心点
        //var center = new GeoBeans.Geometry.Point(116.9,35);
        var center = new GeoBeans.Geometry.Point(123, 26);
        $.map5.mapObj.setCenter(center);

        // 5、设置级别
        $.map5.mapObj.setLevel(5);
        $.map5.mapObj.setNavControl(true);

        // 6、绘图
        $.map5.mapObj.draw();
    },
    setCenter:function(x,y){
        var center = new GeoBeans.Geometry.Point(x, y);
        $.map5.mapObj.setCenter(center);
        $.map5.mapObj.draw();
    },
    addGeoJson: function (path) {
        $.map5.mapObj.removeLayer("geojson_point");
        // 1、图层名称
        var name = "geojson_point";

        // 2、GeoJson文件所在的地址
        var url = path;

        // 3、创建一个图层
        // 参数一：图层的名称
        // 参数二：GeoJson文件所在的地址
        var featureLayer = $.map5.mapObj.createFeatureLayerByGeoJson(name, url);
        // 4、设置图层的样式
        var style = $.map5.createPointStyle();
        featureLayer.setStyle(style);

        // 5、添加图层
        $.map5.mapObj.addLayer(featureLayer);
        // 6、绘图
        $.map5.mapObj.draw();
        $.map5.click_timezone(name);
    },
    /*
     加载地图信息
     @param path json或GeoJson数据的url路径
     */
    addGeoJson2: function (path) {
        $.map5.mapObj.removeLayer("geojson");
        // 1、图层名称
        var name = "geojson";

        // 2、GeoJson文件所在的地址
        var url = path;

        // 3、创建一个图层
        // 参数一：图层的名称
        // 参数二：GeoJson文件所在的地址
        var featureLayer = $.map5.mapObj.createFeatureLayerByGeoJson(name, url);

        // 4、设置样式
        var style = $.map5.createPolygonStyle();

        console.log("style:")
        console.log(style)
        featureLayer.setStyle(style);


        // 5、添加图层
        $.map5.mapObj.addLayer(featureLayer);

        // 6、绘图
        $.map5.mapObj.draw();
        $.map5.click_timezone(name);
    },
    createStyle: function () {
        var style = new GeoBeans.Style.FeatureStyle();
        var rule = new GeoBeans.Rule();
        var symbolizer = new GeoBeans.Symbolizer.PointSymbolizer();



        symbolizer.size = 6;
        symbolizer.fill.color.set(255, 0, 0, 1);
        symbolizer.stroke.color.set(0, 255, 0, 1);
        rule.symbolizer = symbolizer;
        style.addRule(rule);
        return style;
    },
    /*
    设置style
     */
    createPolygonStyle:function (){
        var style = new GeoBeans.Style.FeatureStyle();
        var rule = new GeoBeans.Rule();
        var symbolizer = new GeoBeans.Symbolizer.PointSymbolizer();
        symbolizer.size = 6;
        symbolizer.fill.color.set(255, 0, 0,0.6);
        symbolizer.stroke.color.set(0,255, 0,0.6);
        rule.symbolizer = symbolizer;
        style.addRule(rule);
        return style;
    },
    createPointStyle:function (){
        var style = new GeoBeans.Style.FeatureStyle();
        var rule = new GeoBeans.Rule();
        var symbolizer = new GeoBeans.Symbolizer.PointSymbolizer();
        // 3、定义symbol用来设置图片的样式
        var symbol = new GeoBeans.Symbol();

        // 4、设置图片的路径等其它参数
        symbol.icon = "../tool/images/circle.png";
        // 图片顺时针旋转角度
        symbol.rotate = 45;

        // 5、设定符号样式
        symbolizer.symbol = symbol;
        symbolizer.size = 6;
        symbolizer.fill.color.set(255, 0, 0,1);
        symbolizer.stroke.color.set(0,255, 0,1);
        rule.symbolizer = symbolizer;
        style.addRule(rule);
        return style;
    },
    //点击事件
    click_timezone:function (id){

    // 1、设置点击后的样式
        var style = new GeoBeans.Style.FeatureStyle();
        var rule = new GeoBeans.Rule();
        var symbolizer = new GeoBeans.Symbolizer.PolygonSymbolizer();
        symbolizer.fill.color.set(0, 255, 0,0.6);
        symbolizer.stroke.color.set(255, 0, 0,0.6);
        symbolizer.stroke.width = 1;
        var symbol = new GeoBeans.Symbol();
        symbol.icon = "../tool/images/circle.png";
        symbolizer.symbol = symbol;
        rule.symbolizer = symbolizer;
        style.addRule(rule);

    // 2、注册点击事件
        $.map5.mapObj.registerClickEvent(id,style,$.map5.clickLayer_timezone_callback);
    },

    clickLayer_timezone_callback:function(feature,x,y){
        if(feature == null){
            return;
        }
        console.log(feature);
        // 下面是定义弹窗的代码
        var name = feature.getValue("name");
        var html = "<div><div>" + name +  "</div></div>";
        var option = {
            title : "分公司信息"
        };
        // 定义infoWindow
        var infoWindow = new GeoBeans.InfoWindow(html,option);
        var point = new GeoBeans.Geometry.Point(x,y);
        // 弹出框
        $.map5.mapObj.openInfoWindow(infoWindow,point);
    },
//添加标识
    addMarker: function (row) {
        $.map5.mapObj.removeLayer("geojson_point");
        $.map5.mapObj.removeLayer("geojson");

        $.map5.mapObj.clearOverlays();
        var companyId = row.companyId;
        var companyName = row.companyName;
        var companyAddress = row.companyAddress;
        var companyCoordinates = row.companyCoordinates;
        console.log(companyCoordinates);
        if(companyCoordinates!=""&&companyCoordinates!=null){
            $.map5.mapObj.registerInfoWindowEvent();
            // 1、定义marker点的位置
            var point = new GeoBeans.Geometry.Point(companyCoordinates.split(",")[0], companyCoordinates.split(",")[1]);

            // 2、定义点样式，设定一个图片作为样式
            var symbolizer = new GeoBeans.Symbolizer.PointSymbolizer();

            // 3、定义symbol用来设置图片的样式
            var symbol = new GeoBeans.Symbol();

            // 4、设置图片的路径等其它参数
            symbol.icon = "../tool/images/circle.png";

            // 图片的大小，如果不设定则为图片本身的大小
            // symbol.icon_width = 12;
            // symbol.icon_height = 12;

            // 图片的偏移，默认为图片的中心点，可以不设定
            // x方向向右为正
            // symbol.icon_offset_x = 12;

            // y方向向上为正
            // symbol.icon_offset_y = -12;

            // 图片顺时针旋转角度
            symbol.rotate = 45;

            // 5、设定符号样式
            symbolizer.symbol = symbol;
            var html = "<div class='easyui-panel' style='width:100px;height:50px;'><div>&nbsp;&nbsp;地址:" + companyAddress + "</div></div>";
            var options = {
                title: companyName //弹窗名称
            };
            var infoWindow = new GeoBeans.InfoWindow(html, options);
            // 6、定义一个marker
            // 参数一：id,该值不可以重复，否则无法添加
            // 参数二：坐标点
            // 参数三：样式
            marker = new GeoBeans.Overlay.Marker(""+companyId, point, symbolizer, infoWindow);

            // 7、增加一个标注，增加标注的通用接口
            $.map5.mapObj.addOverlay(marker);
        }
        // 8、绘图
        $.map5.mapObj.draw();
    },
     // 添加区域标识
    addPolygon:function(row){
        $.map5.mapObj.removeLayer("geojson_point");
        var points = [];
        var companyScopeMap = row.companyScopeMap.split("|");
        for(var i=0;i<companyScopeMap.length;i++){
            points.push(new GeoBeans.Geometry.Point(companyScopeMap[i].split(",")[0],companyScopeMap[i].split(",")[1]));
        }
        console.log(points);
        // 2、定义线
        var lineString = new GeoBeans.Geometry.LineString(points);

        // 3、定义多边形，由线数组构成
        var geometry_poly = new GeoBeans.Geometry.Polygon([lineString]);

        // 4、定义面样式
        var symbolizer = new GeoBeans.Symbolizer.PolygonSymbolizer();
        // 定义面样式的填充颜色
        symbolizer.fill.color.set(0, 255, 0,0.6);
        // 定义面样式的边框的颜色
        symbolizer.stroke.color.set(255, 0, 0,0.6);
        // 定义面样式的边框的宽度，默认为2
        symbolizer.stroke.width = 1;

        // 5、定义面标注
        polygon = new GeoBeans.Overlay.Polygon("polygon",geometry_poly,symbolizer);

        // 6、增加标注
        $.map5.mapObj.addOverlay(polygon);
        // 7、绘图
        $.map5.mapObj.draw();
    },
    // 获取标注
    getMarker:function (){

        // 按照id值获取该overlay
        var overlay = $.map5.mapObj.getOverlay("marker");
        console.log(overlay);
    },

    // 删除标注
    removeAllMarker:function (){
        $.map5.mapObj.removeOverlays();
        $.map5.mapObj.draw();
    },

    // 删除标注
    removeMarker_2:function (){

        // 1、删除marker标注对象
        $.map5.mapObj.removeOverlayObj(marker);

        // 2、绘图
        $.map5.mapObj.draw();
    },
    //绘制标识
    drawMarker:function(){

        var arr = $.map5.mapObj.overlayLayer.overlays;
        for(var i=0 ;i<arr.length ;i++){
            if(arr[i].geometry.x!=null){
                $.map5.mapObj.removeOverlay(arr[i].id);
            }
        }
        //$.map5.mapObj.clearOverlays();
        //$.map5.mapObj.removeOverlays();
        console.log($.map5.mapObj);
        // 1、定义要绘制的marker的样式
        var symbolizer = new GeoBeans.Symbolizer.PointSymbolizer();
        var symbol = new GeoBeans.Symbol();
        symbol.icon = "../tool/images/circle.png";
        symbolizer.symbol = symbol;
        // 2、标绘marker
        // 参数一：marker的样式
        // 参数二：回帖函数
        $.map5.mapObj.drawMarker(symbolizer,this.callbackTrackOverlay);
    },
    // 回调函数，返回绘制的overlay
    callbackTrackOverlay:function (overlay){
        console.log(overlay);
        $.map5.coorX = overlay.geometry.x;
        $.map5.coorY = overlay.geometry.y;
    },
    //绘制区域标识
    drawPolygon:function (){
        var arr = $.map5.mapObj.overlayLayer.overlays;
        //for(var i=0 ;i<arr.length ;i++){
        //    if(arr[i].geometry.rings !=null){
        //        $.map5.mapObj.removeOverlay(arr[i].id);
        //    }
        //}
        // 1、定义要绘制的polygon的样式
        var symbolizer = new GeoBeans.Symbolizer.PolygonSymbolizer();
        symbolizer.fill.color.set(126, 40, 0,0.6);
        symbolizer.stroke = null;
        // 2、标绘polygon
        // 参数一： polygon的样式
        // 参数二：回调函数
        $.map5.mapObj.drawPolygon(symbolizer,this.callbackTrackOverlay2);
    },
    callbackTrackOverlay2:function(overlay){

        var points = overlay.geometry.rings[0].points;
        console.log(points);
        if(points!=null){
            var str ="";
            for(var i=0 ;i<points.length ;i++){
                if(i==0){
                    str += points[i].x+","+points[i].y;
                }else{
                    str += "|"+points[i].x+","+points[i].y;
                }
            }
            $.map5.scopePoints = str;
        }
        console.log("Points:"+$.map5.scopePoints);
        console.log($.map5.mapObj);
    },
    removeLayer:function () {
        // 1、删除图层
        $.map5.mapObj.removeLayer("geojson_point");

        // 2、绘图
        $.map5.mapObj.draw();
    },
    clearOverlays:function(){
        $.map5.mapObj.clearOverlays();
        $.map5.mapObj.draw();
    },
    //清除所有信息
    removeAll:function(){
        $.map5.clearOverlays();
        $.map5.mapObj.removeLayer("geojson_point");
        $.map5.mapObj.removeLayer("geojson");
    }


}
