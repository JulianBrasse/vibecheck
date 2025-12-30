import { supabase } from "/scripts/supabase.js";

const entry_list = document.getElementById(`entry_list`);

async function getEntries() {
	const { data, error } = await supabase
	.from(`entries`)
	.select(`score, reason, advice, entry_timestamp`)
	.range(0, 9)
	.order(`entry_timestamp`, { ascending: false });

	if (error) {
		entry_list.innerHTML = `${error.message}`;
	} else if (data) {
		const entries = data.map(entry => {
			let date = new Date(entry.entry_timestamp).toLocaleDateString(`de-CH`);
			let time = new Date(entry.entry_timestamp).toLocaleTimeString(`de-CH`, { hour: `2-digit`, minute: `2-digit` });
			let color = Math.round(1 + ((entry.score - 1) * 5) / 9);
			return `<article><div><div><svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" fill="var(--level-${color})"><circle cx="5" cy="5" r="5" /></svg><h5>${entry.score}/10</h5><h5>•</h5><h5>${date} ${time}</h5></div><p><b>Reason:</b> ${entry.reason}</p><p><b>Advice:</b> ${entry.advice}</p></div></article>`
		}).join(``);
		entry_list.innerHTML = `<h4>Entries</h4>${entries}`;
	}
}

supabase
.channel(`realtimeChannel`)
.on(`postgres_changes`, { event: `INSERT`, schema: `public`, table: `entries` }, () => getEntries())
.on(`postgres_changes`, { event: `DELETE`, schema: `public`, table: `entries` }, () => getEntries())
.subscribe();

document.addEventListener(`click`, (location) => {
	const article = location.target.closest(`article`);
	if (article) {
		document.querySelector(`.open-article`)?.classList.remove(`open-article`);
		article.classList.add(`open-article`);
	}
	else {
		const open_article = document.querySelector(`.open-article`);
		open_article?.classList.remove(`open-article`);
	}
});

getEntries();