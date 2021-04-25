import { add, normalize, point, Tuple, vector } from '../features/tuples'

type Projectile = { position: Tuple; velocity: Tuple }

type Environment = { gravity: Tuple; wind: Tuple }

function tick(env: Environment, proj: Projectile): Projectile {
  const position = add(proj.position, proj.velocity)
  const envVel = add(env.gravity, env.wind)
  const velocity = add(proj.velocity, envVel as Tuple)
  return { position: position as Tuple, velocity: velocity as Tuple }
}

let p: Projectile = {
  position: point(0, 1, 0),
  velocity: normalize(vector(1, 1, 0)) as Tuple,
}

const e: Environment = { gravity: vector(0, -0.1, 0), wind: vector(-0.1, 0, 0) }

let steps = 0
while (p.position[1] > 0.0) {
  steps++
  p = tick(e, p)
}
console.log(steps, p)
