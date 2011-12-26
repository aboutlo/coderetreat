describe("A Cell", function () {

    /* before any tests  */
    beforeEach(function () {
        // donothing
    });

    it("should be defined", function () {
        expect(Cell).toBeDefined();
    });

    it("should be alive", function () {
        expect(new Cell(Cell.ALIVE).isAlive()).toEqual(Cell.ALIVE)
    });

    it("should be die", function () {
        expect(new Cell(Cell.DEAD).isAlive()).toEqual(Cell.DEAD);;
    });

    it("should be evolve", function () {
        expect(new Cell(Cell.DEAD).evolve([]).isAlive()).toEqual(Cell.DEAD);
    });

    it("should die without neighbours", function () {
        expect(new Cell(Cell.ALIVE).evolve([]).isAlive()).toEqual(Cell.DEAD);
    });

    it("should die with fewer than two live neighbours", function () {
        expect(new Cell(Cell.ALIVE).evolve([new Cell(Cell.ALIVE)]).isAlive()).toEqual(Cell.DEAD);
    })

    it("should live with two or three live neighbours ", function () {
        expect(new Cell(Cell.ALIVE).evolve([new Cell(Cell.ALIVE),new Cell(Cell.ALIVE),new Cell(Cell.ALIVE)]).isAlive()).toEqual(Cell.ALIVE);
    })

    it("a dead  cell should not resurrect with two neighbours ", function () {
        expect(new Cell(Cell.DEAD).evolve([new Cell(Cell.ALIVE),new Cell(Cell.ALIVE)]).isAlive()).toEqual(Cell.DEAD);
    })

    it("should die with more than three live neighbours ", function () {
        expect(new Cell(Cell.ALIVE).evolve([new Cell(Cell.ALIVE),new Cell(Cell.ALIVE),new Cell(Cell.ALIVE),new Cell(Cell.ALIVE)]).isAlive()).toEqual(Cell.DEAD);
    })

    it("a dead cell should live with exactly three live neighbours ", function () {
        expect(new Cell(Cell.DEAD).evolve([new Cell(Cell.ALIVE),new Cell(Cell.ALIVE),new Cell(Cell.ALIVE)]).isAlive()).toEqual(Cell.ALIVE);
    })

});