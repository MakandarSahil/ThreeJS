import * as THREE from "three";
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';



// moving camera with mouse 
// cursor
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
  // console.log(event.clientX) //co-ordinates of cursor on x 
  // console.log(event.clientY) //co-ordinates of cursor on y 
  cursor.x =( event.clientX / window.innerWidth - 0.5)
  cursor.y = (event.clientY / window.innerWidth - 0.5)
})

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

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position)
scene.add(camera);


const canvas = document.querySelector('canvas.webgl');
// {orbit Controls}
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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
  
  
  // {animation}
  // mesh.rotation.y = clock.getElapsedTime();
  
  
  // {Rotating the cube using mouse}
  // camera.position.x = cursor.x * 10
  // camera.position.y = cursor.y * 10
  // camera.lookAt(mesh.position)
  
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 5
  // camera.lookAt(mesh.position)
  
  // Optional camera movement (commented out)
  // camera.position.y = Math.sin(clock.getElapsedTime());
  // camera.position.x = Math.cos(clock.getElapsedTime());
  // camera.lookAt(scene.position);
  
  //update controls

  controls.update()

  renderer.render(scene, camera);
}

// Start the animation loop
animate();
