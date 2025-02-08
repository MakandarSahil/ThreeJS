import * as THREE from "three";
import gsap from 'gsap';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let box = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let mesh = new THREE.Mesh(box, material);
scene.add(mesh);

camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position)
scene.add(camera);

const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// GSAP animation
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

// Clock for continuous animation
let clock = new THREE.Clock();

function animate() {
  window.requestAnimationFrame(animate);
  
  renderer.render(scene, camera);
  
  mesh.rotation.y = clock.getElapsedTime();

  // Optional camera movement (commented out)
  // camera.position.y = Math.sin(clock.getElapsedTime());
  // camera.position.x = Math.cos(clock.getElapsedTime());
  // camera.lookAt(scene.position);
}

// Start the animation loop
animate();
