// const { active } = require("browser-sync");

$(document).ready(function () {
	/*--- слайдер на карточке товара ---*/
	$('.tovar-for').slick({
		autoplay: true,
		autoplaySpeed: 400000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		dotsClass: "my-dots-bot",
		fade: false,
		asNavFor: '.tovar-nav',
	});
	$('.tovar-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		vertical: true,
		asNavFor: '.tovar-for',
		focusOnSelect: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 769,
				settings: {
					vertical: false,
				}
			}
		]
	});
	$('.slider__popUp').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		nextArrow: '<div class="nextArrow"></div>',
		prevArrow: '<div class="prevArrow"></div>',
		//asNavFor: '.tovar-nav',
	});
	$('.slider-banners').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		//autoplay: true,
		autoplaySpeed: 4000,
		arrows: false,
		dots: true,
		dotsClass: "my-dots",
	});
	// скрыть/раскрыть текст
	$('.full-btn').click(function () {
		$('.bot-cont__text').toggleClass('active');
		$('.full-btn').css('display', 'none');
	})
	// скрыть/раскрыть текст
	//скрыть раскрыть текст в ответе 

	$('[data-fancybox="gallery"]').fancybox({
		// Options will go here
	});
})
// прекращение ивентов

$(document).mouseup(function (e) {
	if (!$('.catalog').is(e.target) // если клик был не по нашему блоку
		&& $('.catalog').has(e.target).length === 0 &&
		!$('.drop__catalog').is(e.target) // если клик был не по нашему блоку
		&& $('.drop__catalog').has(e.target).length === 0) { // и не по его дочерним элементам
		$('.drop__catalog').removeClass('active');
		if ($('.catalog').children('i').hasClass('icon-close')) {
			$('.catalog')
				.children('i')
				.removeClass('icon-close')
				.addClass('icon-burger');
		}
	}
});

// прекращение ивентов

if ($(window).width() <= 1024) {
	$('.wraper').css('display', 'none');
	function dropCatalog3(elem) {
		$(elem).toggleClass('active');
		const tmp_elem = $(elem).siblings('.wraper');
		if ($(tmp_elem).hasClass('active')) {
			$(tmp_elem).removeClass('active');
			$(tmp_elem).slideUp();
			return;
		}
		$('.wraper').removeClass('active').slideDown();
		$(tmp_elem).toggleClass('active');
		if ($(elem).find('.wraper').hasClass('active')) {
			$(elem).find('.wraper').slideDown();
		} else {
			$(elem).find('.wraper').slideUp();
		}
	};
}

function dropCatalog(elem) {
	$(elem).addClass('active');
	const item = $(elem).parent('.item__bot')
		.siblings('.item__reviews-box');
	if ($(item).hasClass('active')) {
		$(item).removeClass('active');
		$(item).slideUp();
		$(elem).removeClass('active');
		return;
	}
	$(item).addClass('active');
	if ($(elem).parent('.item__bot')
		.siblings('.item__reviews-box')
		.hasClass('active')) {
		$(item).slideDown()
	} else {
		$(item).slideUp();
	}
}


// tabs
if ($('main').hasClass('cart-product')) {
	bindTabs('#tabs');
}

