/**
 * Student Academic Resource Archive
 * Global search enhancement used by all static pages.
 */
(function () {
  "use strict";

  const SITE_SEARCH_ITEMS = [
    { title: "Home", category: "Main", url: "index.html", keywords: "student academic resource archive home question papers syllabus admissions merit lists e resources useful links" },
    { title: "Global Search", category: "Main", url: "global-search.html", keywords: "global search archive find resources pages documents all site" },
    { title: "Question Paper Archive", category: "Question Papers", url: "pyq-all-pogramme.html", keywords: "question papers previous year pyq all programme pg fyugp fyimp btech bed law llb" },
    { title: "PG Question Papers", category: "Question Papers", url: "PG-ALL-PROGRAMME.html", keywords: "postgraduate pg masters ma msc mtech mba mcom mlisc mtm llm nursing medical laboratory science" },
    { title: "Master of Arts (MA) Question Papers", category: "Question Papers", url: "PG-MA.html", keywords: "ma assamese english history political science sociology hindi philosophy economics education psychology geography anthropology arabic persian sanskrit" },
    { title: "Master of Science (MSc) Question Papers", category: "Question Papers", url: "PG-msc.html", keywords: "msc physics chemistry mathematics botany zoology geography statistics biotechnology environmental science geology wildlife science" },
    { title: "M.Tech Question Papers", category: "Question Papers", url: "PG-mtech.html", keywords: "mtech technology engineering signal processing biotechnology material science information technology" },
    { title: "MBA Question Papers", category: "Question Papers", url: "PG-MBA.html", keywords: "mba business administration management question papers" },
    { title: "MCom Question Papers", category: "Question Papers", url: "PG-MCOM.html", keywords: "mcom commerce question papers accounting finance" },
    { title: "MLISc Question Papers", category: "Question Papers", url: "PG-mlisc.html", keywords: "mlisc library information science question papers" },
    { title: "MTM Question Papers", category: "Question Papers", url: "PG-MTM.html", keywords: "mtm tourism management question papers" },
    { title: "LLM Question Papers", category: "Question Papers", url: "PG-LLM.html", keywords: "llm law legal question papers" },
    { title: "Medical Laboratory Science Question Papers", category: "Question Papers", url: "PG-MedSc.html", keywords: "medical laboratory science medsc question papers" },
    { title: "MSc Nursing Question Papers", category: "Question Papers", url: "PG-nursing.html", keywords: "msc nursing question papers" },
    { title: "FYUGP Question Papers", category: "Question Papers", url: "pyq-fyugp.html", keywords: "fyugp undergraduate ug nep semester question papers final sessional" },
    { title: "FYIMP Question Papers", category: "Question Papers", url: "pyq-fyimp.html", keywords: "fyimp five year integrated masters ug question papers final sessional" },
    { title: "B.Tech Question Papers", category: "Question Papers", url: "pyq-btech.html", keywords: "btech b tech engineering computer science electronics communication mechanical civil biotechnology question papers" },
    { title: "B.Ed Academic Resources", category: "Question Papers", url: "pyq-bed.html", keywords: "bed b ed education course structure semester question papers" },
    { title: "Admission Helpdesk", category: "Admissions", url: "all-helpdesk.html", keywords: "admission helpdesk programme pget fyimp btech bed entrance merit" },
    { title: "GUPGET Information", category: "Admissions", url: "pget-helpdesk.html", keywords: "gupget pget pg entrance admission eligibility documents seat matrix reservation selection application" },
    { title: "FYIMP Admission Helpdesk", category: "Admissions", url: "fyimp-helpdesk.html", keywords: "fyimp admission cutoff merit eligibility documents reservation application" },
    { title: "B.Tech Admission Helpdesk", category: "Admissions", url: "btech-helpdesk.html", keywords: "guist btech admission cutoff rank list branches fee documents seats placement" },
    { title: "B.Ed Admission Helpdesk", category: "Admissions", url: "bed-helpdesk.html", keywords: "bed admission gubedcet dates colleges exam pattern syllabus fee resources" },
    { title: "PG Merit Lists 2025-2026", category: "Merit Lists", url: "pget-merit.html", keywords: "pget merit list pg traditional courses interdisciplinary courses selection list 2025 2026" },
    { title: "GUPGET Syllabus Portal", category: "Syllabus", url: "pget-syllabus.html", keywords: "pget gupget pg syllabus important topics model papers course department" },
    { title: "GUPGET Entrance Exam Pattern", category: "Exam Guidance", url: "pget-exam pattern.html", keywords: "gupget pget entrance exam pattern question paper marks guidance" },
    { title: "FYUGP Marking Pattern", category: "Exam Guidance", url: "FYUGP-Marking-pattern.html", keywords: "fyugp marking pattern nep 2020 design of question papers core structure" },
    { title: "About Us", category: "Project", url: "About.html", keywords: "about us project development vision disclaimer" },
    { title: "About the Project", category: "Project", url: "the-project.html", keywords: "about project student created initiative educational purpose non commercial contact" },
    { title: "Contact Us", category: "Project", url: "contact-us.html", keywords: "contact email suggestions corrections missing papers contributions" },
    { title: "Feedback", category: "Project", url: "Feedback.html", keywords: "feedback suggestion report correction" },
    { title: "Support Us", category: "Project", url: "support-us.html", keywords: "support contribute question paper contribution help archive" },
    { title: "Copyright", category: "Project", url: "copyright.html", keywords: "copyright disclaimer ownership academic documents" },
    { title: "National Digital Library of India", category: "E-Resources", url: "https://ndl.iitkgp.ac.in/", keywords: "ndl digital library e resources", external: true },
    { title: "INFLIBNET N-LIST", category: "E-Resources", url: "https://nlist.inflibnet.ac.in/", keywords: "nlist inflibnet e journals ebooks", external: true },
    { title: "Google Scholar", category: "E-Resources", url: "https://scholar.google.com/", keywords: "google scholar research articles literature", external: true },
    { title: "Shodhganga", category: "E-Resources", url: "https://shodhganga.inflibnet.ac.in/", keywords: "shodhganga thesis dissertation research", external: true },
    { title: "GU Official Website", category: "Useful Links", url: "https://gauhati.ac.in/", keywords: "gauhati university official website gu", external: true },
    { title: "GU Admissions Portal", category: "Useful Links", url: "https://admissions.gauhati.ac.in/", keywords: "gauhati university admissions samarth portal", external: true }
  ];

  window.SITE_SEARCH_ITEMS = SITE_SEARCH_ITEMS;

  document.addEventListener("DOMContentLoaded", function () {
    const localItems = collectLocalItems();
    const index = uniqueItems(SITE_SEARCH_ITEMS.concat(localItems));
    const inputs = document.querySelectorAll("#globalSearch, #searchInput, #heroSearch, #resourceSearch, #searchBar");

    inputs.forEach(function (input) {
      setupAutocomplete(input, index);
    });

    document.addEventListener("keydown", function (event) {
      const active = document.activeElement;
      const isTyping = active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName);

      if (event.key === "/" && !isTyping) {
        const input = document.querySelector("#globalSearch, #heroSearch, #resourceSearch, #searchInput, #searchBar");
        if (input) {
          event.preventDefault();
          input.focus();
        }
      }
    });
  });

  function setupAutocomplete(input, index) {
    if (!input || input.dataset.globalSearchReady === "true") return;
    input.dataset.globalSearchReady = "true";

    let wrapper = input.closest(".search-input-wrapper");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "search-input-wrapper";
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);
    }

    const dropdown = document.createElement("div");
    dropdown.className = "search-autocomplete-dropdown";
    dropdown.hidden = true;
    wrapper.appendChild(dropdown);

    const clear = document.createElement("button");
    clear.type = "button";
    clear.className = "search-clear-btn";
    clear.setAttribute("aria-label", "Clear search");
    clear.textContent = "x";
    clear.hidden = true;
    wrapper.appendChild(clear);

    input.addEventListener("input", function () {
      const query = normalize(input.value);
      clear.hidden = !query;

      if (!query) {
        dropdown.hidden = true;
        dropdown.innerHTML = "";
        return;
      }

      renderDropdown(dropdown, runSearch(query, index).slice(0, 8), query);
    });

    clear.addEventListener("click", function () {
      input.value = "";
      clear.hidden = true;
      dropdown.hidden = true;
      dropdown.innerHTML = "";
      input.focus();
    });

    document.addEventListener("click", function (event) {
      if (!wrapper.contains(event.target)) dropdown.hidden = true;
    });
  }

  function renderDropdown(dropdown, results, query) {
    dropdown.innerHTML = "";

    if (!results.length) {
      dropdown.innerHTML = '<div class="search-no-results">No matching resources found.<br><small>Try "Physics", "PGET", "FYUGP", "Merit", or "B.Ed".</small></div>';
      dropdown.hidden = false;
      return;
    }

    results.forEach(function (item) {
      const link = document.createElement("a");
      link.className = "search-result-item";
      link.href = resolveUrl(item.url);
      if (item.external || /^https?:\/\//i.test(item.url)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      const content = document.createElement("div");
      content.className = "search-result-content";

      const title = document.createElement("div");
      title.className = "search-result-title";
      title.innerHTML = highlight(item.title, query);

      const desc = document.createElement("div");
      desc.className = "search-result-desc";
      desc.textContent = item.category || "Resource";

      content.append(title, desc);
      link.appendChild(content);

      const badge = document.createElement("span");
      badge.className = "search-result-badge";
      badge.textContent = item.external ? "Link" : "Page";
      link.appendChild(badge);

      dropdown.appendChild(link);
    });

    dropdown.hidden = false;
  }

  function runSearch(query, index) {
    const words = query.split(/\s+/).filter(Boolean);

    return index
      .map(function (item) {
        const haystack = normalize([item.title, item.category, item.keywords, item.url].filter(Boolean).join(" "));
        const score = words.reduce(function (total, word) {
          if (normalize(item.title).includes(word)) return total + 4;
          if (normalize(item.category).includes(word)) return total + 2;
          if (haystack.includes(word)) return total + 1;
          return total;
        }, 0);

        return Object.assign({}, item, { score: score, haystack: haystack });
      })
      .filter(function (item) {
        return words.every(function (word) {
          return item.haystack.includes(word);
        });
      })
      .sort(function (a, b) {
        return b.score - a.score || a.title.localeCompare(b.title);
      });
  }

  window.runSiteSearch = function (query) {
    return runSearch(normalize(query), uniqueItems(SITE_SEARCH_ITEMS.concat(collectLocalItems())));
  };

  function collectLocalItems() {
    const items = [];

    document.querySelectorAll("a[href]").forEach(function (link) {
      const href = link.getAttribute("href");
      const label = clean(link.textContent);

      if (!href || href === "#" || !label || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      items.push({
        title: label,
        category: href.includes("drive.google.com") ? "Documents" : "On This Page",
        url: href,
        keywords: [label, href, document.title].join(" "),
        external: /^https?:\/\//i.test(href)
      });
    });

    document.querySelectorAll("details.department > summary, details.main-course > summary, details.semester > summary").forEach(function (summary) {
      const label = clean(summary.textContent);
      if (label) {
        items.push({
          title: label,
          category: "Current Page Section",
          url: location.href,
          keywords: [label, document.title, "department semester programme"].join(" ")
        });
      }
    });

    return items;
  }

  function resolveUrl(url) {
    try {
      return new URL(url, document.baseURI).href;
    } catch (error) {
      return url;
    }
  }

  function uniqueItems(items) {
    const seen = new Set();
    return items.filter(function (item) {
      const key = [item.title, item.url].join("|").toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function highlight(text, query) {
    let output = escapeHtml(text);
    query.split(/\s+/).filter(Boolean).forEach(function (word) {
      output = output.replace(new RegExp("(" + escapeRegExp(escapeHtml(word)) + ")", "gi"), "<mark>$1</mark>");
    });
    return output;
  }

  function clean(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeRegExp(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
})();
