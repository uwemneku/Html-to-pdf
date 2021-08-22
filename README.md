
# HTML-PDF
[Live site](https://html-to-pdf-gules.vercel.app/)

This project is similar to an online resume builder. Pdf templates created with [React-to-pdf](https://react-pdf.org/) is used to generate a document ready for download and printitng (using [print.js](https://printjs.crabbly.com/)) all on the client side.  

In other to boost performance, the pdf is not rendered on the screen, instead Material UI is used to duplicate the template, making it possible for users to see live updates as changes are made to the input fields. 

The pdf template created with [React-to-pdf](https://react-pdf.org/) and its Material-Ui duplicate are located in the same folder and share the same state. This help to make the pdf generation faster.

## Todo
- [ ] Use redux for state management
- [ ] Organise Folders and pages
- [ ] Add a better landing page
- [X] Add theme for documents
- [ ] clean up code



## Screenshots

![Preview](https://i.ibb.co/d4FgyMG/Screenshot-143.png)

  
## Tech Stack

**Client:** React, Redux, Material-ui, React-Pdf, Print.js

**Server:** None

  
## Installation


```bash
  git clone https://github.com/uwemneku/Html-to-pdf.git
  yarn install
  yarn start
```


    
