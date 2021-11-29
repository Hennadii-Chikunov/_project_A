@@include('dynamicAdapt.js')
@@include('spollers.js')
@@include("burger.js")
@@include("sliders.js")
@@include('functions.js')
@@include('lightgallery.min.js')  
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