document.addEventListener('DOMContentLoaded', () => {
    // --- Matrix Rain Effect ---
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const cols = Math.floor(width / 20);
    const ypos = Array(cols).fill(0);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    function matrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#0f0';
        ctx.font = '15pt monospace';

        ypos.forEach((y, index) => {
            const text = String.fromCharCode(Math.random() * 128);
            const x = index * 20;
            ctx.fillText(text, x, y);

            if (y > 100 + Math.random() * 10000) ypos[index] = 0;
            else ypos[index] = y + 20;
        });
    }

    setInterval(matrix, 50);

    // --- Clock ---
    function updateClock() {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString('en-US', { hour12: false });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Typing Effect & Logic ---
    const usernameInput = document.getElementById('username');
    const passwordGroup = document.getElementById('password-group');
    const passwordInput = document.getElementById('password');
    const outputLog = document.getElementById('output-log');
    const form = document.getElementById('login-form');

    // Focus management
    document.addEventListener('click', () => {
        if (!passwordGroup.classList.contains('hidden')) {
            passwordInput.focus();
        } else {
            usernameInput.focus();
        }
    });

    // Handle Username Enter
    usernameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = usernameInput.value.trim().toLowerCase();
            
            if (val === '') return;

            // Secrets / Commands
            if (val === 'help') {
                logMessage('> HINT: TRY "ADMIN" OR USE THE KONAMI CODE.');
                usernameInput.value = '';
                return;
            }
            if (val === 'sudo') {
                logMessage('> NICE TRY. PERMISSION DENIED.');
                usernameInput.value = '';
                return;
            }
            if (val === 'clear') {
                outputLog.innerHTML = '';
                usernameInput.value = '';
                return;
            }

            // Proceed to password
            usernameInput.disabled = true;
            passwordGroup.classList.remove('hidden');
            passwordInput.focus();
        }
    });

    // Handle Login Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = usernameInput.value.trim().toLowerCase();
        const pass = passwordInput.value;

        logMessage(`> AUTHENTICATING USER: ${user}...`);

        setTimeout(() => {
            if (user === 'admin' && pass === 'password123') {
                grantAccess();
            } else {
                logMessage('> ACCESS DENIED. INVALID CREDENTIALS.');
                resetForm();
            }
        }, 1500);
    });

    function logMessage(msg) {
        const p = document.createElement('p');
        p.className = 'system-msg';
        p.innerText = msg;
        outputLog.appendChild(p);
        // Auto scroll
        const container = document.querySelector('.content');
        container.scrollTop = container.scrollHeight;
    }

    function resetForm() {
        usernameInput.disabled = false;
        usernameInput.value = '';
        passwordInput.value = '';
        passwordGroup.classList.add('hidden');
        usernameInput.focus();
    }

    function grantAccess() {
        document.getElementById('access-granted').classList.remove('hidden');
    }

    // --- Konami Code ---
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateGodMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateGodMode() {
        logMessage('> GOD MODE ACTIVATED.');
        logMessage('> UNLOCKING SYSTEM CORE...');
        document.body.style.color = '#f00'; // Change theme to red
        document.documentElement.style.setProperty('--terminal-green', '#f00');
        document.documentElement.style.setProperty('--terminal-glow', '0 0 10px #f00, 0 0 20px #f00');
        
        setTimeout(() => {
            grantAccess();
            const h1 = document.querySelector('#access-granted h1');
            h1.innerText = "SYSTEM OVERRIDDEN";
            h1.style.color = "#f00";
        }, 2000);
    }
});
