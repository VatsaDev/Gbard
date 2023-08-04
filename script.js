var chatArray = [];

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service_worker.js')
    .then((registration) => {
      console.log('SW Registered!');
    })
    .catch((error) => {
      console.log('SW Registration Failed');
    });
} else {
  console.log('Not supported');
}

async function gquery(data) {
  const url =
    'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDucoz8cp-KDI5_LWXBzbepSc6MN1Ly-Iw';

  var textBody = JSON.stringify({
    prompt: {
      text: `if the users asks for code, return code blocks, with multiline markdown specifying the codes language, otherwise, behave normally. Question: ${
        document.getElementById('questionBar').value
      }`,
    },
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: textBody,
  });

  const gtext = await response.json();
  console.log(gtext);
  console.log(gtext.candidates[0].output);
  var refined = gtext.candidates[0].output;
  if (refined) {
    refined = refined.replace('<', '&lt;');
    refined = refined.replace('>', '&gt;');
    refined = refined.replace('/', '&frasl;');
    refined = refined.replace('```html', '<pre><code class="language-html">');
    refined = refined.replace(
      '```javascript',
      '<pre><code class="language-javascript">'
    );
    refined = refined.replace(
      '```js',
      '<pre><code class="language-javascript">'
    );
    refined = refined.replace('```css', '<pre><code class="language-css">');
    refined = refined.replace('```', '</pre></code>');
    chatArray.push(`<p>${refined}</p>`);
    chatArray.push('output');
    render();
  }
}

function query() {
  chatArray.push(`<p>${refineQuery()}</p>`);
  chatArray.push('input');
  gquery();
}

function refineQuery() {
  var refined = document.getElementById('questionBar').value;
  if (refined) {
    refined = refined.replace('<', '&lt;');
    refined = refined.replace('>', '&gt;');
    refined = refined.replace('/', '&frasl;');
    console.log(refined);
    return refined;
  } else {
    console.log(document.getElementById('questionBar').value);
  }
}

function render() {
  document.getElementById('queries').innerHTML = '';
  for (let i = 0; i < chatArray.length; i += 2) {
    document.getElementById('queries').innerHTML += chatArray[i];
    hljs.highlightAll();
  }
}
