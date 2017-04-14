define(['tweenMax'], function(greensock) {
	const SVG_NS = "http://www.w3.org/2000/svg";
	const XLINK_NS = "http://www.w3.org/1999/xlink";
	class Star {
		constructor(params) {
			this.g = params.g;
			this.origin = params.origin;
			this.name = params.name;
			this.x = params.x || this.randomInRange(0,800);
			this.y = params.y || this.randomInRange(0,400);;
			this.opacity = params.opacity || 1;
			this.scale = params.scale || 1;
//			this.transformOrigin = params.transformOrigin || "50% 50%";
			this.useOrigin;
			this.tl;
			this.easeArr = [Bounce.easeOut, Power0.easeNone, Back.easeInOut.config(4), SlowMo.ease.config(0.7, 0.7, true),Power4.easeInOut];
			this.init();
			this.rander(this.g);
			this.rotate();
		}

		init() {
			this.tl = new TimelineMax({
				repeat:-1,
				yoyo:true,
				repeatDelay: this.randomInRange(5,10)
			});
			
			this.useOrigin = this.use(this.origin);
			this.useOrigin.setAttribute('x',this.x);
			this.useOrigin.setAttribute('y',this.y);
//			this.useOrigin.setAttribute('opacity',this.opacity);
//			this.useOrigin.setAttribute('transform-origin',"10% 50% 50%");
//			this.useOrigin.setAttribute('transform','scale('+this.scale+' '+ this.scale +')');
			TweenMax.set(this.useOrigin,{
				scale:this.scale,
				opacity:this.opacity,
//				transformOrigin:"100% 100%"
			})
		}

		use(origin) {
			var useTag = document.createElementNS(SVG_NS, 'use');
			useTag.setAttributeNS(XLINK_NS, 'xlink:href', '#' + origin.id);
			return useTag;
		}

		rander(g) {
			g.appendChild(this.useOrigin);
		}
		
		randomInRange(min,max){
			return Math.floor(Math.random()*(max-min)+min);
		}
		
		rotate(){
			let t = [30,40,50,80,100];
//			console.log(this.randomInRange(0,5))
			if(this.name === "dd"){return};
			if(this.name === 'yq'){
				this.tl.set(this.useOrigin,{transformPerspective:300})
				.to(this.useOrigin,t[this.randomInRange(0,5)],{
					rotationY:360*30,
					transformOrigin:"50% 50%",
					ease:this.easeArr[this.randomInRange(0,this.easeArr.length)],
				}).to(this.useOrigin,t[this.randomInRange(0,5)],{
					rotationX:360*50,
					transformOrigin:"50% 50%",
					ease:this.easeArr[this.randomInRange(0,this.easeArr.length)],
				})
			}else{
				this.tl.to(this.useOrigin,t[this.randomInRange(0,5)],{
					rotation:360*30,
					transformOrigin:"50% 50%",
					ease:this.easeArr[this.randomInRange(0,this.easeArr.length)],
				}).to(this.useOrigin,t[this.randomInRange(0,5)],{
					rotation:360*50,
					transformOrigin:"50% 50%",
					ease:this.easeArr[this.randomInRange(0,this.easeArr.length)],
				})
			}
		}
	}

	return Star;
});