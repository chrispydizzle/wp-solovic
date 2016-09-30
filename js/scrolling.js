'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var page_controller = function page_controller() {
	_classCallCheck(this, page_controller);

	this.page_scroll_handler = new scroll_handler();
	this.page_menu_handler = new link_handler();
	this.current_page = 0;

	function getDocumentHeight() {
		var body = document.body;
		var html = document.documentElement;

		return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	}

	function getScrollTop() {
		return window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	}

	function do_begin() {
		this.page_menu_handler.scroll_menu($('#menu-main-menu'));
		this.page_scroll_handler.addPage(++this.current_page);

		$(window).scroll(function () {
			if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
			solovic_controller.page_scroll_handler.addPage(++solovic_controller.current_page);
		});
	}

	this.begin = do_begin;

	this.add_page = function (response) {
		this.page_scroll_handler.add_page(response);
	};
};

var link_handler = function link_handler() {
	_classCallCheck(this, link_handler);

	this.menu_container = null;
	this.scroll_menu = function (menucontainer) {
		this.menu_container = menucontainer;
		this.menu_container.find("a").click(function () {
			var url = $(this).attr('href');
			solovic_controller.page_scroll_handler.addPage(++solovic_controller.current_page, url);
			return false;
		});
	};
};

var scroll_handler = function scroll_handler() {
	_classCallCheck(this, scroll_handler);

	this.everlongContainer = $('#everlong_container');
	this.everlongPager = $('#everlong_pager');
	this.current_page = 0;

	this.fetchPage = do_fetchpage;

	function do_fetchpage(page, url) {
		call_nextpage(page, this.getPageId(page), function (response) {
			solovic_controller.add_page(response);
		}, url);
	}

	this.addPage = do_addpage;

	function do_addpage(page, url) {
		this.fetchPage(page, url);
	}

	this.getPageId = function (n) {
		return "everlong-" + n;
	};

	this.addPaginationPage = function (page) {
		var pageLink = document.createElement('a');
		pageLink.innerText = page.page_id;
		pageLink.href = '#' + this.getPageId(page.page_id);
		var listItem = document.createElement('li');
		$(listItem).append(pageLink);

		this.everlongPager.append(listItem);

		if (this.current_page >= 2) {
			this.everlongPager.removeClass('everlong-pager-inactive');
		}
	};

	this.add_page = function (response) {
		this.everlongContainer.append($(response.row));
		this.addPaginationPage(response);
		this.current_page++;
	};
};

var solovic_controller = void 0;

$(document).ready(function () {
	solovic_controller = new page_controller();
	solovic_controller.begin();
});

//# sourceMappingURL=scrolling.js.map