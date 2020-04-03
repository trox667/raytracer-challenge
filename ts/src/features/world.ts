import { Sphere, Ray, Intersection, intersect, sphere } from './rays'
import { PointLight, pointLight } from './lights'
import { point, color } from './tuples'
import { scaling } from './transformations'

export interface World {
  objects: Sphere[]
  light: PointLight
}

export const world = () => {
  return { objects: [], light: null }
}

export const defaultWorld = () => {
  const light = pointLight(point(-10, 10, -10), color(1, 1, 1))
  const s1 = sphere()
  s1.material.color = color(0.8, 1.0, 0.6)
  s1.material.diffuse = 0.7
  s1.material.specular = 0.2

  const s2 = sphere()
  s2.transform = scaling(0.5, 0.5, 0.5)

  return {
    objects: [s1, s2],
    light,
  }
}

export const intersectWorld = (world: World, ray: Ray): Intersection[] => {
  return flatten(
    world.objects.map((object: Sphere) => {
      return intersect(object, ray)
    })
  ).sort((a: Intersection, b: Intersection) => a.t - b.t)
}

const flatten = (arr: any[]): any[] => {
  return arr.reduce((acc: any[], val: any[]) => acc.concat(val), [])
}
