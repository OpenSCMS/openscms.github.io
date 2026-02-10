/*
SPDX-FileCopyrightText: © 2025 LG Electronics, Inc.
SPDX-License-Identifier: Apache-2.0
*/

class SidebarTemplates {

  static getAboutSidebar() {
    return SidebarTemplates._addActiveClass(SidebarTemplates._getAboutComplex());
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
              <a href="${basePath}pages/docs/guides/getting-started/overview.html" class="sidebar-nav-link">OpenSCMS Community</a>
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
              <a href="${basePath}pages/docs/guides/code-structure/workspace.html" class="sidebar-nav-link">Workspace Organization</a>
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

  static _getAboutComplex() {
    const basePath = PathUtils.getBasePath();
    return `
      <aside class="docs-sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Background</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/about/overview/introduction.html" class="sidebar-nav-link">IEEE 1609.2.1 OpenSCMS</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">The OpenSCMS</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/about/openscms/architecture.html" class="sidebar-nav-link">Architecture</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/about/openscms/root-of-trust.html" class="sidebar-nav-link">Root of Trust</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/about/openscms/deployment.html" class="sidebar-nav-link">Deployment</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Governance & Licensing</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/about/governance/governance-model.html" class="sidebar-nav-link">Governance Model</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/about/governance/developer-grant.html" class="sidebar-nav-link">Developer Grant and CLA</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/about/governance/license.html" class="sidebar-nav-link">Apache License 2.0</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Release Notes</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/about/release-notes/v1.0.0.html" class="sidebar-nav-link">OpenSCMS v1.0.0</a>
            </li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">Features Map</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/about/features/assumptions.html" class="sidebar-nav-link">Assumptions and Limitations</a>
            </li>
            <li class="sidebar-nav-item">
              <a href="${basePath}pages/about/features/roadmap.html" class="sidebar-nav-link">Roadmap</a>
            </li>
          </ul>
        </div>
      </aside>
    `;
  }
}
