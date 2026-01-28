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

document.addEventListener('DOMContentLoaded', () => {
    // Sidebar navigation - smooth scroll and active state
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = e.target.getAttribute('href');

            // For internal links on the same page
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Sidebar section collapse/expand
    document.querySelectorAll('.sidebar-section-title').forEach(title => {
        title.addEventListener('click', (e) => {
            const section = e.target.closest('.sidebar-section');
            section.classList.toggle('collapsed');
        });
    });

    // Highlight sidebar item on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Only update active state for hash-based links (same-page navigation)
                document.querySelectorAll('.sidebar-nav-link').forEach(link => {
                    const href = link.getAttribute('href');
                    // Only manage active state for links with hash anchors on current page
                    if (href && href.startsWith('#')) {
                        link.classList.remove('active');
                        if (href === `#${id}`) {
                            link.classList.add('active');
                        }
                    }
                });
            }
        });
    }, {
        rootMargin: '30% 0px -40%'
    });

    document.querySelectorAll('.docs-content h2[id], .docs-content h3[id], .docs-content h4[id]').forEach(heading => {
        observer.observe(heading);
    });
});