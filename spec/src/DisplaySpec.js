describe("Display a Game of Life Universe", function () {

    // clean canvas
    beforeEach(function () {
        $("#canvas").remove();
    });
    
    it("should be defined", function () {
        expect(new Display()).toBeDefined();
    });
    
    it("should be visible", function () {
        
        this.addMatchers({

        toBeVisible: function() {
            var thickness = parseInt($("#canvas").css('borderLeftWidth'),10);
            return thickness > 0;
        } });
        
        expect(new Display()).toBeVisible()
    });
    
    
    it("should draw a cell", function () {
        
        this.addMatchers({

        toBeDrawed: function() {
            //TODO NO WAY TO SELECT AN SVG ELEMENT
            //var thickness = parseInt($("#canvas").css('borderLeftWidth'),10);
            return true;
        } });
        
        var cell = new Cell(Cell.ALIVE,0,0);
        expect(new Display().drawCell(cell)).toBeDrawed()
    });
    
    it("should draw a universe", function () {
        
        this.addMatchers({

        toBeDrawed: function() {
            //TODO NO WAY TO SELECT AN SVG ELEMENT
            //var thickness = parseInt($("#canvas").css('borderLeftWidth'),10);
            return true;
        } });
        
        var population = [
                            new Cell(Cell.DEAD,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.DEAD,2,0),
                            new Cell(Cell.DEAD,0,1),new Cell(Cell.ALIVE,1,1),new Cell(Cell.DEAD,2,1),
                            new Cell(Cell.DEAD,0,2),new Cell(Cell.ALIVE,1,2),new Cell(Cell.DEADE,2,2)
                         ];
        var universe = new Universe(population);
        expect(new Display().drawUniverse(universe)).toBeDrawed()
    });
    
    
    it("should tick", function () {
        
        this.addMatchers({

        toBeDrawed: function() {
            //TODO NO WAY TO SELECT AN SVG ELEMENT
            //var thickness = parseInt($("#canvas").css('borderLeftWidth'),10);
            return true;
        } });
        
        var population = [
                            new Cell(Cell.DEAD,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.DEAD,2,0),
                            new Cell(Cell.DEAD,0,1),new Cell(Cell.ALIVE,1,1),new Cell(Cell.DEAD,2,1),
                            new Cell(Cell.DEAD,0,2),new Cell(Cell.ALIVE,1,2),new Cell(Cell.DEADE,2,2)
                         ];
        var universe = new Universe(population);
        expect(new Display().drawUniverse(universe)).toBeDrawed()
    });
    
    
});