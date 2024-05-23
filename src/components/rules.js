import React from "react";

const rules = 
`Submission Guidelines

Fiction & Creative Non-Fiction
- 3,000 words or less
- 12 font double-spaced 1" margins
- .doc format (no PDFs please)
- Limit 1 submission per category

Art
- Submit a high-quality image of your piece (for instance, if you are submitting a clay piece, do not submit the
  physical piece, only a photograph)
- Up to 3 submissions, any medium.
- Include a polished,100 word or less description of your piece (medium, artist, inspiration, process, etc.) for
  publication.

Poetry
- 12 font
- Limit of 3 short poems (separate documents)
- .doc format (no PDFs)

Script & Screenplay
- 12 pages or less
- 12 font, double-spaced, 1" margins
- .doc format (no PDFs please)
- Limit 1 submission per category

Other Genre
If you have something in an alternative genre and would like to know if it is suitable, contact uwrfprologue@outlook.com  (Examples include comics, song lyrics, etc.)
  `;

  //displays the submission rules
function Rules ( {toggleSubmit, showSubmit} ) {
  return (
    <div className="box">
      <pre dangerouslySetInnerHTML={{ __html: rules }} />
      <button className="submit" onClick={toggleSubmit}>
        {showSubmit ? 'Ready to submit?' : 'Exit Form'}
      </button>
    </div>
    )
  };




  export default Rules