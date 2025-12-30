const version = `1.0.0`;

const footer_text = document.getElementById(`version_text`);

if (footer_text) {
	const year = new Date().getFullYear();
	footer_text.innerHTML = `©VibeCheck ${year} • Version ${version} • <a href="https://github.com/JulianBrasse/vibecheck" target="_blank">GitHub</a>`;
}