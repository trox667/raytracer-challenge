export class Intersection {
  constructor(public t = 0, public object = {}) {}
}

export function intersection(t: number, o: any): Intersection {
  return new Intersection(t, o)
}

export function intersections(intersections: Intersection[]): Intersection[] {
  const sorted = [...intersections]
  sorted.sort((a, b) => {
    return a.t - b.t
  })
  return sorted
}

export function hit(intersections: Intersection[]): Intersection {
  const r =  intersections.find((value) => value.t >= 0)
  if (r) return r
  else return null
    
}
