const notification_button = document.getElementById(`notification_permission_button`);

function NotifyMe() {
	new Notification(`VibeCheck Time`, {
		body: `Time to check your vibe.`,
		icon: `https://vibecheck.ch/content/favicon_768.png`
	});
}

if (notification_button) {
	notification_button.addEventListener(`click`, () => {
		let promise = Notification.requestPermission();
		NotifyMe();
	});
}