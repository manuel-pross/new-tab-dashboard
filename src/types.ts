export type ChromeBookmarkResponse = {
  children?: BookmarkCategory[];
  dateAdded: number;
  id: string;
  title: string;
};

export type BookmarkCategory = {
  children?: Array<Bookmark | BookmarkFolder>;
  dateAdded: number;
  dateGroupModified: number;
  id: string;
  index: number;
  parentId: number;
  title: string;
};

export type BookmarkFolder = {
  children: Bookmark[];
  dateAdded: number;
  dateGroupModified: number;
  id: string;
  index: number;
  parentId: string;
  parentPrefix?: string;
  title: string;
};

export type Bookmark = {
  dateAdded: number;
  dateLastUsed: number;
  id: string;
  index: number;
  parentId: string;
  parentPrefix?: string;
  title: string;
  url: string;
};

export type BookmarkSelectOption = {
  value: string;
  label: string;
};

export type Pokemon = {
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  sprites: Sprite;
  types: PokeTypeMeta[];
  weight: number;
};

export type Sprite = {
  front_default: string;
  back_default: string;
};

export type PokeTypeMeta = {
  slot: number;
  type: PokeType;
};

export type PokeType = {
  name: string;
  url: string;
};