function bindTabs(container) {
	if (typeof container === 'string') {
		container = document.querySelector(container);
	}
	const titles = container.querySelectorAll('.title-tab');
	const contents = container.querySelectorAll('.content-tabs');
	for (let i = 0; i < titles.length; i++) {
		const titleEl = titles[i];
		titleEl.addEventListener('click', () => {
			deactivate(titles);
			deactivate(contents);
			titles[i].classList.add('active');
			contents[i].classList.add('active');
		});
	}
	function deactivate(elements) {
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			element.classList.remove('active');
		}
	}
}
// tabs
// spoiler
function dropCatalog2(elem) {
	const tmp_elem = $(elem).siblings('.content__non');
	if ($(tmp_elem).hasClass('active')) {
		$(tmp_elem).removeClass('active');
		$(tmp_elem).slideUp();
		$('.pointer').removeClass('active');
		return;
	}
	$('.pointer').removeClass('active');
	$('.content__non').removeClass('active').slideUp();
	$(elem).toggleClass('active');
	$(tmp_elem).toggleClass('active');
	if ($(elem).siblings('.content__non').hasClass('active')) {
		$(elem).siblings('.content__non').slideDown();
	} else {
		$(elem).siblings('.content__non').slideUp();
	}
};
if ($(window).width() <= 768) {
	$('.params').css('display', 'none');
	function dropCatalog4(elem) {
		const tmp_elem = $(elem).siblings('.params');
		if ($(tmp_elem).hasClass('active')) {
			$(tmp_elem).removeClass('active');
			$(tmp_elem).slideUp();
			$('.pointer-B').removeClass('active');
			return;
		}
		$('.pointer-B').removeClass('active');
		$('.params').removeClass('active').slideUp();
		$(elem).toggleClass('active');
		$(tmp_elem).toggleClass('active');
		if ($(elem).siblings('.params').hasClass('active')) {
			$(elem).siblings('.params').slideDown();
		} else {
			$(elem).siblings('.params').slideUp();
		}
	};
	$('.mobDrop-car__box').css('display', 'none');
	function dropCatalog55(elem) {
		const param = $(elem).parent('.category-page__container-sideBar2');
		if ($(param).hasClass('active')) {
			$(param)
				.removeClass('active');
			$(param)
				.children('.mobDrop-car__box')
				.slideUp();
			return;
		} else {
			$(param)
				.addClass('active');
			if ($(param).hasClass('active')) {
				$(param)
					.children('.mobDrop-car__box')
					.slideDown();
			} else {
				$(param)
					.children('.mobDrop-car__box')
					.slideUp();
			}
		}
	}
	$(document).mouseup(function (e) {
		if (!$('.category-page__container-sideBar2').is(e.target) // если клик был не по нашему блоку
			&& $('.category-page__container-sideBar2').has(e.target).length === 0) {
			$('.mobDrop-car__box').slideUp();
			$('.category-page__container-sideBar2').removeClass('active');
		}
	});
}

// spoiler

