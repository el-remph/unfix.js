// ==UserScript==
// @name	Unfix
// @description	Stop fixed/sticky elements leeching my valuable screen real estate!
// @version	0.2.1
// @grant	none
// ==/UserScript==

function unfix_element(e) {
	switch (getComputedStyle(e).position) {
	case 'fixed':
		e.style.setProperty('position', 'absolute', 'important');
		break;
	case 'sticky':
		e.style.setProperty('position', 'relative', 'important');
	}
}

(function () {
	// wait for window to finish loading to prevent races on style
	window.addEventListener('load', function (event) {
		for (let e of document.querySelectorAll('body *')) {
			unfix_element(e);
		}
	})

	// Catch sneaky attempts to re-fix an element from js
	const observer = new MutationObserver(function (muts) {
		muts.forEach(function (mut) {
			unfix_element(mut.target);
		})
	})

	observer.observe(document.body, {
		subtree: true, childList: true, attributes: true
	});
})();
