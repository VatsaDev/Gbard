var chatArray = [];

async function gquery(data) {
  const url =
    'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDucoz8cp-KDI5_LWXBzbepSc6MN1Ly-Iw';

  var textBody = '{ "prompt": { "text": "' + data + '"} }';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: textBody,
  });

  const gtext = await response.json();

  chatArray.push(gtext.candidates[0].output);
  render()
}

function query(input) {
  chatArray.push(input);
  gquery(input);
}

function render() {
  for (let i = 0; i < chatArray.length; i++) {
    document.getElementById('queries') += chatArray[i];
  }
}
