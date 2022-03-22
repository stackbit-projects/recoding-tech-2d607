// properly processes a citation's authors and publication for display
// the 'reading' argument here is a citation in the database
export default function process(reading) {
  let authors;
  if (reading.creators && reading.creators.length === 1) {
    authors = `${reading.creators[0].firstName} ${reading.creators[0].lastName}`;
  } else if (reading.creators && reading.creators.length > 1) {
    authors = `${reading.creators[0].firstName} ${reading.creators[0].lastName}, et al`;
  }

  let publication;
  if (reading.websiteTitle) publication = reading.websiteTitle;
  if (reading.publicationTitle) publication = reading.publicationTitle;
  if (reading.institution) publication = reading.institution;
  if (reading.publisher) publication = reading.publisher;
  if (reading.blogTitle) publication = reading.blogTitle;

  if (authors && publication) return authors + ` - ` + publication;
  if (authors && !publication) return authors;
  if (publication && !authors) return publication;
}
