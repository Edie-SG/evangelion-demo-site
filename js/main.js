window.onload = () => { 
	
	transitionEffect();

	if (window.location.href.indexOf("EVAunits.html") > -1) {
		switchAllPages();
		cardFlip();
		contentClick();
	}

	if (window.location.href.indexOf("about.html") > -1) {
		copyContent();
	}
};

window.onpageshow = () => {
	transitionEffect();
}

// transition effect
function transitionEffect() {
	const transition_el = document.querySelector(".transition");
	const entrances = document.querySelectorAll(".internal");

	setTimeout(() => {
		transition_el.classList.remove("Active");
	}, 300);

	for (let i = 0; i < entrances.length; i++) {
		const entrance = entrances[i];

		entrance.addEventListener("click", e => {
			e.preventDefault();
			let target = e.target.href;
			transition_el.classList.add("Active");

			setTimeout(() => {
				window.location.href = target;
			}, 300);
		});
	}
}

// switch pages
function switchAllPages() {
	var t1 = 1000;
	const tab_switchers = document.querySelectorAll("[data-switcher]");
	const PL = document.querySelector(".tranSquareInner .middleLayer");
	const PL2 = document.querySelector(".tranSquareInner .backfill");
	const PL3 = document.querySelector(".tranSquare .tranText");

	for (let x = 0; x < tab_switchers.length; x++) {
		const tab_switcher = tab_switchers[x];
		const page_id = tab_switcher.dataset.tab;

		tab_switcher.addEventListener("click", () => {
			document.querySelector(".tabs .tab.is-active").classList.remove("is-active");
			tab_switcher.parentNode.classList.add("is-active");
			
			hideTabs();
			SwitchPage(page_id);
			mainToggle();
			loadToggle(PL, PL2, PL3, t1);
			returnButton(PL, PL2, PL3);
		});
	}
}

// prevent click

function preventer(e) {
	e.stopPropagation();
	e.preventDefault();
}

// hide tabs
function hideTabs() {
	const tab_hides = document.querySelectorAll(".tabs .tab:not(.is-active)");
	for (let xx = 0; xx < tab_hides.length; xx++) {
		const tab_hide = tab_hides[xx];
		tab_hide.classList.add("hide");
		tab_hide.style.opacity = "0";
	}
}


// switch page
function SwitchPage(page_id) {
	// console.log(page_id);
	const current_page = document.querySelector(".pages .page.is-active");
	const current_pageB = document.querySelector(".pageBackground .page.is-active");current_page.classList.remove("is-active");
	current_pageB.classList.remove("is-active");

	const next_page = document.querySelector(`.pages .page[data-page = "${page_id}"]`);
	const next_pageB = document.querySelector(`.pageBackground .page[data-page = "${page_id}"]`);

	next_page.classList.add("is-active");
	next_pageB.classList.add("is-active");
}

// main page display toggle
function mainToggle() {
	const main = document.querySelector("main");
	main.style.opacity = "1";
	main.style.pointerEvents = "all";
	main.classList.remove("positionS");
}



// loading number effect
function loadToggle(PL, PL2, PL3, t1) {
	const tab_load = document.querySelector(".tranSquare");
	const PT = document.querySelector(".tranSquare .tranText");

	tab_load.classList.add("Active");

	PT.setAttribute("data-content", "SYNC RATE");
	PL.style.animation = "load 600ms linear 100ms forwards";
	PL2.style.animation = "glow 400ms ease 700ms infinite alternate";
	PL3.style.animation = "glow 400ms ease 700ms infinite alternate";

	syncRate(PL, t1);
	
	setTimeout(() => {
		tab_load.classList.remove("Active");
	}, t1);
}

function syncRate(PL, t1) {
	const progressInitial = document.querySelector(".tranSquareInner");
	const progress0 = window.getComputedStyle(progressInitial);
	const progressHeight = window.getComputedStyle(PL);

	PL.addEventListener("animationstart", () => concurrentProcedure(progress0, progressHeight, t1));
}

function concurrentProcedure(progress0, progressHeight, t1) {
	let refreshLoadNumber = setInterval(() => readHeights(progress0, progressHeight), 200);
	setTimeout (() => {
		clearInterval(refreshLoadNumber);
	}, t1);
}

function syncRate2(PL) {
	const progressInitial = document.querySelector(".tranSquareInner");
	const progress0 = window.getComputedStyle(progressInitial);
	const progressHeight = window.getComputedStyle(PL);

	PL.addEventListener("animationstart", () => concurrentProcedure2(progress0, progressHeight));
}

function concurrentProcedure2(progress0, progressHeight) {
	setInterval(() => readHeights(progress0, progressHeight), 200);
}

function readHeights(progress0, progressHeight) {
	let pf = parseFloat(progress0.getPropertyValue("height"));
	let pn = parseFloat(progressHeight.getPropertyValue("height"));
	let percentage = (pf - pn) / pf * 100;
	let roundedPercent = Math.round(percentage);

	const numberText = document.querySelector(".tranSquare .tranText");
	numberText.innerText = roundedPercent + " %";
}


