
function Cell (status){
    this.status = status;
}
Cell.ALIVE = true;
Cell.DEAD = false;

Cell.prototype.isAlive = function(){
    return this.status;
}

Cell.prototype.evolve = function(neighbors){

    var neighborsAlive = _.filter(neighbors, function(neighbor){ return neighbor.isAlive() }).length;

    if(this.isAlive() &&  neighbors.length >= 2 && neighbors.length <= 3 ){
        return new Cell(Cell.ALIVE) ;
    }

    if( !this.isAlive() &&  neighbors.length == 3){
        return new Cell(Cell.ALIVE);
    }

    return new Cell(Cell.DEAD);
}