(function () {
  "use strict";

  const overview = window.radiationMatterOverview;
  const topics = window.radiationMatterTopics;
  const advancedTopics = window.radiationMatterAdvancedTopics.map(function (lesson) {
    return Object.assign({ isAdvanced: true }, lesson);
  });
  const sidebar = document.getElementById("lesson-sidebar");
  const navigation = document.getElementById("lesson-navigation");
  const search = document.getElementById("sidebar-search");
  const emptyMessage = document.getElementById("sidebar-empty");
  const articleTitle = document.getElementById("article-title");
  const articleDescription = document.getElementById("article-description");
  const articleCategory = document.getElementById("article-category");
  const articleNumber = document.getElementById("article-number");
  const breadcrumbs = document.getElementById("lesson-breadcrumbs");
  const articleBody = document.getElementById("article-body");
  const pager = document.getElementById("lesson-pager");
  const allLessons = [overview].concat(topics, advancedTopics);
  const topicId = new URLSearchParams(window.location.search).get("topic");
  const selectedLesson = [overview].concat(topics).find(function (lesson) {
    return lesson.id === topicId;
  }) || overview;
  const selectedIndex = allLessons.indexOf(selectedLesson);

  function makeLink(text, href, className) {
    const link = document.createElement("a");
    link.textContent = text;
    link.href = href;
    if (className) {
      link.className = className;
    }
    return link;
  }

  function topicHref(lesson) {
    if (lesson.id === overview.id) {
      return "radiation-matter-interaction.html";
    }
    return lesson.isAdvanced
      ? "radiation-matter-advanced.html?topic=" + encodeURIComponent(lesson.id)
      : "radiation-matter-interaction.html?topic=" + encodeURIComponent(lesson.id);
  }

  function addNavItem(lesson, index) {
    const link = makeLink(
      lesson.id === overview.id ? "Overview" : lesson.title,
      topicHref(lesson),
      "lesson-nav-link"
    );
    const plainNumber = lesson.id === overview.id ? "" : String(index);
    const number = plainNumber ? plainNumber.padStart(2, "0") : "";
    link.dataset.search = [
      lesson.title,
      lesson.keywords || "",
      number,
      plainNumber,
      number ? "#" + number : "",
      plainNumber ? "#" + plainNumber : "",
      number ? "topic " + number : "",
      plainNumber ? "topic " + plainNumber : ""
    ].join(" ").toLocaleLowerCase();
    if (lesson.id === overview.id) {
      link.classList.add("overview-link");
    } else {
      const numberLabel = document.createElement("span");
      numberLabel.className = "nav-number";
      numberLabel.textContent = number;
      link.prepend(numberLabel);
    }
    if (lesson.id === selectedLesson.id) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    }
    navigation.appendChild(link);
  }

  addNavItem(overview, 0);
  topics.forEach(function (lesson, index) {
    addNavItem(lesson, index + 1);
  });
  advancedTopics.forEach(function (lesson, index) {
    addNavItem(lesson, topics.length + index + 1);
  });

  function addParagraph(parent, text, className) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    if (className) {
      paragraph.className = className;
    }
    parent.appendChild(paragraph);
  }

  function renderSection(section) {
    const sectionElement = document.createElement("section");
    sectionElement.className = "article-section";

    const heading = document.createElement("h2");
    heading.textContent = section.heading;
    sectionElement.appendChild(heading);

    section.paragraphs.forEach(function (paragraph) {
      addParagraph(sectionElement, paragraph);
    });

    if (section.equation) {
      const equation = document.createElement("div");
      equation.className = "equation";
      equation.textContent = section.equation;
      equation.setAttribute("role", "math");
      sectionElement.appendChild(equation);
    }

    if (section.note) {
      addParagraph(sectionElement, section.note, "equation-note");
    }

    if (section.callout) {
      addParagraph(sectionElement, section.callout, "article-callout");
    }

    if (section.linkHref && section.linkLabel) {
      sectionElement.appendChild(makeLink(section.linkLabel, section.linkHref, "article-related-link"));
    }

    articleBody.appendChild(sectionElement);
  }

  function renderPoints(points) {
    const section = document.createElement("section");
    section.className = "article-section key-points";
    const heading = document.createElement("h2");
    heading.textContent = "Key points";
    section.appendChild(heading);
    const list = document.createElement("ul");
    points.forEach(function (point) {
      const item = document.createElement("li");
      item.textContent = point;
      list.appendChild(item);
    });
    section.appendChild(list);
    articleBody.appendChild(section);
  }

  function addBreadcrumbLink(text, href) {
    breadcrumbs.appendChild(makeLink(text, href));
    const separator = document.createElement("span");
    separator.textContent = "/";
    separator.setAttribute("aria-hidden", "true");
    breadcrumbs.appendChild(separator);
  }

  function renderPager() {
    const previous = allLessons[selectedIndex - 1];
    const next = allLessons[selectedIndex + 1];

    if (previous) {
      const previousLink = makeLink("", topicHref(previous), "pager-link pager-previous");
      const label = document.createElement("span");
      label.className = "pager-label";
      label.textContent = "Previous lesson";
      const title = document.createElement("strong");
      title.textContent = previous.title;
      previousLink.append(label, title);
      pager.appendChild(previousLink);
    }

    if (next) {
      const nextLink = makeLink("", topicHref(next), "pager-link pager-next");
      const label = document.createElement("span");
      label.className = "pager-label";
      label.textContent = "Next lesson";
      const title = document.createElement("strong");
      title.textContent = next.title;
      nextLink.append(label, title);
      pager.appendChild(nextLink);
    }
  }

  articleTitle.textContent = selectedLesson.title;
  articleDescription.textContent = selectedLesson.description;
  articleCategory.textContent = selectedLesson.category || "COURSE OVERVIEW";
  articleNumber.textContent = selectedLesson.id === overview.id
    ? "COURSE OVERVIEW"
    : "TOPIC " + String(selectedIndex).padStart(2, "0") + " / " +
      String(topics.length + advancedTopics.length).padStart(2, "0");
  addBreadcrumbLink("Home", "index.html");
  addBreadcrumbLink("Radiography", "Radiography.html");
  if (selectedLesson.id !== overview.id) {
    addBreadcrumbLink("Radiation–Matter Interaction", "radiation-matter-interaction.html");
  }
  const currentCrumb = document.createElement("span");
  currentCrumb.textContent = selectedLesson.title;
  currentCrumb.setAttribute("aria-current", "page");
  breadcrumbs.appendChild(currentCrumb);

  selectedLesson.sections.forEach(renderSection);
  if (selectedLesson.points) {
    renderPoints(selectedLesson.points);
  }
  if (selectedLesson.relatedHref && selectedLesson.relatedLabel) {
    articleBody.appendChild(makeLink(
      selectedLesson.relatedLabel,
      selectedLesson.relatedHref,
      "article-related-link article-related-link-bottom"
    ));
  }
  renderPager();
  document.title = selectedLesson.title + " | Radiation–Matter Interaction | RadioDx Academy";

  search.addEventListener("input", function () {
    const query = search.value.trim().toLocaleLowerCase();
    let visibleCount = 0;
    navigation.querySelectorAll(".lesson-nav-link").forEach(function (link) {
      const visible = link.dataset.search.includes(query);
      link.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
    });
    emptyMessage.hidden = visibleCount > 0;
  });

  const mobileSidebar = window.matchMedia("(max-width: 760px)");
  function setSidebarForViewport() {
    sidebar.open = !mobileSidebar.matches;
  }
  setSidebarForViewport();
  if (mobileSidebar.addEventListener) {
    mobileSidebar.addEventListener("change", setSidebarForViewport);
  } else {
    mobileSidebar.addListener(setSidebarForViewport);
  }
}());
