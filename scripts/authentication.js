import { supabase } from "/scripts/supabase.js";

const sign_in_button = document.getElementById(`sign_in_button`);
const sign_up_button = document.getElementById(`sign_up_button`);

const sign_in_email_input = document.getElementById(`sign_in_email_input`);
const sign_in_password_input = document.getElementById(`sign_in_password_input`);

const sign_up_email_input = document.getElementById(`sign_up_email_input`);
const sign_up_password_input = document.getElementById(`sign_up_password_input`);
const name_input = document.getElementById(`name_input`);
const age_input = document.getElementById(`age_input`);

const sign_in_message = document.getElementById(`sign_in_message`);
const sign_up_message = document.getElementById(`sign_up_message`);

const sign_in_dialog = document.getElementById(`sign_in_dialog`);
const sign_up_dialog = document.getElementById(`sign_up_dialog`);

const sign_in_open_button = document.getElementById(`sign_in_open_button`);
const sign_up_open_button = document.getElementById(`sign_up_open_button`);
const sign_in_close_button = document.getElementById(`sign_in_close_button`);
const sign_up_close_button = document.getElementById(`sign_up_close_button`);

async function checkSessionStatus() {
	const { data: { session } } = await supabase.auth.getSession();

	if (session) {
		window.location.href = `dashboard.html`;
	}
}

async function signIn() {
	const email = sign_in_email_input.value;
	const password = sign_in_password_input.value;

	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		sign_in_message.innerText = error.message;
		sign_in_message.classList.add(`red-message`);
	} else {
		sign_in_message.innerText = `You have signed in.`;
		sign_in_message.classList.add(`green-message`);
		window.location.href = `dashboard.html`;
	}	
}

async function signUp() {
	const email = sign_up_email_input.value;
	const password = sign_up_password_input.value;
	const name = name_input.value;
	const age = age_input.value;

	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: {
				first_name: name,
				age: age
			}
		}
	});

	if (error) {
		sign_up_message.innerText = error.message;
		sign_up_message.classList.add(`red-message`);
	} else {
		sign_up_message.innerText = `You have signed up.`;
		sign_up_message.classList.add(`green-message`);
		checkSessionStatus();
	}
}

if (sign_in_button) {
	sign_in_button.addEventListener(`click`, signIn);
}

if (sign_up_button) {
	sign_up_button.addEventListener(`click`, signUp);
}

if (sign_in_password_input) {
	sign_in_password_input.addEventListener(`keypress`, (e) => {
		if (e.key === `Enter`) signIn();
	});
}

if (sign_up_password_input) {
	sign_up_password_input.addEventListener(`keypress`, (e) => {
		if (e.key === `Enter`) signUp();
	});
}

if (age_input) {
	age_input.addEventListener(`keypress`, (e) => {
		if (e.key === `Enter`) signUp();
	});
}

if (sign_in_open_button) {
	sign_in_open_button.addEventListener(`click`, () => {
		sign_in_dialog.showModal();
	});
}

if (sign_up_open_button) {
	sign_up_open_button.addEventListener(`click`, () => {
		sign_up_dialog.showModal();
	});
}

if (sign_in_close_button) {
	sign_in_close_button.addEventListener(`click`, () => {
		sign_in_dialog.close();
	});
}

if (sign_up_close_button) {
	sign_up_close_button.addEventListener(`click`, () => {
		sign_up_dialog.close();
	});
}

checkSessionStatus();