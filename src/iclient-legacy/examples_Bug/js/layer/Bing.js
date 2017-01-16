
/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Layer/CanvasLayer.js
 */

/**
 * Class: SuperMap.Layer.Bing
 *    此图层可以访问OpenStreetMap的地图服务。
 *
 * Inherits from:
 *  - <SuperMap.Layer.CanvasLayer>
 */
SuperMap.Layer.Bing = SuperMap.Class(SuperMap.CanvasLayer, {

    /**
     * APIProperty: name
     * {String}图层名称，默认为“Bing Map”，防止初始化时未设置图层名
     *
     */
    name: "Bing Map",

    /**
     * Property: url
     * {String}默认的Bing的三个中国范围地图的服器地址，不需要要用户设置
     */
    url: [
        'http://dynamic.t0.tiles.ditu.live.com/comp/ch/${quadKey}?it=G,VE,BX,L,LA&mkt=zh-cn,syr&n=z&og=113&ur=CN',
        'http://dynamic.t1.tiles.ditu.live.com/comp/ch/${quadKey}?it=G,VE,BX,L,LA&mkt=zh-cn,syr&n=z&og=113&ur=CN',
        'http://dynamic.t2.tiles.ditu.live.com/comp/ch/${quadKey}?it=G,VE,BX,L,LA&mkt=zh-cn,syr&n=z&og=113&ur=CN'
    ],

    /**
     * Property: attribution
     * {String} The layer attribution.
     */
    attribution: "Data CC-By-SA by <a style='white-space: nowrap' target='_blank' href='http://www.bing.com/maps/'>BingMap</a>",

    /**
     * Property: serverResolutions
     * {Array} the resolutions provided by the Bing servers.
     */
    serverResolutions: [
        156543.03390625, 78271.516953125, 39135.7584765625,
        19567.87923828125, 9783.939619140625, 4891.9698095703125,
        2445.9849047851562, 1222.9924523925781, 611.4962261962891,
        305.74811309814453, 152.87405654907226, 76.43702827453613,
        38.218514137268066, 19.109257068634033, 9.554628534317017,
        4.777314267158508, 2.388657133579254, 1.194328566789627,
        0.5971642833948135, 0.29858214169740677, 0.14929107084870338,
        0.07464553542435169
    ],

    /**
     * Constructor: SuperMap.Layer.Bing
     * 创建Bing图层，可以浏览Bing地图
     * Example:
     * (code)
     *
     * var osm = new SuperMap.Layer.Bing("Bing Map");
     *
     * (end)
     *
     *  默认为墨卡托投影，所以当需要地图定位以及添加元素在地图上时都需要坐标转换
     * Example:
     * (code)
     *
     * var markers = new SuperMap.Layer.Markers( "Markers" );
     * map.addLayer(markers);
     * var size = new SuperMap.Size(21,25);
     * var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
     * var icon = new SuperMap.Icon('图片地址', size, offset);
     * markers.addMarker(new SuperMap.Marker(new SuperMap.LonLat(118,40 ).transform(
     * new SuperMap.Projection("EPSG:4326"),
     * map.getProjectionObject()),icon));
     *
     * (end)
     * Parameters:
     * name - {String} 图层名称
     */
    initialize: function(name, options) {
        options = SuperMap.Util.extend({
            projection: "EPSG:900913",
            numZoomLevels: 19
        }, options);
        SuperMap.CanvasLayer.prototype.initialize.apply(this,[name,this.url,{},options] );
    },

    /**
     * Method: clone
     */
    clone: function(obj) {
        if (obj == null) {
            obj = new SuperMap.Layer.Bing(
                this.name, this.url, this.getOptions());
        }
        obj = SuperMap.CanvasLayer.prototype.clone.apply(this, [obj]);
        return obj;
    },

    /**
     * APIMethod: destroy
     * 解构OSM类，释放资源。
     */
    destroy: function () {
        var me = this;
        SuperMap.CanvasLayer.prototype.destroy.apply(me, arguments);
    },

    /**
     * Method: getTileUrl
     * 获取瓦片的URL。
     *
     * Parameters:
     * xyz - {Object} 一组键值对，表示瓦片X, Y, Z方向上的索引。
     *
     * Returns
     * {String} 瓦片的 URL 。
     */
    getTileUrl: function (xyz) {
        if(xyz.z === 0) return;
        var me = this,  url;


        if (SuperMap.Util.isArray(this.url)) {
            url = me.selectUrl(xyz, this.url);
        }
        // Bing 0级没有切片
        var x = xyz.x, y = xyz.y, z = xyz.z === 1 ? 0:xyz.z;
        //var x = xyz.x, y = xyz.y, z = xyz.z;
        var quadDigits = [];
        for (var i = z; i > 0; --i) {
            var digit = '0';
            var mask = 1 << (i - 1);
            if ((x & mask) != 0) {
                digit++;
            }
            if ((y & mask) != 0) {
                digit++;
                digit++;
            }
            quadDigits.push(digit);
        }
        var quadKey = quadDigits.join("");

        return SuperMap.String.format(url, {'quadKey': quadKey});

    },

    /**
     * Method: selectUrl
     * 通过某种方式实现在一组url数组中选出合理的url
     * Parameters:
     * xyz - {Object} 一组键值对，表示瓦片X, Y, Z方向上的索引。
     * urls - {Array(String)} url数组
     *
     * Returns:
     * {String} 一个合理的url，主要用于出图访问多个服务器，提高效率
     */
    selectUrl: function(xyz, urls) {
        var id=Math.abs(xyz.x+xyz.y)%urls.length;
        var url=urls[id];
        return url;
    },

    CLASS_NAME: "SuperMap.Layer.Bing"
});