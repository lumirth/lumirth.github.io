import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import m2dx from 'astro-m2dx';
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import rehypeKatex from "rehype-katex";
import addClasses from 'rehype-add-classes';
import turbolinks from "@astrojs/turbolinks"; // will be deprecated eventually
import image from "@astrojs/image";
import webmanifest from "astro-webmanifest";
// import compress from "astro-compress";

import customTheme from './monokai.json';


/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
  styleDirectives: true
};

export default defineConfig({
  site: "https://example.com",
  integrations: [
    mdx(),
    sitemap(),
    turbolinks(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    webmanifest({
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
    })
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkDirective,
      [m2dx, m2dxOptions]
    ],
    rehypePlugins: [
      [rehypeKatex, {
        // Katex plugin options
      }],
      [addClasses, {
        'a': 'link link--gasping',
        'blockquote': 'blockquote',
        'code': 'code',
        'hr': 'hori-line',
        'table': 'table',
      }]
    ],
    shikiConfig: {
      theme: customTheme,
      langs: []
    }
  }
});
