/*
SPDX-FileCopyrightText: © 2025 LG Electronics, Inc.
SPDX-License-Identifier: Apache-2.0
*/

class BreadcrumbManager {
  static setup() {
    const path = window.location.pathname;
    const docsContent = document.querySelector('.docs-content');
    
    if (!docsContent) return;
    
    const h2 = docsContent.querySelector('h2');
    if (!h2) return;
    
    let breadcrumbHTML = '';
    
    if (path.includes('/pages/docs/')) {
      breadcrumbHTML = BreadcrumbManager.buildDocsBreadcrumb(path);
    } else if (path.includes('/pages/about/')) {
      breadcrumbHTML = BreadcrumbManager.buildAboutBreadcrumb(path);
    }
    
    if (breadcrumbHTML) {
      h2.outerHTML = breadcrumbHTML;
    }
  }

  static buildDocsBreadcrumb(path) {
    let html = '<nav class="breadcrumb">Docs';
    
    if (path.includes('/docs/guides/')) {
      html += ' <span class="breadcrumb-separator">›</span> Guides';
      
      if (path.includes('/guides/getting-started/')) {
        html += ' <span class="breadcrumb-separator">›</span> Getting Started';
      } else if (path.includes('/guides/architecture/')) {
        html += ' <span class="breadcrumb-separator">›</span> Architecture';
      } else if (path.includes('/guides/code-structure/')) {
        html += ' <span class="breadcrumb-separator">›</span> Code Structure';
      } else if (path.includes('/guides/setup/')) {
        html += ' <span class="breadcrumb-separator">›</span> Setup & Deployment';
      }
    } else if (path.includes('/docs/components/')) {
      html += ' <span class="breadcrumb-separator">›</span> SCMS Components';
      
      if (path.includes('/components/ra/')) {
        html += ' <span class="breadcrumb-separator">›</span> Registration Authority';
      } else if (path.includes('/components/eca/')) {
        html += ' <span class="breadcrumb-separator">›</span> Enrollment CA';
      } else if (path.includes('/components/aca/')) {
        html += ' <span class="breadcrumb-separator">›</span> Authorization CA';
      }
    } else if (path.includes('/docs/bridge/')) {
      html += ' <span class="breadcrumb-separator">›</span> Codecs Bridge';
      
      if (path.includes('/bridge/overview/')) {
        html += ' <span class="breadcrumb-separator">›</span> Introduction';
      } else if (path.includes('/bridge/build/')) {
        html += ' <span class="breadcrumb-separator">›</span> Build & Structure';
      } else if (path.includes('/bridge/library-layers/')) {
        html += ' <span class="breadcrumb-separator">›</span> Library Layers';
      } else if (path.includes('/bridge/utilities/')) {
        html += ' <span class="breadcrumb-separator">›</span> Utilities';
      } else if (path.includes('/bridge/development/')) {
        html += ' <span class="breadcrumb-separator">›</span> Development';
      }
    }

    return html + '</nav>';
  }

  static buildAboutBreadcrumb(path) {
    let html = '<nav class="breadcrumb">About';

    if (path.includes('/about/overview/')) {
      html += ' <span class="breadcrumb-separator">›</span> Background';
    } else if (path.includes('/about/openscms/')) {
      html += ' <span class="breadcrumb-separator">›</span> The OpenSCMS';
    } else if (path.includes('/about/governance/')) {
      html += ' <span class="breadcrumb-separator">›</span> Governance & Licensing';
    } else if (path.includes('/about/release-notes/')) {
      html += ' <span class="breadcrumb-separator">›</span> Release Notes';
    } 
    
    return html + '</nav>';
  }
}
