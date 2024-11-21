// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create 3D Text Geometry
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new THREE.TextGeometry('Samsung 3D Ad', {
    font: font,
    size: 2,
    height: 0.5,
  });

  // Material for text
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // Create text mesh
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // Center the text geometry
  textGeometry.computeBoundingBox();
  const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
  textMesh.position.set(-textWidth / 2, 0, 0);
  scene.add(textMesh);

  // Animate the text
  let clock = new THREE.Clock();
  let angle = 0;

  function animate() {
    requestAnimationFrame(animate);

    // Rotate the text to create an animated 3D effect
    const delta = clock.getDelta();
    textMesh.rotation.y += delta * 0.5;

    // Camera movement for effect
    camera.position.x = Math.sin(angle) * 5;
    camera.position.z = Math.cos(angle) * 5;
    camera.lookAt(scene.position);

    angle += delta * 0.2;

    renderer.render(scene, camera);
  }

  animate();
});

// Adjust camera and scene size on window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

camera.position.z = 5;
