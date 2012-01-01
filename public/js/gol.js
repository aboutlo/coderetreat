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

function GameOfLife(width, height,cellSize){
    this.universe = new Universe();
    this.running = false;
    this.cellSize = cellSize;
    this.width = width;
    this.height = height;
    
    // draw display border
    $('<div id="canvas"/>').appendTo('body');
    
    // border drawed only to be tested 
    $("#canvas").css("width", width);
    $("#canvas").css("height", height);
    $("#canvas").css("border", "1px solid grey");
    
    this.raphael = new Raphael("canvas", width, height);
}
GameOfLife.prototype.isRunning = function(){
    return this.running;
}

GameOfLife.prototype.play = function(){
    this.running = true;
    this.draw();
    return this;
}

GameOfLife.prototype.stop = function(){
    this.running = false;
    clearTimeout(this.timer);
    return this;
}

GameOfLife.prototype.playOrPause = function(){
   if ( this.running ) {
       this.stop() 
    }else {
        this.play();
    }
    return this;
}

GameOfLife.prototype.seed = function(){
    seed = [];
      for (var i = 0; i < this.width / this.cellSize; i++) {
        for (var j = 0; j < this.height / this.cellSize; j++) {
          status = Math.random();
          seed.push(new Cell(status < 0.10, i, j));
        }
      }
      this.universe = new Universe(seed);
      this.draw();
}

GameOfLife.prototype.drawCell = function(cell){
    var x = cell.posX * this.cellSize;
    var y = cell.posY * this.cellSize;
    var fill = cell.isAlive() ? '#000' : '#FFF'
    this.raphael.rect(x, y, this.cellSize, this.cellSize).attr({fill: fill, stroke: "grey"});
}

GameOfLife.prototype.draw = function(){
    this.raphael.clear();
    
    this.universe = this.universe.evolve();
    
    _.each(this.universe.population,function (cell){
        this.drawCell(cell)
    },this);
    
    if (this.running){
        // workaround to get a reference to draw method inner a class
        var self= this;
        this.timer = setTimeout(function() {
            self.draw();
        }, 250);
    }
    
}

































