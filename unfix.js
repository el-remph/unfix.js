// ==UserScript==
// @name	Unfix
// @description	Stop fixed/sticky elements leeching my valuable screen real estate!
// @version	0.1
// @grant	none
// ==/UserScript==

(function () {
	window.addEventListener('load', (event) => {
		for (let e of document.querySelectorAll('body *')) {
			const pos = getComputedStyle(e).position
			if (pos === 'fixed') {
				e.style.setProperty('position', 'absolute', 'important');
			} else if (pos == 'sticky') {
				e.style.setProperty('position', 'relative', 'important');
			}
		}
	})
})();
