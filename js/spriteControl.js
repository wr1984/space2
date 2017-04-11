define(['three', 'tweenMax'], function(THREE, tweenMax) {

	let me;
	class SpriteControl {
		constructor(params) {
			me = this;
			this.width = params.width || 1000;
			this.height = params.height || 1000;
			this.depth = params.depth || 0;
			this.maxSpeed = params.maxSpeed || 5;
			this.maxSteerForce = params.maxSteerForce || 0.1; //引导的力度
			this.isAvoidWalls = params.isAvoidWalls || false;
			this.type = params.isAvoidWalls || "diandian";
			//			console.log(params.width)
			this.vector = new THREE.Vector3();
			this.position = new THREE.Vector3(); //位置
			this.velocity = new THREE.Vector3(); //速度
			this.acceleration = new THREE.Vector3(); //加速度
			this.scale = new THREE.Vector3();
			this.opacity = 0;
			this.spriteName;
			this.isSport = true;
			this.speed = params.speed || this.randomInRange(-10,10)*0.05;
			this.rotateRadians = params.radians || Math.random()*this.randomInRange(1,10)*0.009 * (this.randomInRange(0,1)===0?1:-1);
			
			this.startTime = Date.now();
			this.lifeTime = this.randomInRange(10000,50000);
//			console.log(this.lifeTime);
			this.bomb=new THREE.Vector3(me.randomInRange(-me.width,me.width),me.randomInRange(-me.height,me.height),me.randomInRange(-me.depth,me.depth));
			setInterval(function(){
				this.bomb = new THREE.Vector3(me.randomInRange(-me.width,me.width),me.randomInRange(-me.height,me.height),me.randomInRange(-me.depth,me.depth));
//				console.log(this.bomb)
			},this.randomInRange(10000,50000));
		}
		randomInRange(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
		
		
		/**
		 * 检测sprite到各边界的距离
		 * 设置移动速度
		 * 移动
		 */
		run(t, spriteControls) {
			
				
//			if(this.isAvoidWalls) {
	
//				this.vector.set(-this.width, this.position.y, this.position.z);
//				this.vector = this.avoid(this.vector);
//				this.vector.multiplyScalar(Math.pow(Math.sin(t),2)*this.speed);
////				this.vector.multiplyScalar(5*this.speed);
//				this.acceleration.add(this.vector);
//
//				this.vector.set(this.width, this.position.y, this.position.z);
//				this.vector = this.avoid(this.vector);
//				this.vector.multiplyScalar(Math.pow(Math.sin(t),2)*this.speed);
////				this.vector.multiplyScalar(5*this.speed);
//				this.acceleration.add(this.vector);
//
//				this.vector.set(this.position.x, -this.height, this.position.z);
//				this.vector = this.avoid(this.vector);
//				this.vector.multiplyScalar(Math.pow(Math.sin(t),2)*this.speed);
////				this.vector.multiplyScalar(5*this.speed);
//				this.acceleration.add(this.vector);
//
//				this.vector.set(this.position.x, this.height, this.position.z);
//				this.vector = this.avoid(this.vector);
//				this.vector.multiplyScalar(Math.pow(Math.sin(t),2)*this.speed);
////				this.vector.multiplyScalar(5*this.speed);
//				this.acceleration.add(this.vector);
//
//				this.vector.set(this.position.x, this.position.y, -this.depth);
//				this.vector = this.avoid(this.vector);
//				this.vector.multiplyScalar(Math.pow(Math.sin(t),2)*this.speed);
////				this.vector.multiplyScalar(5*this.speed);
//				this.acceleration.add(this.vector);
//
//				this.vector.set(this.position.x, this.position.y, this.depth);
//				this.vector = this.avoid(this.vector);
//				this.vector.multiplyScalar(Math.pow(Math.sin(t),2)*this.speed);
////				this.vector.multiplyScalar(5*this.speed);
//				this.acceleration.add(this.vector);
				if(this.bomb){
					
					this.acceleration.add(this.avoid(this.bomb).multiplyScalar(this.speed));
				}
				this.checkBounds();
//			} else {
//				this.checkBounds();
//			}
				
				this.move();
		}

		/**
		 * 检测sprite是否到达边界
		 */
		checkBounds() {
			if(this.position.x > this.width) {
				TweenMax.to(this.position, this.randomInRange(5,20), {
					x: this.randomInRange(-this.width,this.width),
					y: this.randomInRange(-this.height,this.height),
					z:0,
					ease: Bounce.easeIn,
				});
//				TweenMax.to(this.position, 5, {
//					x: 0,
//					y: 0,
//					z: 0,
//					delay:10,
//					ease: Bounce.easeIn,
//				});
			}
			if(this.position.x < -this.width) {
				TweenMax.to(this.position, this.randomInRange(5,20), {
					x: this.randomInRange(-this.width,this.width),
					y: this.randomInRange(-this.height,this.height),
					z:0,
					ease: Bounce.easeIn,
				});
//				TweenMax.to(this.position, 5, {
//					x: 0,
//					y: 0,
//					z: 0,
//					ease: Bounce.easeIn,
//				});
			}
			if(this.position.y > this.height) {
				TweenMax.to(this.position,5, {
					ease: Bounce.easeOut,
					y: -this.height,
					delay:2
				});
			}
			if(this.position.y < -this.height) {
				this.position.x = this.randomInRange(-this.width,this.width);
				this.position.y = this.randomInRange(-this.height,this.height);
//					TweenMax.to(this.position, 5, {
////					x: Math.random()*this.width/2-this.width/4,
//						y: 0,
//						ease: Power4.easeIn,
//					});
			}
			if(this.position.z > Math.abs(this.depth)*2) {
				if(this.spriteName === 'xingxing' || this.spriteName === 'diandian'){
					this.position.z = -1000;
				}else{
					this.position.z = -200;
				}
//				TweenMax.to(this.position, 1, {
//					ease: Bounce.easeOut,
//					z:-1500
//				});
			}
			if((this.spriteName === 'xingxing' || this.spriteName === 'diandian') && this.position.z < -999) {
				
				TweenMax.to(this.position, 1.0, {
					ease: Elastic.easeOut,
					z: 0,
					delay:5
				});
			}
			if(this.spriteName !== 'xingxing'&& this.spriteName !== 'diandian' && this.position.z < -200){
				this.position.z = 0;
//				TweenMax.to(this.position, 5, {
//					ease: Elastic.easeOut,
//					z: 0,
//				});
			}
			if(Math.random()>0.999 && this.position.y > 0){
				TweenMax.to(this.position,5, {
					ease: Bounce.easeOut,
					y: -this.height,
					delay:5
				});
			}else if(Math.random()<0.0001 && this.position.y < 0){
				TweenMax.to(this.position,5, {
					ease: Bounce.easeIn,
					y: this.height,
					delay:5
				});
			}
			
			
		}

		/**
		 * 移动
		 */
		move() {
			this.velocity.add(this.acceleration);
			let length = this.velocity.length();
			
			if(length >this.maxSpeed) {
//				console.log(length)
				this.velocity.divideScalar(length / this.maxSpeed);
			}
			
			this.position.add(this.velocity);
			this.acceleration.set(0, 0, 0);
		}

		/**
		 * 获取sprite到指定点的引导坐标
		 * @argument {THREE.Vector3} 目标点坐标
		 * @return {THREE.Vector3}	引导坐标
		 */
		avoid(target) {
			let steer = new THREE.Vector3();
			steer.copy(this.position);
			steer.sub(target);
			steer.multiplyScalar(1 / this.position.distanceToSquared(target));
			return steer;
		}
		/**
		 * 在sprite与target的距离小于100时改变方向
		 * @param {THREE.Vector3} 目标点坐标
		 */
		repulse(target) {
			let distance = this.position.distanceTo(target);
			//			console.log(distance);
			if(distance < 50) {
				let steer = new THREE.Vector3();
				steer.subVectors(this.position, target);
				steer.multiplyScalar(0.05 / distance);
				this.acceleration.add(steer);
			}
		}

		/**
		 * 两个sprite距离边界小于param就散开
		 * @param {Array[SpriteControl]} SpriteControls 
		 * @param {Number} _distance 距离
		 */
		separation(spriteControls, _distance) {
			let distance,
				repulse = new THREE.Vector3();

			if(Math.random() > 0.6) {

				distance = this.position.distanceTo(this.vector);
				if(distance <= _distance || 100) {

					repulse.subVectors(this.position, this.vector);
					repulse.normalize();
					repulse.divideScalar(distance);

				}
			}
			return repulse;
		}
	}
	return SpriteControl;
})