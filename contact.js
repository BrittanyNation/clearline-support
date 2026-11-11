// Clearline Support — contact page (study code)
// COURSE SKILL IN USE: validated forms ending in a real confirmation state,
// plus duplicate aware newsletter signup, all persisted in localStorage.
document.addEventListener("DOMContentLoaded", function(){
  // Hours table: highlight today
  var today = new Date().getDay(); // 0 Sunday .. 6 Saturday
  document.querySelectorAll("table.hours tr[data-day]").forEach(function(row){
    if (parseInt(row.getAttribute("data-day"), 10) === today) row.classList.add("today");
  });

  // FAQ accordions
  document.querySelectorAll(".faq-q").forEach(function(q){
    q.addEventListener("click", function(){
      var item = q.parentElement;
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(function(i){ i.classList.remove("open"); });
      if (!wasOpen) item.classList.add("open");
    });
  });

  function setErr(id, msg){ document.getElementById(id).textContent = msg; return !msg; }

  // Callback request
  document.getElementById("callbackForm").addEventListener("submit", function(e){
    e.preventDefault();
    var name = document.getElementById("cName"), phone = document.getElementById("cPhone"),
        topic = document.getElementById("cTopic"), time = document.getElementById("cTime");
    var ok = true;
    function check(field, errId, valid, message){
      var good = setErr(errId, valid ? "" : message);
      field.classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    }
    check(name, "ceName", name.value.trim().length >= 2, "Tell us your name.");
    check(phone, "cePhone", phone.value.replace(/\D/g,"").length >= 10, "Enter a phone number with at least 10 digits.");
    check(topic, "ceTopic", !!topic.value, "Pick what the call is about.");
    check(time, "ceTime", !!time.value, "Pick a time window that suits you.");
    if (!ok) return;
    var ref = "CL-C-" + Math.floor(10000 + Math.random()*90000);
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem("clearline_callbacks") || "[]"); } catch(err){ saved = []; }
    saved.push({ ref: ref, name: name.value.trim(), topic: topic.value, time: time.value });
    try { localStorage.setItem("clearline_callbacks", JSON.stringify(saved)); } catch(err){}
    document.getElementById("callbackWrap").style.display = "none";
    var box = document.getElementById("callbackConfirm");
    box.style.display = "block";
    box.innerHTML = '<div class="confirm"><p>Callback booked. We will call ' + name.value.trim().split(" ")[0] + ' during the window you picked.</p><p class="ref">' + ref + '</p><p class="note">Keep your ticket reference handy if you have one, and we will have the history open before we call.</p></div>';
  });

  // Product updates letter, duplicate aware
  document.getElementById("letterForm").addEventListener("submit", function(e){
    e.preventDefault();
    var email = document.getElementById("letterEmail");
    var msg = document.getElementById("letterMsg");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
      msg.textContent = "Enter an email address that looks complete.";
      email.classList.add("invalid");
      return;
    }
    email.classList.remove("invalid");
    var subs = [];
    try { subs = JSON.parse(localStorage.getItem("clearline_letter") || "[]"); } catch(err){ subs = []; }
    var value = email.value.trim().toLowerCase();
    if (subs.indexOf(value) !== -1){
      msg.textContent = "That email is already on the list. You are all set.";
      return;
    }
    subs.push(value);
    try { localStorage.setItem("clearline_letter", JSON.stringify(subs)); } catch(err){}
    msg.textContent = "You are on the list. One short email a month, only when something actually changes.";
    email.value = "";
  });
});
