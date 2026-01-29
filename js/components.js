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
    // Check for 4-level deep paths first (most specific)
    if (
      path.includes("/pages/docs/guides/architecture/") ||
      path.includes("/pages/docs/guides/code-structure/") ||
      path.includes("/pages/docs/guides/getting-started/") ||
      path.includes("/pages/docs/guides/setup/") ||
      path.includes("/pages/docs/components/ra/") ||
      path.includes("/pages/docs/components/eca/") ||
      path.includes("/pages/docs/components/aca/") ||
      path.includes("/pages/docs/bridge/overview/") ||
      path.includes("/pages/docs/bridge/build/") ||
      path.includes("/pages/docs/bridge/library-layers/") ||
      path.includes("/pages/docs/bridge/utilities/") ||
      path.includes("/pages/docs/bridge/development/")
    ) {
      return "../../../../";
    }

    // Check for 3-level deep paths (subfolders without sub-subfolders)
    if (
      path.includes("/pages/about/overview/") ||
      path.includes("/pages/about/governance/") ||
      path.includes("/pages/about/openscms/") ||
      path.includes("/pages/about/release-notes/") ||
      path.includes("/pages/docs/components/") ||
      path.includes("/pages/docs/guides/") ||
      path.includes("/pages/docs/bridge/")
    ) {
      return "../../../";
    }

    // Check for 2-level deep paths
    if (path.includes("/pages/docs/") || path.includes("/pages/about/")) {
      return "../../";
    }

    // Check for 1-level deep (inside /pages/)
    if (path.includes("/pages/")) {
      return "../";
    }

    // At root
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
      assumptions: "about",
      "scms-components": "documentation",
      ra: "documentation",
      "internal-organization": "documentation",
      "authorization-flow": "documentation",
      "successor-enrollment": "documentation",
      "ee-registration": "documentation",
      "trust-artifacts": "documentation",
      "lifecycle-management": "documentation",
      eca: "documentation",
      "initial-enrollment": "documentation",
      security: "documentation",
      aca: "documentation",
      role: "documentation",
      "issuance-flow": "documentation",
      la: "documentation",
      "codecs-bridge": "documentation",
      build: "documentation",
      installation: "documentation",
      structure: "documentation",
      "library-layers": "documentation",
      "codec-abstraction": "documentation",
      "protocol-bridge": "documentation",
      utilities: "documentation",
      "memory-management": "documentation",
      "cryptographic-primitives": "documentation",
      logging: "documentation",
      "rust-integration": "documentation",
      development: "documentation",
      "extensibility": "documentation",
      "api-reference": "documentation",
    };

    return pageMap[filename] || "index";
  }

  getHeaderTemplate() {
    // basePath already takes us to the root, so we just need to add the path from root
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

  getDocsComponentsSidebarTemplate() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "");
    const hash = window.location.hash;
    const isRASubpage = path.includes("/pages/docs/components/ra/");
    const isECASubpage = path.includes("/pages/docs/components/eca/");
    const isACASubpage = path.includes("/pages/docs/components/aca/");
    const isComponentsRoot = path.includes("/pages/docs/components/") && !isRASubpage && !isECASubpage && !isACASubpage;

    // Helper function to check if link should be active
    const isActive = (pageName, hashValue = null, subfolder = null) => {
      if (hashValue) {
        return filename === pageName && hash === hashValue;
      }

      // If a subfolder is specified, check if we're in that subfolder
      if (subfolder === 'ra') {
        return isRASubpage && filename === pageName;
      } else if (subfolder === 'eca') {
        return isECASubpage && filename === pageName;
      } else if (subfolder === 'aca') {
        return isACASubpage && filename === pageName;
      } else if (subfolder === 'components-root') {
        return isComponentsRoot && filename === pageName;
      }

      // Default: just check filename
      return filename === pageName;
    };

    // Build correct paths based on current location
    let raPath, ecaPath, acaPath, componentsRootPath;
    
    if (isRASubpage) {
      // From ra subpage: need to go up one level
      raPath = "";  // Same folder
      ecaPath = "../eca/";
      acaPath = "../aca/";
      componentsRootPath = "../";
    } else if (isECASubpage) {
      // From eca subpage: need to go up one level
      raPath = "../ra/";
      ecaPath = "";  // Same folder
      acaPath = "../aca/";
      componentsRootPath = "../";
    } else if (isACASubpage) {
      // From aca subpage: need to go up one level
      raPath = "../ra/";
      ecaPath = "../eca/";
      acaPath = "";  // Same folder
      componentsRootPath = "../";
    } else if (isComponentsRoot) {
      // From components root: navigate into subfolders
      raPath = "ra/";
      ecaPath = "eca/";
      acaPath = "aca/";
      componentsRootPath = "";
    } else {
      // Fallback
      raPath = "ra/";
      ecaPath = "eca/";
      acaPath = "aca/";
      componentsRootPath = "";
    }

    return `
            <aside class="docs-sidebar">
                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Core Components</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${componentsRootPath}overview.html" class="sidebar-nav-link ${isActive('overview', null, 'components-root') ? 'active' : ''}">Overview</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Registration Authority</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${raPath}overview.html" class="sidebar-nav-link ${isActive('overview', null, 'ra') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${raPath}internal-organization.html" class="sidebar-nav-link ${isActive('internal-organization', null, 'ra') ? 'active' : ''}">Internal Organization</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${raPath}authorization-flow.html" class="sidebar-nav-link ${isActive('authorization-flow', null, 'ra') ? 'active' : ''}">Authorization Flow</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${raPath}successor-enrollment.html" class="sidebar-nav-link ${isActive('successor-enrollment', null, 'ra') ? 'active' : ''}">Successor Enrollment</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${raPath}ee-registration.html" class="sidebar-nav-link ${isActive('ee-registration', null, 'ra') ? 'active' : ''}">EE Registration</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${raPath}trust-artifacts.html" class="sidebar-nav-link ${isActive('trust-artifacts', null, 'ra') ? 'active' : ''}">Trust Artifacts</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${raPath}lifecycle-management.html" class="sidebar-nav-link ${isActive('lifecycle-management', null, 'ra') ? 'active' : ''}">Lifecycle Management</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Enrollment CA</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${ecaPath}overview.html" class="sidebar-nav-link ${isActive('overview', null, 'eca') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${ecaPath}initial-enrollment.html" class="sidebar-nav-link ${isActive('initial-enrollment', null, 'eca') ? 'active' : ''}">Initial Enrollment</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${ecaPath}security.html" class="sidebar-nav-link ${isActive('security', null, 'eca') ? 'active' : ''}">Security Considerations</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Authorization CA</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${acaPath}overview.html" class="sidebar-nav-link ${isActive('overview', null, 'aca') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${acaPath}role.html" class="sidebar-nav-link ${isActive('role', null, 'aca') ? 'active' : ''}">Role in Certificate Flows</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${acaPath}issuance-flow.html" class="sidebar-nav-link ${isActive('issuance-flow', null, 'aca') ? 'active' : ''}">Issuance Flow</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${acaPath}security.html" class="sidebar-nav-link ${isActive('security', null, 'aca') ? 'active' : ''}">Security Considerations</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Linkage Authority</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${componentsRootPath}la.html" class="sidebar-nav-link ${isActive('la', null, 'components-root') ? 'active' : ''}">Linkage Authority</a>
                        </li>
                    </ul>
                </div>
            </aside>
        `;
  }

  getDocsBridgeSidebarTemplate() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "");
    const hash = window.location.hash;
    const isOverviewSubpage = path.includes("/pages/docs/bridge/overview/");
    const isBuildSubpage = path.includes("/pages/docs/bridge/build/");
    const isLibraryLayersSubpage = path.includes("/pages/docs/bridge/library-layers/");
    const isUtilitiesSubpage = path.includes("/pages/docs/bridge/utilities/");
    const isDevelopmentSubpage = path.includes("/pages/docs/bridge/development/");
    const isBridgeRoot = path.includes("/pages/docs/bridge/") && !isOverviewSubpage && !isBuildSubpage && !isLibraryLayersSubpage && !isUtilitiesSubpage && !isDevelopmentSubpage;

    // Helper function to check if link should be active
    const isActive = (pageName, hashValue = null, subfolder = null) => {
      if (hashValue) {
        return filename === pageName && hash === hashValue;
      }

      // If a subfolder is specified, check if we're in that subfolder
      if (subfolder === 'overview') {
        return isOverviewSubpage && filename === pageName;
      } else if (subfolder === 'build') {
        return isBuildSubpage && filename === pageName;
      } else if (subfolder === 'library-layers') {
        return isLibraryLayersSubpage && filename === pageName;
      } else if (subfolder === 'utilities') {
        return isUtilitiesSubpage && filename === pageName;
      } else if (subfolder === 'development') {
        return isDevelopmentSubpage && filename === pageName;
      } else if (subfolder === 'bridge-root') {
        return isBridgeRoot && filename === pageName;
      }

      // Default: just check filename
      return filename === pageName;
    };

    // Build correct paths based on current location
    let overviewPath, buildPath, libraryLayersPath, utilitiesPath, developmentPath;
    
    if (isOverviewSubpage || isBuildSubpage || isLibraryLayersSubpage || isUtilitiesSubpage || isDevelopmentSubpage) {
      // From any subpage: need to go up one level, then to other folders
      overviewPath = isOverviewSubpage ? "" : "../overview/";
      buildPath = isBuildSubpage ? "" : "../build/";
      libraryLayersPath = isLibraryLayersSubpage ? "" : "../library-layers/";
      utilitiesPath = isUtilitiesSubpage ? "" : "../utilities/";
      developmentPath = isDevelopmentSubpage ? "" : "../development/";
    } else if (isBridgeRoot) {
      // From bridge root: navigate into subfolders
      overviewPath = "overview/";
      buildPath = "build/";
      libraryLayersPath = "library-layers/";
      utilitiesPath = "utilities/";
      developmentPath = "development/";
    } else {
      // Fallback
      overviewPath = "overview/";
      buildPath = "build/";
      libraryLayersPath = "library-layers/";
      utilitiesPath = "utilities/";
      developmentPath = "development/";
    }

    return `
            <aside class="docs-sidebar">
                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Introduction</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${overviewPath}overview.html" class="sidebar-nav-link ${isActive('overview', null, 'overview') ? 'active' : ''}">Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${overviewPath}architecture.html" class="sidebar-nav-link ${isActive('architecture', null, 'overview') ? 'active' : ''}">High-Level Architecture</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Build & Structure</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${buildPath}installation.html" class="sidebar-nav-link ${isActive('installation', null, 'build') ? 'active' : ''}">Build and Installation</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${buildPath}structure.html" class="sidebar-nav-link ${isActive('structure', null, 'build') ? 'active' : ''}">Repository Structure</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Library Layers</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${libraryLayersPath}codec-abstraction.html" class="sidebar-nav-link ${isActive('codec-abstraction', null, 'library-layers') ? 'active' : ''}">Codec Abstraction Layer</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${libraryLayersPath}protocol-bridge.html" class="sidebar-nav-link ${isActive('protocol-bridge', null, 'library-layers') ? 'active' : ''}">Protocol Bridge Layer</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Utilities</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${utilitiesPath}memory-management.html" class="sidebar-nav-link ${isActive('memory-management', null, 'utilities') ? 'active' : ''}">Memory Management</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${utilitiesPath}cryptographic-primitives.html" class="sidebar-nav-link ${isActive('cryptographic-primitives', null, 'utilities') ? 'active' : ''}">Cryptographic Primitives</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${utilitiesPath}logging.html" class="sidebar-nav-link ${isActive('logging', null, 'utilities') ? 'active' : ''}">Logging and Diagnostics</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${utilitiesPath}rust-integration.html" class="sidebar-nav-link ${isActive('rust-integration', null, 'utilities') ? 'active' : ''}">Integration with Rust</a>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="sidebar-section-title">Development</h3>
                    <ul class="sidebar-nav">
                        <li class="sidebar-nav-item">
                            <a href="${developmentPath}overview.html" class="sidebar-nav-link ${isActive('overview', null, 'development') ? 'active' : ''}">Development Overview</a>
                        </li>
                        <li class="sidebar-nav-item">
                            <a href="${developmentPath}extensibility.html" class="sidebar-nav-link ${isActive('extensibility', null, 'development') ? 'active' : ''}">Extensibility Considerations</a>
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
    // Check if we're in a deep subfolder (3 levels: /pages/docs/guides/getting-started/)
    if (
      path.includes("/pages/docs/guides/getting-started/") ||
      path.includes("/pages/docs/guides/architecture/") ||
      path.includes("/pages/docs/guides/code-structure/") ||
      path.includes("/pages/docs/guides/setup/") ||
      path.includes("/pages/docs/components/ra/") ||
      path.includes("/pages/docs/components/eca/") ||
      path.includes("/pages/docs/components/aca/") ||
      path.includes("/pages/docs/bridge/overview/") ||
      path.includes("/pages/docs/bridge/build/") ||
      path.includes("/pages/docs/bridge/library-layers/") ||
      path.includes("/pages/docs/bridge/utilities/") ||
      path.includes("/pages/docs/bridge/development/")
    ) {
      // From 3 levels deep, we need to go up 2 levels to reach /pages/docs/
      docsBasePath = "../../";
    } else if (
      path.includes("/pages/docs/components/") ||
      path.includes("/pages/docs/guides/") ||
      path.includes("/pages/docs/bridge/")
    ) {
      // From 2 levels deep (e.g., /pages/docs/components/), go up 1 level
      docsBasePath = "../";
    } else if (path.includes("/pages/docs/")) {
      // Already in /pages/docs/, stay here
      docsBasePath = "./";
    } else if (path.includes("/pages/")) {
      // From /pages/, navigate into docs/
      docsBasePath = "docs/";
    }

    // Determine which section is active based on path
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

  init() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");
    const docsSubmenuPlaceholder = document.getElementById(
      "docs-submenu-placeholder"
    );
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
      aboutSidebarPlaceholder.innerHTML = this.getAboutSidebarTemplate();
    }

    if (docsGuidesSidebarPlaceholder) {
      docsGuidesSidebarPlaceholder.innerHTML = this.getDocsGuidesSidebarTemplate();
    }

    if (docsComponentsSidebarPlaceholder) {
      docsComponentsSidebarPlaceholder.innerHTML = this.getDocsComponentsSidebarTemplate();
    }

    if (docsBridgeSidebarPlaceholder) {
      docsBridgeSidebarPlaceholder.innerHTML = this.getDocsBridgeSidebarTemplate();
    }

    // Setup sidebar scroll management
    this.setupSidebarScrollManagement();

    // Setup sidebar section collapse/expand
    this.setupSidebarCollapse();
  }

  setupSidebarScrollManagement() {
    // Find all sidebars
    const sidebars = document.querySelectorAll('.docs-sidebar');
    
    sidebars.forEach(sidebar => {
      // Restore scroll position when page loads
      this.restoreSidebarScroll(sidebar);

      // Save scroll position when clicking on sidebar links
      const sidebarLinks = sidebar.querySelectorAll('.sidebar-nav-link');
      sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.saveSidebarScroll(sidebar);
        });
      });
    });
  }

  saveSidebarScroll(sidebar) {
    if (sidebar) {
      sessionStorage.setItem('sidebarScrollPosition', sidebar.scrollTop);
    }
  }

  restoreSidebarScroll(sidebar) {
    if (sidebar) {
      const savedPosition = sessionStorage.getItem('sidebarScrollPosition');
      if (savedPosition !== null) {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
          sidebar.scrollTo({
            top: parseInt(savedPosition, 10),
            behavior: 'instant' // Use 'instant' for immediate positioning without animation
          });
        }, 0);
      }
    }
  }

  setupSidebarCollapse() {
    // Add click handlers to sidebar section titles for collapse/expand
    document.querySelectorAll('.sidebar-section-title').forEach(title => {
      title.addEventListener('click', (e) => {
        const section = e.target.closest('.sidebar-section');
        if (section) {
          section.classList.toggle('collapsed');
          
          // Save the collapsed state
          this.saveSidebarCollapseState();
        }
      });
    });
    
    // Restore collapsed state when page loads
    this.restoreSidebarCollapseState();
  }

  saveSidebarCollapseState() {
    const expandedSections = [];
    document.querySelectorAll('.sidebar-section').forEach((section, index) => {
      const title = section.querySelector('.sidebar-section-title');
      // Save expanded sections (those WITHOUT collapsed class)
      if (title && !section.classList.contains('collapsed')) {
        expandedSections.push({
          index: index,
          title: title.textContent.trim()
        });
      }
    });
    sessionStorage.setItem('sidebarExpandedSections', JSON.stringify(expandedSections));
  }

  restoreSidebarCollapseState() {
    const sections = document.querySelectorAll('.sidebar-section');
    
    // First, add 'collapsed' class to all sections by default
    sections.forEach(section => {
      section.classList.add('collapsed');
    });

    // Then restore expanded state from session storage
    const saved = sessionStorage.getItem('sidebarExpandedSections');
    if (saved) {
      try {
        const expandedSections = JSON.parse(saved);
        expandedSections.forEach(expanded => {
          // Try to match by title (more reliable across different pages)
          sections.forEach(section => {
            const title = section.querySelector('.sidebar-section-title');
            if (title && title.textContent.trim() === expanded.title) {
              section.classList.remove('collapsed');
            }
          });
        });
      } catch (e) {
        // Ignore parse errors
        console.error('Error restoring sidebar collapse state:', e);
      }
    }

    // Always expand the section containing the active link
    sections.forEach(section => {
      const activeLink = section.querySelector('.sidebar-nav-link.active');
      if (activeLink) {
        section.classList.remove('collapsed');
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loader = new ComponentLoader();
  loader.init();
});
