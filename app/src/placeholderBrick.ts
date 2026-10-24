import * as THREE from 'three'

export function createPlaceholderBrick(): { object: THREE.Group; dispose: () => void } {
  const object = new THREE.Group()
  const geometry = new THREE.BoxGeometry(2.8, 0.72, 1.65)
  const material = new THREE.MeshStandardMaterial({
    color: '#f2a94a',
    roughness: 0.38,
    metalness: 0.04,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.y = 0.12
  object.add(mesh)

  const edgeGeometry = new THREE.EdgesGeometry(geometry)
  const edgeMaterial = new THREE.LineBasicMaterial({ color: '#ffdfad', transparent: true, opacity: 0.8 })
  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
  edges.position.copy(mesh.position)
  object.add(edges)

  return {
    object,
    dispose() {
      geometry.dispose()
      material.dispose()
      edgeGeometry.dispose()
      edgeMaterial.dispose()
    },
  }
}
