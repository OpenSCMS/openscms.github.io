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
      path.includes("/pages/docs/bridge/")
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
      }pages/about.html">About</a>
                            </li>
                            <li class="menu-item ${this.currentPage === "documentation"
        ? "active"
        : ""
      }">
                                <a href="${this.basePath
      }pages/docs.html">Docs</a>
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
                            <a href="${docsBasePath}guides.html">Guides</a>
                        </li>
                        <li class="submenu-tab ${isComponentsPage ? "active" : ""
      }">
                            <a href="${docsBasePath}scms-components.html">SCMS Components</a>
                        </li>
                        <li class="submenu-tab ${isBridgePage ? "active" : ""}">
                            <a href="${docsBasePath}codecs-bridge.html">Codecs Bridge</a>
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

    if (headerPlaceholder) {
      headerPlaceholder.innerHTML = this.getHeaderTemplate();
    }

    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = this.getFooterTemplate();
    }

    if (docsSubmenuPlaceholder) {
      docsSubmenuPlaceholder.innerHTML = this.getDocsSubmenuTemplate();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loader = new ComponentLoader();
  loader.init();
});
