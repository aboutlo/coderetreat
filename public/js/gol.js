function Cell(status, posX, posY) {
    this.status = status;
    this.posX = posX;
    this.posY = posY;
}

Cell.ALIVE = true;
Cell.DEAD = false;

Cell.prototype.isAlive = function() {
    return this.status;
};

Cell.prototype.evolve = function(neighbors) {

    var aliveNeighbors = _.filter(neighbors, function(neighbor) {
        return neighbor.isAlive();
    }).length;

    if (this.isAlive() && aliveNeighbors >= 2 && aliveNeighbors <= 3) {
        return new Cell(Cell.ALIVE,this.posX,this.posY);
    }

    if (this.isAlive() === false && aliveNeighbors == 3) {
        return new Cell(Cell.ALIVE,this.posX,this.posY);
    }

    return new Cell(Cell.DEAD,this.posX,this.posY);
};

function Universe(population) {
    this.population = population === undefined ? [] : population;
}

Universe.prototype.isEmpty = function() {
    return this.population.length === 0;
};

Universe.prototype.evolve = function() {
    var newGeneration = [];

    _.each(this.population, function(cell) {
        var neighbours = this.findNeighboursByCell(cell)
        newGeneration.push(cell.evolve(neighbours));
    },this);

    return new Universe(newGeneration);
};

Universe.prototype.findNeighboursByCell = function(cell) {
    var neighbours = [];
    
    _.each(this.population, function(neighbour) {
        
        var hasLeft = (cell.posX - 1) ===  neighbour.posX && cell.posY === neighbour.posY;
        var hasRigth = (cell.posX + 1) ===  neighbour.posX && cell.posY === neighbour.posY;
        var hasBottom = (cell.posY + 1) ===  neighbour.posY && cell.posX === neighbour.posX;
        var hasTop = (cell.posY - 1) ===  neighbour.posY && cell.posX === neighbour.posX;
        var hasLeftTop = (cell.posX - 1) ===  neighbour.posX && (cell.posY - 1) === neighbour.posY;
        var hasRigthTop = (cell.posX + 1) ===  neighbour.posX && (cell.posY - 1) === neighbour.posY;
        var hasLeftBottom = (cell.posX - 1) ===  neighbour.posX && (cell.posY + 1) === neighbour.posY;
        var hasRigthBottom = (cell.posX + 1) ===  neighbour.posX && (cell.posY + 1) === neighbour.posY;

        // find left neighbour
        if (hasLeft){
            neighbours.push( neighbour);
        }
        
        // find rigth neighbour
        if (hasRigth){
            neighbours.push( neighbour);
        }
        
        // find bottom neighbour
        if ( hasBottom){
            neighbours.push( neighbour);
        }
        
        // find top neighbour
        if (hasTop){
            neighbours.push( neighbour);
        }
        
        if ( hasLeftTop){
            neighbours.push( neighbour);
        }
        
        if ( hasRigthTop){
            neighbours.push( neighbour);
        }
        
        if ( hasLeftBottom){
            neighbours.push( neighbour);
        }
        
        if ( hasRigthBottom){
            neighbours.push( neighbour);
        }
        
       
        
        
    });
    
    
    return neighbours;
}

function Display(){
    var w = 500;
    var h = 500;
    
    // draw display border
    $('<div id="canvas"/>').appendTo('body');
    $("#canvas").css("width", w);
    $("#canvas").css("height", h);
    $("#canvas").css("border", "1px solid grey");
    
    this.raphael = new Raphael("canvas", w, h);
}

Display.prototype.drawCell = function(cell){
    var side = 40;
    var x = cell.posX * side;
    var y = cell.posY * side;
    var fill = cell.isAlive() ? '#FFF' : '#000'
    this.raphael.rect(x, y, side, side).attr({fill: fill, stroke: "grey"});
}

Display.prototype.drawUniverse = function(universe){
    
    _.each(universe.population,function (cell){
        this.drawCell(cell)
    },this);
    
}
































