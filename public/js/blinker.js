var population = [
                    new Cell(Cell.DEAD,0,0),new Cell(Cell.ALIVE,1,0),new Cell(Cell.DEAD,2,0),
                    new Cell(Cell.DEAD,0,1),new Cell(Cell.ALIVE,1,1),new Cell(Cell.DEAD,2,1),
                    new Cell(Cell.DEAD,0,2),new Cell(Cell.ALIVE,1,2),new Cell(Cell.DEADE,2,2)
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



        