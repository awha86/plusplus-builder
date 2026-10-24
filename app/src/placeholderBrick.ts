import * as THREE from 'three'

export function createPlaceholderBrick(): { object: THREE.Group; dispose: () => void } {
  const object = new THREE.Group()
  const unit = 0.8
  const thickness = unit
  const bevelThickness = 0.06
  const bevelSize = 0.05
  const outline = [
    [1, 3], [2, 3], [2, 2], [3, 2], [3, 3], [4, 3], [4, 2], [5, 2],
    [5, 1], [4, 1], [4, 0], [3, 0], [3, 1], [2, 1], [2, 0], [1, 0],
    [1, 1], [0, 1], [0, 2], [1, 2],
  ].map(([x, z]) => new THREE.Vector2((x - 2.5) * unit, (z - 1.5) * unit))
  const shape = new THREE.Shape()
  const corners = outline.map((point, index) => {
    const previous = outline[(index + outline.length - 1) % outline.length]
    const next = outline[(index + 1) % outline.length]
    const radius = unit * 0.1
    const start = point.clone().add(previous.clone().sub(point).setLength(radius))
    const end = point.clone().add(next.clone().sub(point).setLength(radius))
    return { point, start, end }
  })
  shape.moveTo(corners[0].start.x, corners[0].start.y)
  corners.forEach(({ point, start, end }) => {
    shape.lineTo(start.x, start.y)
    shape.quadraticCurveTo(point.x, point.y, end.x, end.y)
  })
  shape.closePath()

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness - bevelThickness * 2,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize,
    bevelThickness,
    curveSegments: 4,
  })
  geometry.translate(0, 0, -thickness / 2 + bevelThickness)
  geometry.rotateX(-Math.PI / 2)
  const material = new THREE.MeshPhysicalMaterial({
    color: '#f58b3d',
    roughness: 0.3,
    clearcoat: 0.28,
    clearcoatRoughness: 0.24,
  })
  const mesh = new THREE.Mesh(geometry, material)
  object.add(mesh)

  return {
    object,
    dispose() {
      geometry.dispose()
      material.dispose()
    },
  }
}
