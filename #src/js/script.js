@@include('functions.js')
@@include('dynamicAdapt.js')
@@include('spollers.js')
@@include("burger.js")
@@include("sliders.js")
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