// каталог на пк
function onCatalog(e) {
	if ($(e).children('i')
		.hasClass('icon-burger')) {
		$(e).children('i')
			.removeClass('icon-burger')
			.addClass('icon-close');
		$(e).siblings('.drop__catalog')
			.addClass('active');
	} else {
		$(e).children('i')
			.removeClass('icon-close')
			.addClass('icon-burger');
		$(e).siblings('.drop__catalog')
			.removeClass('active');
	}
	return;
}
function onCatalogLevel2(e) {
	$(e).siblings('.drop__catalog__level2')
		.addClass('active');
	addHeight(e);
	return;
}
function offCatalogLevel2(e) {
	$(e).parent('.drop__catalog__level2')
		.removeClass('active');
	$(e).parent()
		.parent()
		.parent()
		.css('height', 541);
	return;
}
// каталог на пк
// мобилка меню
function onMobileCatalog(e) {
	if ($(e).children('i')
		.hasClass('icon-burger')) {
		$(e).children('i')
			.removeClass('icon-burger')
			.addClass('icon-close');
		$(e).siblings('.catalog-Mobil__drop')
			.addClass('active');
		$('body').addClass('lock');
	} else if ($(e).children('i')
		.hasClass('icon-close')) {
		$(e).children('i')
			.removeClass('icon-close')
			.addClass('icon-burger');
		$(e).siblings('.catalog-Mobil__drop')
			.removeClass('active');
		$('body').removeClass('lock');
	}
	return;
}
$(document).mouseup(function (e) {
	if (!$('.catalog-Mobil').is(e.target) // если клик был не по нашему блоку
		&& $('.catalog-Mobil').has(e.target).length === 0 &&
		!$('.catalog-Mobil__drop').is(e.target) // если клик был не по нашему блоку
		&& $('.catalog-Mobil__drop').has(e.target).length === 0) { // и не по его дочерним элементам
		$('.catalog-Mobil__drop').removeClass('active');
		if ($('.catalog-Mobil').children('i').hasClass('icon-close')) {
			$('.catalog-Mobil')
				.children('i')
				.removeClass('icon-close')
				.addClass('icon-burger');
			$('body').removeClass('lock');
		}
	}
	if (!$('.sidebar-content').is(e.target) // если клик был не по нашему блоку
		&& $('.sidebar-content').has(e.target).length === 0) {
		$('.sidebar-content__box').removeClass('active');
		$('.sidebar-content__box-container').slideUp();
		$('.sidebar-content__box-container__item').removeClass('active');
		$('.sidebar-content__box-container__item-box').slideUp();
	}
});
// мобилка меню
// Корзина товара кнопки +1 и -1 
function increment(e) {
	const button = $(e);
	const oldVal = $(e).parent().children('.iterator').val();
	function i() {
		const newVal = parseFloat(oldVal) + 1;
		return newVal;
	}
	button.parent().children('.iterator').val(i());
}
function decrement(e) {
	const button = $(e);
	const oldVal = $(e).parent().children('.iterator').val();
	function i() {
		if (oldVal > 0) {
			newVal = parseFloat(oldVal) - 1;
		} else {
			newVal = 0;
		}
		return newVal;
	}
	button.parent().children('.iterator').val(i());
}
// Корзина товара кнопки +1 и -1
// Корзина удаление елемента 
function deleteItem(e) {
	$(e).parent()
		.parent()
		.remove();
}
// Корзина удаление елемента
// инициализация селект 2
$('.js-example-basic-single').select2();
$('.js-example-basic-single2').select2({
	minimumResultsForSearch: Infinity,
});
// инициализация селект 2
// спойлер в главной странице 
function dropCatalog22(elem) {
	const tmp_elem = $(elem).siblings('.auto-parts__container-item__dropList');
	if ($(elem).hasClass('active')) {
		$(elem).removeClass('active');
		$(tmp_elem).slideUp();
		return;
	} else {
		$('.auto-parts__container-item__btn').removeClass('active');
		$(elem).addClass('active');
		$('.auto-parts__container-item__dropList').removeClass('active').slideUp();
		if ($(elem).hasClass('active')) {
			$(elem).siblings('.auto-parts__container-item__dropList').slideDown();
		} else {
			$(elem).siblings('.auto-parts__container-item__dropList').slideUp();
		}
	}
}
$(document).mouseup(function (e) {
	if (!$('.auto-parts__container').is(e.target) // если клик был не по нашему блоку
		&& $('.auto-parts__container').has(e.target).length === 0) { // и не по его дочерним элементам
		$('.auto-parts__container-item__btn')
			.removeClass('active');
		$('.auto-parts__container-item__dropList').slideUp();
	}
});
function dropCatalog33(elem) {
	const param = $(elem).parent('.sidebar-content__box');
	if ($(param).hasClass('active')) {
		$(param)
			.removeClass('active');
		$(param)
			.children('.sidebar-content__box-container')
			.slideUp();
		$(param)
			.children('.sidebar-content__box-container')
			.children('.sidebar-content__box-container__item')
			.children('.sidebar-content__box-container__item-box')
			.slideUp();
		$(param)
			.children('.sidebar-content__box-container')
			.children('.sidebar-content__box-container__item')
			.removeClass('active');
		return;
	} else {
		$('.sidebar-content__box')
			.removeClass('active');
		$('.sidebar-content__box-container__item')
			.removeClass('active');
		$(elem)
			.siblings('.sidebar-content__box-container')
			.slideUp();
		$('.sidebar-content__box-container')
			.slideUp();
		$('.sidebar-content__box-container__item-box')
			.slideUp();
		$(param)
			.addClass('active');
		if ($(param).hasClass('active')) {
			$(param)
				.children('.sidebar-content__box-container')
				.slideDown();
		} else {
			$(param)
				.children('.sidebar-content__box-container')
				.slideup();
		}
	}
}
function dropCatalog44(elem) {
	const param = $(elem).parent('.sidebar-content__box-container__item');
	if ($(param).hasClass('active')) {
		$(param)
			.removeClass('active');
		$(param)
			.children('.sidebar-content__box-container__item-box')
			.slideUp();
		return;
	} else {
		$('.sidebar-content__box-container__item')
			.removeClass('active');
		$(elem)
			.siblings('.sidebar-content__box-container__item-box')
			.slideUp();
		$('.sidebar-content__box-container__item-box')
			.slideUp();
		$(param)
			.addClass('active');
		if ($(param).hasClass('active')) {
			$(param)
				.children('.sidebar-content__box-container__item-box')
				.slideDown();
		} else {
			$(param)
				.children('.sidebar-content__box-container__item-box')
				.slideup();
		}
	}
}
function addHeight(param) {
	const h = $(param)
		.siblings('.drop__catalog__level2')
		.height();
	const sh = h + 10;
	const nsh = sh.toString();
	$(param).parent().parent().css('height', nsh);
}