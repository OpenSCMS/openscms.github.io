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
      path.includes("/pages/about/overview/") ||
      path.includes("/pages/about/governance/") ||
      path.includes("/pages/about/openscms/") ||
      path.includes("/pages/about/release-notes/")
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
            </aside>
        `;
  }

  getDocsGuidesSidebarTemplate() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "");
    const hash = window.location.hash;

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
                    <h3 class="sidebar-section-title">Getting Started</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="getting-started.html" class="sidebar-nav-link ${isActive('getting-started') ? 'active' : ''}">The OpenSCMS</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Architecture</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="architecture.html" class="sidebar-nav-link ${isActive('architecture') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="architecture.html#high-level-layers" class="sidebar-nav-link ${isActive('architecture', '#high-level-layers') ? 'active' : ''}">High-Level Layers</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="architecture.html#technology-choices" class="sidebar-nav-link ${isActive('architecture', '#technology-choices') ? 'active' : ''}">Technology Choices</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Code Structure</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="code-structure.html" class="sidebar-nav-link ${isActive('code-structure') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="code-structure.html#workspace" class="sidebar-nav-link ${isActive('code-structure', '#workspace') ? 'active' : ''}">Workspace Organization</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="code-structure.html#service-crate" class="sidebar-nav-link ${isActive('code-structure', '#service-crate') ? 'active' : ''}">Service Crate Structure</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="code-structure.html#scmscommon" class="sidebar-nav-link ${isActive('code-structure', '#scmscommon') ? 'active' : ''}">scmscommon</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="code-structure.html#oscms-bridge" class="sidebar-nav-link ${isActive('code-structure', '#oscms-bridge') ? 'active' : ''}">oscms_bridge</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="code-structure.html#dependencies" class="sidebar-nav-link ${isActive('code-structure', '#dependencies') ? 'active' : ''}">Dependency Model</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Setup & Deployment</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="setup.html" class="sidebar-nav-link ${isActive('setup') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="setup.html#build-dependencies" class="sidebar-nav-link ${isActive('setup', '#build-dependencies') ? 'active' : ''}">Build Dependencies</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="setup.html#certificates" class="sidebar-nav-link ${isActive('setup', '#certificates') ? 'active' : ''}">Certificates & Keys</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="setup.html#manual-deployment" class="sidebar-nav-link ${isActive('setup', '#manual-deployment') ? 'active' : ''}">Manual Deployment</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="setup.html#kubernetes" class="sidebar-nav-link ${isActive('setup', '#kubernetes') ? 'active' : ''}">Docker & Kubernetes</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Assumptions and Limitations</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="assumptions.html#api-endpoints" class="sidebar-nav-link ${isActive('assumptions', '#api-endpoints') ? 'active' : ''}">API Endpoints</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="assumptions.html#certificate-types" class="sidebar-nav-link ${isActive('assumptions', '#certificate-types') ? 'active' : ''}">Certificate Types</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="assumptions.html#asn1-version" class="sidebar-nav-link ${isActive('assumptions', '#asn1-version') ? 'active' : ''}">ASN.1 Version</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="assumptions.html#policy-files" class="sidebar-nav-link ${isActive('assumptions', '#policy-files') ? 'active' : ''}">Policy Files</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="assumptions.html#bootstrapping" class="sidebar-nav-link ${isActive('assumptions', '#bootstrapping') ? 'active' : ''}">Bootstrapping</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="assumptions.html#ctl-electors" class="sidebar-nav-link ${isActive('assumptions', '#ctl-electors') ? 'active' : ''}">CTL & Electors</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="assumptions.html#misbehaviour" class="sidebar-nav-link ${isActive('assumptions', '#misbehaviour') ? 'active' : ''}">Misbehaviour & LA</a>
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
