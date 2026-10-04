(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Highlight unfilled TODO values in amber so they are easy to spot.
  const t = (v) => (/TODO/.test(v) ? `<span class="todo">${esc(v)}</span>` : esc(v));
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  /* ---------- Icons ---------- */
  const ic = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const ICONS = {
    about: ic('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'),
    experience: ic('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>'),
    work: ic('<path d="M12 2 3 7l9 5 9-5-9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>'),
    stack: ic('<path d="M18 10a6 6 0 0 0-11.6-2A4.5 4.5 0 0 0 7 17h11a3.5 3.5 0 0 0 0-7Z"/>'),
    mentoring: ic('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>'),
    contact: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    writing: ic('<path d="M4 19.5V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2Z"/><path d="M8 7h6"/>'),
    terminal: ic('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>'),
    linkedin: ic('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'),
    x: ic('<path d="M4 4l16 16M20 4 4 20"/>'),
    github: ic('<path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5a3 3 0 0 0-1-2.5c3 0 6-2 6-5.5a4.5 4.5 0 0 0-1-3 4 4 0 0 0 0-3s-1 0-3 1.5a10 10 0 0 0-6 0C6 3.5 5 3.5 5 3.5a4 4 0 0 0 0 3 4.5 4.5 0 0 0-1 3c0 3.5 3 5.5 6 5.5a3 3 0 0 0-1 2.5V21"/>'),
  };

  /* ---------- Section renderers ---------- */
  const R = {
    about: () => `
      <span class="label">${esc(S.base)} · ${esc(S.years)} yrs</span>
      <h1 class="hero-name">${esc(S.name)}</h1>
      <div class="role">${esc(S.role)}</div>
      ${S.about.map((p) => `<p class="lead">${esc(p)}</p>`).join("")}
      <div class="label" style="margin-top:18px">I care about</div>
      <div class="item" style="padding:6px 0 0"><ul>${S.cares.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
      <dl class="facts">
        <div><dt>Based</dt><dd>${esc(S.base)}</dd></div>
        <div><dt>Now</dt><dd>${esc(S.experience[0].role)} @ ${esc(S.experience[0].company)}</dd></div>
        <div><dt>Author</dt><dd><a data-open="writing" href="#" onclick="return false">${esc(S.book.title)}</a></dd></div>
        <div><dt>Cloud</dt><dd>Google Cloud · AWS · Azure</dd></div>
        <div><dt>Running</dt><dd>${esc(S.runStreak)} streak</dd></div>
        <div><dt>Off-work</dt><dd>${S.interests.map(esc).join(" · ")}</dd></div>
      </dl>
      <div class="btns">
        <button class="btn primary" data-open="contact">Get in touch</button>
        <button class="btn" data-open="experience">Experience</button>
        <button class="btn" data-open="terminal">Open terminal</button>
      </div>`,

    experience: () => `
      <div class="label">Experience</div>
      <div class="list">${S.experience.map((e) => `
        <div class="item">
          <div class="item-head"><h3>${t(e.company)}</h3><span class="meta">${t(e.dates)}</span></div>
          <div class="sub">${t(e.role)}${e.place ? ` <span class="meta">· ${esc(e.place)}</span>` : ""}</div>
          <p>${t(e.summary)}</p>
          ${e.points.length ? `<ul>${e.points.map((p) => `<li>${t(p)}</li>`).join("")}</ul>` : ""}
        </div>`).join("")}
      </div>
      <div class="label" style="margin-top:20px">Earlier career</div>
      <div class="list">${S.earlier.map(([c, r, d]) => `
        <div class="item" style="padding:10px 0"><div class="item-head"><h3 style="font-size:13px">${esc(c)}</h3><span class="meta">${esc(d)}</span></div><div class="sub">${esc(r)}</div></div>`).join("")}
      </div>
      <div class="label" style="margin-top:20px">Education</div>
      <div class="list">${S.education.map((e) => `
        <div class="item"><div class="item-head"><h3>${t(e.school)}</h3><span class="meta">${t(e.dates)}</span></div><div class="sub">${t(e.degree)}</div></div>`).join("")}
      </div>`,

    work: () => `
      <div class="label">What I build</div>
      <div class="list">${S.work.map((w) => `
        <div class="item">
          <div class="item-head"><h3>${t(w.title)}</h3><span class="meta">${esc(w.org)}</span></div>
          <p>${t(w.desc)}</p>
          <div class="chips">${w.tags.map((g) => `<span class="chip">${esc(g)}</span>`).join("")}</div>
        </div>`).join("")}
      </div>`,

    stack: () => `
      <div class="label">Stack</div>
      <dl class="list" style="margin-top:8px">${S.stack.map(([k, v]) => `
        <div class="stack-row"><dt>${esc(k)}</dt><dd class="chips" style="margin:0">${v.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</dd></div>`).join("")}
      </dl>
      <div class="label" style="margin-top:20px">Certifications</div>
      <div class="item" style="padding:6px 0 0"><ul>${S.certifications.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
      <div class="label" style="margin-top:20px">Languages</div>
      <dl class="facts" style="margin-top:6px">${S.languages.map(([l, v]) => `<div><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`,

    writing: () => `
      <div class="label">Book</div>
      <a class="book" href="${esc(S.book.url)}" target="_blank" rel="noopener">
        <div class="cover"><span>GKE</span></div>
        <div><h3>${esc(S.book.title)}</h3><p>${esc(S.book.by)}</p><p>${esc(S.book.publisher)} · ${esc(S.book.where)} ↗</p></div>
      </a>
      <div class="label" style="margin-top:22px">I write about</div>
      <div class="list" style="margin-top:6px">${S.writesAbout.map((w) => `
        <a class="link-row" href="${esc(S.links[0].url)}recent-activity/all/" target="_blank" rel="noopener"><b>${esc(w)}</b><span>LinkedIn ↗</span></a>`).join("")}
      </div>`,

    mentoring: () => `
      <div class="label">Mentoring</div>
      <div class="h-big">Book a 1:1 session</div>
      <p class="lead" style="margin-top:4px">${esc(S.mentoring.intro)}</p>
      <div class="list" style="margin-top:12px">${S.mentoring.sessions.map(([n, d]) => `
        <a class="link-row" href="${esc(S.mentoring.url)}" target="_blank" rel="noopener"><b>${esc(n)}</b><span>${esc(d)} ↗</span></a>`).join("")}
      </div>`,

    contact: () => `
      <div class="label">Contact</div>
      <div class="h-big">Let's build something reliable.</div>
      <p class="lead" style="margin:4px 0 14px">Open to platform engineering roles, consulting and mentoring.</p>
      <div class="list">${S.links.map((l) => `
        <a class="link-row" href="${esc(l.url)}" target="_blank" rel="noopener"><b>${esc(l.label)}</b><span>${esc(l.handle)} ↗</span></a>`).join("")}
      </div>`,

    terminal: () => `
      <div class="term">
        <div class="term-out" id="termOut"></div>
        <div class="term-line"><span class="prompt">nb@berlin ~ %</span><input id="termIn" autocomplete="off" spellcheck="false" aria-label="Terminal input" /></div>
      </div>`,
  };

  const APPS = [
    { id: "about", title: "About", w: 520, h: 560 },
    { id: "experience", title: "Experience", w: 560, h: 560 },
    { id: "work", title: "Work", w: 500, h: 520 },
    { id: "stack", title: "Stack", w: 540, h: 520 },
    { id: "writing", title: "Writing", w: 500, h: 500 },
    { id: "mentoring", title: "Mentoring", w: 460, h: 470 },
    { id: "contact", title: "Contact", w: 440, h: 420 },
    { id: "terminal", title: "Terminal", w: 560, h: 360 },
  ];
  const app = (id) => APPS.find((a) => a.id === id);

  /* ---------- Menu bar ---------- */
  $("#logo").textContent = S.initials;
  const THEMES = { amethyst: "#a855f7", void: "#18181b", orchid: "#e879f9", nebula: "#818cf8" };
  const setTheme = (name) => {
    if (!THEMES[name]) return false;
    document.documentElement.dataset.theme = name;
    store.set("theme", name);
    document.querySelectorAll("#themes button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.t === name));
    return true;
  };
  $("#themes").innerHTML = Object.entries(THEMES)
    .map(([n, c]) => `<button data-t="${n}" title="${n}" aria-label="${n} theme" style="background:${c}"></button>`).join("");
  $("#themes").addEventListener("click", (e) => e.target.dataset.t && setTheme(e.target.dataset.t));
  setTheme(store.get("theme") || "amethyst");

  const fmtTime = (opts) => new Intl.DateTimeFormat("en-GB", { timeZone: S.timezone, ...opts }).format(new Date());
  const tick = () => {
    $("#clock").textContent = fmtTime({ weekday: "short", hour: "2-digit", minute: "2-digit" });
    const bc = $("#bigClock");
    if (bc) bc.textContent = fmtTime({ hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  /* ---------- Widgets ---------- */
  $("#widgets").innerHTML = `
    <div class="widget">
      <div class="label">Berlin time</div>
      <div class="big-clock" id="bigClock"></div>
      <div class="stat-grid">
        <div class="stat"><b>${esc(S.years)}</b><span>Years</span></div>
        <div class="stat"><b>${esc(S.appsMigrated)}</b><span>Migrated</span></div>
        <div class="stat"><b>${esc(S.followers)}</b><span>Followers</span></div>
      </div>
    </div>
    <div class="widget">
      <div class="label" style="margin-bottom:6px">Now</div>
      <div class="row"><span>At</span><b>${esc(S.experience[0].company)}</b></div>
      <div class="row"><span>Focus</span><b>GCP · GitOps · DevSecOps</b></div>
      <div class="row"><span>Running</span><b>${esc(S.runStreak)}</b></div>
      <div class="row"><span>Mentoring</span><b><a href="${esc(S.mentoring.url)}" target="_blank" rel="noopener">Topmate ↗</a></b></div>
    </div>
    <div class="widget">
      <div class="label" style="margin-bottom:8px">Principles</div>
      <p class="quote" id="quote"></p>
      <div class="qdots" id="qdots"></div>
    </div>`;
  // Rotating principles widget
  let qi = 0;
  const showQuote = () => {
    $("#quote").textContent = S.principles[qi];
    $("#qdots").innerHTML = S.principles.map((_, i) => `<i class="${i === qi ? "on" : ""}"></i>`).join("");
    qi = (qi + 1) % S.principles.length;
  };
  showQuote();
  setInterval(showQuote, 6000);
  tick();
  setInterval(tick, 1000);

  /* ---------- Window manager ---------- */
  const wins = {};
  let z = 10;
  let cascade = 0;

  const focus = (id) => {
    Object.values(wins).forEach((w) => w.classList.remove("focused"));
    const w = wins[id];
    if (!w) return;
    w.style.zIndex = ++z;
    w.classList.add("focused");
    $("#activeTitle").textContent = app(id).title;
  };

  const close = (id) => {
    wins[id]?.remove();
    delete wins[id];
    renderDock();
    const top = Object.entries(wins).sort((a, b) => b[1].style.zIndex - a[1].style.zIndex)[0];
    top ? focus(top[0]) : ($("#activeTitle").textContent = "Desktop");
  };

  const open = (id) => {
    const a = app(id);
    if (!a) return false;
    if (wins[id]) { focus(id); return true; }
    const d = $("#desktop");
    const w = Math.min(a.w, d.clientWidth - 40);
    const h = Math.min(a.h, d.clientHeight - 110);
    const x = Math.max(16, Math.min(80 + cascade * 34, d.clientWidth - w - 300));
    const y = Math.max(16, Math.min(30 + cascade * 28, d.clientHeight - h - 90));
    cascade = (cascade + 1) % 7;

    const el = document.createElement("section");
    el.className = "window";
    el.setAttribute("aria-label", a.title);
    el.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px`;
    el.innerHTML = `
      <div class="titlebar">
        <div class="lights">
          <button class="c" aria-label="Close"></button><button class="m" aria-label="Minimise"></button><button class="x" aria-label="Maximise"></button>
        </div>
        <h2>${esc(a.title)}</h2>
      </div>
      <div class="wbody">${R[id]()}</div>`;
    $("#windows").appendChild(el);
    wins[id] = el;

    el.addEventListener("pointerdown", () => focus(id));
    $(".c", el).onclick = $(".m", el).onclick = (e) => { e.stopPropagation(); close(id); };
    $(".x", el).onclick = () => el.classList.toggle("max");
    drag(el, $(".titlebar", el));
    if (id === "terminal") initTerminal(el);
    focus(id);
    renderDock();
    return true;
  };

  const drag = (el, handle) => {
    handle.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button") || el.classList.contains("max")) return;
      const sx = e.clientX - el.offsetLeft;
      const sy = e.clientY - el.offsetTop;
      const d = $("#desktop");
      const move = (m) => {
        el.style.left = Math.max(-el.offsetWidth + 80, Math.min(m.clientX - sx, d.clientWidth - 80)) + "px";
        el.style.top = Math.max(0, Math.min(m.clientY - sy, d.clientHeight - 40)) + "px";
      };
      const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); };
      addEventListener("pointermove", move);
      addEventListener("pointerup", up);
    });
    handle.addEventListener("dblclick", () => el.classList.toggle("max"));
  };

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (b) open(b.dataset.open);
  });

  /* ---------- Dock ---------- */
  const renderDock = () => {
    const appItems = APPS.map((a) => `
      <div class="dock-item"><span class="tip">${esc(a.title)}</span>
        <button data-open="${a.id}" aria-label="${esc(a.title)}">${ICONS[a.id]}</button>
        <span class="dot ${wins[a.id] ? "on" : ""}"></span></div>`).join("");
    const ext = [["LinkedIn", "linkedin", S.links[0].url], ["X", "x", S.links[1].url], ["GitHub", "github", S.links[2].url]].map(([l, i, u]) => `
      <div class="dock-item"><span class="tip">${l}</span>
        <a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${l}">${ICONS[i]}</a><span class="dot"></span></div>`).join("");
    $("#dock").innerHTML = appItems + '<div class="dock-sep"></div>' + ext;
  };

  /* ---------- Terminal ---------- */
  function initTerminal(el) {
    const out = $("#termOut", el);
    const input = $("#termIn", el);
    const hist = [];
    let hi = 0;
    const print = (s, cls = "") => { out.insertAdjacentHTML("beforeend", `<div class="${cls}">${s}</div>`); out.scrollTop = out.scrollHeight; };
    const pad = (s, n) => String(s).padEnd(n);

    const CMDS = {
      help: () => "Available commands:\n" + Object.keys(CMDS).map((c) => "  " + c).join("\n"),
      whoami: () => `${esc(S.name)} — ${esc(S.role)}`,
      ls: () => "about.txt  experience.txt  stack.txt  certs.txt  book.txt  links.txt\n" + APPS.filter((a) => a.id !== "terminal").map((a) => a.id + "/").join("  "),
      cat: (f) => ({
        "about.txt": S.about.map(esc).join("\n\n"),
        "experience.txt": S.experience.map((e) => `${pad(esc(e.company), 22)}${pad(esc(e.dates), 18)}${esc(e.role)}`).join("\n"),
        "stack.txt": S.stack.map(([k, v]) => `${pad(esc(k) + ":", 15)}${v.map(esc).join(" · ")}`).join("\n"),
        "certs.txt": S.certifications.map(esc).join("\n"),
        "book.txt": `${esc(S.book.title)}\n${esc(S.book.by)}\n${esc(S.book.publisher)}`,
        "links.txt": S.links.map((l) => `${pad(esc(l.label), 10)}${esc(l.url)}`).join("\n"),
      }[f] ?? `cat: ${esc(f || "")}: No such file`),
      open: (w) => (open(w) ? `Opening ${esc(w)}…` : `open: unknown window. Try: ${APPS.map((a) => a.id).join(", ")}`),
      theme: (n) => (setTheme(n) ? `Theme set to ${esc(n)}` : `Themes: ${Object.keys(THEMES).join(", ")}`),
      neofetch: () => `<span class="acc">${esc(S.initials)}@berlin</span>
------------
Name     ${esc(S.name)}
Role     ${esc(S.role)}
Base     ${esc(S.base)}
Uptime   ${esc(S.years)} years in production
Migrated ${esc(S.appsMigrated)} apps to Kubernetes
Running  ${esc(S.runStreak)} streak
Clouds   GCP · AWS · Azure
Shell    zsh + terraform + kubectl
Theme    ${document.documentElement.dataset.theme}`,
      socials: () => S.links.map((l) => `<a class="acc" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>  ${esc(l.handle)}`).join("\n"),
      kubectl: (a) => (a === "get pods" ? "NAME                 READY   STATUS    RESTARTS\nportfolio-7d9f-x2k   1/1     Running   0" : "usage: kubectl get pods"),
      terraform: (a) => (a === "plan" ? "No changes. Your infrastructure matches the configuration." : "usage: terraform plan"),
      run: () => `Streak: ${esc(S.runStreak)}. Consistency beats intensity.`,
      date: () => fmtTime({ dateStyle: "full", timeStyle: "medium" }) + " (Berlin)",
      history: () => hist.map((h, i) => `${i + 1}  ${esc(h)}`).join("\n") || "No commands in history.",
      sudo: () => "Nice try. Access is policy-controlled (Kyverno says no).",
      clear: () => { out.innerHTML = ""; return null; },
      exit: () => { setTimeout(() => close("terminal"), 300); return "Closing terminal…"; },
    };

    const run = (line) => {
      print(`<span class="prompt">nb@berlin ~ %</span> <span class="cmd">${esc(line)}</span>`);
      if (!line) return;
      hist.push(line); hi = hist.length;
      const [cmd, ...rest] = line.trim().split(/\s+/);
      const fn = CMDS[cmd];
      const res = fn ? fn(rest.join(" ")) : `zsh: command not found: ${esc(cmd)}. Type 'help'.`;
      if (res !== null) print(res);
    };

    print(`<span class="acc">${esc(S.name)}</span> — portfolio shell. Type <span class="acc">help</span> to start.`);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { run(input.value); input.value = ""; }
      else if (e.key === "ArrowUp") { hi = Math.max(0, hi - 1); input.value = hist[hi] || ""; e.preventDefault(); }
      else if (e.key === "ArrowDown") { hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ""; }
    });
    el.addEventListener("click", () => input.focus());
    setTimeout(() => input.focus(), 50);
  }

  /* ---------- Mobile ---------- */
  const mobileIds = APPS.filter((a) => a.id !== "terminal");
  $("#mTabs").innerHTML = mobileIds.map((a) => `<a href="#m-${a.id}" data-m="${a.id}">${esc(a.title)}</a>`).join("");
  $("#mContent").innerHTML = mobileIds.map((a) => `<section class="m-sec" id="m-${a.id}">${R[a.id]()}</section>`).join("");
  $("#mFoot").textContent = `© ${new Date().getFullYear()} ${S.name} · ${S.base}`;
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) document.querySelectorAll("#mTabs a").forEach((a) => a.classList.toggle("on", a.dataset.m === e.target.id.slice(2)));
  }), { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll(".m-sec").forEach((s) => io.observe(s));
  // On mobile, [data-open] buttons scroll to the section instead.
  $("#mContent").addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (b) { e.stopPropagation(); $("#m-" + b.dataset.open)?.scrollIntoView({ behavior: "smooth" }); }
  });

  /* ---------- Boot ---------- */
  renderDock();
  if (innerWidth >= 820) { open("about"); }
})();
