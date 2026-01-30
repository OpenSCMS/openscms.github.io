/*
SPDX-FileCopyrightText: © 2025 LG Electronics, Inc.
SPDX-License-Identifier: Apache-2.0
*/

class PathUtils {
  static getBasePath() {
    const path = window.location.pathname;

    if (PathUtils.isFourLevelDeep(path)) return "../../../../";
    if (PathUtils.isThreeLevelDeep(path)) return "../../../";
    if (PathUtils.isTwoLevelDeep(path)) return "../../";
    if (path.includes("/pages/")) return "../";

    return "./";
  }

  static isFourLevelDeep(path) {
    const fourLevelPaths = [
      "/pages/docs/guides/architecture/",
      "/pages/docs/guides/code-structure/",
      "/pages/docs/guides/getting-started/",
      "/pages/docs/guides/setup/",
      "/pages/docs/components/ra/",
      "/pages/docs/components/eca/",
      "/pages/docs/components/aca/",
      "/pages/docs/bridge/overview/",
      "/pages/docs/bridge/build/",
      "/pages/docs/bridge/library-layers/",
      "/pages/docs/bridge/utilities/",
      "/pages/docs/bridge/development/"
    ];
    return fourLevelPaths.some(p => path.includes(p));
  }

  static isThreeLevelDeep(path) {
    const threeLevelPaths = [
      "/pages/about/overview/",
      "/pages/about/governance/",
      "/pages/about/openscms/",
      "/pages/about/release-notes/",
      "/pages/about/features/",
      "/pages/docs/components/",
      "/pages/docs/guides/",
      "/pages/docs/bridge/"
    ];
    return threeLevelPaths.some(p => path.includes(p));
  }

  static isTwoLevelDeep(path) {
    return path.includes("/pages/docs/") || path.includes("/pages/about/");
  }

  static getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "") || "index";

    if (filename === "index" || filename === "") return "index";
    if (filename === "faq") return "faq";
    if (path.includes("/about/")) return "about";
    if (path.includes("/docs/")) return "documentation";

    return "index";
  }
}
