import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//due to vite limitations we need to define static urls like this
const fontUrl = new URL(
  "../assets/fonts/inter_regular.typeface.json",
  import.meta.url
);
//constants
const BOX_SIZE = 30;
const ROTATE_CONSTANT = 1.575;
const TEXT_COLOR = 0xffa97a;
const BOX_COLOR = 0x182228;
const SCENE_COLOR = 0x111a20;
const scene = new THREE.Scene();
//camera
var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 50;
//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor(SCENE_COLOR);

const loader = new FontLoader();

//cube sides
const pages = [
  {
    title: "Hello",
    textProps: {
      size: 4,
      height: 0.64,
      bevelOffset: 15,
    },
    meshProps: {
      color: TEXT_COLOR,
    },
    transform: {
      x: 0,
      y: 0,
      z: BOX_SIZE / 2,
    },
    rotation: {
      x: -ROTATE_CONSTANT,
      y: 0,
      z: 0,
    },
  },
  {
    title: "I'm",
    textProps: {
      size: 4,
      height: 0.64,
      bevelOffset: 15,
    },
    meshProps: {
      color: TEXT_COLOR,
    },
    transform: {
      x: 0,
      y: 0,
      z: BOX_SIZE / 2,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  },

  {
    title: "Front\nEnd",
    textProps: {
      size: 4,
      height: 0.64,
      bevelOffset: 15,
    },
    meshProps: { color: TEXT_COLOR },
    transform: {
      x: 0,
      y: 0,
      z: BOX_SIZE / 2,
    },
    rotation: {
      x: 0,
      y: ROTATE_CONSTANT,
      z: 0,
    },
  },
  {
    title: "Developer",
    textProps: {
      size: 4,
      height: 0.64,
      bevelOffset: 15,
    },
    meshProps: {
      color: TEXT_COLOR,
    },
    transform: {
      x: 0,
      y: 0,
      z: BOX_SIZE / 2,
    },
    rotation: {
      x: 0,
      y: 3.145,
      z: 0,
    },
  },
  {
    title: "Abdulkadir\nDevelioglu",
    textProps: {
      size: 4,
      height: 0.64,
      bevelOffset: 15,
    },
    meshProps: {
      color: TEXT_COLOR,
    },
    transform: {
      x: 0,
      y: 0,
      z: BOX_SIZE / 2,
    },
    rotation: {
      x: 0,
      y: -ROTATE_CONSTANT,
      z: 0,
    },
  },
];

//cube definition
const cubeGeo = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
const cubeMat = new THREE.MeshBasicMaterial({
  color: BOX_COLOR,
});
const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
//set cube side texts to cube faces

pages.map((page) => {
  loader.load(fontUrl, (font) => {
    const pageGeo = new TextGeometry(page.title, { ...page.textProps, font });
    const pageMat = new THREE.MeshBasicMaterial({ ...page.meshProps });
    const mesh = new THREE.Mesh(pageGeo, pageMat);
    pageGeo.center();
    pageGeo.translate(page.transform.x, page.transform.y, page.transform.z);
    mesh.rotation.x = page.rotation.x;
    mesh.rotation.y = page.rotation.y;
    mesh.rotation.z = page.rotation.z;
    cubeMesh.add(mesh);
  });
});

//handle rotating
const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.maxPolarAngle = Math.PI / 2;
controls.maxDistance = 1;
scene.add(cubeMesh);
//animation
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
document.body.appendChild(renderer.domElement);
animate();
