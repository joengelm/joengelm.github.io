const Colors = {
    red: 0xf25346,
    white: 0xe8e0e1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x188380,
    lightBlue: 0x58c3c0
};

let scene, camera, renderer, container, controls;
let HEIGHT, WIDTH, mousePos = { x: 0, y: 0 };
const UNIT = 40;

const createScene = () => {

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();
    const aspectRatio = WIDTH / HEIGHT;
    const fieldOfView = 75;
    const nearPlane = 1;
    const farPlane = 10000;

    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );

    scene.fog = new THREE.FogExp2(0xf7d9aa, 0.001);
    camera.position.x = 0;
    camera.position.z = 0;
    camera.position.y = 3 * UNIT;

    controls = new THREE.FirstPersonControls(camera);
    controls.movementSpeed = 0.7 * UNIT;
    controls.lookSpeed = 0.001 * UNIT;
    controls.noFly = true;
    controls.lookVertical = false;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', handleWindowResize, false);
};

const handleWindowResize = () => {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
};

const createLights = () => {
  const light = new THREE.AmbientLight(0xffffff, 0.1);
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x777777, 0.9)
  const shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
  shadowLight.position.set(40, 400, 60);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(light);
  scene.add(hemisphereLight);
  scene.add(shadowLight);

};

const Sky = function() {

    this.mesh = new THREE.Object3D();
    this.numCubes = 20;
    this.cubes = [];

    for (let i = 0; i < this.numCubes; i++){
        const c = new Cube();
        this.cubes.push(c);
        c.mesh.position.x = Math.floor((Math.random() - 0.5) * 5) * UNIT;
        c.mesh.position.y = Math.floor(Math.random() * 5) * UNIT;
        c.mesh.position.z = Math.floor(-Math.random() * 5 - 5) * UNIT;
        console.log(c.mesh.position.x, c.mesh.position.y, c.mesh.position.z);
        this.mesh.add(c.mesh);
    }
};

const Cube = function(x, y, z, color) {
    this.mesh = new THREE.Object3D();
    const geom = new THREE.CubeGeometry(UNIT, UNIT, UNIT);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0.5 * UNIT, 0.5 * UNIT, 0.5 * UNIT));
    const mat = new THREE.MeshPhongMaterial({
        color: color === undefined ? Colors.white : color,
    });
    const m = new THREE.Mesh(geom.clone(), mat);
    m.position.x = x === undefined ? 0 : x;
    m.position.y = y === undefined ? 0 : y;
    m.position.z = z === undefined ? 0 : z;
    m.castShadow = true;
    m.receiveShadow = true;
    this.mesh.add(m);
};

const createSky = () => {
    sky = new Sky();
    sky.mesh.position.y = 0;
    scene.add(sky.mesh);
};

const Ground = function() {
    const geom = new THREE.PlaneGeometry(1000 * UNIT, 1000 * UNIT);
    const mat = new THREE.MeshPhongMaterial({
        color: Colors.blue,
        transparent: true,
        opacity: .8,
        shading: THREE.FlatShading,
    });
    this.mesh = new THREE.Mesh(geom, mat); 
    this.mesh.receiveShadow = true;
};

const createGround = () => {
    const ground = new Ground();
    ground.mesh.position.y = 0;
    ground.mesh.rotation.x = -Math.PI/2; // -90 degrees around the xaxis 
    ground.mesh.doubleSided = true; 

    const grid = new THREE.GridHelper(1000 * UNIT, UNIT);
    grid.setColors(0xffffff, 0xffffff);
    scene.add( grid );
    scene.add(ground.mesh);
};

let requestId;
let firstCube, secondCube;

const forwardLoop = () => {
  firstCube.mesh.position.z -= .02 * UNIT;
  secondCube.mesh.position.x += .01 * UNIT;
  renderer.render(scene, camera);
  controls.update(0.1);
  requestId = requestAnimationFrame(forwardLoop);
};

const rewindLoop = () => {
  firstCube.mesh.position.z += .02 * UNIT;
  secondCube.mesh.position.x -= .01 * UNIT;
  renderer.render(scene, camera);
  requestId = requestAnimationFrame(rewindLoop);
}

const enableDragAndDrop = () => {

  const mousePos = { x: 0, y: 0 };
  let isClicking = false;

  $('#world').mousedown( event => {
    console.log('mousedown');
    isClicking = true;
  }).mousemove( event => {
    if (isClicking) {
      mousePos.x = event.pageX;
      mousePos.y = event.pageY;
      console.log(mousePos);
    }
  }).mouseup( event => {
    console.log('mouseup');
    isClicking = false;
  });
  
};

const init = event => {

  createScene();
  createLights();
  createSky();
  createGround();


  firstCube = new Cube(-3 * UNIT, 2 * UNIT, -5 * UNIT, Colors.red);
  scene.add(firstCube.mesh);

  secondCube = new Cube(1 * UNIT, 2 * UNIT, -5 * UNIT, Colors.lightBlue);
  scene.add(secondCube.mesh);

  forwardLoop();

  $('#start').click( event => {
    forwardLoop();
  });

  $('#stop').click( event => {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  })

  $('#rewind').click( event => {
    rewindLoop();
  });

  //enableDragAndDrop();

};

window.addEventListener('load', init, false);
