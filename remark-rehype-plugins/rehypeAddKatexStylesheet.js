import { visit } from 'unist-util-visit';

const STYLESHEET_HREF = 'https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css';
const STYLESHEET_INTEGRITY = 'sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ';

const katexStylesheet = {
  type: 'element',
  tagName: 'link',
  properties: {
    rel: 'stylesheet',
    href: STYLESHEET_HREF,
    integrity: STYLESHEET_INTEGRITY,
    crossorigin: 'anonymous'
  },
  children: []
};

function rehypeAddKatexStylesheet() {
  return (tree) => {
    let hasKatex = false;

    visit(tree, 'element', (node) => {
      // Check if the current element has the class "katex"
      if (node.properties.className && node.properties.className.includes('katex')) {
        console.log('Found a katex element');
        hasKatex = true;
      }
    });

    // If the page contains an element with the class "katex", add the katex stylesheet
    if (hasKatex) {
      // add katex stylesheet to head
      tree.children[0].children[0].children.push(katexStylesheet);
    }
  };
}

export default rehypeAddKatexStylesheet;
