# New tab dashboard

## How to build

```shell
npm i
npm run build

```

## How to add to Chrome

Go to extensions and enable the developer mode add the `dist` folder generated with the `build` command via the left button.

## How to use

This dashboard allows you to browse your bookmarks (just the chrome bookmarks bar). Make sure the focus is on the dashboard (on opening a new tab chrome will automatically focus the address bar. Remove the focus by pressing escape of clicking on the dashboard).
As soon as the dashbaord has the focus you can open the search field by pressing 'b'. Start typing your bookmark name (folder names will work too). per default the first matching result is focused and can be selected by pressing 'enter'.
The result list can be traversed with the arrow keys or vim keys (j and k).

To close the search bar press escape when it has the focus.

