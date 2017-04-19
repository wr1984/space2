define(['three', 'tweenMax'], function(THREE, tweenMax) {
	let t = [5,10,20,]
	let tlRotate,tlMove;
	let easeArr = [SlowMo.ease.config(0.5, 0.4, false),
					Bounce.easeInOut,Elastic.easeInOut.config(2.5, 0.1),
					 Back.easeInOut.config(4),Power0.easeNone,Expo.easeInOut];
	class Star {
		constructor(params) {
			this.mesh = params.mesh;
			this.name = params.name;

			this.init();
		}

		init() {
			tlRotate = new TimelineMax({
				repeat:-1,
				repeatDelay:this.randomInRange(5,10),
				yoyo:true
			});
			
			tlMove = new TimelineMax({
				repeat:-1,
				yoyo:true,
				repeatDelay:this.randomInRange(5,10)
			})
			
			this.move();
			this.rotate();
		}

		rotate() {

			if(this.name === "yuanquan") {
				tlRotate.to(this.mesh.rotation, this.randomInRange(5,20), {
					x:"+=20",
					ease:easeArr[this.randomInRange(0,5)]
				}).to(this.mesh.rotation,this.randomInRange(5,20),{
					y:"+=20",
					ease:easeArr[this.randomInRange(0,5)]
				}).to(this.mesh.rotation,this.randomInRange(5,20),{
					z:"+=20",
					ease:easeArr[this.randomInRange(0,5)]
				})

			} else {

				tlRotate.to(this.mesh.material,  this.randomInRange(5,20), {
					rotation:"+=20",
					ease:easeArr[this.randomInRange(0,5)]
				}).to(this.mesh.material,  this.randomInRange(5,20), {
					rotation:"-=20",
					ease:easeArr[this.randomInRange(0,5)]
				})
			}
		}
		
		move(){
			tlMove.from(this.mesh.position,5,{
				
//				z:"-=1000",
				ease:easeArr[this.randomInRange(0,5)]
			})
		}
		
		randomInRange(min,max){
			return Math.round(Math.random()*(max-min)+min)
		}
	}

	return Star;
});