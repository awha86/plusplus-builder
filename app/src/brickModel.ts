import * as THREE from 'three'
import { brickDimensions, brickSize } from './brickDimensions'

type Point = { x: number; y: number }
type Edge = { start: Point; end: Point }

export type BrickModelOptions = {
  color?: THREE.ColorRepresentation
  position?: THREE.Vector3
  rotation?: THREE.Euler
  scale?: THREE.Vector3
}

function pointKey(point: Point) {
  return `${point.x},${point.y}`
}

function createOutline(): Point[] {
  const edges = new Map<string, Edge>()
  const rows = brickDimensions.grid
  const columns = rows[0].length

  function addEdge(start: Point, end: Point) {
    edges.set(pointKey(start), { start, end })
  }

  rows.forEach((row, y) => {
    row.forEach((occupied, x) => {
      if (!occupied) return
      if (!rows[y - 1]?.[x]) addEdge({ x, y }, { x: x + 1, y })
      if (!row[x + 1]) addEdge({ x: x + 1, y }, { x: x + 1, y: y + 1 })
      if (!rows[y + 1]?.[x]) addEdge({ x: x + 1, y: y + 1 }, { x, y: y + 1 })
      if (!row[x - 1]) addEdge({ x, y: y + 1 }, { x, y })
    })
  })

  const firstEdge = edges.values().next().value as Edge | undefined
  if (!firstEdge) throw new Error('The brick grid must contain at least one occupied module.')

  const outline: Point[] = []
  let edge: Edge | undefined = firstEdge
  while (edge) {
    outline.push(edge.start)
    edges.delete(pointKey(edge.start))
    edge = edges.get(pointKey(edge.end))
    if (edge?.start.x === firstEdge.start.x && edge.start.y === firstEdge.start.y) break
  }

  if (edges.size > 0) throw new Error('The brick grid must form one connected outline.')
  return outline.map(({ x, y }) => ({
    x: (x - columns / 2) * brickDimensions.voxel.x,
    y: (y - rows.length / 2) * brickDimensions.voxel.z,
  }))
}

export function createBrickModel(options: BrickModelOptions = {}): {
  object: THREE.Group
  dispose: () => void
} {
  const outline = createOutline()
  const shape = new THREE.Shape()
  shape.moveTo(outline[0].x, outline[0].y)
  outline.slice(1).forEach(({ x, y }) => shape.lineTo(x, y))
  shape.closePath()

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: brickSize.y,
    bevelEnabled: false,
  })
  geometry.translate(0, 0, -brickSize.y / 2)
  geometry.rotateX(-Math.PI / 2)

  const material = new THREE.MeshPhysicalMaterial({
    color: options.color ?? '#f58b3d',
    roughness: 0.3,
    clearcoat: 0.28,
    clearcoatRoughness: 0.24,
  })
  const object = new THREE.Group()
  object.position.copy(options.position ?? new THREE.Vector3())
  object.rotation.copy(options.rotation ?? new THREE.Euler())
  object.scale.copy(options.scale ?? new THREE.Vector3(1, 1, 1))
  object.add(new THREE.Mesh(geometry, material))

  return {
    object,
    dispose() {
      geometry.dispose()
      material.dispose()
    },
  }
}
