<script>{
	"title": "Style Guide",
	"attribution": [ "jorydotcom <jory@bocoup.com>" ],
	"customFields": [
		{
			"key": "is_chapter",
			"value": 0
		}
	]
}</script>

## Formatting Conventions

Articles in the learn site are authored with [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/), and the beginning of each article contains some JSON "front matter" that contains metadata used when the article is published.

### Article Header Metadata

Each article should have the following header (see below as some metatags are optional):

```
<script>{
	"title": <article title>,
	"level": [beginner|intermediate|advance],
	"source": <url of source of the material derived>,
	"attribution": [
		"Ralph Whitbeck <ralph@email.com>",
		"John Paul <john@email.com>"
	]
}</script>
```

The `source` and `attribution` properties are optional, and should be used primarily if you are importing an article from an outside source where it was published before being donated for inclusion in the learn site. You should **not** include these properties if you are writing a new article or editing an existing one.

### Code Blocks

Code blocks should be set off with triple backticks and should **not** be indented. (That is to say, the site prefers the use of "fenced blocks" notation supported by [gfm](http://github.github.com/github-flavored-markdown/).)

## Writing Style

Content should be educational and accessible to a broad audience of developers. The primary target audience is beginning to intermediate jQuery users, with advanced jQuery users as a secondary audience. When creating content for this site, please keep one of these audiences in mind as well as the following style guidelines:

### Prose & Grammar

- Use the Oxford comma in a list of three or more items:
	- **Yes:** The `load`, `scroll`, and `error` events (e.g. on an `<img>` element) do not bubble.
	- **No:** The `load`, `scroll` and `error` events (e.g. on an `<img>` element) do not bubble.
- Numbers:
	- Spell out numbers below 10 (e.g. one, two, three)
	- Use numerals for numbers 10 and above (e.g. 10, 20, 100).
- Abbreviations:
	- Spell out abbreviated words on first reference, followed by the abbreviation in parentheses. Use abbreviations on second reference.

#### Code Within Prose

- Always use a `code` tag to denote code from prose.
- Properties: use a dot, followed by the property name, e.g. `.length`.
- Functions: use the function name, followed by parentheses, e.g. `myfunction()`.
- Methods: use a dot, followed by the method name, followed by parentheses, e.g. The `.focus()` method is a shortcut for the `.bind( "focus", handler )` in the first and second variations, and `.trigger( "focus" )` in the third.

#### Article & Sentence Structure

- Use headings to break up content into easier-to-read sections. Begin headings within an article with `<h2>`.
- Keep sentences short and to the point. A good rule-of-thumb is to break up any sentence longer than 21 words into two or more separate thoughts.
- Lists:
	- Use bulleted lists when necessary to share a series of five or more points.
	- Use numbered lists only when providing step-by-step instruction – note that this should be avoided.
	- Use a period at the end of each ordered list item, and a period or comma at the end of an unordered list item.

#### Spelling

- Use standard American English spelling.
- Capitalization:
	- Capitalize all proper nouns.
	- Do not capitalize HTML elements in code examples.
	- Capitalize all words in a heading or sub-heading with the exception of article adjectives and the prepositions like "with," "of," or "to."
	- Capitalize the first word in a list.
- Punctuation:
	- Periods and commas go inside quotation marks.
	- Avoid using semicolons.

#### Pronoun Usage

- Don't use "I," "me," "us," "our," "we," and gender-specific pronouns such as "him" or "she."
- Use the second-person pronoun "you" when addressing the reader, and the definite article "the" when addressing code or content:
	- *"You will be able to foo bar after you bar the foo."*
	- *"Insert the paragraph after the unordered list."*

#### Voice & Tone

- Do write in clear, easy-to-understand statements.
- Do write in active voice.
- Do keep the audience in mind while writing.
- Do write conversationally.
- Do write in the second person to address the reader.
- Do use the imperative mood.
- Do use humor strategically. When in doubt, err on the side of formality.
- Do use hyperlinks to refer readers to concepts or topics that have been covered in other sections.
- Do attribute others.
- Don't assume the reader will have prior knowledge of topics or concepts, especially when targeting beginner or intermediate audiences.
- Don't use rhetorical questions.
- Don't write in first or third person.

#### Linking & Referencing Content

- Link to relevant content within the learn.jquery.com site to refer readers to previously covered topics or concepts.
- Link to the jQuery blog or API documentation when necessary.
- Use inline hyperlinks to reference relevant content.
- Acceptable external resources:
	- [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
	- [Webplatform.org](http://www.webplatform.org/)
	- [htmldog.com](http://www.htmldog.com/)

### Code Examples

- Use examples to illustrate important concepts.
- Examples should indicate what the expected result will be in comments before code is presented.
- Break long examples up into shorter sections to aid comprehension.
- Favor "Right Way" examples over "Wrong Way" examples – there is more than one wrong way to do something, after all.
- Use good comments so that explanation within prose isn't necessary.
- Test your code examples before submitting.
- Use the [jQuery Core Code Style Guide](http://docs.jquery.com/JQuery_Core_Style_Guidelines) for your code examples.
