
"use client";

// Tabs code generator that outputs a standalone HTML document
// with inline CSS only (no classes) and vanilla JS.
// AI disclosure: assisted by GPT-5 Pro.
import { useMemo, useState } from "react";

type Label = { id: string; text: string };

function buildHtml(labels: string[], startIndex: number): string {
  // Sanitise labels to simple text
  const safe = labels.map(l => (l || "").toString().replace(/[<>"']/g, ""));
  if (startIndex < 0 || startIndex >= safe.length) startIndex = 0;

  // Minimal inline styles as constants:
  const container = "max-width:960px;margin:20px auto;padding:12px;border:1px solid #d0d0d0;border-radius:10px;font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial;line-height:1.5;background:#fff;color:#0b0b0b;";
  const tablist = "display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;";
  const tabActive = "border:1px solid #111;padding:8px 12px;border-radius:8px;background:#e8e8e8;cursor:pointer;";
  const tabInactive = "border:1px solid #999;padding:8px 12px;border-radius:8px;background:#f6f6f6;cursor:pointer;";
  const tabpanel = "border:1px solid #d0d0d0;border-radius:10px;padding:12px;min-height:120px;";
  const heading = "margin:0 0 8px 0;font-size:18px;";

  // Build buttons and panels
  const buttons = safe.map((label, i) => {
    const isSelected = i === startIndex;
    const ariaSel = isSelected ? "true" : "false";
    const tabindex = isSelected ? "0" : "-1";
    const style = isSelected ? tabActive : tabInactive;
    return `<button role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${ariaSel}" tabindex="${tabindex}" style="${style}">${label}</button>`;
  }).join("");

  const panels = safe.map((label, i) => {
    const hidden = i === startIndex ? "" : " hidden";
    return `<section role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}"${hidden} style="${tabpanel}"><h2 style="${heading}">${label}</h2><p>Replace this with your content for “${label}”.</p></section>`;
  }).join("");

  // Build full HTML
  const html = `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tabs — Hello.html</title>
</head>
<body style="margin:0;background:#fafafa;color:#0b0b0b;font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial;">
<main style="${container}">
  <h1 style="margin:0 0 12px 0;font-size:24px;">Accessible Tabs</h1>
  <div role="tablist" aria-label="Sample tabs" id="tablist-1" style="${tablist}">
    ${buttons}
  </div>
  ${panels}
</main>

<script>
(function() {{
  // Cookies helpers
  function setCookie(name, value, days) {{
    var maxAge = (days||120)*24*60*60;
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/; max-age=" + maxAge + "; samesite=lax";
  }}
  function getCookie(name) {{
    var key = encodeURIComponent(name) + "=";
    var parts = document.cookie.split(/;\\s*/);
    for (var i=0;i<parts.length;i++) {{
      if (parts[i].indexOf(key) === 0) return decodeURIComponent(parts[i].slice(key.length));
    }}
    return null;
  }}

  var TAB_ACTIVE_STYLE = ${JSON.stringify(tabActive)};
  var TAB_INACTIVE_STYLE = ${JSON.stringify(tabInactive)};

  var tablist = document.getElementById("tablist-1");
  var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function(btn){{
    return document.getElementById(btn.getAttribute("aria-controls"));
  }});

  function activateTab(newIdx, setFocus) {{
    tabs.forEach(function(btn, i) {{
      var selected = i === newIdx;
      btn.setAttribute("aria-selected", selected ? "true" : "false");
      btn.setAttribute("tabindex", selected ? "0" : "-1");
      btn.setAttribute("style", selected ? TAB_ACTIVE_STYLE : TAB_INACTIVE_STYLE);
      if (selected && setFocus) btn.focus();
      panels[i].hidden = !selected;
    }});
    setCookie("activeTabIndex", String(newIdx), 120);
  }}

  function indexOfFocused() {{
    var el = document.activeElement;
    var idx = tabs.indexOf(el);
    return idx >= 0 ? idx : tabs.findIndex(function(t){ return t.getAttribute("aria-selected")==="true"; });
  }}

  // Click to activate
  tabs.forEach(function(btn, i){{
    btn.addEventListener("click", function() {{ activateTab(i, true); }});
  }});

  // Keyboard navigation per WAI-ARIA authoring practices
  tablist.addEventListener("keydown", function(e){{
    var key = e.key;
    var idx = indexOfFocused();
    if (key === "ArrowRight") {{ e.preventDefault(); activateTab((idx+1)%tabs.length, true); }}
    else if (key === "ArrowLeft") {{ e.preventDefault(); activateTab((idx-1+tabs.length)%tabs.length, true); }}
    else if (key === "Home") {{ e.preventDefault(); activateTab(0, true); }}
    else if (key === "End") {{ e.preventDefault(); activateTab(tabs.length-1, true); }}
    else if (key === "Enter" || key === " ") {{ e.preventDefault(); activateTab(idx, true); }}
  }});

  // Restore last active tab from cookie
  var stored = parseInt(getCookie("activeTabIndex") || "", 10);
  if (!isNaN(stored) && stored >=0 && stored < tabs.length) {{
    activateTab(stored, false);
  }} else {{
    activateTab({startIndex}, false);
  }}
}})();
</script>
</body>
</html>`;

  return html;
}

export default function TabsGenerator() {
  const [count, setCount] = useState(3);
  const [labels, setLabels] = useState<Label[]>(() => [
    { id: "t1", text: "Tab One" },
    { id: "t2", text: "Tab Two" },
    { id: "t3", text: "Tab Three" },
  ]);
  const [startIndex, setStartIndex] = useState(0);

  // Ensure labels length matches count
  const safeLabels = useMemo(() => {
    const arr = [...labels];
    while (arr.length < count) arr.push({ id: "t" + (arr.length+1), text: "Tab " + (arr.length+1) });
    return arr.slice(0, count);
  }, [labels, count]);

  function changeLabel(i: number, text: string) {
    setLabels(prev => {
      const copy = [...prev];
      copy[i] = { ...copy[i], text };
      return copy;
    });
  }

  const html = useMemo(() => buildHtml(safeLabels.map(l => l.text), Math.max(0, Math.min(startIndex, count-1))), [safeLabels, startIndex, count]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(html);
      alert("Copied the generated HTML to your clipboard.");
    } catch {
      // Fallback (select + copy)
      const ta = document.createElement("textarea");
      ta.value = html;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      alert("Copied to clipboard.");
    }
  }

  function handleDownload() {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Hello.html";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section aria-labelledby="tabs-gen-heading">
      <h1 id="tabs-gen-heading">Tabs code generator</h1>
      <p>Configure your tabs and then copy or download the generated <code>Hello.html</code> file.</p>

      <form onSubmit={(e) => e.preventDefault()} aria-describedby="form-help">
        <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
          <label>
            Number of tabs (2–8)
            <input
              type="number"
              min={2}
              max={8}
              value={count}
              onChange={(e) => setCount(Math.max(2, Math.min(8, Number(e.target.value) || 2)))}
              style={{ display: "block", padding: "6px 8px", borderRadius: 6, border: "1px solid #d0d0d0", width: 120 }}
            />
          </label>

          <div aria-live="polite">
            {safeLabels.slice(0, count).map((l, i) => (
              <label key={l.id} style={{ display: "block", marginBottom: 8 }}>
                Label for tab {i + 1}
                <input
                  type="text"
                  value={l.text}
                  onChange={(e) => changeLabel(i, e.target.value)}
                  required
                  style={{ display: "block", padding: "6px 8px", borderRadius: 6, border: "1px solid #d0d0d0", width: 420 }}
                />
              </label>
            ))}
          </div>

          <label>
            Start on tab (0‑based index)
            <input
              type="number"
              min={0}
              max={count - 1}
              value={startIndex}
              onChange={(e) => setStartIndex(Math.max(0, Math.min(count - 1, Number(e.target.value) || 0)))}
              style={{ display: "block", padding: "6px 8px", borderRadius: 6, border: "1px solid #d0d0d0", width: 120 }}
            />
          </label>
        </div>

        <p id="form-help" style={{ marginTop: 12 }}>
          The output uses <strong>inline styles only</strong> and <strong>vanilla JS</strong>, and includes WAI‑ARIA attributes and keyboard support.
          Cookies remember the last active tab.
        </p>
      </form>

      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <button type="button" onClick={handleCopy} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d0d0d0" }}>Copy</button>
        <button type="button" onClick={handleDownload} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d0d0d0" }}>Download Hello.html</button>
      </div>

      <label style={{ display: "block", marginTop: 12 }}>
        Generated HTML
        <textarea
          readOnly
          value={html}
          rows={20}
          style={{ display: "block", width: "100%", maxWidth: 960, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", fontSize: 13, padding: 12, borderRadius: 10, border: "1px solid #d0d0d0" }}
          aria-label="Generated HTML output"
        />
      </label>
    </section>
  );
}
