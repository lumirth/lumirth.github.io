
console.log('(app.js)')

const add_copy_buttons = function() {
    console.log('(add_buttons) Adding copy buttons for code blocks.')
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(function(block) {
        const button = document.createElement('button');
        button.classList.add('copy-button');
        button.innerHTML = '<span>COPY</span>';
        block.parentNode.appendChild(button);
    });
}

const add_copy_button_listeners = function() 
{
    console.log('(copy_code) Add copy event listener for code blocks.')
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const code = button.parentNode.querySelector('code');
            const range = document.createRange();
            range.selectNode(code);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            navigator.clipboard.writeText(code.innerText);
            window.getSelection().removeAllRanges();
            button.innerHTML = '<span>COPIED</span>';
            setTimeout(function() {
                button.innerHTML = button_text;
            }, 2000);
        });
    });
}

// turbolinks onload do things
document.addEventListener('turbolinks:load', function() { 
    set_favicon();
    fix_mailto_links();
    console.log('%c TODO: we dont need to add copy buttons and copy button listeners on non-code-containing pages. Date: 2023-03-19','color: blue;')
    console.log('(turbolinks:load)')
    console.log('%cNOTE: Astro + Github Pages fuckery is getting rid of the lang attribute on the html element. We are setting it in JS as a workaround.','color: yellow;')
    document.documentElement.lang = 'en';
    if (!window.location.pathname.includes('/blog/') && !window.location.pathname.includes('/work/')) {
        console.log('(turbolinks:load) Not on blog or work page. Returning.')
        return;
    }
    add_copy_buttons();
    add_copy_button_listeners();
    add_katex_stylesheet();
});

const set_favicon = function() {
    console.log('(set_favicon)')
    // change favicon to favicon-dark-mode.ico when in dark mode
    // change favicon to favicon-light-mode.ico when in light mode
    const favicon = document.querySelector('link[rel="icon"]');

    // detect system theme
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // change favicon based on system theme
    if (isDarkMode) {
    favicon.href = '/favicon-dark-mode.ico';
    } else {
    favicon.href = '/favicon-light-mode.ico';
    }
}

const katex_stylesheet = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" \
integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">';

// if the page contains an element with the class "katex", add the katex stylesheet
const add_katex_stylesheet = function() {
    const katex_elements = document.querySelectorAll('.katex');
    if (katex_elements.length > 0) {
        document.head.insertAdjacentHTML('beforeend', katex_stylesheet);
    }
}

const fix_mailto_links = function() {
    console.log('(fix_mailto_links)')
    // fix obfuscated mailto links
    const mailto_links = document.querySelectorAll('a[href^="mailto:"]');
    mailto_links.forEach(function(link) {
            // replace [at] with @, and [dot] with .
            email = link.href.replace('[at]', '@').replace('[dot]', '.');
            link.href = email;
        
        }
    );
}