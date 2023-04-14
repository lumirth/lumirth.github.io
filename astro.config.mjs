import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import m2dx from 'astro-m2dx';
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import rehypeKatex from "rehype-katex";
import turbolinks from "@astrojs/turbolinks"; // will be deprecated eventually
import image from "@astrojs/image";
import webmanifest from "astro-webmanifest";
// import compress from "astro-compress";
import customTheme from './monokai.json';
import remarkCustomMedia from "./remark-rehype-plugins/remarkCustomMedia"; // Import the custom plugin
import rehypeStyleFixes from "./remark-rehype-plugins/rehypeStyleFixes";
import rehypeLangElement from "./remark-rehype-plugins/rehypeLangElement";

/** @type {import('astro-m2dx').Options} */
import svelte from "@astrojs/svelte";
const m2dxOptions = {
  styleDirectives: true
};

// https://astro.build/config
export default defineConfig({
  site: "https://mirth.cc",
  integrations: [mdx(), sitemap(), turbolinks(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), webmanifest({
    name: '[MIRTH.CC]',
    icon: 'src/mirth-wb.svg',
    short_name: 'MIRTH',
    description: 'Lumirth\'s Domain',
    start_url: '/',
    display: 'standalone',
    config: {
      insertFaviconLinks: false,
      insertAppleTouchLinks: true
    }
  }), svelte()],
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, [m2dx, m2dxOptions], remarkCustomMedia],
    rehypePlugins: [[rehypeKatex, {
      // Katex plugin options
    }], rehypeStyleFixes, rehypeLangElement],
    shikiConfig: {
      theme: customTheme,
      langs: []
    }
  }
});