// return button function
function returnButton(PL, PL2, PL3) {
	const main = document.querySelector("main");
	const return_s = document.querySelectorAll(".return");
	for (let y = 0; y < return_s.length; y++) {
		const return_n = return_s[y];

		return_n.addEventListener("click", () => {
			document.addEventListener("click", preventer, true);
			document.querySelector(".pages .page.is-active").classList.remove("is-active");
			document.querySelector(".pageBackground .page.is-active").classList.remove("is-active");
			document.querySelector(`.pages .page[data-page = "1"]`).classList.add("is-active");
			document.querySelector(`.pageBackground .page[data-page = "1"]`).classList.add("is-active");
			document.querySelector(".tabs .tab.is-active").classList.remove("is-active");
			document.querySelector(`.tabs [data-tab = "1"]`).parentNode.classList.add("is-active");
			
			PL.style.animation = "";
			PL2.style.animation = "";
			PL3.style.animation = "";
			main.style.opacity = "0";
			main.style.pointerEvents = "none";
			main.classList.add("positionS");

			const tab_returns = document.querySelectorAll(".tabs .tab.hide");
			for (let yy = 0; yy < tab_returns.length; yy++) {
				const tab_return = tab_returns[yy];
				tab_return.classList.remove("hide");
				tab_return.style.animation = "opacity 1s ease-in forwards";
				tab_return.addEventListener("animationend", () =>{
					tab_return.style.animation = "";
					tab_return.style.opacity = "1";
				})
			}
			
			const flip = document.querySelectorAll(".tabs .tab.is-flipped");
			if (flip.length > 0) {
				document.querySelector(".is-flipped").classList.remove("is-flipped");
			}

			const quits = document.querySelectorAll(".show");
			if (quits.length > 0) {
				for (let q = 0; q < quits.length; q++) {
					const quit = quits[q];
					quit.classList.remove("show");
				}
			}

			setTimeout(() => {
				document.removeEventListener("click", preventer, true);
			}, 800);
		});
	}
}

// card flip effect
function cardFlip() {
	const cards = document.querySelectorAll(".tabs .tab");
	for (let u = 0; u < cards.length; u++) {
		const card = cards[u];
		card.addEventListener("click", function () {
		card.classList.toggle("is-flipped");
		});
	}

	const fronts = document.querySelectorAll(".tabs .tab .front");
	for (let uu = 0; uu < fronts.length; uu++) {
		const front = fronts[uu];

		var count = 0;
		front.addEventListener("click", () => {
			count++;
			console.log(count);

			const returnS = document.querySelectorAll(".return")
			for (let r = 0; r < returnS.length; r++) {
				const returnN = returnS[r];
	
				returnN.addEventListener("click", () => {
					count = 0;
				});
			}

			if (count > 3) {
				var t1 = 1500;
				const tab_load = document.querySelector(".tranSquare");
				tab_load.classList.add("Burn");
				const PL = document.querySelector(".tranSquareInner .middleLayer");
				const PT = document.querySelector(".tranSquare .tranText");

				PT.setAttribute("data-content", "SYNC RATE");
				PL.style.animation = "load2 1s linear forwards";
				
				let h = Math.floor((Math.random() * 11) + 20) + "%";
				let hf = Math.floor((Math.random() * 5) + 20) + "%";
				PL.style.setProperty("--heightL", h);
				PL.style.setProperty("--heightF", hf);

				syncRate2(PL);

				setTimeout(() => {
					PT.setAttribute("data-content", "SYNC RATE IS TOO LOW!");
					PL.style.animation = "load3 1s linear infinite alternate";
				}, 1200);

				if (count > 4) {
					PT.setAttribute("data-content", "SYNC RATE IS TOO LOW!");
					PL.style.animation = "load3 1s linear infinite alternate";
				}

				const ejectButton = document.querySelector(".tranSquare.Burn .tranText2");
				ejectButton.addEventListener("click", () => {
					window.location.href = "index.html";
				});

				document.querySelector(".page.is-active .return").style.pointerEvents = "none";
			}
		});
	}
}

// page content click effect
function contentClick() {
	const contents1 = document.querySelectorAll(".detail tr:first-child td");
	const contents2 = document.querySelectorAll(".detail tr:nth-child(2) td");
	const contents3 = document.querySelectorAll(".blueprintHover p");

	for (let ca = 0; ca < contents1.length; ca++) {
		const content1 = contents1[ca];

		content1.addEventListener("click", () => {
			const cProfile = document.querySelector(".page.is-active .profile");
			cProfile.classList.add("show");
			cProfile.addEventListener("click", () => {
				cProfile.classList.remove("show");
			});
		});
	}

	for (let cb = 0; cb < contents2.length; cb++) {
		const content2 = contents2[cb];

		content2.addEventListener("click", () => {
			const cPilot = document.querySelector(".page.is-active .pilot");
			cPilot.classList.add("show");
			cPilot.addEventListener("click", () => {
				cPilot.classList.remove("show");
			});
		});
	}

	for (let cc = 0; cc < contents3.length; cc++) {
		const content3 = contents3[cc];

		content3.addEventListener("click", () => {
			const cBlueprint = document.querySelector(".page.is-active .blueprintZoom");
			cBlueprint.classList.add("show");
			cBlueprint.addEventListener("click", () => {
				cBlueprint.classList.remove("show");
			});
		});
	}
}

//About page copy email text
function copyContent() {
	const email = document.querySelector(".email");

	email.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText("shiyugeng@gmail.com");
				alert("My email address 'shiyugeng@gmail.com' has been copied to clipboard");
			}
			catch (err) {
				console.error("Failed to copy: shiyugeng@gmail.com", err);
			}
		}
	)
}