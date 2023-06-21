import { visit } from 'unist-util-visit';

const HORI_LINE_CLASS = 'hori-line--with-margin';
const LINK_CLASS = 'link link--gasping';
const CODE_CLASS = 'code code--inline';
const CODE_BLOCK_CLASS = 'code code--block';
const SUP_A_CLASSES = 'text--faded link--glowing text--undecorated';
const SUP_CLASS = "vert-align-top";

function rehypeStyleFixes(options = {}) {
    return (tree) => {
        visit(tree, 'element', visitor);

        function visitor(node, index, parent) {
            // add hori-line--with-margin class to hr elements
            if (node.tagName === 'hr') {
                console.log('Found an hr element');
                node.properties.className = (node.properties.className || []).concat(HORI_LINE_CLASS);
            }
            // add link--gasping class to a elements that are not inside sup elements
            if (node.tagName === 'a') {
                // add link-gasping if it doesn't have a data-footnote-backref attribute and if sup is not parent
                let sup_parent = (parent && parent.tagName === 'sup');
                let has_class_data_footnote_backref = (node.properties.className && node.properties.className.includes('data-footnote-backref'));
                if (!sup_parent && !has_class_data_footnote_backref) {
                    node.properties.className = (node.properties.className || []).concat(LINK_CLASS);
                } 
            }
            // add code--inline class to code elements that are not inside pre elements
            if (node.tagName === 'code' && (!parent || parent.tagName !== 'pre')) {
                node.properties.className = (node.properties.className || []).concat(CODE_CLASS);
            }
            // add code--block class to pre elements
            if (node.tagName === 'pre') {
                node.properties.className = (node.properties.className || []).concat(CODE_BLOCK_CLASS);
            }
            if (node.tagName === 'sup') {
                // Add the "vert-align-top" class to the <sup> element
                node.properties.className = (node.properties.className || []).concat(SUP_CLASS);

                // Check if the first child of the <sup> element is an <a> element
                if (node.children[0] && node.children[0].tagName === 'a') {
                    // Remove all existing classes from the <a> element
                    node.children[0].properties.className = [];

                    // Add the desired classes to the <a> element
                    node.children[0].properties.className = (node.children[0].properties.className || []).concat(SUP_A_CLASSES);
                }
            }
            if (node.tagName === 'table') {
                // Add the "table" class to the <table> element
                node.properties.className = (node.properties.className || []).concat('table');
            }
            if (node.tagName === 'blockquote') {
                // Add the "blockquote" class to the <blockquote> element
                node.properties.className = (node.properties.className || []).concat('blockquote');
            }
        }
    };
}

export default rehypeStyleFixes;
