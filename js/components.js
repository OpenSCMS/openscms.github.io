/*
Copyright (c) 2025 LG Electronics, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

SPDX-License-Identifier: Apache-2.0
*/


class ComponentLoader {
  constructor() {
    this.basePath = this.getBasePath();
    this.currentPage = this.getCurrentPage();
  }

  getBasePath() {
    const path = window.location.pathname;
    if (
      path.includes("/pages/docs/guides/") ||
      path.includes("/pages/docs/components/") ||
      path.includes("/pages/docs/bridge/") ||
      path.includes("/pages/about/overview/")
    ) {
      return "../../../";
    }

    if (path.includes("/pages/docs/") || path.includes("/pages/about/")) {
      return "../../";
    }

    if (path.includes("/pages/")) {
      return "../";
    }

    return "./";
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "") || "index";

    const pageMap = {
      index: "index",
      "": "index",
      about: "about",
      overview: path.includes("/about/") ? "about" : "documentation",
      introduction: "about",
      "interaction-flows": "about",
      challenges: "about",
      openscms: "about",
      governance: "about",
      "release-notes": "about",
      blog: "blog",
      source: "source",
      faq: "faq",
      docs: "documentation",
      documentation: "documentation",
      guides: "documentation",
      "getting-started": "documentation",
      architecture: "documentation",
      "code-structure": "documentation",
      setup: "documentation",
      assumptions: "documentation",
      "scms-components": "documentation",
      ra: "documentation",
      eca: "documentation",
      aca: "documentation",
      la: "documentation",
      "codecs-bridge": "documentation",
      build: "documentation",
      "library-layers": "documentation",
      utilities: "documentation",
      development: "documentation",
      installation: "documentation",
      "api-reference": "documentation",
      license: "license",
    };

