require('../../../src/openlayers/services/FeatureService');
require('../../../src/common/util/FetchRequest');

var featureServiceURL = "http://supermap:8090/iserver/services/data-world/rest/data";
var options = {
    serverType: 'iServer'
};
describe('openlayers_FeatureService_getFeaturesByBounds', function () {
    var serviceResult = null;
    var originalTimeout;
    var FetchRequest = SuperMap.FetchRequest;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        serviceResult = null;
    });

    //数据集Bounds查询服务
    it('getFeaturesByBounds', function (done) {
        var polygon = new ol.geom.Polygon([[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]);
        var boundsParam = new SuperMap.GetFeaturesByBoundsParameters({
            datasetNames: ["World:Capitals"],
            bounds: polygon.getExtent(),
            fromIndex: 1,
            toIndex: 3
        });
        var getFeaturesByBoundsService = new ol.supermap.FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake(function (method, testUrl, params, options) {
            expect(method).toBe('POST');
            expect(testUrl).toBe(featureServiceURL + "/featureResults.json?returnContent=true&fromIndex=1&toIndex=3");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(getFeasByBounds));
        });
        getFeaturesByBoundsService.getFeaturesByBounds(boundsParam, function (testResult) {
            serviceResult = testResult;
            expect(getFeaturesByBoundsService).not.toBeNull();
            expect(getFeaturesByBoundsService.options.serverType).toBe('iServer');
            expect(serviceResult.type).toBe("processCompleted");
            var result = serviceResult.result;
            expect(result.succeed).toBe(true);
            expect(result.featureCount).not.toBeNull();
            expect(result.totalCount).toEqual(24);
            expect(result.featureCount).toEqual(24);
            expect(result.features.type).toEqual("FeatureCollection");
            var features = result.features.features;
            expect(features).not.toBeNull();
            expect(features.length).toEqual(3);
            expect(features.length).toEqual(3);
            expect(features[0].id).toEqual(19);
            expect(features[1].id).toEqual(20);
            expect(features[2].id).toEqual(21);
            for (var i = 0; i < features.length; i++) {
                expect(features[i].type).toEqual("Feature");
                expect(features[i].properties).not.toBeNull();
                expect(features[i].geometry.type).toEqual("Point");
                expect(features[i].geometry.coordinates.length).toEqual(2);
            }
            boundsParam.destroy();
            done();
        });
    });
});