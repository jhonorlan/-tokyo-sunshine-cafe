let CURRENT = 0;
const NAVBAR = $("NAV");
const LINK = NAVBAR.find("#nav-links");
const LINKS = NAVBAR.find("#nav-links #nav-link");
const ROOT = $("#root-content-container");
const CONTENTS = ROOT.find(".content");

const MENUCONTAINER = $(".content .menu-parent .menu-container");
const COFFEELISTS = MENUCONTAINER.find(".row-1 .coffee-lists");
const COFFEEPREVIEW = MENUCONTAINER.find(".row-2.coffee-preview");
const SEARCHENGINE = $(".search-engine");
const HAMBURGER = $("#hamburger-parent #hamburger");

const COFFEEPATH = "./assets/media/image/coffees-2/";
const COFFEES = [
	{
		name: "Frappe Coffee",
		imageName: "frappe-coffee.jpg",
		image: null,
		price: 60,
	},
	{
		name: "Take Away #1 Coffee",
		imageName: "take-away-1-coffee.jpg",
		image: null,
		price: 75,
	},
	{
		name: "Take Away #2 Coffee",
		imageName: "take-away-2-coffee.jpg",
		image: null,
		price: 80,
	},
	{
		name: "Iced Coffee",
		imageName: "iced-coffee.jpg",
		image: null,
		price: 75,
	},
	{
		name: "Americano Coffee",
		imageName: "americano-coffee.jpg",
		image: null,
		price: 80,
	},
	{
		name: "Cappuccino Coffee",
		imageName: "cappuccino-coffee.jpg",
		image: null,
		price: 60,
	},
	{
		name: "Espresso Coffee",
		imageName: "espresso-coffee.jpg",
		image: null,
		price: 70,
	},
	{
		name: "Irish Coffee",
		imageName: "irish-coffee.jpg",
		image: null,
		price: 50,
	},
	{
		name: "Latte Coffee",
		imageName: "latte-coffee.jpg",
		image: null,
		price: 80,
	},
	{
		name: "Mocha Coffee",
		imageName: "mocha-coffee.jpg",
		image: null,
		price: 80,
	},
	{
		name: "Latte Macchiato Coffee",
		imageName: "latte-macchiato-coffee.jpg",
		image: null,
		price: 80,
	},
	{
		name: "Ristretto Coffee",
		imageName: "ristretto-coffee.jpg",
		image: null,
		price: 80,
	},
];

function getImage(array) {
	$.each(array, function () {
		let obj = this;
		return new Promise(function (done) {
			let image = new Image();
			image.src = `${COFFEEPATH}${obj.imageName}`;
			image.onload = function () {
				obj.image = this;
				done();
			};
		});
	});

	return array;
}

function findItemEl(coffee) {
	return COFFEELISTS.find(".item").filter(function () {
		return $(this).find("span").text() == coffee;
	});
}

function preview(coffee) {
	if (!coffee) return;
	const card = $(`<div class="card"></div>`);
	const illustration = $(`<div class="illustration"></div>`);
	const text = $(`<div class="text"><h3>${coffee.name}</h3></div>`);

	const all = COFFEELISTS.find(".item");
	const element = findItemEl(coffee.name);

	illustration.append(coffee.image);

	card.append(illustration);
	card.append(text);
	COFFEEPREVIEW.html(card);

	all.removeClass("active");
	element.addClass("active");

	CURRENT = COFFEES.indexOf(coffee);
}

function addCoffees(coffees) {
	$.each(coffees, function () {
		const coffee = this;
		const li = $(`<li class="item"></li>`);
		const span = $(`<span>${coffee.name}</span>`);
		const p = $(`<p>Php ${coffee.price}</p>`);

		li.append(span);
		li.append(p);

		li.on("click", function () {
			preview(coffee);
		});

		COFFEELISTS.append(li);
	});
}

function getCoffee(name) {
	return COFFEES.filter(function (item) {
		return item.name.toLowerCase() == name;
	})[0];
}

function search() {
	const text = $(this).val().toLowerCase();
	const all = COFFEELISTS.find(".item");
	let toPreview = null;

	$.each(all, function () {
		const name = $(this).find("span").text().toLowerCase();
		if (name.includes(text)) {
			$(this).show();
			if (toPreview == null) toPreview = name;
		} else {
			$(this).hide();
		}
	});

	preview(getCoffee(toPreview));
}

function keydown(data) {
	switch (data.code) {
		case "ArrowUp":
			preview(COFFEES[CURRENT - 1]);
			break;
		case "ArrowDown":
			preview(COFFEES[CURRENT + 1]);
			break;
	}
}

function linkClick() {
	const content = $(this).find("span").text();
	const text = content.split(" ").join("-").toString().toLowerCase();
	const container = ROOT.find(`.content.${text}`);

	CONTENTS.hide();
	container.show();

	LINKS.removeClass("active");
	$(this).addClass("active");

	if (HAMBURGER.css("visibility") == "visible")
		LINK.css("visibility", "hidden");
}

function adjust() {
	if (innerWidth >= 1000) {
		LINK.css("visibility", "visible");
	}
}

LINKS.on("click", linkClick);

$(window).on("keydown", keydown);

$(window).on("resize", adjust);

SEARCHENGINE.on("input", search);

HAMBURGER.on("click", function () {
	let vis = LINK.css("visibility");
	LINK.css("visibility", vis == "visible" ? "hidden" : "visible");
});

addCoffees(getImage(COFFEES));
