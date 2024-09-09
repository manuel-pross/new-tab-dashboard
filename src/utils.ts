import { Bookmark, BookmarkCategory, BookmarkGroup } from "./types";

export function getCollectedBookmarks(
  bookmarkCategories: BookmarkCategory[],
): Bookmark[] {
  if (!bookmarkCategories.length || !bookmarkCategories[0]?.children?.length)
    return [];

  const bookmarksBar = bookmarkCategories.find(
    (category) => category.title === "Bookmarks bar",
  );

  if (!bookmarksBar?.children?.length) return [];

  const allBookmarks = findBookmarksWithoutChildren(bookmarksBar.children);

  return allBookmarks;
}

export function findBookmarksWithoutChildren(
  BookmarkBarEntries: Array<Bookmark | BookmarkGroup>,
): Bookmark[] {
  const bookmarks: Bookmark[] = [];

  for (const entry of BookmarkBarEntries) {
    if (!("children" in entry)) {
      bookmarks.push(entry);
    } else if (entry.children.length > 0) {
      bookmarks.push(...findBookmarksWithoutChildren(entry.children));
    }
  }

  return bookmarks;
}
