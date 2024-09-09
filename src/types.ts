export type ChromeBookmarkResponse = {
  children?: BookmarkCategory[];
  dateAdded: number;
  id: string;
  title: string;
};

export type BookmarkCategory = {
  children?: Array<Bookmark | BookmarkGroup>;
  dateAdded: number;
  dateGroupModified: number;
  id: string;
  index: number;
  parentId: number;
  title: string;
};

export type BookmarkGroup = {
  children: Bookmark[];
  dateAdded: number;
  dateGroupModified: number;
  id: string;
  index: number;
  parentId: string;
  title: string;
};

export type Bookmark = {
  dateAdded: number;
  dateLastUsed: number;
  id: string;
  index: number;
  parentId: string;
  title: string;
  url: string;
};
