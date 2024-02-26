"use strict";
(() => {
  var L = {
      apiUrl: "https://utils-api.vercel.app/api/",
      counterPath: "counter/",
      jsDelivrUrl:
        "https://data.jsdelivr.com/v1/packages/gh/ageraplattformen/agera.js/resolved?specifier=latest",
    },
    S = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      critical: !0,
      waitForResponse: !0,
    };
  function bt(t) {
    document.querySelectorAll("[data-profundo-client]").forEach((n) => {
      n.addEventListener("click", async () => {
        let o = n.dataset.activitytypeId || "",
          a = n.dataset.classificationId || "",
          m = n.dataset.profundoText || "",
          s = R(void 0, {
            client: n.dataset.profundoClient || "not_provided",
            client_url: n.dataset.profundoUrl || "not_provided",
            country_code: n.dataset.countryCode || "",
            name: { name_id: Number(t) },
            register_id: n.dataset.registerId || "",
            campaign_id: Number(n.dataset.campaignId) || void 0,
            activity: {
              ...(o ? { activitytype_id: o } : { activitytype_id: "" }),
              ...(a ? { classification_id: a } : {}),
              ...(m ? { shortText: m } : {}),
              shorttext: n.dataset.profundoText || "",
            },
          });
        await r(s);
      });
    });
    async function r(n) {
      try {
        let o = await fetch(n.url, { method: n.method, headers: n.headers, body: n.body });
        return o.ok ? await o.json() : void 0;
      } catch (o) {
        console.log("P error: ", o);
        return;
      }
    }
  }
  function j(t, e) {
    let r = t["data.name_id"];
    t && r && (bt(r.toString()), e == null || e.push(["name_id", r.toString()]));
  }
  function R(t, e) {
    let n = t
        ? A(t, {
            "given-name": "firstname",
            "family-name": "lastname",
            email: "email",
            tel: "mobile",
            "street-adress": "address",
            "postal-code": "zip",
            country: "country_id",
          })
        : void 0,
      o = e == null ? void 0 : e.name.name_id;
    n || (n = new FormData());
    let a = [];
    for (let [y, i] of n.entries())
      if (y.startsWith("infotype")) {
        let c = parseInt(i);
        isNaN(c) || a.push(c), n.delete(y);
      }
    let m =
      (t == null ? void 0 : t.getAttribute("data-country-code")) ||
      (e == null ? void 0 : e.country_code) ||
      "";
    !(n != null && n.get("country")) && m && n.append("country", m);
    let s =
        (e == null ? void 0 : e.activity.shorttext) ||
        (t == null ? void 0 : t.dataset.profundoText),
      f =
        (t == null ? void 0 : t.dataset.registerId) || (e == null ? void 0 : e.register_id),
      l =
        (t == null ? void 0 : t.dataset.campaignId) || (e == null ? void 0 : e.campaign_id),
      u =
        (t == null ? void 0 : t.dataset.classificationId) ||
        (e == null ? void 0 : e.activity.classification_id) ||
        "SI",
      p = n && { ...Object.fromEntries(n) };
    o && (p.name_id = Number(o));
    let g = {
      ...(w.campaign ? { text1: w.campaign } : ""),
      ...(w.source ? { text2: w.source } : ""),
      ...(w.medium ? { text3: w.medium } : ""),
      ...(w.content ? { text4: w.content } : ""),
    };
    return {
      ...S,
      critical: !o,
      url: new URL("profundo/", L.apiUrl).toString(),
      body: JSON.stringify({
        client:
          (t == null ? void 0 : t.dataset.client) ||
          (e == null ? void 0 : e.client) ||
          "not_provided",
        client_url:
          (t == null ? void 0 : t.getAttribute("action")) ||
          (e == null ? void 0 : e.client_url) ||
          "",
        ...(m ? { country_code: m } : {}),
        referrer: window.location.href,
        body: {
          name: p,
          ...(f ? { register_id: f } : {}),
          ...(l ? { campaign_id: l } : {}),
          ...(a ? { infotype_id: a[0] } : {}),
          activity: {
            ...(o ? {} : { ...g }),
            ...(s ? { shorttext: s } : {}),
            activitytype_id:
              (t == null ? void 0 : t.dataset.activitytypeId) ||
              (e == null ? void 0 : e.activity.activitytype_id) ||
              "UN",
            ...(u ? { classification_id: u } : {}),
          },
        },
      }),
    };
  }
  var F = (t, e) => {
    let r = {};
    for (let n in t) {
      let o = t[n],
        a = e ? `${e}.${n}` : n;
      typeof o == "object" && o !== null ? Object.assign(r, F(o, a)) : (r[a] = o);
    }
    return r;
  };
  function I(t) {
    function e() {
      let n = localStorage.getItem("crm_data");
      return n || localStorage.removeItem("crm_data"), JSON.parse(n);
    }
    let r = F(e());
    r && j(r, t);
  }
  function B(t) {
    return (
      typeof t == "object" &&
      t.hasOwnProperty("count") &&
      typeof t.count == "number" &&
      t.hasOwnProperty("name") &&
      typeof t.name == "string"
    );
  }
  async function q() {
    let t = localStorage.getItem("crm_data"),
      e = document.querySelectorAll("[data-crm-patch]");
    !t ||
      !e ||
      e.forEach((r) => {
        (r.style.cursor = "pointer"),
          r.addEventListener("click", async () => {
            let n = r.getAttribute("data-crm-patch"),
              o = r.getAttribute("data-crm-patch-client"),
              a = {};
            Array.from(r.attributes).forEach((u) => {
              u.name.startsWith("data-") && (a[u.name] = u.value);
            });
            let m = document.querySelector("[data-load-petition]"),
              s = m ? new FormData(m) : new FormData(),
              f = new URL("fcrm/", L.apiUrl).toString(),
              l = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  crm: n,
                  ...(o ? { client: o } : {}),
                  attributes: a,
                  response: JSON.parse(t),
                  body: { ...Object.fromEntries(s) },
                }),
              };
            try {
              let u = await fetch(f, { ...l, keepalive: !0 });
              return u.ok ? await u.json() : void 0;
            } catch (u) {
              console.error("P error: ", u);
              return;
            }
          });
      });
  }
  function A(t, e) {
    let r = new FormData();
    for (let [n, o] of new FormData(t))
      e.hasOwnProperty(n) ? r.append(e[n], o) : r.append(n, o);
    return r;
  }
  var M = new URLSearchParams(window.location.search);
  function Lt() {
    function t(r) {
      let n = [...M.keys()].find((o) => o.toLowerCase().includes(r));
      return (n && M.get(n)) || "";
    }
    return {
      source: t("source").toLowerCase(),
      campaign: t("campaign").toLowerCase(),
      medium: t("medium").toLowerCase(),
      content: t("content").toLowerCase(),
    };
  }
  var w = Lt(),
    E = Array.from(M, ([t, e]) => `${t.toLowerCase()}: ${e.toLowerCase()}`).join(", ");
  function V(t) {
    let e = new FormData(t),
      r = [],
      n = [],
      o = {};
    for (let [a, m] of e.entries())
      a.startsWith("tags")
        ? r.push(m)
        : a.startsWith("language")
        ? n.push(m)
        : [
            "given-name",
            "family-name",
            "email",
            "tel",
            "postal-code",
            "street-address",
            "address-level2",
            "country",
          ].includes(a) || (o[a] = m);
    return {
      ...S,
      url: t.getAttribute("action") || "",
      body: JSON.stringify({
        person: {
          given_name: e.get("given-name"),
          family_name: e.get("family-name"),
          email_addresses: [{ address: e.get("email") }],
          phone_numbers: [{ number: e.get("tel") || "" }],
          postal_addresses: [
            {
              postal_code: e.get("postal-code") || "",
              address_lines: e.get("street-address") || "",
              region: e.get("adress-level2") || "",
              country: e.get("country") || "",
            },
          ],
        },
        add_tags: [...r],
        "action_network:referrer_data": {
          source: w.source ? w.source.toString() : "",
          website: window.location.hostname + window.location.pathname,
        },
        languages_spoken: [...n],
        custom_fields: o,
      }),
    };
  }
  function J(t) {
    var a;
    let e = new FormData(t),
      r = {};
    t &&
      Array.from(t.attributes).forEach((m) => {
        m.name.startsWith("data-") && (r[m.name] = m.value);
      });
    let n = {
      utms: {
        ...(w.campaign ? { utm_campaign: w.campaign } : ""),
        ...(w.source ? { utm_source: w.source } : ""),
        ...(w.medium ? { utm_medium: w.medium } : ""),
        ...(w.content ? { utm_content: w.content } : ""),
      },
    };
    return {
      ...S,
      waitForResponse:
        ((a = t == null ? void 0 : t.dataset.waitForResponse) == null
          ? void 0
          : a.toLowerCase()) !== "false",
      url: new URL("fcrm/", L.apiUrl).toString(),
      body: JSON.stringify({
        crm: (t == null ? void 0 : t.dataset.crm) || "",
        ...(t != null && t.dataset.crmClient ? { client: t.dataset.crmClient } : {}),
        ...(t != null && t.action ? { endpoint: t.action } : {}),
        body: { ...Object.fromEntries(e) },
        ...(n ? { ...n } : {}),
        source: window.location.href,
        ...(r ? { attributes: { ...r } } : {}),
      }),
    };
  }
  function z(t) {
    var a;
    let r = A(t, {
        "given-name": "FNAME",
        "family-name": "LNAME",
        email: "EMAIL",
        tel: "PHONE",
        "street-adress": "ADDRESS",
        "postal-code": "POSTALCODE",
        "adress-level2": "REGION",
        country: "COUNTRY",
      }),
      n = (t == null ? void 0 : t.getAttribute("data-mailchimp-tags")) || "";
    n !== "" && r.append("tags", n);
    let o = new URLSearchParams();
    for (let [m, s] of r.entries())
      (typeof s == "string" || typeof s == "number") && o.append(m, s.toString());
    return (
      o.append("UTM", E),
      {
        ...S,
        url:
          ((a = t.getAttribute("action")) == null
            ? void 0
            : a.replace("post?", "post-json?")) + "&c=?",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        dataType: "jsonp",
        body: o.toString(),
      }
    );
  }
  function W(t) {
    let e = new FormData(t),
      r = t.getAttribute("data-action-id") || "";
    return {
      ...S,
      url: "https://deploy-preview-242--act-djurensratt-se.netlify.app/api/reform-society/register",
      body: JSON.stringify({
        person: {
          first: e.get("given-name") || "",
          last: e.get("family-name") || "",
          email: e.get("email") || "",
          mobile: e.get("tel") || "",
        },
        acquisition: {
          actionId: r ? r.toString().toLowerCase() : "",
          source: E ? E : "",
          marketingPermission: !0,
        },
      }),
    };
  }
  var Z,
    K,
    Q,
    G,
    v = {
      thisUrl: new URL(window.location.href),
      wfSiteId:
        (K = (Z = document.querySelector("html")) == null ? void 0 : Z.dataset.wfSite) !=
        null
          ? K
          : "0000",
      wfUrl: new URL(
        (G = (Q = document.querySelector("html")) == null ? void 0 : Q.dataset.wfSite) !=
        null
          ? G
          : "0000",
        "https://webflow.com/api/v1/form/"
      ),
    },
    P = {
      mailchimp: z,
      actionnetwork: V,
      djurensratt: W,
      webFlow(t) {
        var n;
        let e = new FormData(t);
        e.append("UTM", E);
        let r = new URLSearchParams({
          name: (n = t == null ? void 0 : t.getAttribute("name")) != null ? n : "form",
          source: window.location.href,
        });
        for (let o of e.entries()) {
          let a = `fields[${o[0]}]`;
          r.append(a, o[1]);
        }
        return {
          ...S,
          url: v.wfUrl.href,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: r.toString(),
        };
      },
      zapier(t) {
        return {
          ...S,
          url: t.getAttribute("action") || "",
          body: JSON.stringify({
            [t.getAttribute("name") || "form"]: Object.fromEntries(new FormData(t)),
            source: v.thisUrl.hostname + v.thisUrl.pathname,
            time: new Date().toISOString(),
            UTM: E,
          }),
        };
      },
      amnesty(t) {
        let e = (t == null ? void 0 : t.getAttribute("data-country-code")) || "";
        return {
          ...S,
          url: new URL("amnesty/", L.apiUrl).toString(),
          body: JSON.stringify({
            form: {
              ...Object.fromEntries(new FormData(t)),
              action_id: t.dataset.actionId || "9999",
              sign_method: t.dataset.signMethod || "agera-default",
            },
            UTM: E,
            site_id: v.wfSiteId,
            ...(e ? { country_code: e } : {}),
          }),
        };
      },
      profundo: R,
      fcrm: J,
    };
  function St(t) {
    var u, p, g, y;
    let e = {
      thisUrl: new URL(window.location.href),
      wfSiteId:
        (p = (u = document.querySelector("html")) == null ? void 0 : u.dataset.wfSite) !=
        null
          ? p
          : "0000",
      wfUrl: new URL(
        (y = (g = document.querySelector("html")) == null ? void 0 : g.dataset.wfSite) !=
        null
          ? y
          : "0000",
        "https://webflow.com/api/v1/form/"
      ),
      redirect: t.getAttribute("redirect") || null,
      addUtm: !!t.dataset.redirectUtm || !0,
      utmSource:
        new URLSearchParams(window.location.search).get("utm_source") ||
        new URLSearchParams(window.location.search).get("source"),
      submitButton: t.querySelector('input[type="submit"]'),
      submitText: "",
      niceUtms: Array.from(
        new URLSearchParams(window.location.search),
        ([i, c]) => `${i}: ${c}`
      ).join(", "),
    };
    e.submitText = (e.submitButton && e.submitButton.value) || "";
    function r(i, c) {
      let d = new FormData(c);
      return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        critical: !1,
        waitForResponse: !0,
        url: new URL(L.counterPath + i, L.apiUrl).toString(),
        body: JSON.stringify({
          form: "default",
          site_id: e.wfSiteId,
          last_person: d.get("given-name") || "",
          form_url: e.thisUrl,
        }),
      };
    }
    function n(i, c, d) {
      let h = i.parentNode,
        x = h == null ? void 0 : h.querySelector(".w-form-done"),
        b = h == null ? void 0 : h.querySelector(".w-form-fail");
      c
        ? (x && (x.style.display = "block"), b && (b.style.display = "none"), d && o())
        : (x && (x.style.display = "none"),
          b && (b.style.display = "block"),
          e.submitButton && (e.submitButton.value = e.submitText));
    }
    function o() {
      let i = t.getAttribute("redirect") || null;
      if (i)
        if (e.addUtm && i) {
          let c = new URL(i, e.thisUrl),
            d = new URLSearchParams(window.location.search);
          c.searchParams.forEach((x, b) => {
            d.has(b) || d.set(b, x);
          });
          let h = c.origin + c.pathname + (d.toString() ? "?" + d.toString() : "");
          window.location.href = h;
        } else window.location.href = i;
      else (t.style.display = "none"), console.warn("No redirect defined");
    }
    async function a(i) {
      return new Promise((c, d) => {
        $.ajax({
          url: i.url,
          type: i.method,
          data: i.body,
          dataType: "jsonp",
          success: (h) => {
            c(h);
          },
          error: (h, x, b) => {
            d(b);
          },
        });
      });
    }
    async function m(i) {
      let c = { method: i.method, headers: i.headers, body: i.body };
      if (i.dataType === "jsonp") return a(i);
      if (i.waitForResponse)
        try {
          let d = await fetch(i.url, { ...c });
          if (!d.ok) throw new Error(`Error fetching ${i.url}: ${d.statusText}`);
          return d.json();
        } catch (d) {
          throw (console.error("An error occurred:", d), d);
        }
      else return fetch(i.url, { ...c, keepalive: !0 }), Promise.resolve();
    }
    function s(i) {
      let c = [];
      if (
        (i.forEach((d) => {
          if (d.status === "fulfilled" && d.value) {
            let h = d.value;
            B(h) || c.push(h);
          }
        }),
        c)
      ) {
        let d = c.reduce((h, x) => ({ ...h, ...x }), {});
        localStorage.setItem("crm_data", JSON.stringify(d));
      }
    }
    async function f(i, c) {
      try {
        let d = await Promise.allSettled(i.map((x) => m(x))),
          h = !1;
        d.forEach((x, b) => {
          x.status === "rejected" && i[b].critical && (h = !0);
        }),
          h ? n(c, !1, !1) : (s(d), n(c, !0, !0));
      } catch (d) {
        console.error("Error in Promise.allSettled:", d), n(c, !1, !1);
      }
    }
    async function l(i) {
      i.addEventListener("submit", async function (c) {
        var O;
        c.preventDefault(),
          c.stopPropagation(),
          e.submitButton &&
            (e.submitButton.value = e.submitButton.dataset.wait || e.submitButton.value);
        let d = [],
          h = {
            webflow: "webFlow",
            actionnetwork: "actionnetwork",
            mailchimp: "mailchimp",
            zapier: "zapier",
            amnesty: "amnesty",
            profundo: "profundo",
            djurensratt: "djurensratt",
          },
          x = ((O = i.dataset.crm) == null ? void 0 : O.toLowerCase()) || "webflow",
          b = i.dataset.counterUpdate;
        if (x !== "none")
          if (x && h.hasOwnProperty(x)) {
            let xt = h[x];
            d.push(P[xt](i));
          } else d.push(P.fcrm(i));
        b && b !== "default" && d.push(r(b, i)), d.length > 0 && (await f(d, i));
      });
    }
    return { handleForm: l };
  }
  function Y() {
    let t = document.querySelectorAll("[data-crm]");
    for (let e of t) St(e).handleForm(e);
  }
  var D = class {
      constructor() {
        this.counters = new Map();
      }
      async getCounter(e) {
        if (this.counters.has(e)) return this.counters.get(e);
        let r = new URL(L.counterPath + e, L.apiUrl),
          n = (async () => {
            try {
              let a = await fetch(r);
              return a.ok ? await a.json() : void 0;
            } catch {
              return;
            }
          })();
        this.counters.set(e, n);
        let o = await n;
        return this.counters.delete(e), o;
      }
    },
    C = new D();
  async function X() {
    try {
      let t = await fetch(L.jsDelivrUrl);
      return t.ok ? `v${(await t.json()).version}` : "latest";
    } catch {
      return "latest";
    }
  }
  function Et() {
    function t(s, f) {
      return s >= f ? 100 : Math.round((s / f) * 100);
    }
    function e(s) {
      let f = {
          350: 50,
          500: 100,
          2e3: 250,
          5e3: 500,
          2e4: 2500,
          5e4: 5e3,
          1e5: 1e4,
          2e5: 25e3,
          5e5: 5e4,
          1e6: 1e5,
        },
        l = 25e4,
        p = Object.keys(f)
          .map(Number)
          .find((y) => y >= s),
        g = p ? f[p] : l;
      return Math.ceil((s * 1.05) / g) * g;
    }
    function r(s, f) {
      return s * 1.05 < f.target || !f.autoTarget ? f.target : e(s);
    }
    function n(s, f, l) {
      s.style.width = t(f, l) + "%";
    }
    function o(s, f, l) {
      try {
        let u = new Intl.NumberFormat(l.locale, l.notation).format(f);
        s.textContent = u;
      } catch {
        (l.notation.useGrouping = !1), (l.notation.notation = "standard");
        let u = new Intl.NumberFormat(void 0, l.notation).format(f);
        s.textContent = u;
      }
    }
    function a(s, f, l) {
      f <= l.removeBelow && (s.style.display = "none"),
        f >= l.hideBelow && (s.style.opacity = "1");
    }
    async function m(s) {
      var i;
      let f = s.dataset.counterName || "default",
        l = {
          target: parseInt(s.dataset.counterTarget || "0", 10),
          hideBelow: parseInt(s.dataset.counterHideBelow || "0"),
          removeBelow: parseInt(s.dataset.counterRemoveBelow || "0"),
          autoTarget: !!s.dataset.counterAutoTarget || !0,
          locale: s.dataset.counterLocale || document.documentElement.lang || "undefined",
          notation: {
            notation:
              ((i = s.dataset.counterNotation) == null ? void 0 : i.toLowerCase()) ||
              "standard",
            useGrouping: !0,
          },
        },
        u;
      if (f.toLowerCase() === "default") u = 125;
      else {
        let c = await C.getCounter(f);
        c ? (u = c.count) : (u = 0);
      }
      if (s.classList.contains("counter-current-value")) o(s, u, l), a(s, u, l);
      else {
        let c = s.querySelectorAll(".counter-current-value");
        for (let d of c) o(d, u, l), a(d, u, l);
      }
      let p = r(u, l),
        g = s.querySelectorAll(".counter-target-value");
      for (let c of g) o(c, p, l), a(c, u, l);
      let y = s.querySelectorAll(".counterbar-limiter");
      for (let c of y) n(c, u, p);
      a(s, u, l);
    }
    return { processCounterElement: m };
  }
  function tt() {
    let t = `
      .counter-target-value,
      .counter-current-value,
      .counter_container {
          opacity: 0;
          transition: opacity 0.7s;
      }
  `,
      e = document.createElement("style");
    (e.textContent = t), document.head.appendChild(e);
  }
  function et() {
    let t = document.querySelectorAll("[data-counter-name]"),
      e = Et();
    for (let r of t) e.processCounterElement(r);
  }
  var k = (t, e = !0) => t.cloneNode(e);
  function H(t) {
    t && t.classList.contains("cloak") && t.classList.remove("cloak");
  }
  function nt() {
    {
      let t = `.cloak { 
			opacity: 0;
			height: 0px;
      overflow: hidden;
			margin: 0;
      padding-top: 0;
      padding-bottom: 0;
		}`,
        e = document.createElement("style");
      (e.textContent = t), document.head.appendChild(e);
    }
  }
  function rt() {
    var s, f;
    let t = document.querySelectorAll("[data-counter-name]"),
      r =
        (f =
          (s = Array.from(t).find((l) => l.dataset.counterLocale)) == null
            ? void 0
            : s.dataset.counterLocale) != null
          ? f
          : document.documentElement.lang || "en";
    r.toLowerCase() === "none" && (r = document.documentElement.lang || "en");
    function n(l, u) {
      let p = k(u),
        g = p.querySelector('[data-template="last-person-name"]'),
        y = p.querySelector('[data-template="last-person-time"]');
      return g && y && ((g.innerText = l.name), (y.innerText = o(l.date, r))), p;
    }
    function o(l, u) {
      let p = new Date(),
        g = new Date(l),
        y = new Date(g.getTime() - g.getTimezoneOffset() * 6e4),
        i = Math.floor((p.getTime() - y.getTime()) / 1e3),
        c = new Intl.RelativeTimeFormat(u, { numeric: "auto" });
      if (i < 60) return c.format(-i, "second");
      let d = Math.floor(i / 60);
      if (d < 60) return c.format(-d, "minute");
      let h = Math.floor(i / 3600);
      if (h < 12) return c.format(-h, "hour");
      let x = Math.floor(i / 86400);
      return c.format(-x, "day");
    }
    function a(l) {
      let u = l.last_person.names;
      return (
        u.reverse(), u.filter((g, y, i) => i.findIndex((c) => c.name === g.name) === y)
      );
    }
    async function m(l, u) {
      let p = u.querySelector('[data-template="last-person"]');
      if (!p) return;
      let g = p.parentElement;
      p.remove();
      let y = await C.getCounter(l);
      if (!y || !y.last_person || !y.last_person.names || y.last_person.names.length < 2) {
        g == null || g.remove();
        return;
      }
      let c = a(y).map((d) => n(d, p));
      c.length > 0 && g && (H(g), g.append(...c)),
        c.forEach((d) => {
          setTimeout(function () {
            H(d);
          }, 100);
        });
    }
    t.forEach((l) => {
      let u = l.dataset.counterName || "default";
      m(u, l);
    });
  }
  function _(t) {
    let e = JSON.parse(localStorage.getItem(t) || "{}");
    return Object.entries(e);
  }
  function ot() {
    function t(a) {
      let m = _("forwardedform");
      I(m);
      function s(p) {
        let g = Array.from(
          new URLSearchParams(window.location.search),
          ([y, i]) => `${y}: ${i}`
        ).join(", ");
        return p.find(([y]) => y === "utm") || p.push(["utm", g]), p;
      }
      let f = s(m);
      function l(p) {
        p.forEach(([g, y]) => {
          let i = document.createTextNode(y).textContent,
            c = `<input type="hidden" id="${g}" name="${g}" value="${i}">`;
          a.insertAdjacentHTML("afterbegin", c);
        });
      }
      l(f);
      function u(p) {
        let g = "",
          y = [
            "first_name",
            "first-name",
            "firstname",
            "first",
            "fname",
            "f-name",
            "given_name",
            "given-name",
            "givenname",
            "given",
          ];
        p.forEach(([c, d]) => {
          y.includes(c.toLowerCase()) && (g = d);
        });
        let i = document.querySelectorAll("[data-insert-name]");
        i.length > 0 && g !== "" && r(i, g);
      }
      u(f);
    }
    function e(a) {
      let m = new URLSearchParams(window.location.search),
        s = Array.from(m, ([u, p]) => `${u}: ${p}`),
        f = a.getAttribute("redirect");
      if (f) {
        let u = f + (f != null && f.includes("?") ? "&" : "?") + m.toString();
        a.setAttribute("redirect", u), a.setAttribute("data-redirect", u);
      }
      a.addEventListener("change", () => {
        l(a);
      }),
        a.addEventListener("input", () => {
          l(a);
        });
      function l(u) {
        let p = new FormData(u),
          g = s.join(", ");
        p.set("utm", g),
          localStorage.setItem("forwardedform", JSON.stringify(Object.fromEntries(p)));
      }
    }
    function r(a, m) {
      let s = {
        "no-space": m,
        "leading-space": "&nbsp;" + m,
        "trailing-space": m + "&nbsp;",
        "double-space": "&nbsp;" + m + "&nbsp;",
      };
      a.forEach((f) => {
        let l = f.getAttribute("data-insert-name") || "leading-space";
        s.hasOwnProperty(l) && (f.innerHTML = s[l]);
      });
    }
    let n = document.querySelectorAll("[data-crm]");
    n.length > 0 &&
      n.forEach(function (a) {
        e(a);
      });
    let o = document.querySelectorAll('[data-load-petition="true"]');
    o.length > 0 &&
      o.forEach(function (a) {
        t(a);
      });
  }
  function at() {
    document.querySelectorAll("[data-copy]").forEach((e) => {
      e.addEventListener("mouseover", function () {
        e.style.cursor = "pointer";
      }),
        e.addEventListener("click", async function () {
          let r = "",
            n = e.getAttribute("data-copy") || "";
          if ((n == null ? void 0 : n.toLowerCase()) === "url") r = window.location.href;
          else if ((n == null ? void 0 : n.toLowerCase()) === "prev-url")
            r = document.referrer || "";
          else {
            let o = document.getElementById(n);
            o != null && o.textContent ? (r = o.textContent) : (r = n || "");
          }
          try {
            await navigator.clipboard.writeText(r),
              console.log("Copied to clipboard:", r.toString());
          } catch (o) {
            console.error("Failed to copy: ", o);
          }
        });
    });
  }
  async function st() {
    let t = document.querySelectorAll("[data-js-version]");
    if (t.length < 1) return;
    let e = document.querySelector('script[src$="agera.js"]'),
      r = "";
    if (e) {
      let { src: n } = e,
        o = n.match(/@([^/]+)/);
      if (o) {
        let [, a] = o;
        (r = a), r.toLowerCase().includes("latest") && (r = await X());
      }
    }
    r !== "" &&
      t.forEach((n) => {
        n.innerText = r;
      });
  }
  var it = "data-insert-name";
  function Tt(t) {
    let e = "",
      r = [
        "first_name",
        "first-name",
        "firstname",
        "first",
        "fname",
        "f-name",
        "given_name",
        "given-name",
        "givenname",
        "given",
      ];
    t.forEach(([o, a]) => {
      r.includes(o.toLowerCase()) && (e = a);
    });
    let n = document.querySelectorAll(`[${it}]`);
    n.length > 0 && e !== "" && At(n, e);
  }
  function At(t, e) {
    let r = {
      "no-space": e,
      "leading-space": "&nbsp;" + e,
      "trailing-space": e + "&nbsp;",
      "double-space": "&nbsp;" + e + "&nbsp;",
    };
    t.forEach((n) => {
      let o = n.getAttribute(it) || "leading-space";
      r.hasOwnProperty(o) && (n.innerHTML = r[o]);
    });
  }
  function ct() {
    let t = _("forwardedform");
    Tt(t);
  }
  var vt = typeof atob == "function";
  var N = typeof Buffer == "function",
    ut = typeof TextDecoder == "function" ? new TextDecoder() : void 0,
    en = typeof TextEncoder == "function" ? new TextEncoder() : void 0,
    Ct = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    _t = Array.prototype.slice.call(Ct),
    U = ((t) => {
      let e = {};
      return t.forEach((r, n) => (e[r] = n)), e;
    })(_t),
    Ut = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,
    T = String.fromCharCode.bind(String),
    lt =
      typeof Uint8Array.from == "function"
        ? Uint8Array.from.bind(Uint8Array)
        : (t) => new Uint8Array(Array.prototype.slice.call(t, 0));
  var mt = (t) => t.replace(/[^A-Za-z0-9\+\/]/g, "");
  var Rt = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,
    Ft = (t) => {
      switch (t.length) {
        case 4:
          var e =
              ((7 & t.charCodeAt(0)) << 18) |
              ((63 & t.charCodeAt(1)) << 12) |
              ((63 & t.charCodeAt(2)) << 6) |
              (63 & t.charCodeAt(3)),
            r = e - 65536;
          return T((r >>> 10) + 55296) + T((r & 1023) + 56320);
        case 3:
          return T(
            ((15 & t.charCodeAt(0)) << 12) |
              ((63 & t.charCodeAt(1)) << 6) |
              (63 & t.charCodeAt(2))
          );
        default:
          return T(((31 & t.charCodeAt(0)) << 6) | (63 & t.charCodeAt(1)));
      }
    },
    Mt = (t) => t.replace(Rt, Ft),
    Pt = (t) => {
      if (((t = t.replace(/\s+/g, "")), !Ut.test(t)))
        throw new TypeError("malformed base64.");
      t += "==".slice(2 - (t.length & 3));
      let e,
        r = "",
        n,
        o;
      for (let a = 0; a < t.length; )
        (e =
          (U[t.charAt(a++)] << 18) |
          (U[t.charAt(a++)] << 12) |
          ((n = U[t.charAt(a++)]) << 6) |
          (o = U[t.charAt(a++)])),
          (r +=
            n === 64
              ? T((e >> 16) & 255)
              : o === 64
              ? T((e >> 16) & 255, (e >> 8) & 255)
              : T((e >> 16) & 255, (e >> 8) & 255, e & 255));
      return r;
    },
    dt = vt
      ? (t) => atob(mt(t))
      : N
      ? (t) => Buffer.from(t, "base64").toString("binary")
      : Pt,
    Dt = N
      ? (t) => lt(Buffer.from(t, "base64"))
      : (t) =>
          lt(
            dt(t)
              .split("")
              .map((e) => e.charCodeAt(0))
          );
  var kt = N
      ? (t) => Buffer.from(t, "base64").toString("utf8")
      : ut
      ? (t) => ut.decode(Dt(t))
      : (t) => Mt(dt(t)),
    Ht = (t) => mt(t.replace(/[-_]/g, (e) => (e == "-" ? "+" : "/"))),
    ft = (t) => kt(Ht(t));
  function pt() {
    document.querySelectorAll("[data-insert-query]").forEach((e) => {
      let r = e.getAttribute("data-insert-query");
      if (r) {
        let n = new URLSearchParams(window.location.search).get(r);
        n !== null &&
          (e instanceof HTMLInputElement ||
          e instanceof HTMLSelectElement ||
          e instanceof HTMLTextAreaElement
            ? (e.value = n.toString())
            : (e.textContent = n.toString()));
      }
    });
  }
  function gt() {
    document.querySelectorAll("[data-insert-b64-query]").forEach((e) => {
      let r = e.getAttribute("data-insert-b64-query");
      if (r) {
        let n = ft(new URLSearchParams(window.location.search).get(r) || "");
        n &&
          (e instanceof HTMLInputElement ||
          e instanceof HTMLSelectElement ||
          e instanceof HTMLTextAreaElement
            ? (e.value = n.toString())
            : (e.textContent = n.toString()));
      }
    });
  }
  function yt() {
    function t() {
      let a = window.location.pathname.split("/").filter((s) => s.length === 2),
        m = a.length > 0 ? a[0] : "";
      return m !== "" ? "/" + m : m;
    }
    function e(o) {
      try {
        return new URL(o), !0;
      } catch {
        return !1;
      }
    }
    function r(o, a) {
      if (o === null) return "";
      if (e(o)) {
        let m = new URL(o);
        return (m.pathname = a + m.pathname), m.toString();
      }
      return a + o;
    }
    let n = document.querySelectorAll('[data-linguana-redirect="true"]');
    for (let o of n)
      o.getAttribute("redirect") &&
        o.setAttribute("redirect", r(o.getAttribute("redirect"), t())),
        o.getAttribute("data-redirect") &&
          o.setAttribute("data-redirect", r(o.getAttribute("data-redirect"), t()));
  }
  function ht() {
    let t = new URLSearchParams(window.location.search);
    document.querySelectorAll("[data-redirect]").forEach((r) => {
      let n = r.getAttribute("data-redirect");
      try {
        if (n) {
          let o = new URL(n, document.baseURI),
            a = new URL(o.toString()),
            m = a.searchParams;
          t.forEach((s, f) => {
            m.has(f) || m.set(f, s);
          }),
            r.setAttribute("data-redirect", a.toString());
        }
      } catch (o) {
        console.error("An error occurred:", o);
      }
    });
  }
  function wt() {
    let t = [document.documentElement.lang || "en", "en"];
    document.querySelectorAll("[data-insert-time]").forEach((n) => {
      n.innerText = Nt(n, t);
    }),
      document.querySelectorAll("[data-remaining-days-to]").forEach((n) => {
        n.innerText = Ot(n, t);
      });
  }
  function Nt(t, e) {
    let r = new Date(),
      n = t.getAttribute("data-insert-time"),
      o = "";
    if ((n == null ? void 0 : n.toLowerCase()) === "year") o = r.getFullYear().toString();
    else if ((n == null ? void 0 : n.toLowerCase()) === "month")
      o = (r.getMonth() + 1).toString();
    else if ((n == null ? void 0 : n.toLowerCase()) === "day") o = r.getDate().toString();
    else if ((n == null ? void 0 : n.toLowerCase()) === "date") o = r.toLocaleDateString(e);
    else if ((n == null ? void 0 : n.toLowerCase()) === "datetime") o = r.toLocaleString(e);
    else if ((n == null ? void 0 : n.toLowerCase()) === "time") o = r.toLocaleTimeString(e);
    else return "";
    return o;
  }
  function Ot(t, e) {
    let r = new Date(),
      n = t.getAttribute("data-remaining-days-to");
    try {
      if (n) {
        let o = new Date(n),
          a = Math.round((o.getTime() - r.getTime()) / (1e3 * 60 * 60 * 24));
        return new Intl.RelativeTimeFormat(e, { numeric: "auto" }).format(a, "day");
      }
    } catch (o) {
      console.error("remainingDays error:", o);
    }
    return "";
  }
  function It() {
    tt(),
      nt(),
      document.addEventListener("DOMContentLoaded", () => {
        yt(), q(), ot(), et(), Y(), rt(), ct(), wt(), ht(), st(), at(), pt(), gt();
      });
  }
  window.agera || ((window.agera = !0), It());
})();
