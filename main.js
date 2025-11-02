// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// Import OrbitControls (optional, but included for basic camera movement)
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// Import GLTFLoader to load the .glb file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
// Import DRACOLoader in case the model is compressed
import { DRACOLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader.js";

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Append renderer to DOM once it's ready
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container3D");
  if (container) {
    container.appendChild(renderer.domElement);
  } else {
    console.error("container3D not found in DOM");
  }
});

// Add basic lighting
scene.add(new THREE.DirectionalLight(0xffffff, 1).position.set(500, 500, 500));
scene.add(new THREE.AmbientLight(0x333333, 1));

// Add camera controls
const controls = new OrbitControls(camera, renderer.domElement);

// Load Tralalerito model
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load(
  'tralalerito.glb',
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error('Error loading model:', error);
  }
);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
