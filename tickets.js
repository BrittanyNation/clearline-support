// Clearline Support — ticket desk (study code)
// COURSE SKILL IN USE: state plus persistence, and validated forms.
// Tickets are an array of objects saved to localStorage on EVERY change and
// restored on load, so a ticket survives page changes and reloads.
// Ticket references are generated, never typed by the visitor.
// This is a static demo: tickets live in this browser only, and the UI says so.
var KEY = "clearline_tickets";
var tickets = [];
try { tickets = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch(e){ tickets = []; }
var selectedRef = null;
var statusFilter = "All";

function save(){ try { localStorage.setItem(KEY, JSON.stringify(tickets)); } catch(e){} }
function makeRef(){
  var ref;
  do { ref = "CL-" + Math.floor(100000 + Math.random()*900000); }
  while (tickets.some(function(t){ return t.ref === ref; }));
  return ref;
}
function esc(s){
  return String(s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; });
}
function pill(status){
  var cls = status === "Open" ? "status-open" : status === "In Progress" ? "status-progress" : status === "Resolved" ? "status-resolved" : "status-closed";
  return '<span class="status-pill ' + cls + '">' + status + '</span>';
}
function findTicket(ref){ var f=null; tickets.forEach(function(t){ if(t.ref===ref) f=t; }); return f; }

function renderList(){
  var q = document.getElementById("lookupInput").value.trim().toLowerCase();
  var list = tickets.filter(function(t){
    var inStatus = statusFilter === "All" || t.status === statusFilter;
    var text = (t.ref + " " + t.email + " " + t.subject).toLowerCase();
    return inStatus && (!q || text.indexOf(q) !== -1);
  });
  document.getElementById("ticketCount").textContent = list.length + (list.length===1 ? " ticket" : " tickets");
  var box = document.getElementById("ticketList");
  if (!tickets.length){
    box.innerHTML = '<div class="empty"><h3>No tickets yet</h3><p>Send your first ticket with the form and it will appear here, in this browser, ready to track.</p></div>';
    return;
  }
  if (!list.length){
    box.innerHTML = '<div class="empty"><h3>Nothing matches that search</h3><p>Try a ticket reference like CL-123456, or the email used on the ticket.</p></div>';
    return;
  }
  box.innerHTML = list.map(function(t){
    return '<button type="button" class="ticket-item' + (t.ref===selectedRef ? " selected" : "") + '" data-ref="' + t.ref + '">' +
      pill(t.status) + '<h3>' + esc(t.subject) + '</h3>' +
      '<span class="note">' + t.ref + ' · ' + esc(t.category) + ' · ' + esc(t.priority) + ' priority · ' + t.messages.length + (t.messages.length===1 ? " message" : " messages") + '</span></button>';
  }).join("");
  box.querySelectorAll("[data-ref]").forEach(function(b){
    b.addEventListener("click", function(){ selectedRef = b.getAttribute("data-ref"); renderList(); renderDetail(); });
  });
}

function renderDetail(){
  var wrap = document.getElementById("ticketDetail");
  var t = selectedRef ? findTicket(selectedRef) : null;
  if (!t){
    wrap.innerHTML = '<div class="empty"><h3>Pick a ticket</h3><p>Choose a ticket on the left to read the full conversation, add a reply, or close it.</p></div>';
    return;
  }
  var msgs = t.messages.map(function(m){
    return '<div class="msg ' + (m.who === "You" ? "you" : "support") + '"><span class="who">' + m.who + ' · ' + m.when + '</span><p>' + esc(m.text) + '</p></div>';
  }).join("");
  var closed = t.status === "Closed";
  wrap.innerHTML = '<div class="thread"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">' + pill(t.status) +
    '<strong style="font-family:Verdana,sans-serif;color:var(--slate)">' + t.ref + '</strong>' +
    '<span class="note">' + esc(t.category) + ' · ' + esc(t.priority) + ' priority · for ' + esc(t.name) + ' (' + esc(t.email) + ')</span></div>' +
    '<h3 style="color:var(--slate)">' + esc(t.subject) + '</h3>' + msgs +
    (closed
      ? '<p class="note">This ticket is closed. Send a new ticket if the problem comes back, and mention ' + t.ref + ' so we can find the history fast.</p>'
      : '<form id="replyForm"><div class="field"><label for="replyText">Add a reply</label><textarea id="replyText" rows="3" placeholder="Add anything that helps, like an invoice number or what changed"></textarea><div class="error" id="replyError"></div></div>' +
        '<button class="btn btn-small" type="submit">Send reply</button> ' +
        '<button class="btn btn-small btn-ghost" type="button" id="closeTicket">Close ticket</button> ' +
        '<button class="btn btn-small btn-ghost" type="button" id="resolveTicket">Mark resolved</button></form>') +
    '</div>';
  if (!closed){
    document.getElementById("replyForm").addEventListener("submit", function(e){
      e.preventDefault();
      var text = document.getElementById("replyText").value.trim();
      if (text.length < 3){
        document.getElementById("replyError").textContent = "Write a few words so support knows what changed.";
        return;
      }
      t.messages.push({ who:"You", text:text, when:new Date().toLocaleString([], {month:"short", day:"numeric", hour:"numeric", minute:"2-digit"}) });
      if (t.status === "Open"){
        t.status = "In Progress";
        t.messages.push({ who:"Clearline Support", text:"Thank you, we have your update. A support specialist is now working on this ticket in this demo, and replies land here within one business day.", when:new Date().toLocaleString([], {month:"short", day:"numeric", hour:"numeric", minute:"2-digit"}) });
      }
      save(); renderList(); renderDetail();
    });
    document.getElementById("closeTicket").addEventListener("click", function(){ t.status = "Closed"; save(); renderList(); renderDetail(); });
    document.getElementById("resolveTicket").addEventListener("click", function(){ t.status = "Resolved"; save(); renderList(); renderDetail(); });
  }
}

