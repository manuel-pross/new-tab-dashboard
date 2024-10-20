import { Bookmark, BookmarkCategory, BookmarkFolder } from './types';

const parentIdPrefixMap = new Map<string, string>();

export const typeColorMap = new Map<string, string>([
  ['normal', '#B7B7A8'],
  ['fire', '#FF4422'],
  ['water', '#51A8FF'],
  ['electric', '#FFD451'],
  ['grass', '#8BD46E'],
  ['ice', '#7DD4FF'],
  ['fighting', '#C56E60'],
  ['poison', '#B76EA8'],
  ['ground', '#E2C56E'],
  ['flying', '#9AA8FF'],
  ['psychic', '#FF6EA8'],
  ['bug', '#AABB22'],
  ['rock', '#BBAA66'],
  ['ghost', '#7D7DC5'],
  ['dragon', '#8A7BF0'],
  ['dark', '#775544'],
  ['steel', '#B7B7C5'],
  ['fairy', '#F1A8F1'],
]);

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
        parentPrefix: parentIdPrefixMap.get(entry.parentId) || '',
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

export function getRandomNumber(min: number, max: number): number | null {
  if (min > max) {
    return null;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getFirstCharUpperCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
