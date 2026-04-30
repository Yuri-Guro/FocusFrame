// DOM Elements
const btnProcess = document.getElementById('btn-process');
const rawInput = document.getElementById('raw-input');
const readerOutput = document.getElementById('reader-output');
const toggleTheme = document.getElementById('toggle-theme');
const toggleFont = document.getElementById('toggle-font');
const toggleFocus = document.getElementById('toggle-focus');

let isReadingMode = false;

// 1. Text Processing Logic
btnProcess.addEventListener('click', () => {
    if (!isReadingMode) {
        const text = rawInput.value.trim();
        if (!text) {
            alert("Please paste some text first.");
            return;
        }

        // Parse text into sentences and wrap them in <span> tags for the Line Focus tool
        const sentences = text.split(/(?<=[.!?])\s+/);
        readerOutput.innerHTML = sentences.map(s => `<span class="sentence">${s} </span>`).join('');
        
        // Swap UI
        rawInput.classList.add('hidden');
        readerOutput.classList.remove('hidden');
        btnProcess.innerText = "Edit Text";
    } else {
        // Swap back to input mode
        rawInput.classList.remove('hidden');
        readerOutput.classList.add('hidden');
        btnProcess.innerText = "Format Text";
    }
    
    isReadingMode = !isReadingMode;
});

// 2. Accessibility Toggles
toggleTheme.addEventListener('change', (e) => {
    document.body.classList.toggle('dark-mode', e.target.checked);
});

toggleFont.addEventListener('change', (e) => {
    document.body.classList.toggle('dyslexic-font', e.target.checked);
});

toggleFocus.addEventListener('change', (e) => {
    readerOutput.classList.toggle('focus-active', e.target.checked);
});