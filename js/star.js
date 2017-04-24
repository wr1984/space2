define(['three', 'tweenMax'], function(THREE, tm) {
	let t = [5,10,20,]
	let tlRotate,tlMove;
	let easeArr = [SlowMo.ease.config(0.5, 0.4, false),
					Bounce.easeInOut,Power4.easeInOut,
					 Back.easeInOut.config(4),Power0.easeNone,Expo.easeInOut,Bounce.easeInOut];
					 //Elastic.easeInOut.config(2.5, 0.1),
	class Star {
		constructor(params) {
			this.mesh = params.mesh;
			this.name = params.name;
			this.width = window.innerWidth/2;
			this.height = window.innerHeight/2;
			this.rSpeed = this.randomInRange(1,10);
			this.mSpeed = this.randomInRange(1,10);
			this.init();
		}

		init() {
//			tlRotate = new TimelineMax({
//				repeat:-1,
//				repeatDelay:this.randomInRange(5,10),
//				yoyo:true
//			});
//			
//			tlMove = new TimelineMax({
//				repeat:-1,
//				yoyo:true,
//				repeatDelay:this.randomInRange(5,10)
//			})
			
//			this.move();
			this.rotate();
		}

		rotate() {
			let temp = [-1,1];
			if((this.name.indexOf("diandian2"))===0){return};
			if(this.name === "yuanquan") {
				let tlRotate = new TimelineMax({
					repeat:-1,
					repeatDelay:this.randomInRange(5,10),
					yoyo:true
				});
				tlRotate.to(this.mesh.rotation, this.rSpeed*10, {
					x:Math.PI*2*10,
					ease:easeArr[this.randomInRange(0,6)]
				})
				.to(this.mesh.rotation,this.rSpeed*10,{
					y:Math.PI*2*10,
					ease:easeArr[this.randomInRange(0,6)]
				}).to(this.mesh.rotation,this.rSpeed*10,{
					z:Math.PI*2*10,
					ease:easeArr[this.randomInRange(0,6)]
				})

			} else {
				TweenMax.to(this.mesh.material,  this.rSpeed*10, {
					rotation:Math.PI*2*10*temp[Math.round(Math.random())],
					ease:easeArr[this.randomInRange(0,6)],
					repeat:-1,
					yoyo:true,
					repeatDelay:5
				})
			}
		}
		
		move(type,delay){
			if(this.name === "diandian2"){
				let temp = [-1,1];
				if(type === "bomb1"){
					let t = this.randomInRange(5,10);
					let x1 = this.width*2*temp[Math.round(Math.random())];
					let y1 = this.height*2*temp[Math.round(Math.random())];
					let tl = new TimelineMax({
						repeat:-1,
						yoyo:true,
						delay:delay,
						repeatDelay:delay
					});
					tl.to(this.mesh.position, t, {
						x: "+=" + x1,
						y: "+=" + y1
//						delay:delay
					})
				}else{
					let t = this.randomInRange(3,6);
					let x2 = this.randomInRange(10,100) * temp[Math.round(Math.random())];
					let y2 = this.randomInRange(10,100) * temp[Math.round(Math.random())];
					let tl = new TimelineMax({
						repeat:-1,
						yoyo:true,
						delay:delay,
						repeatDelay:delay
					});
					tl.to(this.mesh.position, 5, {
						x: "+=" + x2,
						y: "+=" + y2,
						ease: Power4.easeOut,
//						delay:delay
					}).to(this.mesh.position,t,{
						y:"-="+ this.height*2,
						ease: Power4.easeIn
					})
				}
				
			}else{
				tlMove.from(this.mesh.position,5,{
					
					ease:easeArr[this.randomInRange(0,5)]
				})
			}
		}
		
		randomInRange(min,max){
			return Math.round(Math.random()*(max-min)+min)
		}
	}

	return Star;
});