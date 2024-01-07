'use strict'

function createSlug(name){
	let r = name.toLowerCase();
	r = r.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

	r = r.replace(/[^a-z0-9-]/g, '-').toLowerCase();
	r += '-' + Math.random().toString(36).substr(2, 6);

	return r;
}

module.exports = createSlug