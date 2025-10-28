const toggle = document.getElementById('theme-toggle');


const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');


if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.checked = true;
}


function toggleTheme() {
    if (toggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
}


toggle.addEventListener('change', toggleTheme);


