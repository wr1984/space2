define(['three', 'controls', 'stats', 'spriteControl', 'tweenMax'], function(THREE, Controls, stats, SpriteControl, tweenMax) {
	let camera;
	let scene;
	let renderer;
	let textureLoader;
	let width, height;
	let me;
	let controls;
	let size = 20;
	let diandianMaps, xingxingMaps, xingqiuMaps, yuanquanMaps;
	let diandianMaterials, xingxingMaterials, xingqiumaterials, yuanquanMaterials;
	let diandianGroup, xingxingGroup, xingqiuGroup, yuanquanGroup;
	let diandianControls, xingxingControls, xingqiuControls, yuanquanControls;
	let diandianArr, xingxingArr, xingqiuArr, yuanquanArr;
	let isStart = true;
	let colorArr = [0xf9dce0, 0xf5957d, 0x17ffa7];
	let e;

	class App {
		constructor() {
			this.init();
			this.update();

		}

		init() {
			me = this;
			this.initStats();
			width = window.innerWidth;
			height = window.innerHeight;
			scene = new THREE.Scene();

			camera = new THREE.PerspectiveCamera(45, width / height, 1, 1500)
			camera.position.z = 800;
			camera.lookAt(scene.position);
			scene.add(camera);

			renderer = new THREE.WebGLRenderer();
			renderer.setClearColor(0x343434);
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(width, height);

			controls = new Controls(camera, renderer.domElement);

			textureLoader = new THREE.TextureLoader();
			//加载mapping
			//			yuanquanMaps = this.createMappings('yuanquan',12);
			diandianMaps = this.createMappings('diandian', 42);
			xingxingMaps = this.createMappings('xingxing', 21);
			xingqiuMaps = this.createMappings('xingqiu', 18);
			//创建materials
			//			yuanquanMaterials = this.createMaterials(yuanquanMaps);
			diandianMaterials = this.createMaterials(diandianMaps);
			xingxingMaterials = this.createMaterials(xingxingMaps);
			xingqiumaterials = this.createMaterials(xingqiuMaps);
			//创建contros
			let params = {
				width: width / 2,
				height: height / 2,
				depth: 100,
				maxSpeed: 1,
				isAvoidWalls: true
			}
			let xingxingParams = {
				width: width / 2,
				height: height / 2,
				depth: 100,
				maxSpeed: 1,
				isAvoidWalls: true
			}

			yuanquanControls = this.createControls(100, params, 'yuanquan')
			diandianControls = this.createControls(200, params, 'diandian');
			xingxingControls = this.createControls(400, xingxingParams, 'xingxing');
			xingqiuControls = this.createControls(200, params, 'xingqiu');
			//创建groups
			yuanquanGroup = this.createMeshGroup(yuanquanControls, 1);
			diandianGroup = this.createSpriteGroup(diandianMaterials, diandianControls, size);
			xingxingGroup = this.createSpriteGroup(xingxingMaterials, xingxingControls, size);
			xingqiuGroup = this.createSpriteGroup(xingqiumaterials, xingqiuControls, size, [3, 6, 7, 8, 9, 14, 17], 2);
			//添加到场景
			scene.add(diandianGroup);
			scene.add(xingxingGroup);
			scene.add(xingqiuGroup);
			scene.add(yuanquanGroup);

			diandianArr = diandianGroup.children;
			xingxingArr = xingxingGroup.children;
			xingqiuArr = xingqiuGroup.children;
			yuanquanArr = yuanquanGroup.children;
			//			console.log(yuanquanArr.length)

			document.body.appendChild(renderer.domElement);
			window.addEventListener('resize', this.resize, false);
			renderer.domElement.addEventListener('mousemove', this.onMouseMove, false);

//			e = {
//				clientX: this.randomInRange(0, width),
//				clientY: this.randomInRange(0, height)
//			}
//			setInterval(function() {
//				isStart = !isStart;
//				e = {
//					clientX: me.randomInRange(0, width),
//					clientY: me.randomInRange(0, height)
//				}
//			}, this.randomInRange(10000, 20000));
			
		}

		createMeshGroup(controlArr, spriteSize) {
			let group = new THREE.Group();
			for(let i = 0; i < controlArr.length; i++) {
				let size = this.randomInRange(4, 15)
				let mesh = new THREE.Mesh(new THREE.CylinderGeometry(size, size, 2, 32), new THREE.MeshBasicMaterial({
					opacity: 1,
					transparent: true,
					color: colorArr[this.randomInRange(0, 2)]
				}));
//				console.log(mesh.isSprite)
				group.add(mesh);
			}
			return group;
		}

		/**
		 * 创建spriteGroup
		 * @param {Array} 	materialArr 材质数组
		 * @param {Array} 	controlArr 	控制数组，这里主要为了获取数量，因为一个sprite对应一个control
		 * @param {Number} 	spriteSize	sprite的尺寸
		 */
		createSpriteGroup(materialArr, controlArr, spriteSize, biggerArr, biggerScale) {
			let group = new THREE.Group();
			for(let i = 0; i < controlArr.length; i++) {
				let pos = Math.floor(Math.random() * materialArr.length)
				let sprite = new THREE.Sprite(materialArr[pos]);
				if(biggerArr && biggerArr.indexOf(pos) > 0) {
					sprite.scale.set(spriteSize * biggerScale, spriteSize * biggerScale, spriteSize * biggerScale);
				} else {
					sprite.scale.set(spriteSize, spriteSize, spriteSize);
				}
//				console.log(sprite.isSprite)
				group.add(sprite);
			}
			return group;
		}

		/**
		 *创建control
		 * @param {Number} amount 创建的数量，一个sprite对应一个control
		 * @param {Object} params control的参数
		 * @return {Array}	control数组
		 */
		createControls(amount, params, name) {
			let arr = [];
			for(let i = 0; i < amount; i++) {
				let spriteControl = new SpriteControl(params);
				spriteControl.position.x = Math.random() * width - width / 2;
				spriteControl.position.y = Math.random() * height - height / 2;
				spriteControl.position.z = Math.random() * 100 - 100;
				//				spriteControl.position.x = Math.random() * 100 - 50;
				//				spriteControl.position.y = Math.random() * 100 - 50;
				//				spriteControl.position.z = Math.random() * 100 - 50;

				spriteControl.spriteName = name;
				spriteControl.velocity.set(0, 0, 0);
				arr.push(spriteControl);
			}
			return arr;
		}

		/**
		 * 创建material的mapping
		 * @param {String} name 存放图片的文件夹名字，图片名字以数字命名，从0开始
		 * @param {Number} amount 图片的数量
		 * @return {Array}	mapping 数组
		 */
		createMappings(name, amount) {
			let arr = []
			for(let i = 0; i < amount; i++) {
				arr.push(textureLoader.load('img/' + name + '/' + i + '.png'));
			};
			return arr;
		}

		/**
		 * 创建material
		 * @param {Array} mapArr mapping数组
		 * @return {Array} material数组
		 */
		createMaterials(mapArr) {
			let arr = [];

			for(let i = 0; i < mapArr.length; i++) {
				let spriteMaterial = new THREE.SpriteMaterial({
					opacity: 1.0,
					transparent: true,
					map: mapArr[i]
				});
				arr.push(spriteMaterial);
			};

			return arr;
		}

		randomInRange(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		onMouseMove(e) {
			let x = e.clientX;
			let y = e.clientY;
			
//			console.log(e.clientX);
//			console.log(e.clientY);
			let vector = new THREE.Vector3(x - width / 2, -y + height / 2, 0);

			for(let i = 0; i < xingqiuControls.length; i++) {
				vector.z = xingqiuControls[i].position.z;
				xingqiuControls[i].repulse(vector);
			}
			for(let i = 0; i < xingxingControls.length; i++) {
				vector.z = xingxingControls[i].position.z;
				xingxingControls[i].repulse(vector);
			}
			for(let i = 0; i < diandianControls.length; i++) {
				vector.z = diandianControls[i].position.z;
				diandianControls[i].repulse(vector);
			}
			for(let i = 0; i < yuanquanControls.length; i++) {
				vector.z = yuanquanControls[i].position.z;
				yuanquanControls[i].repulse(vector);
			}
		}

		initStats() {
			stats = new Stats();
			stats.setMode(0);
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.left = '0px';
			stats.domElement.style.top = '0px';
			document.body.appendChild(stats.domElement);
		}
		resize() {
			width = window.innerWidth;
			height = window.innerHeight;

			renderer.setSize(width, height);
			renderer.setPixelRatio(window.devicePixelRatio);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			console.log(width + '_' + height);
		}

		xingxingAnimat(t) {
			//			xingxingGroup.scale.set(new THREE.Vector3(Math.sin(t),Math.sin(t),Math.sin(t)));
			//			xingxingGroup.rotateZ(Math.pow((Math.sin(t)+1)/2,4));
			for(let i = 0; i < xingxingArr.length; i++) {
				if(Math.random() > 0.99) {
					xingxingArr[i].material.opacity = (Math.sin(t) + 1) / 2;
				} else {
					xingxingArr[i].material.opacity = (Math.cos(t) + 1) / 2;
				}
			}
		}

		spriteAnimat(t) {
			let temp = Date.now();
			for(let i = 0; i < diandianArr.length; i++) {
				let diandian = diandianArr[i];
				let dt = (temp-diandianControls[i].startTime);
				let lt = diandianControls[i].lifeTime;
				if(dt < lt){
//					diandian.visible = true;
//					diandianControls[i].isSport = true;
					diandianControls[i].run(t);
					diandian.position.copy(diandianControls[i].position);
				}else if(dt > lt * this.randomInRange(1,3) ){
//					if(Math.random()>0.0){diandian.visible = false;}
//					diandianControls[i].isSport = false;
					diandianControls[i].speed = this.randomInRange(-50,50)*0.2;
					diandianControls[i].startTime = Date.now();
					lt = this.randomInRange(10000,20000);
				}
				diandian.material.rotation += diandianControls[i].rotateRadians;
				
			}
			for(let i = 0; i < xingxingArr.length; i++) {
				let xingxing = xingxingArr[i];
				let dt = temp-xingxingControls[i].startTime;
				let lt = xingxingControls[i].lifeTime;
				if(dt < lt){
//					xingxing.visible = true;
//					xingxingControls[i].isSport = true;
					xingxingControls[i].run(t);
					xingxingArr[i].position.copy(xingxingControls[i].position);
					
				}else if(dt > (lt  * this.randomInRange(1,3))){
//					xingxing.visible = false;
//					xingxingControls[i].isSport = false;
					xingxingControls[i].speed = this.randomInRange(-50,50)*0.2;
					xingxingControls[i].startTime = Date.now();
					lt = this.randomInRange(10000,20000);
				}
				xingxingArr[i].material.rotation += xingxingControls[i].rotateRadians;
			}
			for(let i = 0; i < xingqiuArr.length; i++) {
				let xingqiu = xingqiuArr[i];
				let dt = (temp-xingqiuControls[i].startTime);
				let lt = xingqiuControls[i].lifeTime;
				if(dt < lt){
//					xingqiu.visible = true;
//					xingqiuControls[i].isSport = true;
					xingqiuControls[i].run(t);
					xingqiuArr[i].position.copy(xingqiuControls[i].position);
				}else if(dt > lt * this.randomInRange(1,3) ){
//					if(Math.random()>0.0){xingqiu.visible = false;}
//					xingqiuControls[i].isSport = false;
					xingqiuControls[i].startTime = Date.now();
					xingqiuControls[i].speed =  this.randomInRange(-50,50)*0.2;
					lt = this.randomInRange(10000,20000);
				}
				xingqiuArr[i].material.rotation += xingqiuControls[i].rotateRadians;
			}
			for(let i = 0; i < yuanquanArr.length; i++) {
				let yuanquan = yuanquanArr[i];
				let dt = temp-yuanquanControls[i].startTime;
				let lt = yuanquanControls[i].lifeTime;
				let rt = lt * this.randomInRange(1.5,3);
				if(dt < lt){
//					yuanquan.visible = true;
//					yuanquanControls[i].isSport = true;
					yuanquanControls[i].run(t);
					yuanquan.position.copy(yuanquanControls[i].position);
					yuanquan.rotation.z += yuanquanControls[i].rotateRadians * 3;
//					yuanquan.rotation.y += yuanquanControls[i].rotateRadians * 2;
				}else if(dt > lt  && dt < rt){
					yuanquan.rotation.x += yuanquanControls[i].rotateRadians * 3;
				}
				else if(dt > rt){
//					if(Math.random()>0.0){yuanquan.visible = false;}
//					yuanquanControls[i].isSport = false;
					yuanquanControls[i].startTime = Date.now();
					yuanquanControls[i].lifeTime = this.randomInRange(10000,20000);
					yuanquanControls[i].speed =  this.randomInRange(-50,50)*0.2;
					
				}
//					yuanquan.rotation.y += yuanquanControls[i].rotateRadians * 2;

			}
		}

		update() {

			stats.update();
//			controls.update();
			let t = Date.now() / 1000;
			//			me.xingxingAnimat(t);
			//			diandianGroup.rotation.x += 0.01;
			//			xingqiuGroup.rotation.y += 0.01;
			me.spriteAnimat(t);
			renderer.render(scene, camera);
			window.requestAnimationFrame(me.update);
		}

	}

	return App;
});