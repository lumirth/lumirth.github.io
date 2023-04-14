console.log("(app.js)");

const LISTEN_FOR_CLASS = ".button--top-right-with-margins";
const COPY_BUTTON_INNER_HTML_DEFAULT = "<span>COPY</span>";
const COPY_BUTTON_INNER_HTML_COPIED = "<span>COPIED</span>";

const add_copy_buttons = function () {
  console.log("(add_buttons) Adding copy buttons for code blocks.");
  const codeBlocks = document.querySelectorAll("pre code");
  codeBlocks.forEach(function (block) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("button--mini");
    button.classList.add("button--top-right-with-margins");
    button.innerHTML = COPY_BUTTON_INNER_HTML_DEFAULT;
    block.parentNode.appendChild(button);
  });
};

const add_copy_button_listeners = function () {
  console.log("(copy_code) Add copy event listener for code blocks.");
  const copyButtons = document.querySelectorAll(LISTEN_FOR_CLASS);
  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const code = button.parentNode.querySelector("code");
      const range = document.createRange();
      range.selectNode(code);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      navigator.clipboard.writeText(code.innerText);
      window.getSelection().removeAllRanges();
      button.innerHTML = COPY_BUTTON_INNER_HTML_COPIED;
      setTimeout(function () {
        button.innerHTML = COPY_BUTTON_INNER_HTML_DEFAULT;
      }, 2000);
    });
  });
};

const fix_mailto_links = function () {
  console.log("(fix_mailto_links)");
  // fix obfuscated mailto links
  const mailto_links = document.querySelectorAll('a[href^="mailto:"]');
  mailto_links.forEach(function (link) {
    // replace [at] with @, and [dot] with .
    email = link.href
      .replace("%5B", "[")
      .replace("%5D", "]")
      .replace("%5B", "[")
      .replace("%5D", "]");
    email = email.replace("[at]", "@");
    email = email.replace("[dot]", ".");
    link.href = email;
  });
};

const katex_stylesheet =
  '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" \
integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">';

// if the page contains an element with the class "katex", add the katex stylesheet
const add_katex_stylesheet = function () {
  console.log("(add_katex_stylesheet) Adding katex stylesheet if needed.");
  const katex_elements = document.querySelectorAll(".katex");
  if (katex_elements.length > 0) {
    document.head.insertAdjacentHTML("beforeend", katex_stylesheet);
  }
};

const apply_theme_colors_dynamically = function () {
  console.log(
    "(apply_theme_colors_dynamically) Applying theme colors dynamically."
  );
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // if dark mode is enabled, set the status bar color to black
  if (isDarkMode) {
    document
      .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
      .setAttribute("content", "black-translucent");
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "#111");
  }
  // if dark mode is not enabled, set the status bar color to white
  else {
    document
      .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
      .setAttribute("content", "default");
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "#fff");
  }
};

// turbolinks onload do things
document.addEventListener("turbolinks:load", function () {
  console.log(
    "%c TODO: we dont need to add copy buttons and copy button listeners on non-code-containing pages. Date: 2023-03-19",
    "color: blue;"
  );
  console.log("(turbolinks:load)");

  apply_theme_colors_dynamically();
  fix_mailto_links();
  if (
    !window.location.pathname.includes("/blog/") &&
    !window.location.pathname.includes("/work/")
  ) {
    console.log("(turbolinks:load) Not on blog or work page. Returning.");
    return;
  }
  
  add_copy_buttons();
  add_copy_button_listeners();
  add_katex_stylesheet();
});

// event listener for change system theme
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function (e) {
    apply_theme_colors_dynamically();
});
