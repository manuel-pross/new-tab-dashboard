import { Bookmark, BookmarkCategory, BookmarkFolder } from './types';

const parentIdPrefixMap = new Map<string, string>();

export function getCollectedBookmarks(
  bookmarkCategories: BookmarkCategory[]
): Bookmark[] {
  if (!bookmarkCategories.length || !bookmarkCategories[0]?.children?.length)
    return [];

  const bookmarksBar = bookmarkCategories.find(
    (category) => category.id === '1'
  );

  if (!bookmarksBar?.children?.length) return [];

  const allBookmarks = findBookmarksWithoutChildren(bookmarksBar.children);

  return allBookmarks;
}

export function findBookmarksWithoutChildren(
  bookmarkBarEntries: Array<Bookmark | BookmarkFolder>
): Bookmark[] {
  const bookmarks: Bookmark[] = [];

  for (const entry of bookmarkBarEntries) {
    if (!('children' in entry)) {
      const bookmark = {
        ...entry,
        parentPrefix: parentIdPrefixMap.get(entry.parentId),
      };
      bookmarks.push(bookmark);
    } else if (entry.children.length > 0) {
      parentIdPrefixMap.set(
        entry.id,
        `${parentIdPrefixMap.get(entry.parentId) || ''}${entry.title}/`
      );

      bookmarks.push(...findBookmarksWithoutChildren(entry.children));
    }
  }

  return bookmarks;
}

export function getIsInputFieldFocused() {
  const activeElement = document.activeElement;

  if (!activeElement) return false;

  return ['INPUT'].includes(activeElement?.tagName);
}

export function focusFirstSearchResult() {
  const firstResult: HTMLAnchorElement | null =
    document.querySelector('.search-result');

  firstResult?.focus();
}
