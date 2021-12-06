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

// слайдер section.Rooms
if (document.querySelector('.slider-rooms__body')) {
	new Swiper('.slider-rooms__body', {
		observer: true,
		observeParents: true,
		slidesPerView: "auto",
		spaceBetween: 24,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preLoadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: '.swiper-pagination, .slider-rooms__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-rooms .slider-arrow__next',
			prevEl: '.slider-rooms .slider-arrow__prev',
		}
	});
}

// слайдер section.Tips
if (document.querySelector('.slider-tips__body')) {
	new Swiper('.slider-tips__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preLoadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: '.swiper-pagination, .slider-tips__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-tips .slider-arrow__next',
			prevEl: '.slider-tips .slider-arrow__prev',
		},
		breakpoints: {
			// when window is >= 320px
			320: {
				slidesPerView: 1.1,
				spaceBetween: 15
			},
			// when window width is >= 768px
			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is >= 992
			992: {
				slidesPerView: 3,
				spaceBetween: 32
			}
		}
	});
}
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

	 // Load More Products
	async function getProducts(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add("_hold");
			const file = "json/products.json";
			let response = await fetch(file, {
				method: "GET"
			});
			if (response.ok) {
				let result = await response.json();
				loadProducts(result);
				button.classList.remove("_hold");
				button.remove();
			} else {
				alert("Кажись беда, ХОЗЯИН! ОШИБКА!")
			}
		}
	}
	// функция LoadProducts
	function loadProducts(data) {
		const productsItems = document.querySelector('.products__items');
      
		data.products.forEach(item => {
         const productId = item.id;
			const productUrl = item.url;
			const productImage = item.image;
			const productTitle = item.title;
			const productText = item.text;
			const productPrice = item.price;
			const productOldPrice = item.priceOld;
			const productShareUrl = item.shareUrl;
			const productLikeUrl = item.likeUrl;
			const productLabels = item.labels;

			let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
			let productTemplateEnd = `</article>`;

			let productTemplateLabels = '';
			if (productLabels) {
				let productTemplateLabelsStart = `<div class="item-product__labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = '';

				productLabels.forEach(labelItem => {
					productTemplateLabelsContent += `<div class="item-product__label item-product__label__${labelItem.type}">${labelItem.value}</div>`;
				});

				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}
			let productTemplateImage = ` 
		          <a href="${productUrl}">
			          <img src="img/products/${productImage}" alt="${productTitle}">
		          </a>
	          `;

			let productTemplateBodyStart = `<div class="item-product__body">`;
			let productTemplateBodyEnd = `</div>`;

			let productTemplateContent = `
		<div class="item-product__content">
			<h3 class="item-product__title">${productTitle}</h3>
			<div class="item-product__text">${productText}</div>
		</div>
	`;

			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
			let productTemplatePricesOld = `<div class="item-product__price item-product__price__old">Rp ${productOldPrice}</div>`;
			let productTemplatePricesEnd = `</div>`;

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `
		<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a href="" class="actions-product__button btn btn__white">Add to cart</a>
				<a href="${productShareUrl}" class="actions-product__link icon-share">Share</a>
				<a href="${productLikeUrl}" class="actions-product__link icon-favorite">Like</a>
			</div>
		</div>
	`;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;

         productsItems.insertAdjacentHTML('beforeend', productTemplate);

		});
	}

	// addToCart
	function addToCart(productButton, productId) {
		if (!productButton.classList.contains('_hold')) {
			productButton.classList.add('_hold');
			productButton.classList.add('_fly');
		 
			const cart = document.querySelector('.cart-header__icon');
			const product = document.querySelector(`[data-pid="${productId}"]`);
			const productImage = product.querySelector('.item-product__image');

			const productImageFly = productImage.cloneNode(true);

			const productImageFlyWidth = productImage.offsetWidth;
			const productImageFlyHeight = productImage.offsetHeight;
			const productImageFlyTop = productImage.getBoundingClientRect().top;
			const productImageFlyLeft = productImage.getBoundingClientRect().left;
         // анимация полета картинки товара в корзину
			productImageFly.setAttribute('class', '_flyImage item-product__image');
			productImageFly.style.cssText = 
			`
			left: ${productImageFlyLeft}px;
			top: ${productImageFlyTop}px;
			width: ${productImageFlyWidth}px;
			height: ${productImageFlyHeight}px;
			`;

          document.body.append(productImageFly);

          const cartFlyLeft = cart.getBoundingClientRect().left;
			 const cartFlyTop = cart.getBoundingClientRect().top;

			 productImageFly.style.cssText =
			 `
			  left: ${cartFlyLeft}px;
			  top: ${cartFlyTop}px;
			  width: 0px;
			  height: 0px;
			  opacity: 0;
			 `;

			 productImageFly.addEventListener('transitionend', function () {
             if (productButton.classList.contains('_fly')) {
					 productImageFly.remove();
					 updateCart(productButton, productId);
					 productButton.classList.remove('_fly');
				 }
			 });
		}
	}
	//UpdateCart
	function updateCart(productButton, productId, productAdd = true) {
		const cart = document.querySelector('.cart-header');
		const cartIcon = cart.querySelector('.cart-header__icon');
		const cartQuantity = cartIcon.querySelector('span');
		const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
		const cartList = document.querySelector('.cart-list');

		//Добавляем
		if (productAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			} else {
				cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
			}

			//Список Товаров в корзине
			if (!cartProduct) {
				const product = document.querySelector(`[data-pid="${productId}"]`);
				const cartProductImage = product.querySelector('.item-product__image').innerHTML;
				const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
				const cartProductContent = `
				 <a href="" class="cart-list__image">${cartProductImage}</a>
				 <div class="cart-list__body">
				   <a href="" class="cart-list__title">${cartProductTitle}</a>
					<div class="cart-list__quantity">Quantity: <span>1</span></div>
					<a href="" class="cart-list__delete">Delete</a>
				 </div>`;
				 cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`); 
			} else {
				const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
				cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			} 

			// после всех действий
			productButton.classList.remove('_hold');
		} // удаление товара из КОРЗИНЫ , ДАННЫЙ ПОДХОД, РАБОТА С ДАННЫИ ИЗ DOM, НЕ САМЫЙ ПРАВИЛЬНЫЙ, был сделан в качестве тренировки
		  // Правильнее работать с данными и выводить уже данные, а не получать данные из ДОМ и работать с ними
		 else {
			const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if (!parseInt(cartProductQuantity.innerHTML)) {
            cartProduct.remove();
			}
			const cartQuantityValue = --cartQuantity.innerHTML;
            
			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cartQuantity.remove();
				cart.classList.remove('_active');
			}
		}
	}
