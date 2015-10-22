$(function() {
	$(".next a").click(function() {
		nextscroll()
	});

	function nextscroll() {
		var vcon = $(".v-cont");
		var offset = ($(".v-cont li").width()) * -1;
		vcon.stop().animate({
			left: offset
		}, "slow", function() {
			var firstItem = $(".v-cont ul li").first();
			vcon.find("ul").append(firstItem);
			$(this).css("left", "0px");
			circle()
		})
	};

	function circle() {
		var currentItem = $(".v-cont ul li").first();
		var currentIndex = currentItem.attr("index");
		$(".circle li").removeClass("circle-cur");
		$(".circle li").eq(currentIndex).addClass("circle-cur")
	}
	$(".prev a").click(function() {
		var vcon = $(".v-cont ");
		var offset = ($(".v-cont li").width() * -1);
		var lastItem = $(".v-cont ul li").last();
		vcon.find("ul").prepend(lastItem);
		vcon.css("left", offset);
		vcon.animate({
			left: "0px"
		}, "slow", function() {
			circle()
		})
	});
	var animateEnd = 1;
	$(".circle li").click(function() {
		if (animateEnd == 0) {
			return
		}
		$(this).addClass("circle-cur").siblings().removeClass("circle-cur");
		var nextindex = $(this).index();
		var currentindex = $(".v-cont li").first().attr("index");
		var curr = $(".v-cont li").first().clone();
		if (nextindex > currentindex) {
			for (var i = 0; i < nextindex - currentindex; i++) {
				var firstItem = $(".v-cont li").first();
				$(".v-cont ul").append(firstItem)
			}
			$(".v-cont ul").prepend(curr);
			var offset = ($(".v-cont li").width()) * -1;
			if (animateEnd == 1) {
				animateEnd = 0;
				$(".v-cont").stop().animate({
					left: offset
				}, "slow", function() {
					$(".v-cont ul li").first().remove();
					$(".v-cont").css("left", "0px");
					animateEnd = 1
				})
			}
		} else {
			var curt = $(".v-cont li").last().clone();
			for (var i = 0; i < currentindex - nextindex; i++) {
				var lastItem = $(".v-cont li").last();
				$(".v-cont ul").prepend(lastItem)
			}
			$(".v-cont ul").append(curt);
			var offset = ($(".v-cont li").width()) * -1;
			$(".v-cont").css("left", offset);
			if (animateEnd == 1) {
				animateEnd = 0;
				$(".v-cont").stop().animate({
					left: "0px"
				}, "slow", function() {
					$(".v-cont ul li").last().remove();
					animateEnd = 1
				})
			}
		}
	})
})
