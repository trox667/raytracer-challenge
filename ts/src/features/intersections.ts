export class Intersection {
  constructor(public t = 0, public object = {}) {}
}

export function intersection(t: number, o: any): Intersection {
  return new Intersection(t, o)
}

export function intersections(intersections: Intersection[]): Intersection[] {
  return intersections
}