/**
 * lightgallery | 2.3.0 | October 28th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).lightGallery=e()}(this,(function(){"use strict";var t=function(){return(t=Object.assign||function(t){for(var e,i=1,s=arguments.length;i<s;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)};var e=function(){function t(t){return this.cssVenderPrefixes=["TransitionDuration","TransitionTimingFunction","Transform","Transition"],this.selector=this._getSelector(t),this.firstElement=this._getFirstEl(),this}return t.generateUUID=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))},t.prototype._getSelector=function(t,e){return void 0===e&&(e=document),"string"!=typeof t?t:(e=e||document,"#"===t.substring(0,1)?e.querySelector(t):e.querySelectorAll(t))},t.prototype._each=function(t){return this.selector?(void 0!==this.selector.length?[].forEach.call(this.selector,t):t(this.selector,0),this):this},t.prototype._setCssVendorPrefix=function(t,e,i){var s=e.replace(/-([a-z])/gi,(function(t,e){return e.toUpperCase()}));-1!==this.cssVenderPrefixes.indexOf(s)?(t.style[s.charAt(0).toLowerCase()+s.slice(1)]=i,t.style["webkit"+s]=i,t.style["moz"+s]=i,t.style["ms"+s]=i,t.style["o"+s]=i):t.style[s]=i},t.prototype._getFirstEl=function(){return this.selector&&void 0!==this.selector.length?this.selector[0]:this.selector},t.prototype.isEventMatched=function(t,e){var i=e.split(".");return t.split(".").filter((function(t){return t})).every((function(t){return-1!==i.indexOf(t)}))},t.prototype.attr=function(t,e){return void 0===e?this.firstElement?this.firstElement.getAttribute(t):"":(this._each((function(i){i.setAttribute(t,e)})),this)},t.prototype.find=function(t){return i(this._getSelector(t,this.selector))},t.prototype.first=function(){return this.selector&&void 0!==this.selector.length?i(this.selector[0]):i(this.selector)},t.prototype.eq=function(t){return i(this.selector[t])},t.prototype.parent=function(){return i(this.selector.parentElement)},t.prototype.get=function(){return this._getFirstEl()},t.prototype.removeAttr=function(t){var e=t.split(" ");return this._each((function(t){e.forEach((function(e){return t.removeAttribute(e)}))})),this},t.prototype.wrap=function(t){if(!this.firstElement)return this;var e=document.createElement("div");return e.className=t,this.firstElement.parentNode.insertBefore(e,this.firstElement),this.firstElement.parentNode.removeChild(this.firstElement),e.appendChild(this.firstElement),this},t.prototype.addClass=function(t){return void 0===t&&(t=""),this._each((function(e){t.split(" ").forEach((function(t){t&&e.classList.add(t)}))})),this},t.prototype.removeClass=function(t){return this._each((function(e){t.split(" ").forEach((function(t){t&&e.classList.remove(t)}))})),this},t.prototype.hasClass=function(t){return!!this.firstElement&&this.firstElement.classList.contains(t)},t.prototype.hasAttribute=function(t){return!!this.firstElement&&this.firstElement.hasAttribute(t)},t.prototype.toggleClass=function(t){return this.firstElement?(this.hasClass(t)?this.removeClass(t):this.addClass(t),this):this},t.prototype.css=function(t,e){var i=this;return this._each((function(s){i._setCssVendorPrefix(s,t,e)})),this},t.prototype.on=function(e,i){var s=this;return this.selector?(e.split(" ").forEach((function(e){Array.isArray(t.eventListeners[e])||(t.eventListeners[e]=[]),t.eventListeners[e].push(i),s.selector.addEventListener(e.split(".")[0],i)})),this):this},t.prototype.once=function(t,e){var i=this;return this.on(t,(function(){i.off(t),e(t)})),this},t.prototype.off=function(e){var i=this;return this.selector?(Object.keys(t.eventListeners).forEach((function(s){i.isEventMatched(e,s)&&(t.eventListeners[s].forEach((function(t){i.selector.removeEventListener(s.split(".")[0],t)})),t.eventListeners[s]=[])})),this):this},t.prototype.trigger=function(t,e){if(!this.firstElement)return this;var i=new CustomEvent(t.split(".")[0],{detail:e||null});return this.firstElement.dispatchEvent(i),this},t.prototype.load=function(t){var e=this;return fetch(t).then((function(t){e.selector.innerHTML=t})),this},t.prototype.html=function(t){return void 0===t?this.firstElement?this.firstElement.innerHTML:"":(this._each((function(e){e.innerHTML=t})),this)},t.prototype.append=function(t){return this._each((function(e){"string"==typeof t?e.insertAdjacentHTML("beforeend",t):e.appendChild(t)})),this},t.prototype.prepend=function(t){return this._each((function(e){e.insertAdjacentHTML("afterbegin",t)})),this},t.prototype.remove=function(){return this._each((function(t){t.parentNode.removeChild(t)})),this},t.prototype.empty=function(){return this._each((function(t){t.innerHTML=""})),this},t.prototype.scrollTop=function(t){return void 0!==t?(document.body.scrollTop=t,document.documentElement.scrollTop=t,this):window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},t.prototype.scrollLeft=function(t){return void 0!==t?(document.body.scrollLeft=t,document.documentElement.scrollLeft=t,this):window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0},t.prototype.offset=function(){if(!this.firstElement)return{left:0,top:0};var t=this.firstElement.getBoundingClientRect(),e=i("body").style().marginLeft;return{left:t.left-parseFloat(e)+this.scrollLeft(),top:t.top+this.scrollTop()}},t.prototype.style=function(){return this.firstElement?this.firstElement.currentStyle||window.getComputedStyle(this.firstElement):{}},t.prototype.width=function(){var t=this.style();return this.firstElement.clientWidth-parseFloat(t.paddingLeft)-parseFloat(t.paddingRight)},t.prototype.height=function(){var t=this.style();return this.firstElement.clientHeight-parseFloat(t.paddingTop)-parseFloat(t.paddingBottom)},t.eventListeners={},t}();function i(t){return function(){if("function"==typeof window.CustomEvent)return!1;window.CustomEvent=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:null};var i=document.createEvent("CustomEvent");return i.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),i}}(),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),new e(t)}var s=["src","sources","subHtml","subHtmlUrl","html","video","poster","slideName","responsive","srcset","sizes","iframe","downloadUrl","download","width","facebookShareUrl","tweetText","iframeTitle","twitterShareUrl","pinterestShareUrl","pinterestText","fbHtml","disqusIdentifier","disqusUrl"];function n(t){return"href"===t?"src":t=(t=(t=t.replace("data-","")).charAt(0).toLowerCase()+t.slice(1)).replace(/-([a-z])/g,(function(t){return t[1].toUpperCase()}))}var o=function(t,e,s,n){void 0===s&&(s=0);var o=i(t).attr("data-lg-size")||n;if(o){var r=o.split(",");if(r[1])for(var l=window.innerWidth,a=0;a<r.length;a++){var g=r[a];if(parseInt(g.split("-")[2],10)>l){o=g;break}a===r.length-1&&(o=g)}var d=o.split("-"),h=parseInt(d[0],10),u=parseInt(d[1],10),c=e.width(),m=e.height()-s,p=Math.min(c,h),f=Math.min(m,u),v=Math.min(p/h,f/u);return{width:h*v,height:u*v}}},r=function(t,e,s,n,o){if(o){var r=i(t).find("img").first();if(r.get()){var l=e.get().getBoundingClientRect(),a=l.width,g=e.height()-(s+n),d=r.width(),h=r.height(),u=r.style(),c=(a-d)/2-r.offset().left+(parseFloat(u.paddingLeft)||0)+(parseFloat(u.borderLeft)||0)+i(window).scrollLeft()+l.left,m=(g-h)/2-r.offset().top+(parseFloat(u.paddingTop)||0)+(parseFloat(u.borderTop)||0)+i(window).scrollTop()+s;return"translate3d("+(c*=-1)+"px, "+(m*=-1)+"px, 0) scale3d("+d/o.width+", "+h/o.height+", 1)"}}},l=function(t,e,i,s,n,o){return'<div class="lg-video-cont lg-has-iframe" style="width:'+t+"; max-width:"+i+"; height: "+e+"; max-height:"+s+'">\n                    <iframe class="lg-object" frameborder="0" '+(o?'title="'+o+'"':"")+' src="'+n+'"  allowfullscreen="true"></iframe>\n                </div>'},a=function(t,e,i,s,n,o){var r="<img "+i+" "+(s?'srcset="'+s+'"':"")+"  "+(n?'sizes="'+n+'"':"")+' class="lg-object lg-image" data-index="'+t+'" src="'+e+'" />',l="";o&&(l=("string"==typeof o?JSON.parse(o):o).map((function(t){var e="";return Object.keys(t).forEach((function(i){e+=" "+i+'="'+t[i]+'"'})),"<source "+e+"></source>"})));return""+l+r},g=function(t){for(var e=[],i=[],s="",n=0;n<t.length;n++){var o=t[n].split(" ");""===o[0]&&o.splice(0,1),i.push(o[0]),e.push(o[1])}for(var r=window.innerWidth,l=0;l<e.length;l++)if(parseInt(e[l],10)>r){s=i[l];break}return s},d=function(t){return!!t&&(!!t.complete&&0!==t.naturalWidth)},h=function(t,e,i,s){return'<div class="lg-video-cont '+(s&&s.youtube?"lg-has-youtube":s&&s.vimeo?"lg-has-vimeo":"lg-has-html5")+'" style="'+i+'">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            '+(e||"")+'\n            <img class="lg-object lg-video-poster" src="'+t+'" />\n        </div>'},u=function(t,e,o,r){var l=[],a=function(){for(var t=0,e=0,i=arguments.length;e<i;e++)t+=arguments[e].length;var s=Array(t),n=0;for(e=0;e<i;e++)for(var o=arguments[e],r=0,l=o.length;r<l;r++,n++)s[n]=o[r];return s}(s,e);return[].forEach.call(t,(function(t){for(var e={},s=0;s<t.attributes.length;s++){var g=t.attributes[s];if(g.specified){var d=n(g.name),h="";a.indexOf(d)>-1&&(h=d),h&&(e[h]=g.value)}}var u=i(t),c=u.find("img").first().attr("alt"),m=u.attr("title"),p=r?u.attr(r):u.find("img").first().attr("src");e.thumb=p,o&&!e.subHtml&&(e.subHtml=m||c||""),e.alt=c||m||"",l.push(e)})),l},c=function(){return/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)},m=function(t,e,i){if(!t)return e?{html5:!0}:void console.error("lightGallery :- data-src is not provided on slide item "+(i+1)+". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/");var s=t.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i),n=t.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i),o=t.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);return s?{youtube:s}:n?{vimeo:n}:o?{wistia:o}:void 0},p={mode:"lg-slide",easing:"ease",speed:400,licenseKey:"0000-0000-000-0000",height:"100%",width:"100%",addClass:"",startClass:"lg-start-zoom",backdropDuration:300,container:"",startAnimationDuration:400,zoomFromOrigin:!0,hideBarsDelay:0,showBarsAfter:1e4,slideDelay:0,supportLegacyBrowser:!0,allowMediaOverlap:!1,videoMaxSize:"1280-720",loadYouTubePoster:!0,defaultCaptionHeight:0,ariaLabelledby:"",ariaDescribedby:"",closable:!0,swipeToClose:!0,closeOnTap:!0,showCloseIcon:!0,showMaximizeIcon:!1,loop:!0,escKey:!0,keyPress:!0,controls:!0,slideEndAnimation:!0,hideControlOnEnd:!1,mousewheel:!1,getCaptionFromTitleOrAlt:!0,appendSubHtmlTo:".lg-sub-html",subHtmlSelectorRelative:!1,preload:2,numberOfSlideItemsInDom:10,selector:"",selectWithin:"",nextHtml:"",prevHtml:"",index:0,iframeWidth:"100%",iframeHeight:"100%",iframeMaxWidth:"100%",iframeMaxHeight:"100%",download:!0,counter:!0,appendCounterTo:".lg-toolbar",swipeThreshold:50,enableSwipe:!0,enableDrag:!0,dynamic:!1,dynamicEl:[],extraProps:[],exThumbImage:"",isMobile:void 0,mobileSettings:{controls:!1,showCloseIcon:!1,download:!1},plugins:[]},f="lgAfterAppendSlide",v="lgInit",y="lgHasVideo",b="lgContainerResize",I="lgUpdateSlides",C="lgAfterAppendSubHtml",x="lgBeforeOpen",w="lgAfterOpen",S="lgSlideItemLoad",T="lgBeforeSlide",E="lgAfterSlide",O="lgPosterClick",L="lgDragStart",D="lgDragMove",z="lgDragEnd",M="lgBeforeNextSlide",G="lgBeforePrevSlide",k="lgBeforeClose",A="lgAfterClose",B=0,P=function(){function s(t,e){if(this.lgOpened=!1,this.index=0,this.plugins=[],this.lGalleryOn=!1,this.lgBusy=!1,this.currentItemsInDom=[],this.prevScrollTop=0,this.isDummyImageRemoved=!1,this.dragOrSwipeEnabled=!1,this.mediaContainerPosition={top:0,bottom:0},!t)return this;if(B++,this.lgId=B,this.el=t,this.LGel=i(t),this.generateSettings(e),this.buildModules(),this.settings.dynamic&&void 0!==this.settings.dynamicEl&&!Array.isArray(this.settings.dynamicEl))throw"When using dynamic mode, you must also define dynamicEl as an Array.";return this.galleryItems=this.getItems(),this.normalizeSettings(),this.init(),this.validateLicense(),this}return s.prototype.generateSettings=function(e){if(this.settings=t(t({},p),e),this.settings.isMobile&&"function"==typeof this.settings.isMobile?this.settings.isMobile():c()){var i=t(t({},this.settings.mobileSettings),this.settings.mobileSettings);this.settings=t(t({},this.settings),i)}},s.prototype.normalizeSettings=function(){this.settings.slideEndAnimation&&(this.settings.hideControlOnEnd=!1),this.settings.closable||(this.settings.swipeToClose=!1),this.zoomFromOrigin=this.settings.zoomFromOrigin,this.settings.dynamic&&(this.zoomFromOrigin=!1),this.settings.container||(this.settings.container=document.body),this.settings.preload=Math.min(this.settings.preload,this.galleryItems.length)},s.prototype.init=function(){var t=this;this.addSlideVideoInfo(this.galleryItems),this.buildStructure(),this.LGel.trigger(v,{instance:this}),this.settings.keyPress&&this.keyPress(),setTimeout((function(){t.enableDrag(),t.enableSwipe(),t.triggerPosterClick()}),50),this.arrow(),this.settings.mousewheel&&this.mousewheel(),this.settings.dynamic||this.openGalleryOnItemClick()},s.prototype.openGalleryOnItemClick=function(){for(var t=this,s=function(s){var o=n.items[s],r=i(o),l=e.generateUUID();r.attr("data-lg-id",l).on("click.lgcustom-item-"+l,(function(e){e.preventDefault();var i=t.settings.index||s;t.openGallery(i,o)}))},n=this,o=0;o<this.items.length;o++)s(o)},s.prototype.buildModules=function(){var t=this;this.settings.plugins.forEach((function(e){t.plugins.push(new e(t,i))}))},s.prototype.validateLicense=function(){this.settings.licenseKey?"0000-0000-000-0000"===this.settings.licenseKey&&console.warn("lightGallery: "+this.settings.licenseKey+" license key is not valid for production use"):console.error("Please provide a valid license key")},s.prototype.getSlideItem=function(t){return i(this.getSlideItemId(t))},s.prototype.getSlideItemId=function(t){return"#lg-item-"+this.lgId+"-"+t},s.prototype.getIdName=function(t){return t+"-"+this.lgId},s.prototype.getElementById=function(t){return i("#"+this.getIdName(t))},s.prototype.manageSingleSlideClassName=function(){this.galleryItems.length<2?this.outer.addClass("lg-single-item"):this.outer.removeClass("lg-single-item")},s.prototype.buildStructure=function(){var t=this;if(!(this.$container&&this.$container.get())){var e="",s="";this.settings.controls&&(e='<button type="button" id="'+this.getIdName("lg-prev")+'" aria-label="Previous slide" class="lg-prev lg-icon"> '+this.settings.prevHtml+' </button>\n                <button type="button" id="'+this.getIdName("lg-next")+'" aria-label="Next slide" class="lg-next lg-icon"> '+this.settings.nextHtml+" </button>"),".lg-item"!==this.settings.appendSubHtmlTo&&(s='<div class="lg-sub-html" role="status" aria-live="polite"></div>');var n="";this.settings.allowMediaOverlap&&(n+="lg-media-overlap ");var o=this.settings.ariaLabelledby?'aria-labelledby="'+this.settings.ariaLabelledby+'"':"",r=this.settings.ariaDescribedby?'aria-describedby="'+this.settings.ariaDescribedby+'"':"",l="lg-container "+this.settings.addClass+" "+(document.body!==this.settings.container?"lg-inline":""),a=this.settings.closable&&this.settings.showCloseIcon?'<button type="button" aria-label="Close gallery" id="'+this.getIdName("lg-close")+'" class="lg-close lg-icon"></button>':"",g=this.settings.showMaximizeIcon?'<button type="button" aria-label="Toggle maximize" id="'+this.getIdName("lg-maximize")+'" class="lg-maximize lg-icon"></button>':"",d='\n        <div class="'+l+'" id="'+this.getIdName("lg-container")+'" tabindex="-1" aria-modal="true" '+o+" "+r+' role="dialog"\n        >\n            <div id="'+this.getIdName("lg-backdrop")+'" class="lg-backdrop"></div>\n\n            <div id="'+this.getIdName("lg-outer")+'" class="lg-outer lg-use-css3 lg-css3 lg-hide-items '+n+' ">\n\n              <div id="'+this.getIdName("lg-content")+'" class="lg-content">\n                <div id="'+this.getIdName("lg-inner")+'" class="lg-inner">\n                </div>\n                '+e+'\n              </div>\n                <div id="'+this.getIdName("lg-toolbar")+'" class="lg-toolbar lg-group">\n                    '+g+"\n                    "+a+"\n                    </div>\n                    "+(".lg-outer"===this.settings.appendSubHtmlTo?s:"")+'\n                <div id="'+this.getIdName("lg-components")+'" class="lg-components">\n                    '+(".lg-sub-html"===this.settings.appendSubHtmlTo?s:"")+"\n                </div>\n            </div>\n        </div>\n        ";i(this.settings.container).css("position","relative").append(d),this.outer=this.getElementById("lg-outer"),this.$lgComponents=this.getElementById("lg-components"),this.$backdrop=this.getElementById("lg-backdrop"),this.$container=this.getElementById("lg-container"),this.$inner=this.getElementById("lg-inner"),this.$content=this.getElementById("lg-content"),this.$toolbar=this.getElementById("lg-toolbar"),this.$backdrop.css("transition-duration",this.settings.backdropDuration+"ms");var h=this.settings.mode+" ";this.manageSingleSlideClassName(),this.settings.enableDrag&&(h+="lg-grab "),this.outer.addClass(h),this.$inner.css("transition-timing-function",this.settings.easing),this.$inner.css("transition-duration",this.settings.speed+"ms"),this.settings.download&&this.$toolbar.append('<a id="'+this.getIdName("lg-download")+'" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>'),this.counter(),i(window).on("resize.lg.global"+this.lgId+" orientationchange.lg.global"+this.lgId,(function(){t.refreshOnResize()})),this.hideBars(),this.manageCloseGallery(),this.toggleMaximize(),this.initModules()}},s.prototype.refreshOnResize=function(){if(this.lgOpened){var t=this.galleryItems[this.index].__slideVideoInfo;this.mediaContainerPosition=this.getMediaContainerPosition();var e=this.mediaContainerPosition,i=e.top,s=e.bottom;if(this.currentImageSize=o(this.items[this.index],this.outer,i+s,t&&this.settings.videoMaxSize),t&&this.resizeVideoSlide(this.index,this.currentImageSize),this.zoomFromOrigin&&!this.isDummyImageRemoved){var n=this.getDummyImgStyles(this.currentImageSize);this.outer.find(".lg-current .lg-dummy-img").first().attr("style",n)}this.LGel.trigger(b)}},s.prototype.resizeVideoSlide=function(t,e){var i=this.getVideoContStyle(e);this.getSlideItem(t).find(".lg-video-cont").attr("style",i)},s.prototype.updateSlides=function(t,e){if(this.index>t.length-1&&(this.index=t.length-1),1===t.length&&(this.index=0),t.length){var i=this.galleryItems[e].src;this.galleryItems=t,this.updateControls(),this.$inner.empty(),this.currentItemsInDom=[];var s=0;this.galleryItems.some((function(t,e){return t.src===i&&(s=e,!0)})),this.currentItemsInDom=this.organizeSlideItems(s,-1),this.loadContent(s,!0),this.getSlideItem(s).addClass("lg-current"),this.index=s,this.updateCurrentCounter(s),this.LGel.trigger(I)}else this.closeGallery()},s.prototype.getItems=function(){if(this.items=[],this.settings.dynamic)return this.settings.dynamicEl||[];if("this"===this.settings.selector)this.items.push(this.el);else if(this.settings.selector)if("string"==typeof this.settings.selector)if(this.settings.selectWithin){var t=i(this.settings.selectWithin);this.items=t.find(this.settings.selector).get()}else this.items=this.el.querySelectorAll(this.settings.selector);else this.items=this.settings.selector;else this.items=this.el.children;return u(this.items,this.settings.extraProps,this.settings.getCaptionFromTitleOrAlt,this.settings.exThumbImage)},s.prototype.openGallery=function(t,e){var s=this;if(void 0===t&&(t=this.settings.index),!this.lgOpened){this.lgOpened=!0,this.outer.get().focus(),this.outer.removeClass("lg-hide-items"),this.$container.addClass("lg-show");var n=this.getItemsToBeInsertedToDom(t,t);this.currentItemsInDom=n;var l="";n.forEach((function(t){l=l+'<div id="'+t+'" class="lg-item"></div>'})),this.$inner.append(l),this.addHtml(t);var a="";this.mediaContainerPosition=this.getMediaContainerPosition();var g=this.mediaContainerPosition,d=g.top,h=g.bottom;this.settings.allowMediaOverlap||this.setMediaContainerPosition(d,h);var u=this.galleryItems[t].__slideVideoInfo;this.zoomFromOrigin&&e&&(this.currentImageSize=o(e,this.outer,d+h,u&&this.settings.videoMaxSize),a=r(e,this.outer,d,h,this.currentImageSize)),this.zoomFromOrigin&&a||(this.outer.addClass(this.settings.startClass),this.getSlideItem(t).removeClass("lg-complete"));var c=this.settings.zoomFromOrigin?100:this.settings.backdropDuration;setTimeout((function(){s.outer.addClass("lg-components-open")}),c),this.index=t,this.LGel.trigger(x),this.getSlideItem(t).addClass("lg-current"),this.lGalleryOn=!1,this.prevScrollTop=i(window).scrollTop(),setTimeout((function(){if(s.zoomFromOrigin&&a){var e=s.getSlideItem(t);e.css("transform",a),setTimeout((function(){e.addClass("lg-start-progress lg-start-end-progress").css("transition-duration",s.settings.startAnimationDuration+"ms"),s.outer.addClass("lg-zoom-from-image")})),setTimeout((function(){e.css("transform","translate3d(0, 0, 0)")}),100)}setTimeout((function(){s.$backdrop.addClass("in"),s.$container.addClass("lg-show-in")}),10),s.zoomFromOrigin&&a||setTimeout((function(){s.outer.addClass("lg-visible")}),s.settings.backdropDuration),s.slide(t,!1,!1,!1),s.LGel.trigger(w)})),document.body===this.settings.container&&i("html").addClass("lg-on")}},s.prototype.getMediaContainerPosition=function(){if(this.settings.allowMediaOverlap)return{top:0,bottom:0};var t=this.$toolbar.get().clientHeight||0,e=this.outer.find(".lg-components .lg-sub-html").get(),i=this.settings.defaultCaptionHeight||e&&e.clientHeight||0,s=this.outer.find(".lg-thumb-outer").get();return{top:t,bottom:(s?s.clientHeight:0)+i}},s.prototype.setMediaContainerPosition=function(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.$content.css("top",t+"px").css("bottom",e+"px")},s.prototype.hideBars=function(){var t=this;setTimeout((function(){t.outer.removeClass("lg-hide-items"),t.settings.hideBarsDelay>0&&(t.outer.on("mousemove.lg click.lg touchstart.lg",(function(){t.outer.removeClass("lg-hide-items"),clearTimeout(t.hideBarTimeout),t.hideBarTimeout=setTimeout((function(){t.outer.addClass("lg-hide-items")}),t.settings.hideBarsDelay)})),t.outer.trigger("mousemove.lg"))}),this.settings.showBarsAfter)},s.prototype.initPictureFill=function(t){if(this.settings.supportLegacyBrowser)try{picturefill({elements:[t.get()]})}catch(t){console.warn("lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.")}},s.prototype.counter=function(){if(this.settings.counter){var t='<div class="lg-counter" role="status" aria-live="polite">\n                <span id="'+this.getIdName("lg-counter-current")+'" class="lg-counter-current">'+(this.index+1)+' </span> /\n                <span id="'+this.getIdName("lg-counter-all")+'" class="lg-counter-all">'+this.galleryItems.length+" </span></div>";this.outer.find(this.settings.appendCounterTo).append(t)}},s.prototype.addHtml=function(t){var e,s;if(this.galleryItems[t].subHtmlUrl?s=this.galleryItems[t].subHtmlUrl:e=this.galleryItems[t].subHtml,!s)if(e){var n=e.substring(0,1);"."!==n&&"#"!==n||(e=this.settings.subHtmlSelectorRelative&&!this.settings.dynamic?i(this.items).eq(t).find(e).first().html():i(e).first().html())}else e="";if(".lg-item"!==this.settings.appendSubHtmlTo)s?this.outer.find(".lg-sub-html").load(s):this.outer.find(".lg-sub-html").html(e);else{var o=i(this.getSlideItemId(t));s?o.load(s):o.append('<div class="lg-sub-html">'+e+"</div>")}null!=e&&(""===e?this.outer.find(this.settings.appendSubHtmlTo).addClass("lg-empty-html"):this.outer.find(this.settings.appendSubHtmlTo).removeClass("lg-empty-html")),this.LGel.trigger(C,{index:t})},s.prototype.preload=function(t){for(var e=1;e<=this.settings.preload&&!(e>=this.galleryItems.length-t);e++)this.loadContent(t+e,!1);for(var i=1;i<=this.settings.preload&&!(t-i<0);i++)this.loadContent(t-i,!1)},s.prototype.getDummyImgStyles=function(t){return t?"width:"+t.width+"px;\n                margin-left: -"+t.width/2+"px;\n                margin-top: -"+t.height/2+"px;\n                height:"+t.height+"px":""},s.prototype.getVideoContStyle=function(t){return t?"width:"+t.width+"px;\n                height:"+t.height+"px":""},s.prototype.getDummyImageContent=function(t,e,s){var n;if(this.settings.dynamic||(n=i(this.items).eq(e)),n){var o=void 0;if(!(o=this.settings.exThumbImage?n.attr(this.settings.exThumbImage):n.find("img").first().attr("src")))return"";var r="<img "+s+' style="'+this.getDummyImgStyles(this.currentImageSize)+'" class="lg-dummy-img" src="'+o+'" />';return t.addClass("lg-first-slide"),this.outer.addClass("lg-first-slide-loading"),r}return""},s.prototype.setImgMarkup=function(t,e,i){var s=this.galleryItems[i],n=s.alt,o=s.srcset,r=s.sizes,l=s.sources,g=n?'alt="'+n+'"':"",d='<picture class="lg-img-wrap"> '+(this.isFirstSlideWithZoomAnimation()?this.getDummyImageContent(e,i,g):a(i,t,g,o,r,l))+"</picture>";e.prepend(d)},s.prototype.onSlideObjectLoad=function(t,e,i,s){var n=t.find(".lg-object").first();d(n.get())||e?i():(n.on("load.lg error.lg",(function(){i&&i()})),n.on("error.lg",(function(){s&&s()})))},s.prototype.onLgObjectLoad=function(t,e,i,s,n,o){var r=this;this.onSlideObjectLoad(t,o,(function(){r.triggerSlideItemLoad(t,e,i,s,n)}),(function(){t.addClass("lg-complete lg-complete_"),t.html('<span class="lg-error-msg">Oops... Failed to load content...</span>')}))},s.prototype.triggerSlideItemLoad=function(t,e,i,s,n){var o=this,r=this.galleryItems[e],l=n&&"video"===this.getSlideType(r)&&!r.poster?s:0;setTimeout((function(){t.addClass("lg-complete lg-complete_"),o.LGel.trigger(S,{index:e,delay:i||0,isFirstSlide:n})}),l)},s.prototype.isFirstSlideWithZoomAnimation=function(){return!(this.lGalleryOn||!this.zoomFromOrigin||!this.currentImageSize)},s.prototype.addSlideVideoInfo=function(t){var e=this;t.forEach((function(t,i){t.__slideVideoInfo=m(t.src,!!t.video,i),t.__slideVideoInfo&&e.settings.loadYouTubePoster&&!t.poster&&t.__slideVideoInfo.youtube&&(t.poster="//img.youtube.com/vi/"+t.__slideVideoInfo.youtube[1]+"/maxresdefault.jpg")}))},s.prototype.loadContent=function(t,e){var s=this,n=this.galleryItems[t],r=i(this.getSlideItemId(t)),d=n.poster,u=n.srcset,c=n.sizes,m=n.sources,p=n.src,v=n.video,b=v&&"string"==typeof v?JSON.parse(v):v;if(n.responsive){var I=n.responsive.split(",");p=g(I)||p}var C=n.__slideVideoInfo,x="",w=!!n.iframe,S=!this.lGalleryOn,T=0;if(S&&(T=this.zoomFromOrigin&&this.currentImageSize?this.settings.startAnimationDuration+10:this.settings.backdropDuration+10),!r.hasClass("lg-loaded")){if(C){var E=this.mediaContainerPosition,O=E.top,L=E.bottom,D=o(this.items[t],this.outer,O+L,C&&this.settings.videoMaxSize);x=this.getVideoContStyle(D)}if(w){var z=l(this.settings.iframeWidth,this.settings.iframeHeight,this.settings.iframeMaxWidth,this.settings.iframeMaxHeight,p,n.iframeTitle);r.prepend(z)}else if(d){var M="";S&&this.zoomFromOrigin&&this.currentImageSize&&(M=this.getDummyImageContent(r,t,""));z=h(d,M||"",x,C);r.prepend(z)}else if(C){z='<div class="lg-video-cont " style="'+x+'"></div>';r.prepend(z)}else if(this.setImgMarkup(p,r,t),u||m){var G=r.find(".lg-object");this.initPictureFill(G)}(d||C)&&this.LGel.trigger(y,{index:t,src:p,html5Video:b,hasPoster:!!d}),this.LGel.trigger(f,{index:t}),this.lGalleryOn&&".lg-item"===this.settings.appendSubHtmlTo&&this.addHtml(t)}var k=0;T&&!i(document.body).hasClass("lg-from-hash")&&(k=T),this.isFirstSlideWithZoomAnimation()&&(setTimeout((function(){r.removeClass("lg-start-end-progress lg-start-progress").removeAttr("style")}),this.settings.startAnimationDuration+100),r.hasClass("lg-loaded")||setTimeout((function(){if("image"===s.getSlideType(n)&&(r.find(".lg-img-wrap").append(a(t,p,"",u,c,n.sources)),u||m)){var e=r.find(".lg-object");s.initPictureFill(e)}("image"===s.getSlideType(n)||"video"===s.getSlideType(n)&&d)&&(s.onLgObjectLoad(r,t,T,k,!0,!1),s.onSlideObjectLoad(r,!(!C||!C.html5||d),(function(){s.loadContentOnFirstSlideLoad(t,r,k)}),(function(){s.loadContentOnFirstSlideLoad(t,r,k)})))}),this.settings.startAnimationDuration+100)),r.addClass("lg-loaded"),this.isFirstSlideWithZoomAnimation()&&("video"!==this.getSlideType(n)||d)||this.onLgObjectLoad(r,t,T,k,S,!(!C||!C.html5||d)),this.zoomFromOrigin&&this.currentImageSize||!r.hasClass("lg-complete_")||this.lGalleryOn||setTimeout((function(){r.addClass("lg-complete")}),this.settings.backdropDuration),this.lGalleryOn=!0,!0===e&&(r.hasClass("lg-complete_")?this.preload(t):r.find(".lg-object").first().on("load.lg error.lg",(function(){s.preload(t)})))},s.prototype.loadContentOnFirstSlideLoad=function(t,e,i){var s=this;setTimeout((function(){e.find(".lg-dummy-img").remove(),e.removeClass("lg-first-slide"),s.outer.removeClass("lg-first-slide-loading"),s.isDummyImageRemoved=!0,s.preload(t)}),i+300)},s.prototype.getItemsToBeInsertedToDom=function(t,e,i){var s=this;void 0===i&&(i=0);var n=[],o=Math.max(i,3);o=Math.min(o,this.galleryItems.length);var r="lg-item-"+this.lgId+"-"+e;if(this.galleryItems.length<=3)return this.galleryItems.forEach((function(t,e){n.push("lg-item-"+s.lgId+"-"+e)})),n;if(t<(this.galleryItems.length-1)/2){for(var l=t;l>t-o/2&&l>=0;l--)n.push("lg-item-"+this.lgId+"-"+l);var a=n.length;for(l=0;l<o-a;l++)n.push("lg-item-"+this.lgId+"-"+(t+l+1))}else{for(l=t;l<=this.galleryItems.length-1&&l<t+o/2;l++)n.push("lg-item-"+this.lgId+"-"+l);for(a=n.length,l=0;l<o-a;l++)n.push("lg-item-"+this.lgId+"-"+(t-l-1))}return this.settings.loop&&(t===this.galleryItems.length-1?n.push("lg-item-"+this.lgId+"-0"):0===t&&n.push("lg-item-"+this.lgId+"-"+(this.galleryItems.length-1))),-1===n.indexOf(r)&&n.push("lg-item-"+this.lgId+"-"+e),n},s.prototype.organizeSlideItems=function(t,e){var s=this,n=this.getItemsToBeInsertedToDom(t,e,this.settings.numberOfSlideItemsInDom);return n.forEach((function(t){-1===s.currentItemsInDom.indexOf(t)&&s.$inner.append('<div id="'+t+'" class="lg-item"></div>')})),this.currentItemsInDom.forEach((function(t){-1===n.indexOf(t)&&i("#"+t).remove()})),n},s.prototype.getPreviousSlideIndex=function(){var t=0;try{var e=this.outer.find(".lg-current").first().attr("id");t=parseInt(e.split("-")[3])||0}catch(e){t=0}return t},s.prototype.setDownloadValue=function(t){if(this.settings.download){var e=this.galleryItems[t];if(!1===e.downloadUrl||"false"===e.downloadUrl)this.outer.addClass("lg-hide-download");else{var i=this.getElementById("lg-download");this.outer.removeClass("lg-hide-download"),i.attr("href",e.downloadUrl||e.src),e.download&&i.attr("download",e.download)}}},s.prototype.makeSlideAnimation=function(t,e,i){var s=this;this.lGalleryOn&&i.addClass("lg-slide-progress"),setTimeout((function(){s.outer.addClass("lg-no-trans"),s.outer.find(".lg-item").removeClass("lg-prev-slide lg-next-slide"),"prev"===t?(e.addClass("lg-prev-slide"),i.addClass("lg-next-slide")):(e.addClass("lg-next-slide"),i.addClass("lg-prev-slide")),setTimeout((function(){s.outer.find(".lg-item").removeClass("lg-current"),e.addClass("lg-current"),s.outer.removeClass("lg-no-trans")}),50)}),this.lGalleryOn?this.settings.slideDelay:0)},s.prototype.slide=function(t,e,i,s){var n=this,r=this.getPreviousSlideIndex();if(this.currentItemsInDom=this.organizeSlideItems(t,r),!this.lGalleryOn||r!==t){var l=this.galleryItems.length;if(!this.lgBusy){this.settings.counter&&this.updateCurrentCounter(t);var a=this.getSlideItem(t),g=this.getSlideItem(r),d=this.galleryItems[t],h=d.__slideVideoInfo;if(this.outer.attr("data-lg-slide-type",this.getSlideType(d)),this.setDownloadValue(t),h){var u=this.mediaContainerPosition,c=u.top,m=u.bottom,p=o(this.items[t],this.outer,c+m,h&&this.settings.videoMaxSize);this.resizeVideoSlide(t,p)}if(this.LGel.trigger(T,{prevIndex:r,index:t,fromTouch:!!e,fromThumb:!!i}),this.lgBusy=!0,clearTimeout(this.hideBarTimeout),this.arrowDisable(t),s||(t<r?s="prev":t>r&&(s="next")),e){this.outer.find(".lg-item").removeClass("lg-prev-slide lg-current lg-next-slide");var f=void 0,v=void 0;l>2?(f=t-1,v=t+1,(0===t&&r===l-1||t===l-1&&0===r)&&(v=0,f=l-1)):(f=0,v=1),"prev"===s?this.getSlideItem(v).addClass("lg-next-slide"):this.getSlideItem(f).addClass("lg-prev-slide"),a.addClass("lg-current")}else this.makeSlideAnimation(s,a,g);this.lGalleryOn?setTimeout((function(){n.loadContent(t,!0),".lg-item"!==n.settings.appendSubHtmlTo&&n.addHtml(t)}),this.settings.speed+50+(e?0:this.settings.slideDelay)):this.loadContent(t,!0),setTimeout((function(){n.lgBusy=!1,g.removeClass("lg-slide-progress"),n.LGel.trigger(E,{prevIndex:r,index:t,fromTouch:e,fromThumb:i})}),(this.lGalleryOn?this.settings.speed+100:100)+(e?0:this.settings.slideDelay))}this.index=t}},s.prototype.updateCurrentCounter=function(t){this.getElementById("lg-counter-current").html(t+1+"")},s.prototype.updateCounterTotal=function(){this.getElementById("lg-counter-all").html(this.galleryItems.length+"")},s.prototype.getSlideType=function(t){return t.__slideVideoInfo?"video":t.iframe?"iframe":"image"},s.prototype.touchMove=function(t,e,i){var s=e.pageX-t.pageX,n=e.pageY-t.pageY,o=!1;if(this.swipeDirection?o=!0:Math.abs(s)>15?(this.swipeDirection="horizontal",o=!0):Math.abs(n)>15&&(this.swipeDirection="vertical",o=!0),o){var r=this.getSlideItem(this.index);if("horizontal"===this.swipeDirection){null==i||i.preventDefault(),this.outer.addClass("lg-dragging"),this.setTranslate(r,s,0);var l=r.get().offsetWidth,a=15*l/100-Math.abs(10*s/100);this.setTranslate(this.outer.find(".lg-prev-slide").first(),-l+s-a,0),this.setTranslate(this.outer.find(".lg-next-slide").first(),l+s+a,0)}else if("vertical"===this.swipeDirection&&this.settings.swipeToClose){null==i||i.preventDefault(),this.$container.addClass("lg-dragging-vertical");var g=1-Math.abs(n)/window.innerHeight;this.$backdrop.css("opacity",g);var d=1-Math.abs(n)/(2*window.innerWidth);this.setTranslate(r,0,n,d,d),Math.abs(n)>100&&this.outer.addClass("lg-hide-items").removeClass("lg-components-open")}}},s.prototype.touchEnd=function(t,e,s){var n,o=this;"lg-slide"!==this.settings.mode&&this.outer.addClass("lg-slide"),setTimeout((function(){o.$container.removeClass("lg-dragging-vertical"),o.outer.removeClass("lg-dragging lg-hide-items").addClass("lg-components-open");var r=!0;if("horizontal"===o.swipeDirection){n=t.pageX-e.pageX;var l=Math.abs(t.pageX-e.pageX);n<0&&l>o.settings.swipeThreshold?(o.goToNextSlide(!0),r=!1):n>0&&l>o.settings.swipeThreshold&&(o.goToPrevSlide(!0),r=!1)}else if("vertical"===o.swipeDirection){if(n=Math.abs(t.pageY-e.pageY),o.settings.closable&&o.settings.swipeToClose&&n>100)return void o.closeGallery();o.$backdrop.css("opacity",1)}if(o.outer.find(".lg-item").removeAttr("style"),r&&Math.abs(t.pageX-e.pageX)<5){var a=i(s.target);o.isPosterElement(a)&&o.LGel.trigger(O)}o.swipeDirection=void 0})),setTimeout((function(){o.outer.hasClass("lg-dragging")||"lg-slide"===o.settings.mode||o.outer.removeClass("lg-slide")}),this.settings.speed+100)},s.prototype.enableSwipe=function(){var t=this,e={},s={},n=!1,o=!1;this.settings.enableSwipe&&(this.$inner.on("touchstart.lg",(function(s){t.dragOrSwipeEnabled=!0;var n=t.getSlideItem(t.index);!i(s.target).hasClass("lg-item")&&!n.get().contains(s.target)||t.outer.hasClass("lg-zoomed")||t.lgBusy||1!==s.targetTouches.length||(o=!0,t.touchAction="swipe",t.manageSwipeClass(),e={pageX:s.targetTouches[0].pageX,pageY:s.targetTouches[0].pageY})})),this.$inner.on("touchmove.lg",(function(i){o&&"swipe"===t.touchAction&&1===i.targetTouches.length&&(s={pageX:i.targetTouches[0].pageX,pageY:i.targetTouches[0].pageY},t.touchMove(e,s,i),n=!0)})),this.$inner.on("touchend.lg",(function(r){if("swipe"===t.touchAction){if(n)n=!1,t.touchEnd(s,e,r);else if(o){var l=i(r.target);t.isPosterElement(l)&&t.LGel.trigger(O)}t.touchAction=void 0,o=!1}})))},s.prototype.enableDrag=function(){var t=this,e={},s={},n=!1,o=!1;this.settings.enableDrag&&(this.outer.on("mousedown.lg",(function(s){t.dragOrSwipeEnabled=!0;var o=t.getSlideItem(t.index);(i(s.target).hasClass("lg-item")||o.get().contains(s.target))&&(t.outer.hasClass("lg-zoomed")||t.lgBusy||(s.preventDefault(),t.lgBusy||(t.manageSwipeClass(),e={pageX:s.pageX,pageY:s.pageY},n=!0,t.outer.get().scrollLeft+=1,t.outer.get().scrollLeft-=1,t.outer.removeClass("lg-grab").addClass("lg-grabbing"),t.LGel.trigger(L))))})),i(window).on("mousemove.lg.global"+this.lgId,(function(i){n&&t.lgOpened&&(o=!0,s={pageX:i.pageX,pageY:i.pageY},t.touchMove(e,s),t.LGel.trigger(D))})),i(window).on("mouseup.lg.global"+this.lgId,(function(r){if(t.lgOpened){var l=i(r.target);o?(o=!1,t.touchEnd(s,e,r),t.LGel.trigger(z)):t.isPosterElement(l)&&t.LGel.trigger(O),n&&(n=!1,t.outer.removeClass("lg-grabbing").addClass("lg-grab"))}})))},s.prototype.triggerPosterClick=function(){var t=this;this.$inner.on("click.lg",(function(e){!t.dragOrSwipeEnabled&&t.isPosterElement(i(e.target))&&t.LGel.trigger(O)}))},s.prototype.manageSwipeClass=function(){var t=this.index+1,e=this.index-1;this.settings.loop&&this.galleryItems.length>2&&(0===this.index?e=this.galleryItems.length-1:this.index===this.galleryItems.length-1&&(t=0)),this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide"),e>-1&&this.getSlideItem(e).addClass("lg-prev-slide"),this.getSlideItem(t).addClass("lg-next-slide")},s.prototype.goToNextSlide=function(t){var e=this,i=this.settings.loop;t&&this.galleryItems.length<3&&(i=!1),this.lgBusy||(this.index+1<this.galleryItems.length?(this.index++,this.LGel.trigger(M,{index:this.index}),this.slide(this.index,!!t,!1,"next")):i?(this.index=0,this.LGel.trigger(M,{index:this.index}),this.slide(this.index,!!t,!1,"next")):this.settings.slideEndAnimation&&!t&&(this.outer.addClass("lg-right-end"),setTimeout((function(){e.outer.removeClass("lg-right-end")}),400)))},s.prototype.goToPrevSlide=function(t){var e=this,i=this.settings.loop;t&&this.galleryItems.length<3&&(i=!1),this.lgBusy||(this.index>0?(this.index--,this.LGel.trigger(G,{index:this.index,fromTouch:t}),this.slide(this.index,!!t,!1,"prev")):i?(this.index=this.galleryItems.length-1,this.LGel.trigger(G,{index:this.index,fromTouch:t}),this.slide(this.index,!!t,!1,"prev")):this.settings.slideEndAnimation&&!t&&(this.outer.addClass("lg-left-end"),setTimeout((function(){e.outer.removeClass("lg-left-end")}),400)))},s.prototype.keyPress=function(){var t=this;i(window).on("keydown.lg.global"+this.lgId,(function(e){t.lgOpened&&!0===t.settings.escKey&&27===e.keyCode&&(e.preventDefault(),t.settings.allowMediaOverlap&&t.outer.hasClass("lg-can-toggle")&&t.outer.hasClass("lg-components-open")?t.outer.removeClass("lg-components-open"):t.closeGallery()),t.lgOpened&&t.galleryItems.length>1&&(37===e.keyCode&&(e.preventDefault(),t.goToPrevSlide()),39===e.keyCode&&(e.preventDefault(),t.goToNextSlide()))}))},s.prototype.arrow=function(){var t=this;this.getElementById("lg-prev").on("click.lg",(function(){t.goToPrevSlide()})),this.getElementById("lg-next").on("click.lg",(function(){t.goToNextSlide()}))},s.prototype.arrowDisable=function(t){if(!this.settings.loop&&this.settings.hideControlOnEnd){var e=this.getElementById("lg-prev"),i=this.getElementById("lg-next");t+1===this.galleryItems.length?i.attr("disabled","disabled").addClass("disabled"):i.removeAttr("disabled").removeClass("disabled"),0===t?e.attr("disabled","disabled").addClass("disabled"):e.removeAttr("disabled").removeClass("disabled")}},s.prototype.setTranslate=function(t,e,i,s,n){void 0===s&&(s=1),void 0===n&&(n=1),t.css("transform","translate3d("+e+"px, "+i+"px, 0px) scale3d("+s+", "+n+", 1)")},s.prototype.mousewheel=function(){var t=this,e=0;this.outer.on("wheel.lg",(function(i){if(i.deltaY&&!(t.galleryItems.length<2)){i.preventDefault();var s=(new Date).getTime();s-e<1e3||(e=s,i.deltaY>0?t.goToNextSlide():i.deltaY<0&&t.goToPrevSlide())}}))},s.prototype.isSlideElement=function(t){return t.hasClass("lg-outer")||t.hasClass("lg-item")||t.hasClass("lg-img-wrap")},s.prototype.isPosterElement=function(t){var e=this.getSlideItem(this.index).find(".lg-video-play-button").get();return t.hasClass("lg-video-poster")||t.hasClass("lg-video-play-button")||e&&e.contains(t.get())},s.prototype.toggleMaximize=function(){var t=this;this.getElementById("lg-maximize").on("click.lg",(function(){t.$container.toggleClass("lg-inline"),t.refreshOnResize()}))},s.prototype.invalidateItems=function(){for(var t=0;t<this.items.length;t++){var e=i(this.items[t]);e.off("click.lgcustom-item-"+e.attr("data-lg-id"))}},s.prototype.manageCloseGallery=function(){var t=this;if(this.settings.closable){var e=!1;this.getElementById("lg-close").on("click.lg",(function(){t.closeGallery()})),this.settings.closeOnTap&&(this.outer.on("mousedown.lg",(function(s){var n=i(s.target);e=!!t.isSlideElement(n)})),this.outer.on("mousemove.lg",(function(){e=!1})),this.outer.on("mouseup.lg",(function(s){var n=i(s.target);t.isSlideElement(n)&&e&&(t.outer.hasClass("lg-dragging")||t.closeGallery())})))}},s.prototype.closeGallery=function(t){var e=this;if(!this.lgOpened||!this.settings.closable&&!t)return 0;this.LGel.trigger(k),i(window).scrollTop(this.prevScrollTop);var s,n=this.items[this.index];if(this.zoomFromOrigin&&n){var l=this.mediaContainerPosition,a=l.top,g=l.bottom,d=this.galleryItems[this.index],h=d.__slideVideoInfo,u=d.poster,c=o(n,this.outer,a+g,h&&u&&this.settings.videoMaxSize);s=r(n,this.outer,a,g,c)}this.zoomFromOrigin&&s?(this.outer.addClass("lg-closing lg-zoom-from-image"),this.getSlideItem(this.index).addClass("lg-start-end-progress").css("transition-duration",this.settings.startAnimationDuration+"ms").css("transform",s)):(this.outer.addClass("lg-hide-items"),this.outer.removeClass("lg-zoom-from-image")),this.destroyModules(),this.lGalleryOn=!1,this.isDummyImageRemoved=!1,this.zoomFromOrigin=this.settings.zoomFromOrigin,clearTimeout(this.hideBarTimeout),this.hideBarTimeout=!1,i("html").removeClass("lg-on"),this.outer.removeClass("lg-visible lg-components-open"),this.$backdrop.removeClass("in").css("opacity",0);var m=this.zoomFromOrigin&&s?Math.max(this.settings.startAnimationDuration,this.settings.backdropDuration):this.settings.backdropDuration;return this.$container.removeClass("lg-show-in"),setTimeout((function(){e.zoomFromOrigin&&s&&e.outer.removeClass("lg-zoom-from-image"),e.$container.removeClass("lg-show"),e.$backdrop.removeAttr("style").css("transition-duration",e.settings.backdropDuration+"ms"),e.outer.removeClass("lg-closing "+e.settings.startClass),e.getSlideItem(e.index).removeClass("lg-start-end-progress"),e.$inner.empty(),e.lgOpened&&e.LGel.trigger(A,{instance:e}),e.outer.get()&&e.outer.get().blur(),e.lgOpened=!1}),m+100),m+100},s.prototype.initModules=function(){this.plugins.forEach((function(t){try{t.init()}catch(t){console.warn("lightGallery:- make sure lightGallery module is properly initiated")}}))},s.prototype.destroyModules=function(t){this.plugins.forEach((function(e){try{t?e.destroy():e.closeGallery&&e.closeGallery()}catch(t){console.warn("lightGallery:- make sure lightGallery module is properly destroyed")}}))},s.prototype.refresh=function(t){this.settings.dynamic||this.invalidateItems(),this.galleryItems=t||this.getItems(),this.updateControls(),this.openGalleryOnItemClick(),this.LGel.trigger(I)},s.prototype.updateControls=function(){this.addSlideVideoInfo(this.galleryItems),this.updateCounterTotal(),this.manageSingleSlideClassName()},s.prototype.destroy=function(){var t=this,e=this.closeGallery(!0);return setTimeout((function(){t.destroyModules(!0),t.settings.dynamic||t.invalidateItems(),i(window).off(".lg.global"+t.lgId),t.LGel.off(".lg"),t.$container.remove()}),e),e},s}();return function(t,e){return new P(t,e)}}));

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
	if (targetElement.classList.contains('products__more')) {
		getProducts(targetElement);
		e.preventDefault();
	}
	//добавление в корзину по клику на карточку товару с нужным классом
	if (targetElement.classList.contains('actions-product__button')) {
		const productId = targetElement.closest('.item-product').dataset.pid;
		addToCart(targetElement, productId);
		e.preventDefault();
	}

	// показываем корзину по клику на иконку корзины
	if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
		if (document.querySelector('.cart-list').children.length > 0) {
			document.querySelector('.cart-header').classList.toggle('_active');
		}
		e.preventDefault();
	} else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
		document.querySelector('.cart-header').classList.remove('_active');
	}
	// удаление содержимого корзины
	if (targetElement.classList.contains('cart-list__delete')) {
		const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
		updateCart(targetElement, productId, false);
		e.preventDefault();
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

// Furniture Gallery
const furniture = document.querySelector('.furniture__body');
if (furniture && !isMobile.any()) {
	const furnitureItems = document.querySelector('.furniture__items');
	const furnitureColumn = document.querySelectorAll('.furniture__column');

	// Скорость анимации
	const speed = furniture.dataset.speed;

	// Обьявление переменных
	let positionX = 0;
	let coordXprocent = 0;

	function setMouseGalleryStyle() {
		let furnitureItemsWidth = 0;
		furnitureColumn.forEach(element => {
			furnitureItemsWidth += element.offsetWidth;
		});

		const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
		const distX = Math.floor(coordXprocent - positionX);

		positionX = positionX + (distX * speed);
		let position = furnitureDifferent / 200 * positionX;

		furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

		if (Math.abs(distX) > 0) {
			requestAnimationFrame(setMouseGalleryStyle);
		} else {
			furniture.classList.remove('_init');
		}
	};
	furniture.addEventListener("mousemove", function (e) {
		//Получение ширины
		const furnitureWidth = furniture.offsetWidth;

		// Ноль по середине
		const coordX = e.pageX - furnitureWidth / 2;

		// Получаем проценты
		coordXprocent = coordX / furnitureWidth * 200;

		if (!furniture.classList.contains('_init')) {
			requestAnimationFrame(setMouseGalleryStyle);
			furniture.classList.add('_init');
		} 
	});
	// Вызов lightGallery
	lightGallery(document.getElementById('lightgallery'), {
		selector: '.row-furniture__item',
		licenseLey: "0000-0000-000-0000",
	});
}