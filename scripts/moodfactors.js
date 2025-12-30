import { supabase } from "/scripts/supabase.js";

const parameter_open_button = document.getElementById(`parameter_open_button`);
const parameter_close_button = document.getElementById(`parameter_close_button`);
const parameter_save_button = document.getElementById(`parameter_save_button`);

const parameter_dialog = document.getElementById(`parameter_dialog`);
const profile_dialog = document.getElementById(`profile_dialog`);

async function checkParameters() {
	const { data, error } = await supabase
		.from(`parameters`)
		.select(`user_parameters`)
		.order(`timestamp`, { ascending: false })
		.limit(1)
		.maybeSingle();

		if (error) {
			entry_list.innerHTML = `${error.message}`;
		} else console.log(data);
}

function saveParameters() {
	console.log(`test`);
}

if (parameter_open_button) {
	parameter_open_button.addEventListener(`click`, () => {
		profile_dialog.close();
		parameter_dialog.showModal();
		checkParameters();
	});
}

if (parameter_save_button) {
	parameter_save_button.addEventListener(`click`, saveParameters);
}

if (parameter_close_button) {
	parameter_close_button.addEventListener(`click`, () => {
		parameter_dialog.close();
	});
}

checkParameters();