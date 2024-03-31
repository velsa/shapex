export class ShapeXPoint {
  x: number;
  y: number;
  curve: number;
  next: ShapeXPoint | null;

  constructor(x: number, y: number, curve: number) {
    this.x = Math.round(x);
    this.y = Math.round(y);
    this.curve = curve;
    this.next = null;
  }

  equals(point: ShapeXPoint) {
    return this.x === point.x && this.y === point.y;
  }
}

export class ShapeX {
  head: ShapeXPoint | null = null;

  constructor() {}

  static distance(p1: ShapeXPoint, p2: ShapeXPoint) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2) * p1.curve;
  }

  addPoint(point: ShapeXPoint) {
    if (this.head === null) {
      this.head = point;
      this.head.next = null;
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }

    current.next = point;

    console.log(this.print());
  }

  addPointBetween(p1: ShapeXPoint, p2: ShapeXPoint, point: ShapeXPoint) {
    point.next = p2;
    p1.next = point;
  }

  removePoint(point: ShapeXPoint) {
    let current = this.head;

    while (current !== null) {
      if (current.equals(point)) {
        current.next = current.next?.next || null;
        break;
      }

      current = current.next;
    }
  }

  perimeter() {
    if (this.head === null || this.head.next === null) {
      return -1;
    }

    let current = this.head;
    let perimeter = 0;

    while (current?.next !== null) {
      perimeter += ShapeX.distance(current, current.next);
      current = current.next;
    }

    return perimeter + ShapeX.distance(current, this.head);
  }

  print() {
    let current = this.head;
    let points = "";

    while (current !== null) {
      points += `(${current.x}, ${current.y}) -> `;
      current = current.next;
    }

    return points;
  }
}
