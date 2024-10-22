import { render, screen } from '@testing-library/react';
import BookmarkList, { BookmarkListProps } from './index';

const testData: BookmarkListProps = {
  bookmarks: [
    {
      dateAdded: 1,
      dateLastUsed: 2,
      id: '3',
      index: 5,
      parentId: '6',
      parentPrefix: '7',
      title: 'title',
      url: 'www.test.de',
    },
  ],
  searchTerm: 'tit',
  onFirstSearchResult: jest.fn(),
};

it('should be visible'),
  () => {
    render(
      <BookmarkList
        bookmarks={testData.bookmarks}
        searchTerm={testData.searchTerm}
        onFirstSearchResult={testData.onFirstSearchResult}
      />
    );
    const bookmarks = screen.queryByRole('test');
    expect(bookmarks).toBeVisible();
  };
