# kibana-json-prettier
Chrome Extension to visualize a prettier version of JSON fields in Kibana (v7.9.2) Discover, inside the document details.


## Instalation
1. Download build from https://github.com/amorillas/kibana-json-prettier
2. Unzip
3. In "chrome://extensions/" ensure enable the developer mode (check the developer mode box)
4. Click on "Load unpacked extension", and select the unzipped folder
5. Configure the extension with the desired Kibana fields you want to pretiffy (by default, data and message)
6. Load or refresh the Kibana page, open the details of a document (row) you want to check


## TODOs
* Improve configuration page UX
* Improve performance
* Package as Chrome extension zip and upload to Chrome Web Store
* Inspect JSON string fields to check if they're JSON and if so, unescape and prettify them too
* Give the ability to open and close JSON objects for better experience
* Clipboard Copy feature
* Make it compatible with different Kibana versions
