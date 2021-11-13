// Инициализаця слайдера
new Swiper('.swiper');

let slider_about = new Swiper('.about__slider', {
	/*
	effect: 'false',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	// touchRatio: 0,
	// simulateTouch: false,
	// loop: true,
	// preloadImages: false,
	// lazy: true,
	// Doots
	// pagination: {
	// el: '.slider-quality__pagging',
	// clickable: true,	
	// }
	// Arrows
	navigation: {
		nextEl: '.about__more .more__item_next',
		prevEl: '.about__more .more__item_prev',
	},
	/*
	 breakpoints: {
		 320: {
			 slidesPerView: 1,
			 spaceBetween: 0,
			 autoHeight: true,
		 },
		 768: {
			 slidesPerView: 2,
			 spaceBetween: 20,
		 },
		 992: {
			 slidesPerView: 4,
			 spaceBetween: 30,
		 },
		 1268: {
			 slidesPerView: 4,
			 spaceBetween: 30,
		 },
	 },
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	// scrollbar {
	// el: '.swiper-scrollbar',
	// },
});