import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createPlaceholderBrick } from './placeholderBrick'

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
        <p class="eyebrow">FØRSTE VISUELLE PROTOTYPE</p>
        <h1 id="page-title">Undersøg en 3D-brik</h1>
        <p class="description">Scenen afprøver kamera, lys og navigation, før den parametriske brikgeometri sættes ind.</p>
      </div>
      <div class="notice" role="note">
        <span class="notice-icon" aria-hidden="true">i</span>
        <p><strong>Placeholder — ikke en verificeret Plus-Plus-model.</strong><br>Form og proportioner er kun illustrative og ikke målfast.</p>
      </div>
    </section>
    <section class="viewer" aria-label="Interaktiv 3D-scene">
      <div class="scene-toolbar">
        <span class="scene-title"><span class="live-dot" aria-hidden="true"></span> 3D-visning</span>
        <span class="scene-help">Træk for at dreje · scroll for at zoome</span>
      </div>
      <div class="scene" id="scene"></div>
      <div class="scene-caption">
        <span>Illustrativ blok-placeholder</span>
        <span>Ingen samlingsregler eller bygbarhed er modelleret</span>
      </div>
    </section>
  </main>
  <footer><span>Plus-Plus Builder</span><span>Geometri kan senere udskiftes uden at ændre scenen.</span></footer>
`

const sceneHost = document.querySelector<HTMLDivElement>('#scene')!
const scene = new THREE.Scene()
scene.background = new THREE.Color('#101923')

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
camera.position.set(4.5, 4, 5.5)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.15
renderer.domElement.setAttribute('aria-label', 'Interaktiv 3D-visning af en illustrativ placeholder-brik')
sceneHost.append(renderer.domElement)

scene.add(new THREE.HemisphereLight('#e8f2ff', '#33424e', 2.2))
const keyLight = new THREE.DirectionalLight('#fff0d7', 3.4)
keyLight.position.set(3, 6, 4)
scene.add(keyLight)

const floorGrid = new THREE.GridHelper(12, 24, '#586879', '#344452')
floorGrid.position.y = -0.42
scene.add(floorGrid)

const placeholderBrick = createPlaceholderBrick()
scene.add(placeholderBrick.object)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0)
controls.enableDamping = true
controls.dampingFactor = 0.07
controls.minDistance = 3
controls.maxDistance = 12
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
  placeholderBrick.dispose()
  renderer.dispose()
}, { once: true })
