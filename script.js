var chatArray = [];

function render() {}
function query() {}

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
  //console.log(gtext.candidates[0].output);
  document.getElementById('editor').value = gtext.candidates[0].output;
  //document.getElementById('naraBtn').disabled = false; its a demo
}

var btnText = 'narrate';

function narrate() {
  gquery(postContent);
}
