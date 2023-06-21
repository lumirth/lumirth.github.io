// remarkCustomMedia.js

import { visit } from "unist-util-visit";

export default function remarkCustomMedia() {
  return (tree) => {
    visit(tree, "image", (node) => {
      const alt = node.alt;
      const url = node.url;

      if (alt.startsWith("ANIMATION:") || alt.startsWith("VIDEO:")) {
        const videoTitle = alt.replace(/(ANIMATION:|VIDEO:)\s*/, "");
        let attributes = "";
        if (alt.startsWith("ANIMATION:")) {
            attributes = "autoplay loop muted webkit-playsinline playsinline";
        } else {
            attributes = "controls";
        }
        node.type = "html";
        node.value = `<video ${attributes} class="media" title="${videoTitle}">\n<source src="${url}" type="video/mp4"/>\n</video>`;
      } else {
        node.type = "html";
        node.value = `<img class="media" loading="lazy" src="${url}" alt="${alt}"/>`;
      }
    });
  };
}
