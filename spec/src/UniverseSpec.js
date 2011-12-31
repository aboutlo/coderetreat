describe("Universe", function () {

    /* before any tests  */
    beforeEach(function () {
        // donothing
    });

    it("should be defined", function () {
        expect(Universe).toBeDefined();
    });
    
    it("should be empty", function () {
        expect(new Universe().isEmpty()).toBeTruthy();
    });
    
    it("should contains population", function () {
        expect(new Universe([new Cell()]).isEmpty()).toBeFalsy();
    });
    
    it("should evolve to a new generation", function () {
        expect(new Universe([new Cell()]).evolve().isEmpty()).toBeFalsy();
    });
    
    it("a population should evolve to a new generation ", function () {
        expect(new Universe([new Cell()]).evolve().isEmpty()).toBeFalsy();
    });
    
    it("should has a find neighbours method ", function () {
        expect(new Universe().findNeighboursByCell(new Cell()).length).toEqual(0);
    });
    
    it("should find a left neighbour", function () {
        var cell = new Cell(Cell.ALIVE,0,0);
        expect(new Universe([new Cell(Cell.ALIVE,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.ALIVE,2,0)]).findNeighboursByCell(cell).length).toEqual(1);
    });
    
    it("should find a left and a rigth neighbour", function () {
        var cell = new Cell(Cell.ALIVE,1,0);
        expect(new Universe([new Cell(Cell.ALIVE,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.ALIVE,2,0)]).findNeighboursByCell(cell).length).toEqual(2);
    });
    
    it("should find a left, a rigth and a bottom neighbour", function () {
        var cell = new Cell(Cell.ALIVE,1,0);
        var matrix = [
                          new Cell(Cell.ALIVE,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.ALIVE,2,0),
                        new Cell(Cell.ALIVE,-10,-10),new Cell(Cell.ALIVE,1,1),new Cell(Cell.ALIVE,-10,-10),
                        new Cell(Cell.ALIVE,-10,-10),new Cell(Cell.ALIVE,1,2),new Cell(Cell.ALIVE,-10,-10)
                     ]
        var neighbours = new Universe(matrix).findNeighboursByCell(cell);
        console.log(neighbours);
        expect(neighbours.length).toEqual(3);
    });
    
    it("should find a left, a rigth, a bottom and a top neighbour", function () {
        var cell = new Cell(Cell.ALIVE,1,1);
        var matrix = [
                        new Cell(Cell.ALIVE,-1,-1),new Cell(Cell.ALIVE,1,0),new Cell(Cell.ALIVE,-1,-1),
                        new Cell(Cell.ALIVE,0,1),new Cell(Cell.ALIVE,1,1),new Cell(Cell.ALIVE,2,1),
                        new Cell(Cell.ALIVE,-1,-1),new Cell(Cell.ALIVE,1,2),new Cell(Cell.ALIVE,-1,-1)
                     ]
        expect(new Universe(matrix).findNeighboursByCell(cell).length).toEqual(4);
    });
    
    it("should find a left, a rigth, a bottom, a top and a leftTop neighbour ", function () {
        var cell = new Cell(Cell.ALIVE,1,1);
        var matrix = [
                        new Cell(Cell.ALIVE,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.ALIVE,-1,-1),
                        new Cell(Cell.ALIVE,0,1),new Cell(Cell.ALIVE,1,1),new Cell(Cell.ALIVE,2,1),
                        new Cell(Cell.ALIVE,-1,-1),new Cell(Cell.ALIVE,1,2),new Cell(Cell.ALIVE,-1,-1)
                     ]
        expect(new Universe(matrix).findNeighboursByCell(cell).length).toEqual(5);
    });
    
    it("should find a left, a rigth, a bottom, a top, leftTop and a rightTop neighbour", function () {
        var cell = new Cell(Cell.ALIVE,1,1);
        var matrix = [
                        new Cell(Cell.ALIVE,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.ALIVE,2,0),
                        new Cell(Cell.ALIVE,0,1),new Cell(Cell.ALIVE,1,1),new Cell(Cell.ALIVE,2,1),
                        new Cell(Cell.ALIVE,-1,-1),new Cell(Cell.ALIVE,1,2),new Cell(Cell.ALIVE,-1,-1)
                     ]
        expect(new Universe(matrix).findNeighboursByCell(cell).length).toEqual(6);
    });
    
    it("should find a left, a rigth, a bottom, a top, leftTop, rightTop and leftBottom neighbour", function () {
        var cell = new Cell(Cell.ALIVE,1,1);
        var matrix = [
                        new Cell(Cell.ALIVE,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.ALIVE,2,0),
                        new Cell(Cell.ALIVE,0,1),new Cell(Cell.ALIVE,1,1),new Cell(Cell.ALIVE,2,1),
                        new Cell(Cell.ALIVE,0,2),new Cell(Cell.ALIVE,1,2),new Cell(Cell.ALIVE,-1,-1)
                     ]
        expect(new Universe(matrix).findNeighboursByCell(cell).length).toEqual(7);
    });
    
    it("should find 8 neighbours", function () {
        var cell = new Cell(Cell.ALIVE,1,1);
        var matrix = [
                        new Cell(Cell.ALIVE,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.ALIVE,2,0),
                        new Cell(Cell.ALIVE,0,1),new Cell(Cell.ALIVE,1,1),new Cell(Cell.ALIVE,2,1),
                        new Cell(Cell.ALIVE,0,2),new Cell(Cell.ALIVE,1,2),new Cell(Cell.ALIVE,2,2)
                     ]
        expect(new Universe(matrix).findNeighboursByCell(cell).length).toEqual(8);
    });
    
    it("should find 3 neighbours", function () {
        var cell = new Cell(Cell.ALIVE,2,2);
        var matrix = [
                        new Cell(Cell.ALIVE,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.ALIVE,2,0),
                        new Cell(Cell.ALIVE,0,1),new Cell(Cell.ALIVE,1,1),new Cell(Cell.ALIVE,2,1),
                        new Cell(Cell.ALIVE,0,2),new Cell(Cell.ALIVE,1,2),new Cell(Cell.ALIVE,2,2)
                     ]
        var neighbours = new Universe(matrix).findNeighboursByCell(cell);
        console.log(neighbours);
        expect(neighbours.length).toEqual(3);
    });
    
    it("three live near vertical cells should evolve to three live near horizontal cells ", function () {
        
        var population = [
                            new Cell(Cell.DEAD,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.DEAD,2,0),
                            new Cell(Cell.DEAD,0,1),new Cell(Cell.ALIVE,1,1),new Cell(Cell.DEAD,2,1),
                            new Cell(Cell.DEAD,0,2),new Cell(Cell.ALIVE,1,2),new Cell(Cell.DEADE,2,2)
                         ];
                
        var newGeneration = new Universe(population).evolve().population;
        
        var aliveCells = _.filter(newGeneration, function(cell) {
            return cell.isAlive() && cell.posY == 1 ;
        }).length;
                
                
         expect(aliveCells).toEqual(3);
    });
    
});