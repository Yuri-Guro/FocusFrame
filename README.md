# FocusFrame: Distraction-Free Web Reader

FocusFrame is a lightweight, client-side web application designed to create an accessible, distraction-free reading environment. It is built specifically to assist users with cognitive and learning disabilities, such as ADHD and dyslexia, by reducing visual clutter and cognitive overload.

## 🚀 Features
* **Multi-Format Document Support:** Paste unformatted text directly, or upload **.pdf** and **.docx** files for instant reading preparation.
* **Intelligent Formatting:** Automatically preserves original paragraph structures and spacing, presenting text in a clean, justified, newspaper-style column.
* **High Contrast Mode:** WCAG-compliant dark theme (yellow text on black background) to reduce eye strain.
* **Dyslexia-Friendly Typography:** Integrated OpenDyslexic font toggle to improve letter recognition.
* **Responsive Line Focus Tracker:** 
  * **Desktop:** An interactive mouse-tracking tool that highlights the active sentence while dimming surrounding text.
  * **Mobile:** Automatically tracks your scroll position to highlight the sentence in the exact center of the screen, preventing touch-screen frustration.
* **Mobile-Optimized Interface:** Fully responsive design that adapts seamlessly to smartphones and tablets.
* **Built-in Feedback Loop:** Integrated Google Forms access for continuous user testing and improvement.

## 🛠️ Tech Stack
* **HTML5:** Semantic UI structure.
* **CSS3:** Custom properties for theme toggling, responsive media queries, and accessibility styling.
* **Vanilla JavaScript (ES6):** DOM manipulation, text parsing, and event listeners (No heavy frameworks).
* **PDF.js (CDN):** Client-side parsing for PDF documents.
* **Mammoth.js (CDN):** Client-side raw text extraction for Word documents.

## 💻 How to Run Locally
FocusFrame requires no installation, backend server, or database.
1. Clone this repository: `git clone https://github.com/Yuri-Guro/FocusFrame.git`
2. Open the project folder.
3. Double-click `index.html` to run the application natively in any modern web browser (Chrome, Firefox, Edge, Safari).

## 🌐 Live Deployment
This project is deployed using GitHub Pages. 
**Access the live application here:** [https://yuri-guro.github.io/FocusFrame/]

## 👥 Team (CS2B-3)
* **James Duquilar:** Project Manager
* **Neil Bagsic:** Lead Programmer
* **Joshua Arimado:** Member

## 📄 License
This project is open-source and free to use for educational purposes.
