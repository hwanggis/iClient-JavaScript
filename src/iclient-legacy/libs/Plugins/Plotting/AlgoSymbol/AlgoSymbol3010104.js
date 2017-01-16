/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol3010104 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol3010102, {

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
        SuperMap.Geometry.AlgoSymbol3010102.prototype.initialize.apply(this, arguments);
    },

    /**
     * 获取子标号局部坐标系的点
     *
     * @Parameters:
     * symbolSize 标号的大小
     *
     * @Returns
     * {Array<SuperMap.Geometry.Point>} 子标号位置点
     *
     */
    getSubSymbolPts: function(symbolSize){
        var d = symbolSize/4;
        var subPts = [];
        subPts.push(new SuperMap.Geometry.Point(2*d,0));
        subPts.push(new SuperMap.Geometry.Point(0,d));
        subPts.push(new SuperMap.Geometry.Point(-2*d,0));
        subPts.push(new SuperMap.Geometry.Point(0,-d));
        subPts.push(new SuperMap.Geometry.Point(-d,-d));
        subPts.push(new SuperMap.Geometry.Point(d,-d));
        subPts.push(new SuperMap.Geometry.Point(0,-d));

        return subPts;
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol3010104"
});


