// Clearline Support — help center (study code)
// COURSE SKILL IN USE: data driven rendering, derived state, and persistence.
// The article shelf is ONE array of article objects. Cards, counts, search,
// category filtering and sorting are all DERIVED from that array plus the
// current filter state. Nothing about the visible list is stored.
// Helpful votes persist in localStorage so a reader vote survives a reload.
var ARTICLES = [
  { id:"first-invoice", cat:"Getting Started", mins:4, helpful:128, img:"images/workspace.jpg", alt:"A calm desk with a laptop, notebook and coffee",
    title:"Create your first invoice in five minutes",
    summary:"From a blank account to a sent invoice, with the three fields clients actually read first.",
    steps:["Open Invoices and choose New invoice. Pick your client from the list, or type a name to add them on the spot.","Add one line for the work. Write it the way you would say it out loud, like Design work for October, not Service rendered.","Check the total and the due date. Seven or fourteen days is normal for a first invoice.","Choose Send. Your client gets an email with a Pay button, and you get a copy for your records.","Watch the invoice move from Sent to Viewed to Paid on your dashboard. Viewed means they opened it, nothing more, nothing less."] },
  { id:"business-details", cat:"Getting Started", mins:3, helpful:86, img:"images/workspace.jpg", alt:"A calm desk with a laptop, notebook and coffee",
    title:"Add your business details and logo",
    summary:"Your name, address and logo appear on every invoice. Set them once and they carry everywhere.",
    steps:["Open Settings, then Business details.","Type your business name exactly as it appears on your bank account, so payments match without questions.","Add the address you want clients to see. A mailing address is fine.","Upload your logo as a PNG or JPG. Keep it under 2 MB and it will print cleanly on PDFs.","Send yourself a test invoice to check how it looks before a client sees it."] },
  { id:"invite-teammate", cat:"Getting Started", mins:3, helpful:54, img:"images/workspace.jpg", alt:"A calm desk with a laptop, notebook and coffee",
    title:"Invite a teammate and set what they can see",
    summary:"Give a bookkeeper or partner access without handing over your password or your whole account.",
    steps:["Open Settings, then Team, and choose Invite.","Enter their email address. They get their own sign in, never yours.","Pick a role. Viewer can look but not change. Editor can create and send invoices. Admin can also change billing.","They accept from the email within seven days. The invite expires after that and can be resent.","Remove access any time from the same Team page. Their past work stays in your records."] },
  { id:"update-payment", cat:"Billing", mins:2, helpful:142, img:"images/paperwork.jpg", alt:"A woman writing on a document on a clipboard beside a laptop",
    title:"Update your payment method",
    summary:"Change the card Clearline charges in under a minute, and see exactly when the new card takes over.",
    steps:["Open Settings, then Billing, and choose Update payment method.","Enter the new card. We check it with a zero amount hold that drops off on its own.","The new card is used from your next bill date. Nothing is charged the moment you change it.","The old card is removed as soon as the new one is confirmed. We never keep both.","You get an email confirmation. If it does not arrive in ten minutes, check spam, then send us a ticket."] },
  { id:"read-your-bill", cat:"Billing", mins:5, helpful:97, img:"images/paperwork.jpg", alt:"A woman writing on a document on a clipboard beside a laptop",
    title:"Understand your monthly bill line by line",
    summary:"Every line on a Clearline bill, in plain words, including the ones that look like duplicates but are not.",
    steps:["Plan line: your monthly plan for the month that just started. It is charged in advance.","Seats line: one line per active teammate. Invited people who never accepted are never charged.","Tax line: sales tax for your state, shown on its own line so your records match.","Credit line: if a payment failed and you fixed it late last month, any credit appears here, never hidden inside another line.","Download the PDF from Billing, then History, if your accountant wants the same copy we see."] },
  { id:"failed-payment", cat:"Billing", mins:4, helpful:163, img:"images/paperwork.jpg", alt:"A woman writing on a document on a clipboard beside a laptop",
    title:"Fix a failed payment without losing your data",
    summary:"A failed payment pauses sending, never deletes anything. Here is the calm order to fix it in.",
    steps:["Do not create a new account. Your invoices, clients and records stay exactly where they are for 30 days.","Open Settings, then Billing. The failed amount and the reason your bank gave are shown at the top.","Fix the card, or add a different one, then choose Retry payment.","Sending turns back on within a few minutes of a successful retry.","If your bank declined twice, call the number on your card and approve Clearline by name, then retry once more."] },
  { id:"kind-reminder", cat:"Invoices", mins:4, helpful:118, img:"images/colleagues.jpg", alt:"Two colleagues talking through a problem at a desk with a laptop",
    title:"Send a payment reminder that sounds like you",
    summary:"Use your own words, keep the relationship, and still get paid. Includes the exact wording most owners use.",
    steps:["Open the overdue invoice and choose Send reminder.","Start from the short template, then change one line so it sounds like you. One personal line is enough.","A wording that works: Hello, this is a gentle note that invoice 104 is still open. The payment link is below, and thank you for the work together.","Send once, then wait a full week. Two reminders in one week feel like pressure, not a reminder.","If there is still no reply, send a ticket to us before you send a third note. We can check whether the email was delivered."] },
  { id:"partial-payment", cat:"Invoices", mins:3, helpful:73, img:"images/colleagues.jpg", alt:"Two colleagues talking through a problem at a desk with a laptop",
    title:"Record a partial payment on an invoice",
    summary:"When a client pays part now and part later, record it as a partial payment instead of editing the total.",
    steps:["Open the invoice and choose Record payment.","Enter the amount you actually received, and the date it landed.","Choose Partial payment. The invoice stays open and shows the balance still due.","The client receipt shows both numbers: paid so far, and what is left.","Repeat the same steps for the second payment. The invoice closes itself when the balance reaches zero."] },
  { id:"void-invoice", cat:"Invoices", mins:2, helpful:61, img:"images/colleagues.jpg", alt:"Two colleagues talking through a problem at a desk with a laptop",
    title:"Void an invoice you sent by mistake",
    summary:"Voiding keeps the record honest. Deleting is not an option, and here is why that protects you.",
    steps:["Open the invoice and choose Void from the menu at the top right.","Tell us the reason in one line, like Sent to the wrong client. It appears on the record.","Your client gets a short email saying the invoice was voided, so they never pay it by accident.","The invoice number is never reused. Gaps in numbering are normal and accountants expect them.","Create the corrected invoice as a new invoice. It gets the next number in line."] },
  { id:"reset-password", cat:"Account", mins:3, helpful:151, img:"images/keyboard.jpg", alt:"Close up of hands typing on a laptop keyboard",
    title:"Reset your password and turn on two step sign in",
    summary:"Locked out, or just being careful. Reset your password, then add the second step that stops most break ins.",
    steps:["On the sign in page, choose Forgot password and enter your account email.","Open the reset email within one hour. After an hour the link expires and you can request a fresh one.","Choose a password of at least 12 characters that you do not use anywhere else.","Then open Settings, then Security, and turn on two step sign in with an authenticator app.","Save the backup codes somewhere safe and offline. They are the only way back in if you lose your phone."] },
  { id:"change-email", cat:"Account", mins:3, helpful:48, img:"images/keyboard.jpg", alt:"Close up of hands typing on a laptop keyboard",
    title:"Change the email address on your account",
    summary:"Both the old and new addresses confirm the change, so an account can never be moved by one inbox alone.",
    steps:["Sign in with the old address, then open Settings, then Account.","Choose Change email and type the new address carefully.","We email the new address a confirmation link and the old address a notice.","Open the confirmation link within 24 hours. Until then, sign in still works with the old address.","After the change, update the email on any saved sign in or password manager entry."] },
  { id:"export-records", cat:"Account", mins:5, helpful:109, img:"images/keyboard.jpg", alt:"Close up of hands typing on a laptop keyboard",
    title:"Export your records before tax season",
    summary:"One file with invoices, payments and expenses that your accountant can open in any spreadsheet.",
    steps:["Open Reports, then Export records.","Pick the tax year. The file covers January 1 to December 31 of that year.","Choose CSV for a spreadsheet, or PDF copies if your accountant wants the invoices themselves.","Choose Export. Big accounts can take a few minutes; we email you when the file is ready.","Check the totals on the summary page against your bank deposits before you hand it over."] }
];

