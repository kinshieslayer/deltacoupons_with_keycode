// Anti-DevTools Protection
// This makes it harder (but not impossible) to inspect/steal your code

(function () {
    'use strict';

    // Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (Inspect)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
    });

    // Detect if DevTools is open
    const devtoolsDetector = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            // DevTools detected - redirect or show warning
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#0f172a;color:white;"><h1>⚠️ Developer Tools Detected</h1></div>';
        }
    };

    // Check every 1 second
    setInterval(devtoolsDetector, 1000);

    // Disable text selection (optional - can be annoying for users)
    // document.addEventListener('selectstart', (e) => e.preventDefault());

    // Clear console periodically
    setInterval(() => {
        console.clear();
    }, 2000);

    // Anti-debugger
    setInterval(() => {
        debugger;
    }, 100);

})();