    return pageMap[filename] || "index";
  }

  getHeaderTemplate() {
    return `
            <header class="header">
                <div class="container header-container">
                    <div class="header-left">
                        <a href="${this.basePath
      }index.html" style="display: block; line-height: 0;">
                            <img src="${this.basePath
      }assets/openscms_logo_final_hor.png" alt="OpenSCMS Logo" class="header-logo">
                        </a>
                    </div>
                    <nav class="header-nav">
                        <ul class="header-menu">
                            <li class="menu-item ${this.currentPage === "about" ? "active" : ""
      }">
                                <a href="${this.basePath
      }pages/about/overview/introduction.html">About</a>
                            </li>
                            <li class="menu-item ${this.currentPage === "documentation"
        ? "active"
        : ""
      }">
                                <a href="${this.basePath
      }pages/docs/overview.html">Docs</a>
                            </li>
                            <li class="menu-item ${this.currentPage === "faq" ? "active" : ""
      }">
                                <a href="${this.basePath
      }pages/faq.html">FAQ</a>
                            </li>
                            <li class="menu-item">
                                <a href="https://github.com/orgs/OpenSCMS/discussions" target="_blank" rel="noopener noreferrer">Community</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
  }

  getFooterTemplate() {
    return `
            <footer class="footer">
                <div class="container">
                    <p>&copy; 2025 LG Electronics, Inc. Licensed under Apache License 2.0.</p>
                    <p>IEEE 1609.2.1 SCMS Implementation</p>
                </div>
            </footer>
        `;
  }

  getAboutSidebarTemplate() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "");
    const hash = window.location.hash;
    const isOverviewSubpage = path.includes("/pages/about/overview/");
    const overviewBasePath = isOverviewSubpage ? "" : "overview/";

    // Helper function to check if link should be active
    const isActive = (pageName, hashValue = null) => {
      if (hashValue) {
        return filename === pageName && hash === hashValue;
      }
      return filename === pageName;
    };

    return `
            <aside class="docs-sidebar">
                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Background</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${overviewBasePath}introduction.html" class="sidebar-nav-link ${isActive('introduction') ? 'active' : ''}">Introduction</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${overviewBasePath}interaction-flows.html" class="sidebar-nav-link ${isActive('interaction-flows') ? 'active' : ''}">Core Interaction Flows</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${overviewBasePath}challenges.html" class="sidebar-nav-link ${isActive('challenges') ? 'active' : ''}">Architectural
                                Challenges</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">The OpenSCMS</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${isOverviewSubpage ? '../' : ''}openscms.html#overview" class="sidebar-nav-link ${isActive('openscms', '#overview') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${isOverviewSubpage ? '../' : ''}openscms.html#architecture" class="sidebar-nav-link ${isActive('openscms', '#architecture') ? 'active' : ''}">Architecture</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${isOverviewSubpage ? '../' : ''}openscms.html#root-of-trust" class="sidebar-nav-link ${isActive('openscms', '#root-of-trust') ? 'active' : ''}">Root of Trust</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${isOverviewSubpage ? '../' : ''}openscms.html#deployment" class="sidebar-nav-link ${isActive('openscms', '#deployment') ? 'active' : ''}">Deployment</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Governance & Licensing</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${isOverviewSubpage ? '../' : ''}governance.html#governance" class="sidebar-nav-link ${isActive('governance', '#governance') ? 'active' : ''}">Governance Model</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${isOverviewSubpage ? '../' : ''}governance.html#developer-grant" class="sidebar-nav-link ${isActive('governance', '#developer-grant') ? 'active' : ''}">Developer Grant and
                                CLA</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${isOverviewSubpage ? '../' : ''}governance.html#license" class="sidebar-nav-link ${isActive('governance', '#license') ? 'active' : ''}">Apache License 2.0</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Release Notes</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${isOverviewSubpage ? '../' : ''}release-notes.html#release-notes" class="sidebar-nav-link ${isActive('release-notes', '#release-notes') ? 'active' : ''}">OpenSCMS 1.0.0</a>
                        </li>
                    </ul>
                </div>
            </aside>
        `;
  }


  getDocsSubmenuTemplate() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "");

    let docsBasePath = "./";
    if (path.includes("/pages/docs/components/")) {
      docsBasePath = "../";
    } else if (path.includes("/pages/docs/guides/")) {
      docsBasePath = "../";
    } else if (path.includes("/pages/docs/bridge/")) {
      docsBasePath = "../";
    } else if (path.includes("/pages/docs/")) {
      docsBasePath = "./";
    } else if (path.includes("/pages/")) {
      docsBasePath = "docs/";
    }

    const isGuidesPage =
      filename === "guides" ||
      filename === "getting-started" ||
      filename === "architecture" ||
      filename === "code-structure" ||
      filename === "setup" ||
      filename === "assumptions";

    const isComponentsPage =
      filename === "scms-components" ||
      filename === "ra" ||
      filename === "eca" ||
      filename === "aca" ||
      filename === "la" ||
      (filename === "overview" && path.includes("/components/"));

    const isBridgePage =
      filename === "codecs-bridge" ||
      filename === "build" ||
      filename === "library-layers" ||
      filename === "utilities" ||
      filename === "development" ||
      (filename === "overview" && path.includes("/bridge/"));

    return `
            <nav class="docs-submenu">
                <div class="container">
                    <ul class="submenu-tabs">
                        <li class="submenu-tab ${filename === "overview" &&
        !path.includes("/components/") &&
        !path.includes("/bridge/")
        ? "active"
        : ""
      }">
                            <a href="${docsBasePath}overview.html">Overview</a>
                        </li>
                        <li class="submenu-tab ${isGuidesPage ? "active" : ""}">
                            <a href="${docsBasePath}guides/getting-started.html">Guides</a>
                        </li>
                        <li class="submenu-tab ${isComponentsPage ? "active" : ""
      }">
                            <a href="${docsBasePath}components/overview.html">SCMS Components</a>
                        </li>
                        <li class="submenu-tab ${isBridgePage ? "active" : ""}">
                            <a href="${docsBasePath}bridge/overview.html">Codecs Bridge</a>
                        </li>
                        <li class="submenu-tab ${filename === "api-reference" ? "active" : ""
      }">
                            <a href="${docsBasePath}api-reference.html">API Reference</a>
                        </li>
                    </ul>
                </div>
            </nav>
        `;
  }

  init() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");
    const docsSubmenuPlaceholder = document.getElementById(
      "docs-submenu-placeholder"
    );
    const aboutSidebarPlaceholder = document.getElementById("about-sidebar-placeholder");

    if (headerPlaceholder) {
      headerPlaceholder.innerHTML = this.getHeaderTemplate();
    }

    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = this.getFooterTemplate();
    }

    if (docsSubmenuPlaceholder) {
      docsSubmenuPlaceholder.innerHTML = this.getDocsSubmenuTemplate();
    }

    if (aboutSidebarPlaceholder) {
      aboutSidebarPlaceholder.innerHTML = this.getAboutSidebarTemplate();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loader = new ComponentLoader();
  loader.init();
});
