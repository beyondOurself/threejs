import "../public/style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 创建渲染器

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建集合体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// 设置 父元素材质为线框模式
parentMaterial.wireframe = true
// 创建网格
const parentCube = new THREE.Mesh(geometry, parentMaterial);
const cube = new THREE.Mesh(geometry, material);
parentCube.scale.set(2, 2, 2);
parentCube.add(cube);

// x 轴移动三个单位
cube.position.set(3, 0, 0);
// 放大  x,y,z 都放大两倍
cube.scale.set(2, 2, 2);
// x 轴旋转
cube.rotation.x = Math.PI / 4;

// 将网格添加到 场景中
scene.add(parentCube);

// 设置相机位置

camera.position.z = 20;
camera.position.y = 5;
camera.position.x = 10;

camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置带阻尼的惯性
controls.enableDamping = true;
controls.dampingFactor = 0.05;
// 设置旋转速度
// controls.autoRotate = true;

// 渲染函数

const animate = () => {
  controls.update();
  requestAnimationFrame(animate);
  // 旋转
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  // 渲染
  renderer.render(scene, camera);
};

animate();

// 监听窗口变化
window.addEventListener("resize", () => {
  // 重置相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵
  camera.updateProjectionMatrix();

  // 重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});

// 设置全屏

const fullButton = document.createElement("button");
fullButton.innerHTML = "点击全屏";
fullButton.style.position = "absolute";
fullButton.style.top = "10px";
fullButton.style.left = "10px";
fullButton.style.zIndex = 2;

fullButton.onclick = () => {
  // 全屏
  document.body.requestFullscreen();
};

document.body.appendChild(fullButton);

// 设置全屏

const exitButton = document.createElement("button");
exitButton.innerHTML = "退出全屏";
exitButton.style.position = "absolute";
exitButton.style.top = "10px";
exitButton.style.left = "100px";
exitButton.style.zIndex = 2;

exitButton.onclick = () => {
  // 全屏
  document.exitFullscreen();
};

document.body.appendChild(exitButton);

// 创建事件对象

const eventObj = {
  Fullscreen: () => {
    document.body.requestFullscreen();
  },
  exitFullscreen: () => {
    document.exitFullscreen();
  },
};

// 创建 GUI
const gui = new GUI();
gui.add(eventObj, "Fullscreen").name('全屏');
gui.add(eventObj, "exitFullscreen").name("退出全屏");

const folder = gui.addFolder('立方体位置')
folder.add(cube.position,'x').min(-10).max(10).step(1).name('立方体x轴位置').onChange( val => {

    console.log('x',val);
})
folder.add(cube.position,'y').min(-10).max(10).step(1).name('立方体y轴位置').onFinishChange(val => {

    console.log('y',val)
    
})
folder.add(cube.position,'z').min(-10).max(10).step(1).name('立方体z轴位置')

gui.add(parentMaterial,'wireframe').name('父元素的线框模式')

// 颜色控制 

 const colorParams = {
    cubColor:'#ff0000'
 }

 gui.addColor(colorParams,'cubColor').name('立方体颜色').onChange(color => {
    cube.material.color.set(color)
 })