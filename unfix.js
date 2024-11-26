// ==UserScript==
// @name	Unfix
// @description	Stop fixed/sticky elements leeching my valuable screen real estate!
// @version	0.2.2
// @grant	none
// ==/UserScript==

function unfix_element(e) {
	if (e.nodeType != Node.ELEMENT_NODE) {
		return
	}
	var newpos
	switch (getComputedStyle(e).position) {
	case 'fixed':
		newpos = 'absolute'
		break;
	case 'sticky':
		newpos = 'relative'
	}
	if (newpos) {
//		console.debug('setting ' + e.tagName + ' to ' + newpos)
		e.style.setProperty('position', newpos, 'important');
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
				mut.addedNodes.forEach(unfix_element)
			}
		})
	})

	observer.observe(document.body, {
		subtree: true, childList: true, attributes: true
	});
})();
