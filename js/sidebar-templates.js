/*
SPDX-FileCopyrightText: © 2025 LG Electronics, Inc.
SPDX-License-Identifier: Apache-2.0
*/

class SidebarTemplates {
  
  static getAboutSidebar() {
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

    let overviewPath, openscmsPath, governancePath, releaseNotesPath, rootPath;
    
    if (isOverviewSubpage) {
      overviewPath = "";
      openscmsPath = "../openscms/";
      governancePath = "../governance/";
      releaseNotesPath = "../release-notes/";
      rootPath = "../";
    } else if (isOpenscmsSubpage) {
      overviewPath = "../overview/";
      openscmsPath = "";
      governancePath = "../governance/";
      releaseNotesPath = "../release-notes/";
      rootPath = "../";
    } else if (isGovernanceSubpage) {
      overviewPath = "../overview/";
      openscmsPath = "../openscms/";
      governancePath = "";
      releaseNotesPath = "../release-notes/";
      rootPath = "../";
    } else if (isReleaseNotesSubpage) {
      overviewPath = "../overview/";
      openscmsPath = "../openscms/";
      governancePath = "../governance/";
      releaseNotesPath = "";
      rootPath = "../";
    } else if (isAboutRoot) {
      overviewPath = "overview/";
      openscmsPath = "openscms/";
      governancePath = "governance/";
      releaseNotesPath = "release-notes/";
      rootPath = "";
    } else {
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
              <a href="${overviewPath}challenges.html" class="sidebar-nav-link ${isActive('challenges') ? 'active' : ''}">Architectural Challenges</a>
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
              <a href="${governancePath}developer-grant.html" class="sidebar-nav-link ${isActive('developer-grant') ? 'active' : ''}">Developer Grant and CLA</a>
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
          <h3 class="sidebar-section-title">Assumptions and Limitations</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${rootPath}assumptions.html" class="sidebar-nav-link ${isActive('assumptions') ? 'active' : ''}">Assumptions and Limitations</a>
            </li>
          </ul>
        </div>
      </aside>
    `;
  }

  static getDocsGuidesSidebar() {
    return SidebarTemplates._addActiveClass(SidebarTemplates._getDocsGuidesComplex());
  }

  static getDocsComponentsSidebar() {
    return SidebarTemplates._addActiveClass(SidebarTemplates._getDocsComponentsComplex());
  }

  static getDocsBridgeSidebar() {
    return SidebarTemplates._addActiveClass(SidebarTemplates._getDocsBridgeComplex());
  }

  // Helper to add active class to current page link
  static _addActiveClass(html) {
    const currentPath = window.location.pathname;
    const basePath = PathUtils.getBasePath();
    
    // Create a temporary div to parse and manipulate HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Find all sidebar links
    const links = tempDiv.querySelectorAll('.sidebar-nav-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      // Build the absolute path for the link
      let linkAbsolutePath = href;
      
      // If href starts with basePath, it's already using basePath reference
      // Convert it to absolute path for comparison
      if (href.startsWith(basePath)) {
        // Remove basePath and get the relative path from root
        linkAbsolutePath = '/' + href.substring(basePath.length);
      } else if (!href.startsWith('/')) {
        // It's a relative path, we need to resolve it
        // This shouldn't happen with our current implementation, but just in case
        linkAbsolutePath = href;
      }
      
      // Compare paths - check if current path ends with the link path
      // or if they match exactly
      if (currentPath.endsWith(linkAbsolutePath) || currentPath === linkAbsolutePath) {
        link.classList.add('active');
      }
    });
    
    return tempDiv.innerHTML;
  }

  static _getDocsGuidesComplex() {
    const basePath = PathUtils.getBasePath();
    return `
      <aside class="docs-sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Getting Started</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/getting-started/overview.html" class="sidebar-nav-link">The OpenSCMS</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Architecture</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/architecture/overview.html" class="sidebar-nav-link">High-Level Overview</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/architecture/technology-choices.html" class="sidebar-nav-link">Technology Choices</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Code Structure</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/code-structure/overview.html" class="sidebar-nav-link">Overview</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/code-structure/workspace.html" class="sidebar-nav-link">Workspace Organization</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/code-structure/oscms-bridge.html" class="sidebar-nav-link">oscms_bridge</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/code-structure/dependencies.html" class="sidebar-nav-link">Dependency Model</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Setup & Deployment</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/setup/overview.html" class="sidebar-nav-link">Overview</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/setup/build-dependencies.html" class="sidebar-nav-link">Build Dependencies</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/setup/certificates.html" class="sidebar-nav-link">Certificates & Keys</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/setup/manual-deployment.html" class="sidebar-nav-link">Manual Deployment</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/guides/setup/kubernetes.html" class="sidebar-nav-link">Docker & Kubernetes</a>
            </li>
          </ul>
        </div>
      </aside>
    `;
  }

  static _getDocsComponentsComplex() {
    const basePath = PathUtils.getBasePath();
    return `
      <aside class="docs-sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">SCMS Components</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/overview.html" class="sidebar-nav-link">Overview</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Registration Authority (RA)</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/ra/internal-organization.html" class="sidebar-nav-link">The RA</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/ra/ee-registration.html" class="sidebar-nav-link">EE Registration</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/ra/trust-artifacts.html" class="sidebar-nav-link">Trust Artifacts Distribution</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/ra/authorization-flow.html" class="sidebar-nav-link">Authorization Flow</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/ra/lifecycle-management.html" class="sidebar-nav-link">Certificate Lifecycle</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/ra/successor-enrollment.html" class="sidebar-nav-link">Successor Enrollment</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Enrollment Certificate Authority (ECA)</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/eca/overview.html" class="sidebar-nav-link">The ECA</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/eca/initial-enrollment.html" class="sidebar-nav-link">Initial Enrollment</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/eca/security.html" class="sidebar-nav-link">Security Considerations</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Authorization Certificate Authority (ACA)</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/aca/overview.html" class="sidebar-nav-link">The ACA</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/aca/role.html" class="sidebar-nav-link">Role in SCMS</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/aca/issuance-flow.html" class="sidebar-nav-link">Auth Certificate Issuance</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/aca/security.html" class="sidebar-nav-link">Security Considerations</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Linkage Authority (LA)</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/components/la.html" class="sidebar-nav-link">LA Overview</a>
            </li>
          </ul>
        </div>
      </aside>
    `;
  }

  static _getDocsBridgeComplex() {
    const basePath = PathUtils.getBasePath();
    return `
      <aside class="docs-sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Introduction</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/bridge/overview/overview.html" class="sidebar-nav-link">General Information</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Library Layers</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/bridge/library-layers/codec-abstraction.html" class="sidebar-nav-link">Codec Abstraction</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/bridge/library-layers/protocol-bridge.html" class="sidebar-nav-link">Protocol Bridge</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Utilities</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/bridge/utilities/cryptographic-primitives.html" class="sidebar-nav-link">Cryptographic Primitives</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/bridge/utilities/memory-management.html" class="sidebar-nav-link">Memory Management</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/bridge/utilities/logging.html" class="sidebar-nav-link">Logging</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/bridge/utilities/rust-integration.html" class="sidebar-nav-link">Rust Integration</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Development</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/bridge/development/overview.html" class="sidebar-nav-link">Development Guide</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/bridge/development/extensibility.html" class="sidebar-nav-link">Extensibility</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Build & Structure</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/docs/bridge/build/installation.html" class="sidebar-nav-link">How to Build</a>
            </li>
          </ul>
        </div>
      </aside>
    `;
  }
}
