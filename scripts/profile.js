import { supabase } from "/scripts/supabase.js";

const sign_out_button = document.getElementById(`sign_out_button`);

const greeting_text = document.getElementById(`greeting_text`);

const email_input = document.getElementById(`email_input`);
const password_input = document.getElementById(`password_input`);
const name_input = document.getElementById(`name_input`);
const age_input = document.getElementById(`age_input`);

const email_save_button = document.getElementById(`email_save_button`);
const password_save_button = document.getElementById(`password_save_button`);
const name_save_button = document.getElementById(`name_save_button`);
const age_save_button = document.getElementById(`age_save_button`);

const info_message = document.getElementById(`info_message`);

const profile_dialog = document.getElementById(`profile_dialog`);

const profile_open_button = document.getElementById(`profile_open_button`);
const profile_close_button = document.getElementById(`profile_close_button`);

async function getProfile() {
	const { data: { session } } = await supabase.auth.getSession();

	if (!session) {
		window.location.href = `index.html`;
	} else {
		const { data: { user } } = await supabase.auth.getUser();
		const email = user?.email;
		const name = user?.user_metadata?.first_name;
		const age = user?.user_metadata?.age;

		const time_of_day = new Date().getHours();
		let greeting = `Greetings`;
	
		if (time_of_day < 4) greeting = `It's late`
		else if (time_of_day < 12) greeting = `Good morning`;
		else if (time_of_day < 16) greeting = `Good afternoon`;
		else if (time_of_day < 20) greeting = `Good evening`;
		else if (time_of_day < 24) greeting = `Good night`;
		
		if (email) email_input.value = email;

		if (name) {
			name_input.value = name;
			greeting_text.innerText = `${greeting}, ${name}!`;
			if (email?.includes(`joelsommerer`)) greeting_text.innerText = `Hallo Master :)`;
		}
		else greeting_text.innerText = `${greeting}!`;

		if (age) age_input.value = age;
	}
}

async function signOut() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		alert(error.message);
	}

	window.location.href = `index.html`;
}

async function modifyEmail() {
	const email = email_input.value;

	if (email) {
		const { data, error } = await supabase.auth.updateUser({
			email: email
		});

		if (error) {
			info_message.innerText = error.message;
			info_message.classList.add(`red-message`);
		} else {
			info_message.innerText = `Check your inbox to modify email.`;
			info_message.classList.add(`green-message`);
			setTimeout(() => {
				info_message.innerText = `Modify your details.`;
				info_message.classList.remove(`green-message`);
			}, 10000);
		}
	}

	getProfile();
}

async function modifyPassword() {
	const password = password_input.value;

	if (password) {
		const { data, error } = await supabase.auth.updateUser({
			password: password
		});

		password_input.value = ``;

		if (error) {
			info_message.innerText = error.message;
			info_message.classList.add(`red-message`);
		} else {
			info_message.innerText = `Password modified.`;
			info_message.classList.add(`green-message`);
			setTimeout(() => {
				info_message.innerText = `Modify your details.`;
				info_message.classList.remove(`green-message`);
			}, 10000);
		}
	}
}

async function modifyName() {
	const name = name_input.value;

	if (name) {
		const { data, error } = await supabase.auth.updateUser({
			data: {
				first_name: name
			}
		});

		if (error) {
			info_message.innerText = error.message;
			info_message.classList.add(`red-message`);
		} else {
			info_message.innerText = `Name modified.`;
			info_message.classList.add(`green-message`);
			setTimeout(() => {
				info_message.innerText = `Modify your details.`;
				info_message.classList.remove(`green-message`);
			}, 10000);
		}
	}

	getProfile();
}

async function modifyAge() {
	const age = age_input.value;

	if (age) {
		const { data, error } = await supabase.auth.updateUser({
			data: {
				age: age
			}
		});

		if (error) {
			info_message.innerText = error.message;
			info_message.classList.add(`red-message`);
		} else {
			info_message.innerText = `Age modified.`;
			info_message.classList.add(`green-message`);
			setTimeout(() => {
				info_message.innerText = `Modify your details.`;
				info_message.classList.remove(`green-message`);
			}, 10000);
		}
	}

	getProfile();
}

if (sign_out_button) {
	sign_out_button.addEventListener(`click`, signOut);
}

if (email_input) {
	email_input.addEventListener(`keypress`, (e) => {
		if (e.key === `Enter`) modifyEmail();
	});
}

if (email_save_button) {
	email_save_button.addEventListener(`click`, modifyEmail);
}

if (password_input) {
	password_input.addEventListener(`keypress`, (e) => {
		if (e.key === `Enter`) modifyPassword();
	});
}

if (password_save_button) {
	password_save_button.addEventListener(`click`, modifyPassword);
}

if (name_input) {
	name_input.addEventListener(`keypress`, (e) => {
		if (e.key === `Enter`) modifyName();
	});
}

if (name_save_button) {
	name_save_button.addEventListener(`click`, modifyName);
}

if (age_input) {
	age_input.addEventListener(`keypress`, (e) => {
		if (e.key === `Enter`) modifyAge();
	});
}

if (age_save_button) {
	age_save_button.addEventListener(`click`, modifyAge);
}

if (profile_open_button) {
	profile_open_button.addEventListener(`click`, () => {
		profile_dialog.showModal();
	});
}

if (profile_close_button) {
	profile_close_button.addEventListener(`click`, () => {
		profile_dialog.close();
	});
}

getProfile();