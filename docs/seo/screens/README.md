# Screenshots from the demo gym

Put real screenshots here, from a demo gym with invented data only. Never a real member, payment or photo.

Name each file with the two-digit number from the list in `TODO_FOR_SUMIT.md` (section 20) and any label, for example
`01-owner-home.png`. PNG, JPG or WebP. Phones: the Android screen as captured (about 1080 x 2340). Desktop: a browser
window at 1440 x 900.

Then run `node scripts/process-screens.mjs`. It writes optimised WebP and AVIF files and the width/height manifest into
`public/screens/`, and the frames on the site pick them up. Files in this folder are inputs and are not served.
