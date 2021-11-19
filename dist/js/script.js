function testWebP(callback) {
	var webP = new Image(); webP.onload = webP.onerror = function () { callback(webP.height == 2); }; webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	
	}
	
	testWebP(function (support) {
	if (support == true) { document.querySelector('body').classList.add('webp'); }else{ document.querySelector('body').classList.add('no-webp'); }
	
	});
function ibg(){
	let ibg=document.querySelectorAll(".ibg"); for (var i = 0; i < ibg.length; i++) { if(ibg[i].querySelector('img')){ ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')'; } }
	
	}
	
	ibg();

	// Анимированный плейсхолдер
	(function animatePlaceholder() {
		var input = document.querySelectorAll('input[type="text"]');
		[].forEach.call(input, function(elem) {
		  var span = document.createElement('span'),
			 value;
		  elem.onfocus = function() {
			 value = this.getAttribute('data-value');
			 span.innerHTML = value;
			 this.parentNode.insertBefore(span, this);
			 if (this.value == this.getAttribute('data-value')) this.value = '';
			 span.classList.add('placeholder');
			 span.classList.add('placeholder-show');
		  }
		  elem.onblur = function() {
			 span.classList.remove('placeholder-show');
			 if(this.value == "") this.value = this.getAttribute('data-value'); 
		  }
		});
	 }());
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
"use strict"

//SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]');
 if (spollersArray.length > 0) {
	 // Получение обычных спойлеров
	 const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
       return !item.dataset.spollers.split(",")[0];
	 });
	 //Инициализация обычных спойлеров
	 if (spollersRegular.length > 0) {
		 initSpollers(spollersRegular);
	 }
	  // Получение спойлеров c медиа запросом
	  const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
			return item.dataset.spollers.split(",")[0];
	});
	// Инициализацияс спойлеров с медиа запросом 
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});
		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			//Обьекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация всей функции
	 function initSpollers(spollersArray, matchMedia = false) {
		 spollersArray.forEach(spollersBlock => {
			 spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			 if (matchMedia.matches || !matchMedia) {
				 spollersBlock.classList.add("__arrow");
				 initSpollerBody(spollersBlock);
				 spollersBlock.addEventListener("click", setSpollerAction);
			 } else {
				 spollersBlock.classList.remove('__arrow');
				 initSpollerBody(spollersBlock, false);
				 spollersBlock.removeEventListener("click", setSpollerAction);
			 }
		 });
	 }
     // Работа с контентом
	  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		  const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		  if (spollerTitles.length > 0) {
			  spollerTitles.forEach(spollerTitle => {
				  if (hideSpollerBody) {
					  spollerTitle.removeAttribute('tabindex');
					  if (!spollerTitle.classList.contains('_active')) {
						  spollerTitle.nextElementSibling.hidden = true;
					  }
				  } else {
					  spollerTitle.setAttribute('tabindex', '-1');
					  spollerTitle.nextElementSibling.hidden = false;
				  }
			  });
		  }
	  }
	  function setSpollerAction(e) {
		  const el = e.target;
		  if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			  const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			  const spollersBlock = spollerTitle.closest('[data-spollers]');
			  const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			  if (!spollersBlock.querySelectorAll('_slide').length) {
				  if (oneSpoller && !spollerTitle.classList.contains('_active')){
					  hideSpollersBody(spollersBlock);
				  }
				  spollerTitle.classList.toggle('_active');
				  _slideToggle(spollerTitle.nextElementSibling, 100);
			  }
			  e.preventDefault();
		  }
	  }
	  function hideSpollersBody(spollersBlock) {
		  const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		  if (spollerActiveTitle) {
			  spollerActiveTitle.classList.remove('_active');
			  _slideUp(spollerActiveTitle.nextElementSibling, 100);
		  }
	  }
 }
 // SlideToggle
 let _slideUp = (target, duration = 100) => {
	 if (!target.classList.contains('_slide')) {
		 target.classList.add('_slide');
		 target.style.transitionProperty = 'height, margin, padding';
		 target.style.transitionDuration = duration + 'ms';
		 target.style.height = target.offSetHeight + 'px';
		 target.offSetHeight;
		 target.style.overflow = 'hidden';
		 target.style.height = 0;
		 target.style.paddingTop = 0;
		 target.style.paddingBottom = 0;
		 target.style.marginTop = 0;
		 target.style.marginBottom = 0;
		 window.setTimeout(() => {
			 target.hidden = true;
			 target.style.removeProperty('height');
			 target.style.removeProperty('padding-top');
			 target.style.removeProperty('padding-bottom');
			 target.style.removeProperty('margin-top');
			 target.style.removeProperty('margin-bottom');
			 target.style.removeProperty('overflow');
			 target.style.removeProperty('transition-duration');
			 target.style.removeProperty('transition-property');
			 target.classList.remove('_slide');
		 }, duration);
	 }
 }
 let _slideDown = (target, duration = 100) => {
	 if (!target.classList.contains('_slide')) {
		 target.classList.add('_slide');
		 if (target.hidden) {
			 target.hidden = false;
		 }
		 let height = target.offSetHeight;
		 target.style.overflow = 'hidden';
		 target.style.height = 0;
		 target.style.paddingTop = 0;
		 target.style.paddingBottom = 0;
		 target.style.marginTop = 0;
		 target.style.marginBottom = 0;
		 target.offSetHeight;
		 target.style.transitionProperty = "height, margin, padding";
		 target.style.transitionDuration = duration + 'ms';
		 target.style.height = height + 'px';
		 target.style.removeProperty('padding-top');
		 target.style.removeProperty('padding-bottom');
		 target.style.removeProperty('margin-top');
		 target.style.removeProperty('margin-bottom');
		 window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
		   target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		 }, duration);
	 }
 }
 let _slideToggle = (target, duration = 100) => {
	 if(target.hidden) {
		 return _slideDown(target,duration);
	 } else {
		 return _slideUp(target, duration);
	 }
 }