function setError(id, msg){
  var el = document.getElementById(id);
  el.textContent = msg;
  return !msg;
}
document.addEventListener("DOMContentLoaded", function(){
  renderList(); renderDetail();
  document.querySelectorAll(".chip[data-status]").forEach(function(chip){
    chip.addEventListener("click", function(){
      document.querySelectorAll(".chip[data-status]").forEach(function(c){ c.classList.remove("active"); });
      chip.classList.add("active");
      statusFilter = chip.getAttribute("data-status");
      renderList();
    });
  });
  document.getElementById("lookupInput").addEventListener("input", renderList);

  document.getElementById("ticketForm").addEventListener("submit", function(e){
    e.preventDefault();
    var name = document.getElementById("fName"), email = document.getElementById("fEmail"),
        cat = document.getElementById("fCategory"), pri = document.getElementById("fPriority"),
        subj = document.getElementById("fSubject"), msg = document.getElementById("fMessage");
    var ok = true;
    function check(field, errId, valid, message){
      var good = setError(errId, valid ? "" : message);
      field.classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    }
    check(name, "eName", name.value.trim().length >= 2, "Tell us your name.");
    check(email, "eEmail", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), "Enter an email address that looks complete, like name@example.com.");
    check(cat, "eCategory", !!cat.value, "Pick the closest topic so the ticket reaches the right specialist.");
    check(pri, "ePriority", !!pri.value, "Pick a priority. High is only for being locked out or a payment problem.");
    check(subj, "eSubject", subj.value.trim().length >= 5, "Give the ticket a short subject, at least 5 characters.");
    check(msg, "eMessage", msg.value.trim().length >= 20, "Tell us what happened in at least 20 characters. What you did, and what you expected, helps most.");
    if (!ok) return;
    var ref = makeRef();
    tickets.unshift({
      ref: ref, name: name.value.trim(), email: email.value.trim(), category: cat.value,
      priority: pri.value, subject: subj.value.trim(), status: "Open",
      messages: [{ who:"You", text: msg.value.trim(), when: new Date().toLocaleString([], {month:"short", day:"numeric", hour:"numeric", minute:"2-digit"}) }]
    });
    save();
    selectedRef = ref;
    document.getElementById("formWrap").style.display = "none";
    var c = document.getElementById("confirmBox");
    c.style.display = "block";
    c.innerHTML = '<div class="confirm"><p>Ticket sent. A person on the support team will reply here and by email.</p><p class="ref">' + ref + '</p><p class="note">Saved in this browser for this demo. Your ticket is already in the list on this page, selected and ready to track.</p><p><button class="btn" type="button" id="anotherBtn">Send another ticket</button></p></div>';
    document.getElementById("anotherBtn").addEventListener("click", function(){
      c.style.display = "none";
      document.getElementById("formWrap").style.display = "block";
      document.getElementById("ticketForm").reset();
    });
    renderList(); renderDetail();
    if (c.scrollIntoView) c.scrollIntoView({ behavior:"smooth", block:"center" });
  });
});
