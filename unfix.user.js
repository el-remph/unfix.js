// ==UserScript==
// @name	Unfix
// @description	Stop fixed/sticky elements leeching my valuable screen real estate!
// @author	Remph
// @license	GPL-3.0-or-later
// @version	0.2.4
// @supportURL	https://git.sr.ht/~remph/unfix.js
// @downloadURL	https://git.sr.ht/~remph/unfix.js/blob/master/unfix.user.js
// @updateURL	https://git.sr.ht/~remph/unfix.js/blob/master/unfix.user.js
// @grant	none
// @compatible	firefox
// ==/UserScript==

'use strict';

function unfix_element(e) {
	if (e.nodeType != Node.ELEMENT_NODE)
		return;
	var newpos;
	switch (getComputedStyle(e).position) {	// .getStyle() ?
	case 'fixed':
		newpos = 'absolute';
		break;
	case 'sticky':
		newpos = 'relative';
	}
	if (newpos) {
//		console.debug('setting ' + e.tagName + ' to ' + newpos);
		e.style.setProperty('position', newpos, 'important');
		/* I would rather not have abused !important ^ here, to let
		   pages specify when the position really *is* important
		   and shouldn't be elided, but no-one can be responsible
		   with it so I will take it away */
	}
}

function unfix_tree(root) {
	// NodeFilter.SHOW_ATTRIBUTE ?
	var t = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
	while (t.nextNode())
		unfix_element(t.currentNode);
}

(function () {
	// wait for window to finish loading to prevent races on style
	window.addEventListener('load', () => unfix_tree(document.body));

	// Catch sneaky attempts to re-fix an element from js
	new MutationObserver((muts) => muts.forEach(function (mut) {
		/* Are these sure to be mutually exclusive? Can an
		   attributes change also have addedNodes? */
		switch (mut.type) {
		case 'attributes':
			unfix_element(mut.target); // if (mut.attributeName == 'style') ?
			mut.target.childNodes.forEach(unfix_element); // recurse deeper?
			break;
		case 'childList':
			mut.addedNodes.forEach(unfix_tree);
		}
	})).observe(document.body, {
		subtree: true, childList: true, attributes: true
	});
})();
