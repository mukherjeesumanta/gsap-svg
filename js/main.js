/*  Autumn Greeting Card -- js */

(function($){
	'use strict';

	// declare actors here
	var $backFallingLeaves = $('#brownLeaf, #orangeLeaf, #redLeaf'),
		$textLine1 = $('.text-line-1'),
		$textLine2 = $('.text-line-2'),
		$textGreeting = $('.text-greeting'),
		$treeLeaves = $('[id^=treeleaf]'),
		$floorLeaves = $('[id^=floorleaf]'),
		$bird = $('#Bird'),
		$birdHat = $bird.find('#BirdHat'),
		$birdEyes = $bird.find('#leftEye, #rightEye'),
		$nest = $('#NestAndLeaves'),
		$tree = $('#tree_trunk'),
		$cardContainer = $('.card.container'),
		$body = $('body')
	;

	// clear stage 
	function clearStage() {
		var clearTl = gsap.timeline();

		clearTl
			.set($backFallingLeaves, {opacity:0})
			.set($textLine1, {opacity:0})
			.set($textLine2, {opacity:0})
			.set($textGreeting, {opacity:0})
			.set($treeLeaves, {opacity:0})
			.set($bird, {y:'+=65', opacity:0})
			.set($nest, {opacity:0})
			.set($tree, {opacity:0})
			.set($floorLeaves, {y:'+=275', onComplete: showContainer})
		;

		function showContainer() {
			$cardContainer.css('display', 'block');
		}

		return clearTl;
	}

	// enter floor vegetation
	function enterFloorVegetation() {
		var fleavesTl = gsap.timeline();

		fleavesTl
			.staggerTo($floorLeaves, 1, {y:0, ease: Back.easeInOut}, 0.01)
			.add('floor-leaves')
			.fromTo($tree, 1.1, {opacity:0, scaleY:0.2, transformOrigin: 'bottom center'}, {opacity:1, scaleY:1, transformOrigin: 'bottom center', ease: Back.easeInOut})
			.fromTo($tree, 0.9, {opacity:0, scaleX:0.2, transformOrigin: 'bottom center'}, {opacity:1, scaleX:1, transformOrigin: 'bottom center', ease: Back.easeInOut}, "-=0.9")
		;

		return fleavesTl;
	}

	// enter tree stuff
	function enterTreeStuff() {
		var treeStuffTl = gsap.timeline();

		treeStuffTl
			.staggerFromTo($treeLeaves, 0.6, {scale:0.2, opacity:0, transformOrigin: 'bottom center'}, {scale:1, opacity:1, transformOrigin: 'bottom center'}, 0.02)
			.fromTo($nest, 1, {y:0, scale:0.2, opacity:0, transformOrigin: 'bottom center'}, {y:'-=15', scale:1, opacity:1, transformOrigin: 'bottom center', ease: Elastic.easeOut}, '-=0.1')
			.to($nest, 0.3, {y:'+=15', ease: Bounce.easeOut}, '-=0.1')
			.add('nest-pop-in')
			.set($birdHat, {rotation:12, x:'+=6'})
			.to($bird, 1.4, {y:'-=39', opacity:1, ease: Power4.easeOut}, 'nest-pop-in+=0.1')
			.add('bird-peeking')
			.set($birdEyes, {opacity:0})
			.set($birdEyes, {opacity:1}, '+=0.2')
			.set($birdEyes, {opacity:0}, '+=0.3')
			.set($birdEyes, {opacity:1}, '+=0.2')
			.add('bird-blinks')

			.to($bird, 0.8, {y:'-=34', ease: Power4.easeInOut}, 'bird-blinks+=0.4')
			.to($bird, 0.3, {y: '+=8', ease: Back.easeOut})
			.to($birdHat, 0.4, {y:'-=12'},'-=0.6')
			.to($birdHat, 0.3, {y:0, rotation:0, x:0, onComplete: startBlinking}, '-=0.2')
			.add('bird-reveal')
		;

		function startBlinking() {
			var birdBlinksTl = gsap.timeline({repeat:-1, repeatDelay: 4});

			birdBlinksTl
				.set($birdEyes, {opacity:0})
				.set($birdEyes, {opacity:1}, '+=0.2')
				.set($birdEyes, {opacity:0}, '+=1.2')
				.set($birdEyes, {opacity:1}, '+=0.2');

		}

		return treeStuffTl;
	}

	// enter the greeting text
	function enterGreetings() {
		var greetingTl = gsap.timeline();

		greetingTl
			.fromTo($textLine1, 1, {y: "-=50", opacity:0}, {y:0, opacity:1, onComplete: startLoops})
			.fromTo($textLine2, 1, {y: "-=25", opacity:0}, {y:0, opacity:1}, '-=0.2')
			.staggerFromTo($textGreeting, 0.4, {scale:2, opacity:0, transformOrigin: 'center center'}, {scale:1, opacity:1, transformOrigin: 'center center'}, 0.1)
		;

		function startLoops() {
			// start background color changes
			//var colors = ['#edcc93', '#f7e3ae', '#f3ebcc','#edcc93'];
			var colors = ['yellow', 'orange','pink', 'purple'];
			var bgTl = gsap.timeline({repeat:-1, repeatDelay:3, yoyo:true});

			bgTl
				.to($body, 3, {backgroundColor: colors[0]})
				.to($body, 3, {backgroundColor: colors[1]}, '+=3')
				.to($body, 3, {backgroundColor: colors[2]}, '+=3')
				.to($body, 3, {backgroundColor: colors[3]}, '+=3');


			// start falling leaves
			(function doFallingLeaves() {
				gsap.set($backFallingLeaves, {y: -100, opacity: 0.2});
				gsap.to("#brownLeaf", 10 + Math.random()*10, {y:'+=1200', opacity:1, ease: Linear.easeNone, onComplete: doneFalling, onCompleteParams: ["#brownLeaf"] });
				gsap.to("#redLeaf", 10 + Math.random()*10, {y:'+=1200', opacity:1, ease: Linear.easeNone, onComplete: doneFalling, onCompleteParams: ["#redLeaf"] });
				gsap.to("#orangeLeaf", 10 + Math.random()*10, {y:'+=1200', opacity:1, ease: Linear.easeNone,  onComplete: doneFalling, onCompleteParams: ["#orangeLeaf"] });

				function doneFalling(leafId) {
					console.log(leafId)
					var range = Math.random() * 800;
					range = range - 400;

					gsap.set(leafId, {y: -100, x: range, opacity: 0.2, rotation: Math.random()*360});
					gsap.to(leafId, 10 + Math.random()*10, {y:'+=1200', opacity:1, ease: Linear.easeNone, onComplete: doneFalling, onCompleteParams: [leafId] });
				}
				
			})();



		}

		return greetingTl;
	}
	
	// the GO function ...to kick things all off
	function go() {
		console.log('go ...');

		var masterTl = gsap.timeline();

		masterTl
			.add(clearStage(), 'scene-clear')
			.add(enterFloorVegetation(), 'scene-floor-vegetation')
			.add(enterTreeStuff(), 'scene-treestuff')
			.add(enterGreetings(), 'scene-greeting')
		;
	}

	go();

})(jQuery);


