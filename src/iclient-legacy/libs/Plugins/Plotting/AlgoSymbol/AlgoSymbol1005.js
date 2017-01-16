/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol1005 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{

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
    initialize:function(option){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.symbolType = SuperMap.Plot.SymbolType.ALGOSYMBOL;

        this.minEditPts = 2;
        this.maxEditPts = 99999;

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length < this.minEditPts) {
            return;
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        //去除重复点
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        //计算箭身拟合点
        var bodyResult = SuperMap.Plot.ArrowToolKit.generateArrowBodyShapePtsBySingleLine(geoPts,0.0,SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_POLYBEZIER);
        var lastPts = [];
        lastPts.push(bodyResult.arrowBodyPts[bodyResult.arrowBodyPts.length-1]);
        lastPts.push(bodyResult.arrowBodyPts[bodyResult.arrowBodyPts.length-2]);
         //获取箭头的大小比值
        var scaleValue = this.getSubSymbolScaleValue();

        var ptsClone = this.calculateforHead(geoPts,bodyResult,lastPts,scaleValue);

        var headPts = SuperMap.Plot.ArrowToolKit.generateArrowHeadShapePtsBySingleLine(geoPts,ptsClone,lastPts,scaleValue,bodyResult.arrowHeadLen, SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_POLYLINE);

        //创建箭身
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsClone);//bodyResult.arrowBodyPts);

        //创建箭头
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, headPts);

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol1005"
});