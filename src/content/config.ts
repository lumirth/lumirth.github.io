import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional(),
		visible: z.boolean().default(true),
	}),
});

const work = defineCollection({
	schema: z.object({
	  title: z.string(),
	  description: z.string(),
	  pubDate: z
		.string()
		.or(z.date())
		.transform((val) => new Date(val)),
	  updatedDate: z
		.string()
		.optional()
		.transform((str) => (str ? new Date(str) : undefined)),
	  banner_source: z.string().optional(),
	  image_source: z.string().optional(),
	  image_alt: z.string().optional(),
	  tags_icon: z.array(z.string()),
	  tags_text: z.array(z.string()),
	  visible: z.boolean().default(true),
	}),
});

export const collections = { blog, work };