var state = { cat:"All", q:"", sort:"helpful" };
var votes = {};
try { votes = JSON.parse(localStorage.getItem("clearline_votes") || "{}"); } catch(e){ votes = {}; }

function visibleArticles(){
  var list = ARTICLES.filter(function(a){
    var inCat = state.cat === "All" || a.cat === state.cat;
    var text = (a.title + " " + a.summary + " " + a.cat).toLowerCase();
    return inCat && text.indexOf(state.q.toLowerCase()) !== -1;
  });
  if (state.sort === "helpful") list.sort(function(x,y){ return (y.helpful + (votes[y.id]?1:0)) - (x.helpful + (votes[x.id]?1:0)); });
  if (state.sort === "az") list.sort(function(x,y){ return x.title.localeCompare(y.title); });
  if (state.sort === "short") list.sort(function(x,y){ return x.mins - y.mins; });
  return list;
}

function render(){
  var grid = document.getElementById("articleGrid");
  var list = visibleArticles();
  document.getElementById("resultCount").textContent = list.length + (list.length === 1 ? " article" : " articles");
  if (!list.length){
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><h3>No article matches that yet</h3><p>Try a shorter word, like bill, invoice or password, or send a ticket and a person will answer.</p></div>';
    return;
  }
  grid.innerHTML = list.map(function(a){
    return '<article class="card"><img src="' + a.img + '" alt="' + a.alt + '">' +
      '<div class="card-body"><span class="tag">' + a.cat + '</span><h3>' + a.title + '</h3><p>' + a.summary + '</p>' +
      '<div class="card-meta"><span>' + a.mins + ' min read</span><span>' + (a.helpful + (votes[a.id]?1:0)) + ' found this helpful</span></div>' +
      '<button class="btn btn-small" type="button" data-open="' + a.id + '">Read article</button></div></article>';
  }).join("");
  grid.querySelectorAll("[data-open]").forEach(function(b){
    b.addEventListener("click", function(){ openArticle(b.getAttribute("data-open")); });
  });
}

