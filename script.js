// DOM Elements
const btnProcess = document.getElementById('btn-process');
const rawInput = document.getElementById('raw-input');
const readerOutput = document.getElementById('reader-output');
const toggleTheme = document.getElementById('toggle-theme');
const toggleFont = document.getElementById('toggle-font');
const toggleFocus = document.getElementById('toggle-focus');
const fileUpload = document.getElementById('file-upload');

let isReadingMode = false;

// 1. Text Processing Logic
btnProcess.addEventListener('click', () => {
    if (!isReadingMode) {
        const text = rawInput.value.trim();
        if (!text) {
            alert("Please paste some text first.");
            return;
        }

        // THE FIX: Step 1 - Split the raw text by line breaks to preserve paragraphs
        const paragraphs = text.split(/\n+/);

        // Step 2 - Loop through each paragraph
        const formattedHTML = paragraphs.map(para => {
            const trimmedPara = para.trim();
            if (!trimmedPara) return '';

            // Step 3 - Split the paragraph into sentences and wrap in spans
            const sentences = trimmedPara.split(/(?<=[.!?])\s+/);
            const sentenceSpans = sentences.map(s => {
                return `<span class="sentence">${s} </span>`;
            }).join('');

            // Step 4 - Wrap the group of spans in a <p> (paragraph) tag
            return `<p>${sentenceSpans}</p>`;
        }).join('');

        // Apply to the DOM
        readerOutput.innerHTML = formattedHTML;
        
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

// 3. File Upload Logic

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

fileUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Helper function to update UI after text is extracted
    const loadTextIntoApp = (extractedText) => {
        if (isReadingMode) {
            rawInput.classList.remove('hidden');
            readerOutput.classList.add('hidden');
            btnProcess.innerText = "Format Text";
            isReadingMode = false;
        }
        rawInput.value = extractedText;
        event.target.value = ''; // Reset input
    };

    const fileName = file.name.toLowerCase();

    try {
        // --- HANDLE PLAIN TEXT (.txt) ---
        if (fileName.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = (e) => loadTextIntoApp(e.target.result);
            reader.readAsText(file);
        } 
        
        // --- HANDLE WORD DOCUMENTS (.docx) ---
        else if (fileName.endsWith('.docx')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Mammoth naturally preserves paragraphs with \n\n line breaks
                mammoth.extractRawText({ arrayBuffer: e.target.result })
                    .then(result => loadTextIntoApp(result.value))
                    .catch(err => alert("Error parsing DOCX file."));
            };
            reader.readAsArrayBuffer(file);
        } 
        
        // --- HANDLE PDF DOCUMENTS (.pdf) ---
        else if (fileName.endsWith('.pdf')) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const typedarray = new Uint8Array(e.target.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let fullText = "";
                
                // Loop through each page and extract text
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    
                    let pageText = "";
                    let lastY = null;

                    textContent.items.forEach(item => {
                        if (lastY !== null) {
                            let yDelta = Math.abs(item.transform[5] - lastY);
                            
                            // Increased threshold to 30 to account for larger fonts
                            if (yDelta > 30) {
                                pageText += "\n\n"; 
                            } 
                            // Normal line wrap
                            else if (yDelta > 5) {
                                // Fix for words hyphenated across two lines
                                if (pageText.trim().endsWith("-")) {
                                    pageText = pageText.trim().slice(0, -1);
                                } else {
                                    pageText += " "; 
                                }
                            }
                        }
                        pageText += item.str;
                        lastY = item.transform[5];
                    });
                    
                    fullText += pageText + "\n\n"; 
                }
                
                loadTextIntoApp(fullText);
            };
            reader.readAsArrayBuffer(file);
        } 
        
        else {
            alert("Unsupported file format. Please upload .txt, .docx, or .pdf.");
            event.target.value = '';
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while reading the file.");
    }
});