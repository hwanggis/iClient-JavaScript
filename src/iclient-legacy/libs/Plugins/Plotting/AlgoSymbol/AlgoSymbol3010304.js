/**
 * Created by xuxiaorong01 on 2016/11/18.
 */
/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol3010304 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol21600, {

    /**
     * 标号文本
     */
    subText: null,


    /**
     * Constructor: SuperMap.Geometry.AlgoSymbol
     * 创建一个线面标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.AlgoSymbol>} 新的标绘对象。
     */
    initialize: function (option) {
        SuperMap.Geometry.AlgoSymbol21600.prototype.initialize.apply(this, arguments);

        subText = SuperMap.i18n("symbolAlgo_3010304");
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol3010304"
});
