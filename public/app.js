console.log("(app.js)");

const add_copy_buttons = function () {
  console.log("(add_buttons) Adding copy buttons for code blocks.");
  const codeBlocks = document.querySelectorAll("pre code");
  codeBlocks.forEach(function (block) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("button--mini");
    button.classList.add("button--top-right-with-margins");
    button.innerHTML = "<span>COPY</span>";
    block.parentNode.appendChild(button);
  });
};

const add_copy_button_listeners = function () {
  console.log("(copy_code) Add copy event listener for code blocks.");
  const copyButtons = document.querySelectorAll(
    ".button--top-right-with-margins"
  );
  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const code = button.parentNode.querySelector("code");
      const range = document.createRange();
      range.selectNode(code);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      navigator.clipboard.writeText(code.innerText);
      window.getSelection().removeAllRanges();
      button.innerHTML = "<span>COPIED</span>";
      setTimeout(function () {
        button.innerHTML = "<span>COPY</span>";
      }, 2000);
    });
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

function add_media_class_to_images_and_videos() {
  const images = document.getElementsByTagName("img");
  const videos = document.getElementsByTagName("video");

  for (const image of images) {
    image.classList.add("media");
  }
  for (const video of videos) {
    video.classList.add("media");
  }
  console.log("added media class to images and videos");
}

function add_code_block_class_to_pre_elements() {
  const preElements = document.getElementsByTagName("pre");
  for (const preElement of preElements) {
    preElement.classList.add("code--block");
  }
  console.log("added code--block class to pre elements");
}

function add_hori_line_class_to_hr_elements() {
  const hrElements = document.getElementsByTagName("hr");
  for (const hrElement of hrElements) {
    hrElement.classList.add("hori-line--with-margin");
  }
  console.log("added hori-line class to hr elements");
}

function add_code_inline_to_inline_code_elements() {
  const codeElements = document.getElementsByTagName("code");
  for (const codeElement of codeElements) {
    // if inside a paragraph, add the inline class
    if (codeElement.parentNode.nodeName == "P") {
        codeElement.classList.add("code--inline");
    }
  }
  console.log("added code--inline class to code elements");
}

// turbolinks onload do things
document.addEventListener("turbolinks:load", function () {
  console.log(
    "%c TODO: we dont need to add copy buttons and copy button listeners on non-code-containing pages. Date: 2023-03-19",
    "color: blue;"
  );
  console.log("(turbolinks:load)");

  add_hori_line_class_to_hr_elements();
  add_code_inline_to_inline_code_elements();
  apply_theme_colors_dynamically();
  fix_mailto_links();
  console.log(
    "%cNOTE: Astro + Github Pages fuckery is getting rid of the lang attribute on the html element. We are setting it in JS as a workaround.",
    "color: yellow;"
  );
  document.documentElement.lang = "en";
  if (
    !window.location.pathname.includes("/blog/") &&
    !window.location.pathname.includes("/work/")
  ) {
    console.log("(turbolinks:load) Not on blog or work page. Returning.");
    return;
  }

  add_media_class_to_images_and_videos();
  add_code_block_class_to_pre_elements();
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
