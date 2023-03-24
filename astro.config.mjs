import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import m2dx from 'astro-m2dx';
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import rehypeKatex from "rehype-katex";
import customTheme from './monokai.json';
import turbolinks from "@astrojs/turbolinks";
import image from "@astrojs/image";
import webmanifest from "astro-webmanifest";
import compress from "astro-compress";

/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
  styleDirectives: true
};


// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), turbolinks(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), webmanifest({
    name: '[MIRTH.CC]',
    /**
     * optional
     **/
    icon: 'src/mirth-wb.svg',
    // source for favicon & icons

    short_name: 'MIRTH',
    description: 'Lumirth\'s Domain',
    start_url: '/',
    display: 'standalone',
    config: {
      insertFaviconLinks: false,
      insertAppleTouchLinks: true
    }
  }), compress()],
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, [m2dx, m2dxOptions]],
    rehypePlugins: [[rehypeKatex, {
      // Katex plugin options
    }]],
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: customTheme,
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: []
    }
    // syntaxHighlight: 'prism',
  }
});