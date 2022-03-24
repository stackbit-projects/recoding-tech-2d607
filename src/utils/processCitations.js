// properly processes a citation's authors and publication for display
// the 'reading' argument here is a citation in the database

export default function process(reading) {
  // per https://github.com/ResetNetwork/recoding-tech/issues/103#issuecomment-1077674309
  // we're not including authors in the display, i'm commenting it out for now in case we want it in the future
   
  // let authors;
  // if (reading.creators && reading.creators.length === 1) {
  //   authors = `${reading.creators[0].firstName} ${reading.creators[0].lastName}`;
  // } else if (reading.creators && reading.creators.length > 1) {
  //   authors = `${reading.creators[0].firstName} ${reading.creators[0].lastName}, et al`;
  // }

  let publication;
  if (reading.websiteTitle) publication = reading.websiteTitle;
  if (reading.publicationTitle) publication = reading.publicationTitle;
  if (reading.institution) publication = reading.institution;
  if (reading.publisher) publication = reading.publisher;
  if (reading.blogTitle) publication = reading.blogTitle;
  if (!!reading.place && !!reading.institution)
    publication = reading.institution + ", " + reading.place;
  if (!reading.institution && !!reading.place) publication = reading.place;

  // if (authors && publication) return authors + ` - ` + publication;
  // if (authors && !publication) return authors;
  if (publication) return publication;
}
