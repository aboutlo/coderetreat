describe("Display a Game of Life Universe", function () {

    /* before any tests  */
    beforeEach(function () {
         $('<div id="canvas"></div>').appendTo('body');
    });
    
    it("should be defined", function () {
        expect(new Display()).toBeDefined();
    });
    
    it("should be visible", function () {
        
        this.addMatchers({
        toBeVisible: function() {
            return false;
        } });
        expect(new Display("canvas")).toBeVisible()
    });
    
});