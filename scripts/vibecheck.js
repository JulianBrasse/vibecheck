import { supabase } from "/scripts/supabase.js";
import { gemini } from "/scripts/gemini.js";

const happiness_score_input = document.getElementById(`happiness_score_input`);
const happiness_reason_input = document.getElementById(`happiness_reason`);

const vibe_form = document.getElementById(`vibe_form`);
const vibe_message = document.getElementById(`vibe_message`);
const vibe_submit_button = document.getElementById(`vibe_submit_button`);

const happiness_score_text = document.getElementById(`happiness_score_text`);
const happiness_advice = document.getElementById(`happiness_advice`);
const advice_text = document.getElementById(`advice_text`);

async function submitVibe() {
	vibe_message.innerText = `Loading...`;
	vibe_message.className = `blue-message`;
	
	const happiness_score = happiness_score_input.valueAsNumber;
	const happiness_reason = happiness_reason_input.value;

	vibe_form.reset();
	showVibe();

	happiness_score_input.innerText = ``;
	happiness_reason_input.innerText = ``;
	const date = new Date().toLocaleDateString(`de-CH`);
	const time = new Date().toLocaleTimeString(`de-CH`);

	const { data: { user } } = await supabase.auth.getUser();
	const name = user?.user_metadata?.first_name;
	const age = user?.user_metadata?.age;

	const { data } = await supabase
	.from(`entries`)
	.select(`score, reason, advice, entry_timestamp`)
	.range(0, 5)
	.order(`entry_timestamp`, { ascending: false });

	const entries = JSON.stringify(data);
	const prompt = `(My name is ${name} and I am ${age} years old. The date is ${date} at ${time}. My happiness score is ${happiness_score}/10. The reason I gave for my happiness score is "${happiness_reason}". These were my recent entries: "${entries}") Give me advice on how to increase my happiness today in a short text without formatting, only punctuation.`;
	const advice_response = await gemini.models.generateContent({
		model: `gemini-flash-lite-latest`,
		contents: prompt
	});

	const advice = advice_response.text;

	if (advice) happiness_advice.style.display = `flex`;
	advice_text.innerText = advice || `There was an error with HappinessAdvice.`;

	const { error } = await supabase
	.from(`entries`)
	.insert({
		score: happiness_score,
		reason: happiness_reason,
		advice: advice,
		user_age: age,
		entry_history: data
	});

	if (error) {
		vibe_message.innerText = `${error.message}`;
		vibe_message.className = `red-message`;
	} else {
		vibe_message.innerText = `VibeCheck submitted.`;
		vibe_message.className = `green-message`;
		setTimeout(() => {
			vibe_message.innerText = `Enter your happiness score and reason.`;
			vibe_message.className = ``;
		}, 10000);
	}
}

function showVibe() {
	const happiness_score = happiness_score_input.valueAsNumber;
	if(happiness_score === 10) {
		happiness_score_text.innerText = `${happiness_score}/10`;
	} else {
		happiness_score_text.innerText = `0${happiness_score}/10`;
	}
}

if (vibe_submit_button) {
	vibe_submit_button.addEventListener(`click`, submitVibe);
}

if (happiness_reason_input) {
	happiness_reason_input.addEventListener(`keypress`, (e) => {
		if (e.key === `Enter`) submitVibe();
	});
}

if (happiness_score_input) {
	happiness_score_input.addEventListener(`input`, showVibe);
}