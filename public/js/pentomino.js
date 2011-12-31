var toad = [ 
               "xxxxxx",
               "xxx*xx",
               "x*xx*x",
               "x*xx*x",
               "xx*xxx",
               "xxxxxx"
              ];

var population = [
                    new Cell(Cell.DEAD,0,0), new Cell(Cell.DEAD,1,0), new Cell(Cell.DEAD,2,0),new Cell(Cell.DEAD,3,0),new Cell(Cell.DEAD,4,0),
                    new Cell(Cell.DEAD,0,1),new Cell(Cell.DEAD,1,1), new Cell(Cell.ALIVE,2,1),new Cell(Cell.ALIVE,3,1),new Cell(Cell.DEAD,4,1),
                    new Cell(Cell.DEAD,0,2),new Cell(Cell.ALIVE,1,2), new Cell(Cell.ALIVE,2,2),new Cell(Cell.DEAD,3,2),new Cell(Cell.DEAD,4,2),
                    new Cell(Cell.DEAD,0,3),new Cell(Cell.DEAD,1,3), new Cell(Cell.ALIVE,2,3),new Cell(Cell.DEAD,3,3),new Cell(Cell.DEAD,4,3),
                    new Cell(Cell.DEAD,0,4),new Cell(Cell.DEAD,1,4), new Cell(Cell.DEAD,2,4),new Cell(Cell.DEAD,3,4),new Cell(Cell.DEAD,4,4)
                 ];

var universe = new Universe(population);
var display;

function tick(){
    universe = universe.evolve()
    display.drawUniverse(universe); 
}

function init(){
    display = new Display();
    display.drawUniverse(universe); 
}

$(document).ready(init);

