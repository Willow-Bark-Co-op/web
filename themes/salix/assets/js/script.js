const $ = str => document.querySelector(str);
const $$ = str => [...document.querySelectorAll(str)];

const menu = $$(".value__link");
const values = $$(".value__title");

const highlightLink = el =>
	el.firstChild.classList.add("value__link--highlight");

const highlightLinkRemove = el =>
	el.firstChild.classList.remove("value__link--highlight");

const observerOptions = {
	rootMargin: `0px 0px -${Math.floor(
		document.documentElement.clientHeight -
			(values[0].clientHeight + $(".value__details").clientHeight)
	)}px 0px`
};

const observerCallback = (entries, observer) =>
	entries.forEach(entry => {
		if (!entry.isIntersecting) {
			highlightLinkRemove(menu[values.indexOf(entry.target)]);
		}
		if (entry.isIntersecting) {
			highlightLink(menu[values.indexOf(entry.target)]);
		}
	});

const observer = new IntersectionObserver(observerCallback, observerOptions);

values.forEach(el => observer.observe(el));
