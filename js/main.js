require.config({
	paths:{
		"three":"../lib/three",
		"controls":"../lib/OrbitAndPanControls",
		"stats":"../lib/Stats",
		"tweenMax":"../lib/TweenMax"
	}
});

require(['app'],function(App){
	new App();
});
