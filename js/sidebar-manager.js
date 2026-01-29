/*
SPDX-FileCopyrightText: © 2025 LG Electronics, Inc.
SPDX-License-Identifier: Apache-2.0
*/

class SidebarManager {
  static setupScrollManagement() {
    const sidebars = document.querySelectorAll('.docs-sidebar');
    
    sidebars.forEach(sidebar => {
      SidebarManager.restoreScroll(sidebar);

      const sidebarLinks = sidebar.querySelectorAll('.sidebar-nav-link');
      sidebarLinks.forEach(link => {
        link.addEventListener('click', () => SidebarManager.saveScroll(sidebar));
      });
    });
  }

  static saveScroll(sidebar) {
    if (sidebar) {
      sessionStorage.setItem('sidebarScrollPosition', sidebar.scrollTop);
    }
  }

  static restoreScroll(sidebar) {
    if (sidebar) {
      const savedPosition = sessionStorage.getItem('sidebarScrollPosition');
      if (savedPosition !== null) {
        setTimeout(() => {
          sidebar.scrollTo({
            top: parseInt(savedPosition, 10),
            behavior: 'instant'
          });
        }, 0);
      }
    }
  }

  static setupCollapse() {
    document.querySelectorAll('.sidebar-section-title').forEach(title => {
      title.addEventListener('click', (e) => {
        const section = e.target.closest('.sidebar-section');
        if (section) {
          section.classList.toggle('collapsed');
          SidebarManager.saveCollapseState();
        }
      });
    });
    
    SidebarManager.restoreCollapseState();
  }

  static saveCollapseState() {
    const expandedSections = [];
    document.querySelectorAll('.sidebar-section').forEach((section, index) => {
      const title = section.querySelector('.sidebar-section-title');
      if (title && !section.classList.contains('collapsed')) {
        expandedSections.push({
          index: index,
          title: title.textContent.trim()
        });
      }
    });
    sessionStorage.setItem('sidebarExpandedSections', JSON.stringify(expandedSections));
  }

  static restoreCollapseState() {
    const sections = document.querySelectorAll('.sidebar-section');
    
    sections.forEach(section => section.classList.add('collapsed'));

    const saved = sessionStorage.getItem('sidebarExpandedSections');
    if (saved) {
      try {
        const expandedSections = JSON.parse(saved);
        expandedSections.forEach(expanded => {
          sections.forEach(section => {
            const title = section.querySelector('.sidebar-section-title');
            if (title && title.textContent.trim() === expanded.title) {
              section.classList.remove('collapsed');
            }
          });
        });
      } catch (e) {
        console.error('Error restoring sidebar collapse state:', e);
      }
    }

    sections.forEach(section => {
      const activeLink = section.querySelector('.sidebar-nav-link.active');
      if (activeLink) {
        section.classList.remove('collapsed');
      }
    });
  }
}
