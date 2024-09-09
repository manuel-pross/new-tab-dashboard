type ChromeBookmarkResponse = {
  children?: BookmarkCategory[];
  dateAdded: number;
  id: string;
  title: string;
};

type BookmarkCategory = {
  children?: Bookmark[];
  dateAdded: number;
  dateGroupModified: number;
  id: string;
  index: number;
  parentId: number;
  title: string;
};

type BookmarkGroup = {
  dateAdded: number;
  dateGroupModified: number;
  id: string;
  index: number;
  parentId: string;
  title: string;
};

type Bookmark = {
  dateAdded: number;
  dateLastUsed: number;
  id: string;
  index: number;
  parentId: string;
  title: string;
  url: string;
};
