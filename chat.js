// Clearline Support — shared chat widget (study code)
// COURSE SKILL IN USE: data driven rendering and derived state, in plain JavaScript.
// The chat assistant is a small keyword matcher. It is honest in the UI that
// these are automatic answers from the help articles, not a live person.
// State lives in memory only for chat; tickets and votes persist in localStorage.
(function(){
  var REPLIES = [
    { keys:["bill","billing","charge","charged","payment method"], text:"For billing, open the article called Understand your monthly bill line by line. It explains every line, and the article called Update your payment method shows where to change your card. If a charge still looks wrong, send a ticket under Billing and we will trace it with you." },
    { keys:["password","sign in","signin","log in","login","locked"], text:"For sign in trouble, the article called Reset your password and turn on two step sign in walks through it step by step. Use the reset link on the sign in page first, then check your spam folder for a message from Clearline." },
    { keys:["invoice","remind","reminder","late"], text:"For invoices, start with Create your first invoice in five minutes, or Send a payment reminder that sounds like you if a client is late. You can also record a partial payment instead of editing the invoice total." },
    { keys:["export","tax","download","records"], text:"For records, the article called Export your records before tax season shows how to download invoices, payments and expenses as one file your accountant can open." },
    { keys:["human","person","agent","call","phone"], text:"A person is the right call for account changes and anything about money. Use the Contact page to request a callback, or send a ticket and choose High priority if you are locked out." },
    { keys:["price","cost","plan","plans"], text:"Clearline has one simple plan and the billing articles explain it in plain words, including what happens if a payment fails. Nothing is charged again until you say so." }
  ];
  var FALLBACK = "I can point you to the right article. Try a word like billing, password, invoice or export, or browse the help articles on this page. For anything about your own account, a ticket gets a person involved.";

  function replyFor(text){
    var lower = text.toLowerCase();
    for (var i=0;i<REPLIES.length;i++){
      for (var j=0;j<REPLIES[i].keys.length;j++){
        if (lower.indexOf(REPLIES[i].keys[j]) !== -1) return REPLIES[i].text;
      }
    }
    return FALLBACK;
  }

  var btn = document.createElement("button");
  btn.className = "chat-btn"; btn.type = "button"; btn.id = "chatBtn"; btn.textContent = "Chat with us";
  var panel = document.createElement("div");
  panel.className = "chat-panel"; panel.id = "chatPanel";
  panel.innerHTML = '<div class="chat-head">Clearline automatic answers</div>' +
    '<div class="chat-log" id="chatLog"></div>' +
    '<form class="chat-form" id="chatForm"><input id="chatInput" type="text" placeholder="Type your question" aria-label="Type your question"><button class="btn btn-small" type="submit">Send</button></form>' +
    '<p class="note" style="padding:0 12px 10px">Automatic answers from our help articles. For a person, send a ticket or request a callback.</p>';
  document.body.appendChild(btn); document.body.appendChild(panel);

  var log = panel.querySelector("#chatLog");
  function addMsg(text, who){
    var d = document.createElement("div");
    d.className = "chat-msg " + who; d.textContent = text;
    log.appendChild(d); log.scrollTop = log.scrollHeight;
    return d;
  }
  var greeted = false;
  btn.addEventListener("click", function(){
    panel.classList.toggle("open");
    if (panel.classList.contains("open") && !greeted){
      greeted = true;
      addMsg("Hello. I match your question to our help articles. What are you trying to do today?", "bot");
    }
  });
  panel.querySelector("#chatForm").addEventListener("submit", function(e){
    e.preventDefault();
    var input = panel.querySelector("#chatInput");
    var text = input.value.trim();
    if (!text) return;
    addMsg(text, "me"); input.value = "";
    var typing = addMsg("Looking that up...", "bot");
    setTimeout(function(){
      typing.textContent = replyFor(text);
      log.scrollTop = log.scrollHeight;
    }, 600);
  });
})();
