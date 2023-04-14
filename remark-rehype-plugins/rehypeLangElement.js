import { visit } from 'unist-util-visit';

function rehypeLangElement(options = {}) {
    return (tree) => {
        visit(tree, 'element', visitor);

        console.log(
            "%cNOTE: Astro + Github Pages fuckery is getting rid of the lang attribute on the html element. We are setting it in Rehype as a workaround.",
            "color: yellow;"
          );
        function visitor(node, index, parent) {
            // add lang="en" to html element
            if (node.tagName === 'html') {
                node.properties.lang = 'en';
            }
        }
    };
}

export default rehypeLangElement;
