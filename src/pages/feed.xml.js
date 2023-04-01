import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function get(context) {
	const posts = await getCollection('blog');
	const blog = posts.filter((post) => post.data.visible);
	return rss({
		title: "MIRTH.CC",
		description: "Lumirth's beloved garbage agglomerate",
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			customData: post.data.customData,
			content: sanitizeHtml(parser.render(post.body)),
			link: `/blog/${post.slug}/`,
		  })),
	  
	});
}
