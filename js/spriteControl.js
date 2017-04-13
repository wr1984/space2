define(['three', 'tweenMax'], function(THREE, tweenMax) {

	let me;
	class SpriteControl {
		constructor(params) {
			me = this;
			this.width = params.width || 1000;
			this.height = params.height || 1000;
			this.depth = params.depth || 500;
			this.maxSpeed = params.maxSpeed || [0.1,0.5,1,2][this.randomInRange(0,3)];
			this.maxSteerForce = params.maxSteerForce || 0.5; //引导的力度
			this.isAvoidWalls = params.isAvoidWalls || false;
			this.type = params.isAvoidWalls || "diandian";
			//			console.log(params.width)
			this.vector = new THREE.Vector3();
			this.position = new THREE.Vector3(); //位置
			this.velocity = new THREE.Vector3(); //速度
			this.acceleration = new THREE.Vector3(); //加速度
			this.neighborhoodRadius = 30;
			
			this.spriteName;
			this.rotate = {
				direction:['x','y','z'][this.randomInRange(0,2)],
				speed: [0.01,0.05,0.1,0.2][this.randomInRange(0,3)] *(this.randomInRange(0,1)===0?1:-1),
			};
			

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
			let vector = this.vector;
			vector.set(-this.width, this.position.y, this.position.z);
			vector = this.avoid(vector);
			vector.multiplyScalar(5);
			this.acceleration.add(vector);

			vector.set(this.width, this.position.y, this.position.z);
			vector = this.avoid(vector);
			vector.multiplyScalar(5);
			this.acceleration.add(vector);

			vector.set(this.position.x, -this.height, this.position.z);
			vector = this.avoid(vector);
			vector.multiplyScalar(5);
			this.acceleration.add(vector);

			vector.set(this.position.x, this.height, this.position.z);
			vector = this.avoid(vector);
			vector.multiplyScalar(5);
			this.acceleration.add(vector);

			vector.set(this.position.x, this.position.y, -this.depth);
			vector = this.avoid(vector);
			vector.multiplyScalar(5);
			this.acceleration.add(vector);

			vector.set(this.position.x, this.position.y, this.depth);
			vector = this.avoid(vector);
			vector.multiplyScalar(5);
			this.acceleration.add(vector);
			if(Math.random() > 0.9 && spriteControls) {

				this.flock(spriteControls);

			}
			this.checkBounds();
			this.move();
		}

		flock(spriteControls) {
			this.acceleration.add(this.alignment(spriteControls));
			this.acceleration.add(this.cohesion(spriteControls));
			this.acceleration.add(this.separation(spriteControls));
		}

		/**
		 * 检测sprite是否到达边界
		 */
		checkBounds() {
			if(this.position.x > this.width) {
				TweenMax.to(this.position, this.randomInRange(5, 20), {
					x: this.randomInRange(-this.width, this.width),
					y: this.randomInRange(-this.height, this.height),
					z: 0,
					ease: Bounce.easeIn,
				});
			}
			if(this.position.x < -this.width) {
				TweenMax.to(this.position, this.randomInRange(5, 20), {
					x: this.randomInRange(-this.width, this.width),
					y: this.randomInRange(-this.height, this.height),
					z: 0,
					ease: Bounce.easeIn,
				});
			}
			if(this.position.y > this.height) {
				TweenMax.to(this.position, 5, {
					ease: Bounce.easeOut,
					y: -this.height,
//					delay: 2
				});
			}
			if(this.position.y < -this.height) {
				this.position.x = this.randomInRange(-this.width, this.width);
				this.position.y = this.randomInRange(-this.height, this.height);
			}
			if(this.position.z > Math.abs(this.depth)) {
				if(this.spriteName === 'xingxing' || this.spriteName === 'diandian') {
					this.position.z = -1000;
				} else {
					this.position.z = -200;
				}
			}
			
			if(this.position.z < -599) {

				TweenMax.to(this.position, 1.0, {
					ease: Elastic.easeOut,
					z: 0,
					delay: 5
				});
			}
//			if(this.spriteName !== 'xingxing' && this.spriteName !== 'diandian' && this.position.z < -200) {
//				this.position.z = 0;
//			}
			if(Math.random() > 0.999 && this.position.y > 0) {
				TweenMax.to(this.position, 5, {
					ease: Bounce.easeOut,
					y: -this.height,
					delay: 5
				});
			} /*else if(Math.random() < 0.0001 && this.position.y < 0) {
				TweenMax.to(this.position, 5, {
					ease: Bounce.easeIn,
					x: this.randomInRange(-this.width,this.width),
					y: this.randomInRange(0,this.height),
					delay: 5
				});
			}*/

		}

		/**
		 * 移动
		 */
		move() {
			this.velocity.add(this.acceleration);
			let length = this.velocity.length();

			if(length > this.maxSpeed) {
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
				steer.multiplyScalar(0.5 / distance);
				this.acceleration.add(steer);
			}
		}

		/**
		 * 两个sprite距离边界小于param就散开
		 * @param {Array[SpriteControl]} SpriteControls 
		 * @param {Number} _distance 距离
		 */
//		separation(spriteControls, _distance) {
//			let distance,
//				repulse = new THREE.Vector3();
//
//			if(Math.random() > 0.6) {
//
//				distance = this.position.distanceTo(this.vector);
//				if(distance <= _distance || 100) {
//
//					repulse.subVectors(this.position, this.vector);
//					repulse.normalize();
//					repulse.divideScalar(distance);
//
//				}
//			}
//			return repulse;
//		}

		alignment (boids) {

			var boid, velSum = new THREE.Vector3(),
				count = 0;

			for(var i = 0, il = boids.length; i < il; i++) {

				if(Math.random() > 0.6) continue;

				boid = boids[i];

				let distance = boid.position.distanceTo(this.position);

				if(distance > 0 && distance <= this.neighborhoodRadius) {

					velSum.add(boid.velocity);
					count++;
				}
			}

			if(count > 0) {
				velSum.divideScalar(count);
				var l = velSum.length();
				if(l > this.maxSteerForce) {
					velSum.divideScalar(l / this.maxSteerForce);
				}
			}

			return velSum;

		};

		cohesion (boids) {
			var boid, distance,
				posSum = new THREE.Vector3(),
				steer = new THREE.Vector3(),
				count = 0;
			for(var i = 0, il = boids.length; i < il; i++) {
				if(Math.random() > 0.6) continue;
				boid = boids[i];
				distance = boid.position.distanceTo(this.position);
				if(distance > 0 && distance <= this.neighborhoodRadius) {
					posSum.add(boid.position);
					count++;
				}
			}

			if(count > 0) {
				posSum.divideScalar(count);
			}

			steer.subVectors(posSum, this.position);
			var l = steer.length();
			if(l > this.maxSteerForce) {
				steer.divideScalar(l / this.maxSteerForce);
			}
			return steer;
		};

		separation(boids) {
			var boid, distance,
				posSum = new THREE.Vector3(),
				repulse = new THREE.Vector3();

			for(var i = 0, il = boids.length; i < il; i++) {
				if(Math.random() > 0.6 )continue;
				boid = boids[i];
				distance = boid.position.distanceTo(this.position);
				if(distance > 0 && distance <= this.neighborhoodRadius) {
					repulse.subVectors(this.position, boid.position);
					repulse.normalize();
					repulse.divideScalar(distance);
					posSum.add(repulse);
				}
			}
			return posSum;
		}

	}
	return SpriteControl;
})