// ==UserScript==
// @name	Unfix
// @description	Stop fixed/sticky elements leeching my valuable screen real estate!
// @author	Remph
// @license	GPL-3.0-or-later
// @version	0.2.2
// @supportURL	https://github.com/el-remph/unfix.js
// @grant	none
// @include	*
// @compatible	firefox
// ==/UserScript==

function unfix_element(e) {
	if (e.nodeType != Node.ELEMENT_NODE) {
		return
	}
	var newpos
	switch (getComputedStyle(e).position) {	// .getStyle() ?
	case 'fixed':
		newpos = 'absolute'
		break;
	case 'sticky':
		newpos = 'relative'
	}
	if (newpos) {
//		console.debug('setting ' + e.tagName + ' to ' + newpos)
		e.style.setProperty('position', newpos, 'important');
		/* I would rather not have abused !important ^ here, to let
		   pages specify when the position really *is* important
		   and shouldn't be elided, but no-one can be responsible
		   with it so I will take it away */
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
//		console.dir(muts)
		muts.forEach(function (mut) {
			switch (mut.type) {
			case 'attributes':
				unfix_element(mut.target); // if (mut.attributeName == 'style') ?
				mut.target.childNodes.forEach(unfix_element) // recurse deeper?
				break;
			case 'childList':
				mut.addedNodes.forEach(unfix_element) // FIXME: should recurse into children
			}
		})
	})

	observer.observe(document.body, {
		subtree: true, childList: true, attributes: true
	});
})();
