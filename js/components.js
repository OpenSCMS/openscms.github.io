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
              <a href="${docsBasePath}bridge/overview/overview.html">Codecs Bridge</a>
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