function openArticle(id){
  var a = null;
  ARTICLES.forEach(function(x){ if (x.id === id) a = x; });
  if (!a) return;
  document.getElementById("modalTag").textContent = a.cat + " · " + a.mins + " min read";
  document.getElementById("modalTitle").textContent = a.title;
  document.getElementById("modalSteps").innerHTML = a.steps.map(function(s){ return "<li>" + s + "</li>"; }).join("");
  var yesBtn = document.getElementById("voteYes");
  var msg = document.getElementById("voteMsg");
  if (votes[a.id]){
    yesBtn.disabled = true;
    msg.textContent = "Thank you. You marked this article helpful.";
  } else {
    yesBtn.disabled = false;
    msg.textContent = "";
    yesBtn.onclick = function(){
      votes[a.id] = true;
      try { localStorage.setItem("clearline_votes", JSON.stringify(votes)); } catch(e){}
      yesBtn.disabled = true;
      msg.textContent = "Thank you. You marked this article helpful.";
      render();
    };
  }
  document.getElementById("articleModal").classList.add("open");
}
function closeArticle(){ document.getElementById("articleModal").classList.remove("open"); }

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("statusTime").textContent = new Date().toLocaleTimeString([], {hour:"numeric", minute:"2-digit"});
  document.querySelectorAll(".chip[data-cat]").forEach(function(chip){
    chip.addEventListener("click", function(){
      document.querySelectorAll(".chip[data-cat]").forEach(function(c){ c.classList.remove("active"); });
      chip.classList.add("active");
      state.cat = chip.getAttribute("data-cat");
      render();
    });
  });
  var search = document.getElementById("searchInput");
  search.addEventListener("input", function(){ state.q = search.value.trim(); render(); });
  document.getElementById("heroSearch").addEventListener("input", function(){
    search.value = document.getElementById("heroSearch").value;
    state.q = search.value.trim(); render();
  });
  document.getElementById("sortSelect").addEventListener("change", function(e){ state.sort = e.target.value; render(); });
  document.getElementById("modalClose").addEventListener("click", closeArticle);
  document.getElementById("articleModal").addEventListener("click", function(e){ if (e.target === e.currentTarget) closeArticle(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeArticle(); });
  render();
});
