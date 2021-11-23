
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

