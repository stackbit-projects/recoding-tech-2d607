// First, we must import the schema creator
// import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
// import schemaTypes from "all:part:@sanity/base/schema-type";

// Import user defined schema types
import config from './config.js'
import header from './header.js'
import footer from './footer.js'
import advanced from './advanced.js'
import contact_submission from './contact_submission.js'
import creators from './creators.js'
import citation from './citation.js'
import article from './article.js'
import file from './file.js'
import page from './page.js'
import person from './person.js'
import guide from './guide.js'
import policy_action from './policy_action.js'
import portable_text from './portable_text.js'
import section_hero from './section_hero.js'
import section_block from './section_block.js'
import section_citations from './section_citations.js'
import section_contributors from './section_contributors.js'
import section_articles from './section_articles.js'
import section_content from './section_content.js'
import section_form from './section_form.js'
import section_policy_actions from './section_policy_actions'
import section_guides from './section_guides'
import section_library from './section_library.js'
import section_podcast from './section_podcast.js'
import section_search from './section_search.js'
import section_sign_up from './section_sign_up.js'
import section_topics from './section_topics.js'
import section_tracker from './section_tracker.js'
import sidebar_about from './sidebar_about.js'
import topic from './topic.js'
import action from './action.js'
import form_field from './form_field.js'
import stackbit_page_meta from './stackbit_page_meta.js'

// new models
import post from './post.js'
import author from './author.js'
import iframeEmbed from './iframeEmbed.js'
import customHtml from './customHtml.js'
import tag from './tag.js'
import dropdown_option from './dropdown_option.js'
import newsletter_topic from './newsletter_topic.js'


// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [
  /* Your types here! */ config,
  // contact_submission,
  header,
  footer,
  advanced,
  // article,
  author,
  creators,
  citation,
  dropdown_option,
  file,
  // guide,
  iframeEmbed,
  customHtml,
  page,
  // person,
  post,
  policy_action,
  portable_text,
  section_hero,
  section_articles,
  section_block,
  section_citations,
  section_content,
  section_contributors,
  section_form,
  // section_guides,
  section_library,
  section_podcast,
  section_search,
  section_sign_up,
  section_topics,
  section_tracker,
  section_policy_actions,
  sidebar_about,
  newsletter_topic,
  tag,
  topic,
  action,
  form_field,
  stackbit_page_meta,
]
