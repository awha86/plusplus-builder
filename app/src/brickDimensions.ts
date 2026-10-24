export const brickDimensions = {
  unit: 'mm',
  voxel: { x: 4, y: 4, z: 4 },
  grid: [
    [false, true, false, true, false],
    [true, true, true, true, true],
    [false, true, false, true, false],
  ],
  source: 'User-confirmed dimensions; not independently measured.',
  outlineStatus: 'Voxel outline from the documented grid; not physically verified.',
} as const

export const brickSize = {
  x: brickDimensions.grid[0].length * brickDimensions.voxel.x,
  y: brickDimensions.voxel.y,
  z: brickDimensions.grid.length * brickDimensions.voxel.z,
}
