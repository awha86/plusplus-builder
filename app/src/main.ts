import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createBrickModel } from './brickModel'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="topbar">
    <a class="brand" href="/" aria-label="Plus-Plus Builder">
      <span class="brand-mark" aria-hidden="true">＋</span>
      <span>Plus-Plus Builder</span>
    </a>
    <span class="prototype-label">3D-prototype</span>
  </header>
  <main>
    <section class="intro" aria-labelledby="page-title">
      <div>
        <p class="eyebrow">PLUS-PLUS MINI · 3D-MODEL</p>
        <h1 id="page-title">Se voxelmodellen fra alle sider</h1>
        <p class="description">Drej den foreløbige 3D-model, der følger den oplyste 5 × 3-gitterform.</p>
      </div>
      <div class="notice" role="note">
        <span class="notice-icon" aria-hidden="true">i</span>
        <p><strong>Brugerbekræftede mål: 20 × 12 × 4 mm.</strong><br>Ikke uafhængigt målt. Kontur og samling er ikke fysisk verificeret.</p>
      </div>
    </section>
    <section class="viewer" aria-label="Interaktiv 3D-scene">
      <div class="scene-toolbar">
        <span class="scene-title"><span class="live-dot" aria-hidden="true"></span> 3D-visning</span>
        <span class="scene-help">Træk for at dreje · scroll for at zoome</span>
      </div>
      <div class="scene" id="scene"></div>
      <div class="scene-caption">
        <span>20 × 12 × 4 mm · 4 mm moduler · 9 moduler</span>
        <span>Gitterkontur og fysiske samlingsregler er ikke verificeret</span>
      </div>
    </section>
  </main>
  <footer><span>Plus-Plus Builder</span><span>Geometri kan senere udskiftes uden at ændre scenen.</span></footer>
`

const sceneHost = document.querySelector<HTMLDivElement>('#scene')!
const scene = new THREE.Scene()
scene.background = new THREE.Color('#101923')

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200)
camera.position.set(28, 24, 36)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.15
renderer.domElement.setAttribute('aria-label', 'Interaktiv 3D-visning af en foreløbig Plus-Plus Mini voxelmodel')
sceneHost.append(renderer.domElement)

scene.add(new THREE.HemisphereLight('#e8f2ff', '#33424e', 2.2))
const keyLight = new THREE.DirectionalLight('#fff0d7', 3.4)
keyLight.position.set(3, 6, 4)
scene.add(keyLight)

const floorGrid = new THREE.GridHelper(60, 30, '#586879', '#344452')
floorGrid.position.y = -2.1
scene.add(floorGrid)

const brickModel = createBrickModel()
scene.add(brickModel.object)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0)
controls.enableDamping = true
controls.dampingFactor = 0.07
controls.minDistance = 12
controls.maxDistance = 60
controls.update()

function resizeScene() {
  const { width, height } = sceneHost.getBoundingClientRect()
  if (width === 0 || height === 0) return
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height, false)
}

const resizeObserver = new ResizeObserver(resizeScene)
resizeObserver.observe(sceneHost)
resizeScene()

let animationFrame = 0
function render() {
  animationFrame = window.requestAnimationFrame(render)
  controls.update()
  renderer.render(scene, camera)
}
render()

window.addEventListener('pagehide', () => {
  window.cancelAnimationFrame(animationFrame)
  resizeObserver.disconnect()
  controls.dispose()
  brickModel.dispose()
  renderer.dispose()
}, { once: true })
