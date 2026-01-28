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
      path.includes("/pages/docs/guides/architecture/") ||
      path.includes("/pages/docs/guides/code-structure/") ||
      path.includes("/pages/docs/guides/getting-started/") ||
      path.includes("/pages/docs/guides/setup/")
    ) {
      return "../../../../";
    }

    if (
      path.includes("/pages/about/overview/") ||
      path.includes("/pages/about/governance/") ||
      path.includes("/pages/about/openscms/") ||
      path.includes("/pages/about/release-notes/") ||
      path.includes("/pages/docs/guides/architecture/") ||
      path.includes("/pages/docs/guides/code-structure/") ||
      path.includes("/pages/docs/guides/setup/") ||
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
      introduction: "about",
      "interaction-flows": "about",
      challenges: "about",
      openscms: "about",
      architecture: path.includes("/about/") ? "about" : "documentation",
      "root-of-trust": "about",
      deployment: path.includes("/about/") ? "about" : "documentation",
      governance: "about",
      "governance-model": "about",
      "developer-grant": "about",
      license: "about",
      "release-notes": "about",
      "v1.0.0": "about",
      blog: "blog",
      source: "source",
      faq: "faq",
      docs: "documentation",
      documentation: "documentation",
      guides: "documentation",
      "getting-started": "documentation",
      "engineering-perspective": "documentation",
      "documentation-purpose": "documentation",
      architecture: path.includes("/about/") ? "about" : "documentation",
      "high-level-layers": "documentation",
      "technology-choices": "documentation",
      "code-structure": "documentation",
      workspace: "documentation",
      "service-crate": "documentation",
      scmscommon: "documentation",
      "oscms-bridge": "documentation",
      dependencies: "documentation",
      setup: "documentation",
      "build-dependencies": "documentation",
      certificates: "documentation",
      "manual-deployment": "documentation",
      kubernetes: "documentation",
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
    const isGovernanceSubpage = path.includes("/pages/about/governance/");
    const isOpenscmsSubpage = path.includes("/pages/about/openscms/");
    const isReleaseNotesSubpage = path.includes("/pages/about/release-notes/");
    const isAboutRoot = path.includes("/pages/about/") && !isOverviewSubpage && !isGovernanceSubpage && !isOpenscmsSubpage && !isReleaseNotesSubpage;

    // Helper function to check if link should be active
    const isActive = (pageName, hashValue = null) => {
      if (hashValue) {
        return filename === pageName && hash === hashValue;
      }
      return filename === pageName;
    };

    // Build correct paths based on current location
    let overviewPath, openscmsPath, governancePath, releaseNotesPath, rootPath;
    
    if (isOverviewSubpage) {
      // From overview subpage: need to go up one level, then to other folders
      overviewPath = "";  // Same folder
      openscmsPath = "../openscms/";
      governancePath = "../governance/";
      releaseNotesPath = "../release-notes/";
      rootPath = "../";
    } else if (isOpenscmsSubpage) {
      // From openscms subpage: need to go up one level, then to other folders
      overviewPath = "../overview/";
      openscmsPath = "";  // Same folder
      governancePath = "../governance/";
      releaseNotesPath = "../release-notes/";
      rootPath = "../";
    } else if (isGovernanceSubpage) {
      // From governance subpage: need to go up one level, then to other folders
      overviewPath = "../overview/";
      openscmsPath = "../openscms/";
      governancePath = "";  // Same folder
      releaseNotesPath = "../release-notes/";
      rootPath = "../";
    } else if (isReleaseNotesSubpage) {
      // From release-notes subpage: need to go up one level, then to other folders
      overviewPath = "../overview/";
      openscmsPath = "../openscms/";
      governancePath = "../governance/";
      releaseNotesPath = "";  // Same folder
      rootPath = "../";
    } else if (isAboutRoot) {
      // From about root: just navigate into subfolders
      overviewPath = "overview/";
      openscmsPath = "openscms/";
      governancePath = "governance/";
      releaseNotesPath = "release-notes/";
      rootPath = "";
    } else {
      // Shouldn't happen, but fallback
      overviewPath = "overview/";
      openscmsPath = "openscms/";
      governancePath = "governance/";
      releaseNotesPath = "release-notes/";
      rootPath = "";
    }

    return `
            <aside class="docs-sidebar">
                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Background</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${overviewPath}introduction.html" class="sidebar-nav-link ${isActive('introduction') ? 'active' : ''}">Introduction</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${overviewPath}interaction-flows.html" class="sidebar-nav-link ${isActive('interaction-flows') ? 'active' : ''}">Core Interaction Flows</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${overviewPath}challenges.html" class="sidebar-nav-link ${isActive('challenges') ? 'active' : ''}">Architectural
                                Challenges</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">The OpenSCMS</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${openscmsPath}overview.html" class="sidebar-nav-link ${isActive('overview') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${openscmsPath}architecture.html" class="sidebar-nav-link ${isActive('architecture') ? 'active' : ''}">Architecture</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${openscmsPath}root-of-trust.html" class="sidebar-nav-link ${isActive('root-of-trust') ? 'active' : ''}">Root of Trust</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${openscmsPath}deployment.html" class="sidebar-nav-link ${isActive('deployment') ? 'active' : ''}">Deployment</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Governance & Licensing</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${governancePath}governance-model.html" class="sidebar-nav-link ${isActive('governance-model') ? 'active' : ''}">Governance Model</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${governancePath}developer-grant.html" class="sidebar-nav-link ${isActive('developer-grant') ? 'active' : ''}">Developer Grant and
                                CLA</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${governancePath}license.html" class="sidebar-nav-link ${isActive('license') ? 'active' : ''}">Apache License 2.0</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Release Notes</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${releaseNotesPath}v1.0.0.html" class="sidebar-nav-link ${isActive('v1.0.0') ? 'active' : ''}">OpenSCMS v1.0.0</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">
                      TODOs, Assumptions and Limitations
                    </h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${rootPath}assumptions.html" class="sidebar-nav-link ${isActive('assumptions') ? 'active' : ''}">Assumptions and Limitations</a>
                        </li>
                    </ul>
                </div>
            </aside>
        `;
  }

  getDocsGuidesSidebarTemplate() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "");
    const hash = window.location.hash;
    const isGettingStartedSubpage = path.includes("/pages/docs/guides/getting-started/");
    const isArchitectureSubpage = path.includes("/pages/docs/guides/architecture/");
    const isCodeStructureSubpage = path.includes("/pages/docs/guides/code-structure/");
    const isSetupSubpage = path.includes("/pages/docs/guides/setup/");
    const isGuidesRoot = path.includes("/pages/docs/guides/") && !isGettingStartedSubpage && !isArchitectureSubpage && !isCodeStructureSubpage && !isSetupSubpage;

    // Helper function to check if link should be active
    // Now includes context awareness for subfolders
    const isActive = (pageName, hashValue = null, subfolder = null) => {
      if (hashValue) {
        return filename === pageName && hash === hashValue;
      }

      // If a subfolder is specified, check if we're in that subfolder
      if (subfolder === 'getting-started') {
        return isGettingStartedSubpage && filename === pageName;
      } else if (subfolder === 'architecture') {
        return isArchitectureSubpage && filename === pageName;
      } else if (subfolder === 'code-structure') {
        return isCodeStructureSubpage && filename === pageName;
      } else if (subfolder === 'setup') {
        return isSetupSubpage && filename === pageName;
      } else if (subfolder === 'guides-root') {
        return isGuidesRoot && filename === pageName;
      }

      // Default: just check filename
      return filename === pageName;
    };

    // Build correct paths based on current location
    let gettingStartedPath, architecturePath, codeStructurePath, setupPath, guidesRootPath;
    
    if (isGettingStartedSubpage) {
      // From getting-started subpage: need to go up one level
      gettingStartedPath = "";  // Same folder
      architecturePath = "../architecture/";
      codeStructurePath = "../code-structure/";
      setupPath = "../setup/";
      guidesRootPath = "../";
    } else if (isArchitectureSubpage) {
      // From architecture subpage: need to go up one level
      gettingStartedPath = "../getting-started/";
      architecturePath = "";  // Same folder
      codeStructurePath = "../code-structure/";
      setupPath = "../setup/";
      guidesRootPath = "../";
    } else if (isCodeStructureSubpage) {
      // From code-structure subpage: need to go up one level
      gettingStartedPath = "../getting-started/";
      architecturePath = "../architecture/";
      codeStructurePath = "";  // Same folder
      setupPath = "../setup/";
      guidesRootPath = "../";
    } else if (isSetupSubpage) {
      // From setup subpage: need to go up one level
      gettingStartedPath = "../getting-started/";
      architecturePath = "../architecture/";
      codeStructurePath = "../code-structure/";
      setupPath = "";  // Same folder
      guidesRootPath = "../";
    } else if (isGuidesRoot) {
      // From guides root: navigate into subfolders
      gettingStartedPath = "getting-started/";
      architecturePath = "architecture/";
      codeStructurePath = "code-structure/";
      setupPath = "setup/";
      guidesRootPath = "";
    } else {
      // Fallback
      gettingStartedPath = "getting-started/";
      architecturePath = "architecture/";
      codeStructurePath = "code-structure/";
      setupPath = "setup/";
      guidesRootPath = "";
    }

    return `
            <aside class="docs-sidebar">
                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Getting Started</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${gettingStartedPath}overview.html" class="sidebar-nav-link ${isActive('overview', null, 'getting-started') ? 'active' : ''}">The OpenSCMS</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${gettingStartedPath}engineering-perspective.html" class="sidebar-nav-link ${isActive('engineering-perspective', null, 'getting-started') ? 'active' : ''}">Engineering Perspective</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${gettingStartedPath}documentation-purpose.html" class="sidebar-nav-link ${isActive('documentation-purpose', null, 'getting-started') ? 'active' : ''}">Documentation Purpose</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Architecture</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${architecturePath}overview.html" class="sidebar-nav-link ${isActive('overview', null, 'architecture') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${architecturePath}high-level-layers.html" class="sidebar-nav-link ${isActive('high-level-layers', null, 'architecture') ? 'active' : ''}">High-Level Layers</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${architecturePath}technology-choices.html" class="sidebar-nav-link ${isActive('technology-choices', null, 'architecture') ? 'active' : ''}">Technology Choices</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Code Structure</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${codeStructurePath}overview.html" class="sidebar-nav-link ${isActive('overview', null, 'code-structure') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${codeStructurePath}workspace.html" class="sidebar-nav-link ${isActive('workspace', null, 'code-structure') ? 'active' : ''}">Workspace Organization</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${codeStructurePath}service-crate.html" class="sidebar-nav-link ${isActive('service-crate', null, 'code-structure') ? 'active' : ''}">Service Crate Structure</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${codeStructurePath}scmscommon.html" class="sidebar-nav-link ${isActive('scmscommon', null, 'code-structure') ? 'active' : ''}">scmscommon</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${codeStructurePath}oscms-bridge.html" class="sidebar-nav-link ${isActive('oscms-bridge', null, 'code-structure') ? 'active' : ''}">oscms_bridge</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${codeStructurePath}dependencies.html" class="sidebar-nav-link ${isActive('dependencies', null, 'code-structure') ? 'active' : ''}">Dependency Model</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Setup & Deployment</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${setupPath}overview.html" class="sidebar-nav-link ${isActive('overview', null, 'setup') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${setupPath}build-dependencies.html" class="sidebar-nav-link ${isActive('build-dependencies', null, 'setup') ? 'active' : ''}">Build Dependencies</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${setupPath}certificates.html" class="sidebar-nav-link ${isActive('certificates', null, 'setup') ? 'active' : ''}">Certificates & Keys</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${setupPath}manual-deployment.html" class="sidebar-nav-link ${isActive('manual-deployment', null, 'setup') ? 'active' : ''}">Manual Deployment</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${setupPath}kubernetes.html" class="sidebar-nav-link ${isActive('kubernetes', null, 'setup') ? 'active' : ''}">Docker & Kubernetes</a>
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
                            <a href="${docsBasePath}guides/getting-started/overview.html">Guides</a>
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
    const docsGuidesSidebarPlaceholder = document.getElementById("docs-guides-sidebar-placeholder");

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

    if (docsGuidesSidebarPlaceholder) {
      docsGuidesSidebarPlaceholder.innerHTML = this.getDocsGuidesSidebarTemplate();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loader = new ComponentLoader();
  loader.init();
});
