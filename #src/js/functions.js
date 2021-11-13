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