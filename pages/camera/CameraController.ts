import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Vector3,
} from 'three'
import { degToRad } from 'three/src/math/MathUtils'

const LOOK_AT_ORIGIN = new Vector3(0, 0, 0)
type FitResult = {
  position: Vector3
  lookAt: Vector3
}
// https://techblog.kayac.com/unity-automated-camerawork
export const CameraController = (camera: PerspectiveCamera) => {
  const fitByMove = (points: Object3D[]): FitResult => {
    const ay0 = Math.tan(degToRad(camera.fov * 0.5))
    const ay1 = -ay0
    const ax0 = ay0 * camera.aspect
    const ax1 = -ax0
    let yMin = 0
    let yMax = 0
    let xMin = 0
    let xMax = 0

    // const locals = points.map((p) => p.worldToLocal(camera.position))
    const locals = points //.map((p) => camera.worldToLocal(p))

    for (let i = 0; i < locals.length; i++) {
      const m = locals[i].position
      if (!m) {
        continue
      }

      const y0 = m.y - ay0 * m.z
      const y1 = m.y - ay1 * m.z
      const x0 = m.x - ax0 * m.z
      const x1 = m.x - ax1 * m.z
      yMin = Math.min(yMin, y0)
      yMax = Math.max(yMax, y1)
      xMin = Math.min(xMin, x0)
      xMax = Math.max(xMax, x1)
    }

    const zy = (yMax - yMin) / (ay0 - ay1)
    const y = yMin + ay0 * zy
    const zx = (xMax - xMin) / (ax0 - ax1)
    const x = xMin + ax0 * zx

    const localPos = new Vector3(
      buffer(x, 3),
      buffer(y, 3),
      buffer(Math.min(zy, zx), 10)
    )

    const object = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial())
    object.position.set(localPos.x, localPos.y, localPos.z)

    const world = object.localToWorld(
      new Vector3(localPos.x, localPos.y, localPos.z)
    )
    // const world = new Vector3(localPos.x, localPos.y, localPos.z)

    return {
      position: world,
      lookAt: LOOK_AT_ORIGIN,
    }
  }

  const buffer = (x: number, buf: number) => {
    return x > 0 ? x + buf : x < 0 ? x - buf : x
  }

  return {
    fitByMove,
  }
}
