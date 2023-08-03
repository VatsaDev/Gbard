var chatArray = [];

async function gquery(data) {
  const url =
    'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDucoz8cp-KDI5_LWXBzbepSc6MN1Ly-Iw';

  var textBody = JSON.stringify({
    prompt: { text: document.getElementById('questionBar').value },
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: textBody,
  });

  const gtext = await response.json();
  console.log(gtext.candidates[0].output);
  chatArray.push(`<p>${gtext.candidates[0].output}</p>`);
  chatArray.push('output');
  render();
}

function query() {
  chatArray.push(`<p>${document.getElementById('questionBar').value}</p>`);
  chatArray.push('input');
  console.log(chatArray);
  gquery();
}

function render() {
  for (let i = 0; i < chatArray.length; i++) {
    document.getElementById('queries').innerHTML += chatArray[i];
  }
}
