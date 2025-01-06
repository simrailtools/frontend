/**
 * Builds an url tag to an external page preventing openers and not setting the referrer.
 * @param display the text to display in the link.
 * @param url the url to link to.
 * @param target the target where to open the page, defaults to a new tab.
 */
export const safeExternalUrlTag = (display: string, url: string, target?: string) => {
  return `<a href="${url}" target="${target ?? "_blank"}" rel="noopener, noreferrer, external">${display}</a>`;
};
