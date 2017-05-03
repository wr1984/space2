define(['three', 'controls', 'stats', 'spriteControl', 'tweenMax','star'], function(THREE, Controls, stats, SpriteControl, tm,Star) {
	let canvas;
	let camera;
	let scene;
	let renderer;
	let textureLoader;
	let width, height;
	let me;
	let controls;
	let size = 35;
	let aMaps, bMaps, cMaps, dMaps,eMaps;
	let aMaterials, bMaterials, cMaterials, dMaterials,eMaterials;
	let diandianGroup, xingxingGroup, xingqiuGroup, yuanquanGroup;
	let diandianControls, xingxingControls, xingqiuControls, yuanquanControls;
	let aArr, bArr, cArr, dArr,eArr;
	let diandian2_0Arr,diandian2_1Arr,diandian2_2Arr,diandian2_3Arr,diandian2_4Arr,diandian2_5Arr;
	let isStart = true;
	let colorArr = [0xf9dce0, 0xf5957d, 0x17ffa7];
	let easeArr = [SlowMo.ease.config(0.5, 0.4, false),
//					Bounce.easeInOut,
					Power4.easeInOut,
					 Back.easeInOut.config(4),
					 Power0.easeNone,
					 Expo.easeInOut,
//					 Elastic.easeInOut.config(2.5, 0.1)
				];
//	let sxGrop0;
	class App {
		constructor() {
			this.init();
			this.update();
		}

		init() {
			me = this;
			canvas = document.getElementById('canvas');
			this.initStats();
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
			
			scene = new THREE.Scene();

			camera = new THREE.PerspectiveCamera(45, width / height, 1, 1500)
			camera.position.z = 900;
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
			aMaps = this.createMappings('a',16)
			bMaps = this.createMappings('b', 16);
			cMaps = this.createMappings('c', 12);
			dMaps = this.createMappings('d', 12);
			eMaps = this.createMappings('e',9);
			//创建materials
			//			yuanquanMaterials = this.createMaterials(yuanquanMaps);
//			let diandian2_0ArrMats = this.createMaterials(diandian2Maps,30);
//			let diandian2_1ArrMats = this.createMaterials(diandian2Maps,40);
//			let diandian2_2ArrMats = this.createMaterials(diandian2Maps,50);
//			let diandian2_3ArrMats = this.createMaterials(diandian2Maps,60);
//			let diandian2_4ArrMats = this.createMaterials(diandian2Maps,70);
//			let diandian2_5ArrMats = this.createMaterials(diandian2Maps,80);
			
			aMaterials = this.createMaterials(aMaps,200);
			bMaterials = this.createMaterials(dMaps,300);
			cMaterials = this.createMaterials(cMaps,300);
			dMaterials = this.createMaterials(dMaps,100);
			eMaterials = this.createMaterials2(eMaps,100);

//			diandian2_0Arr = this.createSpriteGroup2("diandian2",diandian2_0ArrMats,size,null,null,this.randomInRange(-width/2+50,width/2-50),this.randomInRange(-height/2+50,height/2-50),1);
//			diandian2_1Arr = this.createSpriteGroup2("diandian2",diandian2_1ArrMats,size,null,null,this.randomInRange(-width/2+50,width/2-50),this.randomInRange(-height/2+50,height/2-50),2);
//			diandian2_2Arr = this.createSpriteGroup2("diandian2",diandian2_2ArrMats,size,null,null,this.randomInRange(-width/2+50,width/2-50),this.randomInRange(-height/2+50,height/2-50),1);
//			diandian2_3Arr = this.createSpriteGroup2("diandian2",diandian2_3ArrMats,size,null,null,this.randomInRange(-width/2+50,width/2-50),this.randomInRange(-height/2+50,height/2-50),2);
//			diandian2_4Arr = this.createSpriteGroup2("diandian2",diandian2_4ArrMats,size,null,null,this.randomInRange(-width/2+50,width/2-50),this.randomInRange(-height/2+50,height/2-50),1);
//			diandian2_5Arr = this.createSpriteGroup2("diandian2",diandian2_5ArrMats,size,null,null,this.randomInRange(-width/2+50,width/2-50),this.randomInRange(-height/2+50,height/2-50),2);
			
			aArr = this.createSpriteGroup2("a",aMaterials, size);
			bArr = this.createSpriteGroup2("b",bMaterials, size);
			cArr = this.createSpriteGroup2("c",cMaterials, size);
			dArr = this.createSpriteGroup2("d",dMaterials, size);
//			eArr = this.createSpriteGroup2("e",eMaterials, size);
			eArr = this.createMeshGroup2(eMaterials, size);
			//			console.log(yuanquanArr.length)

			canvas.appendChild(renderer.domElement);
			window.addEventListener('resize', this.resize, false);
			renderer.domElement.addEventListener('mousemove', this.onMouseMove, false);
			renderer.render(scene,camera);
//			e = {
//				clientX: this.randomInRange(0, width),
//				clientY: this.randomInRange(0, height/2)
//			}
//			setInterval(function() {
//				isStart = !isStart;
//				e = {
//					clientX: me.randomInRange(0, width),
//					clientY: me.randomInRange(0, height)
//				}
//			}, this.randomInRange(10000, 20000));
//			this.diandian2Move();
			this.move(aArr);
			this.move(bArr);
			this.move(cArr);
			this.move(dArr);
			this.move(eArr);
			
//			let sxGrop0 = this.shuangxingSystem();
//			this.sxDistance(sxGrop0);

//			this.createSxsys(100);
//			let sxGrop1 = this.shuangxingSystem();
//			TweenMax.set(sxGrop0.position,{z:-100})
			

		}
		move(arr){
				for(let i=0,len=arr.length; i<len; i++){
					arr[i].move();
				}
		}
		
		createSxsys(count){
			let temp = [-1,1];
			for(let i=0; i<count; i++){
				let tm = new TimelineMax({repeat:-1, yoyo:true, repeatDelay:1});
				let sxGroup = this.shuangxingSystem();
				this.sxDistance(sxGroup);
				tm.to(sxGroup.rotation,this.randomInRange(100,300),{
//					x:Math.PI*2*6*temp[Math.round(Math.random())],
					z:Math.PI*10*temp[Math.round(Math.random())],
//					y:Math.PI*2*6*temp[Math.round(Math.random())],
//					ease: Power0.easeNone
					ease: easeArr[this.randomInRange(0,4)]
				});
				
//				if(Math.random()>0.5){
//					tm.to(sxGroup.rotation,this.randomInRange(150,300),{
////						z:Math.PI*2*6*temp[Math.round(Math.random())],
//						y:Math.PI*2*7*temp[Math.round(Math.random())],
//						ease: Power0.easeNone
////						ease: easeArr[this.randomInRange(0,4)]
//					},"-=200");
//				}
			}
		}
		sxDistance(sxGrop){
			let mesh1 = sxGrop.children[0];
			let mesh2 = sxGrop.children[1];
			TweenMax.to(mesh1.position,this.randomInRange(5,30),{
				x:mesh2.position.x,
				y:mesh2.position.y,
				repeat:-1,
				yoyo:true,
				ease: easeArr[this.randomInRange(0,4)]
			});
			TweenMax.to(mesh2.position,this.randomInRange(5,30),{
				x:mesh1.position.x,
				y:mesh1.position.y,
				repeat:-1,
				yoyo:true,
				ease: easeArr[this.randomInRange(0,4)]
			})
		}
		shuangxingSystem(){
			let temp = this.randomInRange(0,xingqiumaterials.length-2);
			let sxGroup = new THREE.Group();
			let sxMatArr = [xingqiumaterials[temp],xingqiumaterials[temp+1]];
			let sxSpriteArr = this.createSpriteGroup2('sx',sxMatArr,size);
			for(let i=0; i<2; i++){
				sxGroup.add(sxSpriteArr[i].mesh);
			}
			scene.add(sxGroup);
			return sxGroup;
		}
		diandian2Move(){
			let temp = ['bomb1','bomb2'];
			for(let i=0; i<diandian2Arr.length; i++){
				let delay = this.randomInRange(2,20);
				let temp2 = Math.round(Math.random());
				diandian2Arr[i].forEach(function(d){
					d.move(temp[temp2],delay);
//					d.move(temp[Math.round(Math.random())],delay);
				})
			}
		}
		createMeshGroup2(materials,size) {
			let arr = [];
			for(let i = 0, len = materials.length; i < len; i++) {
				let mesh = new THREE.Mesh(new THREE.CircleGeometry(10,32), materials[i]);
				mesh.position.x = Math.random() * width - width / 2;
				mesh.position.y = Math.random() * height - height / 2;
				mesh.position.z = 0;
				let star = new Star({
					mesh:mesh,
					name:"e"
				});
				arr.push(star);
				scene.add(mesh);
			}
			return arr;
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
		
		createSpriteGroup2(name,materialArr, spriteSize, biggerArr, biggerScale,x,y,dd2Type) {
			let arr = [];
			
			for(let i = 0; i < materialArr.length; i++) {
				let sprite = new THREE.Sprite(materialArr[i]);
				
				if(name === "diandian2"){
					if(dd2Type === 1){
						sprite.position.x = this.randomInRange(x-100,x+100);
						sprite.position.y = this.randomInRange(y-100,y+100);
						sprite.position.z = 0;
					}else{
						sprite.position.x = this.randomInRange(x-100,x+100);
						sprite.position.y = y;
						sprite.position.z = 0;
					}
				}else{
					sprite.position.x = Math.random() * width - width / 2;
					sprite.position.y = Math.random() * height - height / 2;
					sprite.position.z = 0;
				}
				
				
				if(name === "xingqiu"){
					let temp = Math.random()+0.8;
					sprite.scale.set(spriteSize * temp, spriteSize * temp, spriteSize * temp);
				}else{
					sprite.scale.set(spriteSize, spriteSize, spriteSize);
				}
				
//				if(biggerArr && biggerArr.indexOf(pos) > 0) {
//					sprite.scale.set(spriteSize * biggerScale, spriteSize * biggerScale, spriteSize * biggerScale);
//				} else {
//				}
				
				let star = new Star({
					mesh:sprite,
					name:name
				})
				arr.push(star);
				if(name !== "sx"){
					scene.add(sprite);
				}
			}
			return arr;
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
		createMaterials(mapArr,count) {
			let arr = [];
			for(let i = 0; i < count; i++) {
				let pos = Math.floor(Math.random() * mapArr.length)
				let spriteMaterial = new THREE.SpriteMaterial({
					opacity: 1.0,
					transparent: true,
					map: mapArr[pos]
				});
				arr.push(spriteMaterial);
			};
			return arr;
		}
		
		createMaterials2(mapArr,count) {
			let arr = [];
			for(let i = 0; i < count; i++) {
				let pos = Math.floor(Math.random() * mapArr.length)
				let spriteMaterial = new THREE.MeshBasicMaterial({
					opacity: 1.0,
					transparent: true,
					side:THREE.DoubleSide,
					map: mapArr[pos]
				});
				arr.push(spriteMaterial);
			};
			return arr;
		}
		
		

		randomInRange(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		onMouseMove(e) {
//			let x = e.clientX;
//			let y = e.clientY;
//			
////			console.log(e.clientX);
////			console.log(e.clientY);
//			let vector = new THREE.Vector3(x - width / 2, -y + height / 2, 0);
//
//			for(let i = 0; i < xingqiuControls.length; i++) {
//				vector.z = xingqiuControls[i].position.z;
//				xingqiuControls[i].repulse(vector);
//			}
//			for(let i = 0; i < xingxingControls.length; i++) {
//				vector.z = xingxingControls[i].position.z;
//				xingxingControls[i].repulse(vector);
//			}
//			for(let i = 0; i < diandianControls.length; i++) {
//				vector.z = diandianControls[i].position.z;
//				diandianControls[i].repulse(vector);
//			}
//			for(let i = 0; i < yuanquanControls.length; i++) {
//				vector.z = yuanquanControls[i].position.z;
//				yuanquanControls[i].repulse(vector);
//			}
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
			
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
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
		xqAnimat(){
			for(let i= 0, len = xingqiuArr.length; i<len; i++){
				xingqiuArr[i].flock(xingqiuArr);
			}
		}
		update() {
			
//			me.xqAnimat();
			
			stats.update();
			controls.update();
			let t = Date.now() / 1000;
			//			me.xingxingAnimat(t);
			//			diandianGroup.rotation.x += 0.01;
			//			xingqiuGroup.rotation.y += 0.01;
//			me.spriteAnimat(t);
			renderer.render(scene, camera);
			window.requestAnimationFrame(me.update);
		}

	}

	return App;
});