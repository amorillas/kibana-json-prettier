"use strict";

const markClass = "kibana-json-prettier__prettified";

// Kudos to https://stackoverflow.com/users/27862/user123444555621 for the syntaxHighlight function
// https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript
const syntaxHighlight = (json) => {
  if (typeof json != 'string') {
       json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}

const pretifyTextInElement = (element) => {
  try {
    const json = JSON.parse(element.innerText);
    element.innerHTML = syntaxHighlight(json);
    element.classList.add(markClass);
  } catch(e) {}
}

const findFieldValueElementsInDocViewer = () => {
  chrome.storage.sync.get("columns", function(data) {
    const columns = data.columns.split(",");
    for (const i in columns) {
      const fieldValues = Array.from(
        document.querySelectorAll(".kbnDocViewer__value[data-test-subj=tableDocViewRow-" + columns[i].trim() + "-value]:not(." + markClass + ")")
      );
      for (const j in fieldValues) {
        pretifyTextInElement(fieldValues[j]);
      }
    }
  });
}

const handleMutation = async (mutations, observer) => {
  findFieldValueElementsInDocViewer();
}

const target = document.getRootNode();
const observer = new MutationObserver(handleMutation);
observer.observe(target, {
  subtree: true,
  childList: true,
});