// Меню Бургер
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


// ============= НАВИГАЦИЯ ПО СТРАНИЦЕ ======================================
//   ДЛЯ ЭТОГО НАМ НУЖНО В HTML ДОБАВИТЬ К ССЫЛКАМ data- атрибут data-goto=""
// с классом , пример ==> <a data-goto=".page"> </a> обязательно ставим точку перед именем класса
// Прокрутка при клике 
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuClick);
	});

	function onMenuClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
         if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
		      iconMenu.classList.remove('_active');
		      menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
   for (let index = 0; index < sliders.length; index++) {
      let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items =  slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('._swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
   sliders_bild_callback();
}

function sliders_bild_callback(params) {  }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollBar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			 mousewheel: {
				 releaseOnEdges: true,
			 },
		});
		sliderScroll.scrollbar.updateSize();
	}
}

function sliders_bild_callback(params) {  }

// проверка перед инициализацией
if (document.querySelector('.slider-main__body')) {
	new Swiper('.slider-main__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preLoadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: '.swiper-pagination, .controls-slider-main__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-main .slider-arrow__next',
			prevEl: '.slider-main .slider-arrow__prev',
		}
	});
}
window.onload = function () {
	document.addEventListener("click", documentActions);

	// Actions (делегирование события click)
	function documentActions(e) {
		const targetElement = e.target;
		if (window.innerWidth > 768 && isMobile.any()) {
         if(targetElement.classList.contains('menu__arrow')) {
             targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			else if (!targetElement.closest('.menu__item') && document.querySelector('.menu__item._hover')) {
				document.querySelector(".menu__item._hover").classList.remove('_hover');
			}
			
	}  
	if (targetElement.classList.contains('search-form__icon')) {
       document.querySelector('.search-form').classList.toggle('_active');
	} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
		document.querySelector(".search-form").classList.remove('_active');
	}
}	 
  //Header ОТСЛЕЖИВАНИЕ СКРОЛЛА ШАПКИ, РЕШЕНИЕ JS + CSS
  const headerElement = document.querySelector(".header");

  const callback = function (entries, observer) {
	  if (entries[0].isIntersecting) {
		  headerElement.classList.remove('_scroll');
	  } else {
		  headerElement.classList.add("_scroll");
	  }
  };

  const headerObserver = new IntersectionObserver(callback);
  headerObserver.observe(headerElement);
};

var isMobile = {
	Android: function() {
		 return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		 return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		 return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		 return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		 return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		 return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');
	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}
} else {
	document.body.classList.add('_pc');
}