import { Tuple, add, normalize, vector } from '../features/tuples'

interface Projectile {
  position: Tuple
  velocity: Tuple
}

const projectile = (position: Tuple, velocity: Tuple): Projectile => {
  return {
    position,
    velocity,
  }
}

interface Environment {
  gravity: Tuple
  wind: Tuple
}

const environment = (gravity: Tuple, wind: Tuple): Environment => {
  return { gravity, wind }
}

const tick = (env: Environment, proj: Projectile): Projectile => {
  const position = add(proj.position, proj.velocity)
  const velocity = add(add(proj.velocity, env.gravity), env.wind)
  return { position, velocity }
}

const p = projectile(vector(0, 1, 0), normalize(vector(1, 1, 0)))
const e = environment(vector(0, -0.1, 0), vector(-0.01, 0, 0))

const run = (t: number = 0, p: Projectile, e: Environment) => {
  if (p.position.y > 0) {
    p = tick(e, p)
    console.log(t, p.position)
    run(++t, p, e)
  }
  return
}

run(0, p, e)
