import Board from "./Board";

class Point {

    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }

    eq(other) {
        return this.X === other.X && this.Y === other.Y
    }

    checkPoint(map, dx, dy) {
        let next_point = new Point(this.X + dx, this.Y + dy);
        if (map.inBounds(next_point) && map.state.board[next_point.X + next_point.Y*9] === 'cell') {
            return next_point;
        }
        return undefined;
    }

    toString(){
        return 'X'+this.X + 'Y' + this.Y;
    }
}
export default Point;