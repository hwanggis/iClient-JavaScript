/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol6020403 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.symbolType = SuperMap.Plot.SymbolType.ALGOSYMBOL;

        this.minEditPts = 2;
        this.maxEditPts = 3;

        this.scaleValues = [];
        this.scaleValues[0] = 1.05;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if (this.scaleValues.length < 1) {
            this.scaleValues = [];
            this.scaleValues.push(1.05);
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts < this.minEditPts) {
            return;
        }

        var radius = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]);
        if (2 === this.controlPoints.length) {
            geoPts.splice(1, 0, new SuperMap.Geometry.Point(geoPts[0].x + radius, geoPts[0].y));
        }

        var pt1 = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
        var pt2 = new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y);
        var pt3 = new SuperMap.Geometry.Point(geoPts[2].x, geoPts[2].y);

        var dRadius = SuperMap.Plot.PlottingUtil.distance(pt1, pt2);
        var dRadius1 = dRadius * this.scaleValues[0];

        var angle1 = SuperMap.Plot.PlottingUtil.radian(pt1, pt2) * 180 / Math.PI;
        var angle2 = SuperMap.Plot.PlottingUtil.radian(pt1, pt3) * 180 / Math.PI;

        var dStartAngle = angle1 % 360;
        var dEndAngle = angle2 % 360;
        if (dStartAngle > dEndAngle) {
            dEndAngle += 360;
        }

        var step = (dEndAngle - dStartAngle) / 50;

        var arcPts1 = this.getArcPts(geoPts[0], dRadius, dStartAngle, dEndAngle, step);
        var arcPts2 = this.getArcPts(geoPts[0], dRadius1, dStartAngle, dEndAngle, step);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, arcPts1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, arcPts2, {
            surroundLineFlag: false,
            lineColorLimit: true,
            strokeColor: "#0000FF",
            surroundLineLimit: true
        });

        if(3 === this.controlPoints.length){
            this.controlPoints[2] = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0], radius, radius, dEndAngle);
        }

        this.addScalePoint(new SuperMap.Geometry.Point(arcPts2[arcPts2.length - 1].x, arcPts2[arcPts2.length - 1].y), 0);

        this.clearBounds();
    },

    getArcPts: function (circleCenterPt, radius, startAngle, endAgnle, angleStep) {
        if (undefined === angleStep || null === angleStep) {
            angleStep = 1;
        }

        var arcPts = [];
        for (var i = startAngle; i < endAgnle; i += angleStep) {
            var tempPt = SuperMap.Plot.PlottingUtil.circlePoint(circleCenterPt, radius, radius, i);
            arcPts.push(tempPt);
        }
        var arcEndPt = SuperMap.Plot.PlottingUtil.circlePoint(circleCenterPt, radius, radius, endAgnle);
        arcPts.push(arcEndPt);

        return arcPts;
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function (index, pt) {
        if (pt.isScalePoint === true) {
            if (index != 0 && index != 1) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
            if (geoPts < this.minEditPts) {
                return;
            }

            var radius = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]);
            var dis = SuperMap.Plot.PlottingUtil.distance(geoPts[0], pt);

            var dScale = dis / radius;
            if(dScale >= 1.01){
                this.scaleValues[0] = dScale;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol6020403"
});


