define(['tweenMax','star'], function(tweenMax,Star) {
	const SVG_NS = "http://www.w3.org/2000/svg";
	const XLINK_NS = "http://www.w3.org/1999/xlink";
	let embed, svg;
	let xqStarArr, yqStarArr, ddStarArr, xxStarArr;
	let xqOriginArr,yqOriginArr,ddOriginArr,xxoriginArr;
	class App {
		constructor() {
			this.init();
			this.update();

		}

		init() {
			embed = document.querySelector('embed');
			svg = embed.getSVGDocument().querySelector('#svg');
			this.initOrigin();
			this.initElement();
		}

		update() {

		}
		initOrigin(){
			xqOriginArr = this.createOrigin('xq', 13);
			yqOriginArr = this.createOrigin('yq', 6);
			ddOriginArr = this.createOrigin('dd', 5);
			xxoriginArr = this.createOrigin('xx', 2);
		}
		createOrigin(name,count){
			let arr = [];
			for(let i=0; i<count; i++){
				let id = name+i;
				let origin = svg.getElementById(id);
				arr.push(origin);
			}
			return arr;
		}
		initElement() {
			xqStarArr = this.createEl('xq', xqOriginArr,100,{max:0.9,min:0.6},1);
			yqStarArr = this.createEl('yq', yqOriginArr,100,{max:1,min:0.6},1);
			ddStarArr = this.createEl('dd', ddOriginArr,100,1,1);
			xxStarArr = this.createEl('xx', xxoriginArr,300,{max:0.8,min:0.2},null);
		}

		createEl(name,originArr, count,scale,opacity) {
			let arr = [];
			let len = originArr.length;
			for(let i = 0; i < count; i++) {
				let star = new Star({
					origin:originArr[this.randomInRange(0,len)],
					g:svg.getElementById(name),
					name:name,
					scale:Math.random()*(scale.max-scale.min)+scale.min,
					opacity:opacity || Math.random()*0.5+0.5
				});
				arr.push(star);
			}
			return arr;
		}
		
		randomInRange(min,max){
			return Math.floor(Math.random()*(max-min)+min);
		}
	}

	return App;
});