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

// Main component loader - orchestrates all page components
class ComponentLoader {
  constructor() {
    this.basePath = PathUtils.getBasePath();
    this.currentPage = PathUtils.getCurrentPage();
  }

  // Header template
  getHeaderTemplate() {
    return `
      <header class="header">
        <div class="container header-container">
          <div class="header-left">
            <a href="${this.basePath}index.html" style="display: block; line-height: 0;">
              <img src="${this.basePath}assets/openscms_logo_final_hor.png" alt="OpenSCMS Logo" class="header-logo">
            </a>
          </div>
          <nav class="header-nav">
            <ul class="header-menu">
              <li class="menu-item ${this.currentPage === "about" ? "active" : ""}">
                <a href="${this.basePath}pages/about/overview/introduction.html">About</a>
              </li>
              <li class="menu-item ${this.currentPage === "documentation" ? "active" : ""}">
                <a href="${this.basePath}pages/docs/overview.html">Docs</a>
              </li>
              <li class="menu-item ${this.currentPage === "faq" ? "active" : ""}">
                <a href="${this.basePath}pages/faq.html">FAQ</a>
              </li>
              <li class="menu-item">
                <a href="https://github.com/orgs/OpenSCMS/discussions" target="_blank" rel="noopener noreferrer">Community</a>
              </li>
              <li class="menu-item">
                <a href="https://github.com/OpenSCMS" target="_blank" rel="noopener noreferrer" class="header-github-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }

  // Footer template
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

  // Docs submenu template
  getDocsSubmenuTemplate() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "");

    let docsBasePath = "./";
    if (
      path.includes("/pages/docs/guides/") ||
      path.includes("/pages/docs/components/") ||
      path.includes("/pages/docs/bridge/")
    ) {
      if (
        path.match(/\/pages\/docs\/(guides|components|bridge)\/[^/]+\/[^/]+\.html/)
      ) {
        docsBasePath = "../../";
      } else {
        docsBasePath = "../";
      }
    } else if (path.includes("/pages/docs/")) {
      docsBasePath = "./";
    } else if (path.includes("/pages/")) {
      docsBasePath = "docs/";
    }

    const isGuidesPage = path.includes("/pages/docs/guides/");
    const isComponentsPage = path.includes("/pages/docs/components/");
    const isBridgePage = path.includes("/pages/docs/bridge/");
    const isOverviewPage = path.includes("/pages/docs/overview.html") ||
      (filename === "overview" && !isGuidesPage && !isComponentsPage && !isBridgePage);
    const isApiReferencePage = filename === "api-reference";

    return `
      <nav class="docs-submenu">
        <div class="container">
          <ul class="submenu-tabs">
            <li class="submenu-tab ${isOverviewPage ? "active" : ""}">
              <a href="${docsBasePath}overview.html">Overview</a>
            </li>
            <li class="submenu-tab ${isGuidesPage ? "active" : ""}">
              <a href="${docsBasePath}guides/getting-started/overview.html">Guides</a>
            </li>
            <li class="submenu-tab ${isComponentsPage ? "active" : ""}">
              <a href="${docsBasePath}components/overview.html">SCMS Components</a>
            </li>
            <li class="submenu-tab ${isBridgePage ? "active" : ""}">
              <a href="${docsBasePath}bridge/overview.html">Codecs Bridge</a>
            </li>
            <li class="submenu-tab ${isApiReferencePage ? "active" : ""}">
              <a href="${docsBasePath}api-reference.html">API Reference</a>
            </li>
          </ul>
        </div>
      </nav>
    `;
  }

  // Initialize all components
  init() {
    // Render templates
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");
    const docsSubmenuPlaceholder = document.getElementById("docs-submenu-placeholder");
    const aboutSidebarPlaceholder = document.getElementById("about-sidebar-placeholder");
    const docsGuidesSidebarPlaceholder = document.getElementById("docs-guides-sidebar-placeholder");
    const docsComponentsSidebarPlaceholder = document.getElementById("docs-components-sidebar-placeholder");
    const docsBridgeSidebarPlaceholder = document.getElementById("docs-bridge-sidebar-placeholder");

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
      aboutSidebarPlaceholder.innerHTML = SidebarTemplates.getAboutSidebar();
    }

    if (docsGuidesSidebarPlaceholder) {
      docsGuidesSidebarPlaceholder.innerHTML = SidebarTemplates.getDocsGuidesSidebar();
    }

    if (docsComponentsSidebarPlaceholder) {
      docsComponentsSidebarPlaceholder.innerHTML = SidebarTemplates.getDocsComponentsSidebar();
    }

    if (docsBridgeSidebarPlaceholder) {
      docsBridgeSidebarPlaceholder.innerHTML = SidebarTemplates.getDocsBridgeSidebar();
    }

    // Setup dynamic features using utility modules
    SidebarManager.setupScrollManagement();
    SidebarManager.setupCollapse();
    BreadcrumbManager.setup();
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  const loader = new ComponentLoader();
  loader.init();
});
