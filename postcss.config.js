module.exports = {
	plugins: [
		require("autoprefixer")({
			overrideBrowserslist: [
				"> 1%",
				"last 2 versions",
				"Firefox ESR",
				"not dead",
				"not IE 11",
			],
		}),
		require("cssnano")({
			preset: [
				"default",
				{
					discardComments: {
						removeAll: true,
					},
					normalizeWhitespace: true,
					mergeLonghand: true,
					mergeRules: true,
					minifySelectors: true,
					minifyParams: true,
					minifyFontValues: true,
					colormin: true,
					convertValues: true,
					discardDuplicates: true,
					discardEmpty: true,
					discardOverridden: true,
					discardUnused: false, // Keep false to avoid removing used classes
					reduceIdents: false, // Keep false to avoid breaking animations
					zindex: false, // Keep false to avoid z-index conflicts
				},
			],
		}),
	],
};
