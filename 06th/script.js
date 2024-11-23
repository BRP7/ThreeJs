// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(-10, 10, 10);
scene.add(light);

// Geometry for water
const waterGeometry = new THREE.PlaneGeometry(100, 100);

// Create Water object (correct usage)
const water = new THREE.Water(waterGeometry, {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: new THREE.TextureLoader().load(
    'https://threejs.org/examples/textures/waternormals.jpg',
    (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }
  ),
  sunDirection: new THREE.Vector3(),
  sunColor: 0xffffff,
  waterColor: 0x001e0f,
  distortionScale: 3.7,
  fog: scene.fog !== undefined
});

// Rotate water to lay flat
water.rotation.x = -Math.PI / 2;
scene.add(water);

// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update water time for animations
  water.material.uniforms['time'].value += 1.0 / 60.0;

  controls.update();
  renderer.render(scene, camera);
}
animate();
