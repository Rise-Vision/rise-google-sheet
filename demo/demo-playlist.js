var DemoPlaylist = function () {
  "use strict";

  // provide the playback functions that control this content which rise-playlist will call
  function _play() {
    console.log("DemoContent play!");
    // ...
  }
  function _pause() {
    console.log("DemoContent pause!");
    // ...
  }
  function _stop() {
    console.log("DemoContent stop!");
    // ...
  }

  function _ready() {
    // construct the "rise-component-ready" event
    var readyEvent = new CustomEvent("rise-component-ready", {
      "detail": {
        "play": _play,
        "pause": _pause,
        "stop": _stop,
        "done": false
      },
      "bubbles": true
    });

    // dispatch the event for rise-playlist to receive
    document.querySelector("#googleSheet").dispatchEvent(readyEvent);
  }

  function _clear() {
    var thead = document.querySelector("thead tr"),
      tbody = document.getElementsByTagName("tbody");

    while(thead.firstChild) {
      thead.removeChild(thead.firstChild);
    }

    while(tbody[0].firstChild) {
      tbody[0].removeChild(tbody[0].firstChild);
    }
  }

  function _getNumOfColumns(cells) {
    var columns = [],
      found, val;

    for (var i = 0; i < cells.length; i += 1) {
      val = parseInt(cells[i].gs$cell.col, 10);
      found = columns.some(function (col) {
        return col === val;
      });

      if (!found) {
        columns.push(val);
      }
    }

    return columns.length;
  }

  function _applyHeaderRow(cells, numOfColumns) {
    var thead = document.querySelector("thead tr"),
      fragment = document.createDocumentFragment(),
      titles = [],
      th;

    // loop through cells data and construct table header markup
    for (var i = 0; i < numOfColumns; i += 1) {
      th = document.createElement("th");
      th.innerHTML = (cells[i]) ?  cells[i].gs$cell.$t : "";

      titles.push(th);
    }

    titles.forEach(function (title) {
      fragment.appendChild(title);
    });

    thead.appendChild(fragment);
  }

  function _getRow(cells, numOfColumns, index) {
    var fragment = document.createDocumentFragment(),
      contents = [],
      tr = document.createElement("tr"),
      td;

    // loop through cells data and construct row markup
    for (var i = index; i < (index + numOfColumns); i += 1) {
      td = document.createElement("td");
      td.innerHTML = (cells[i]) ? cells[i].gs$cell.$t : "";

      contents.push(td);
    }

    contents.forEach(function (content) {
      tr.appendChild(content);
    });

    fragment.appendChild(tr);

    return fragment;
  }

  function _build(cells) {
    var numOfColumns = _getNumOfColumns(cells),
      tbody = document.getElementsByTagName("tbody"),
      fragment = document.createDocumentFragment(),
      rows = [],
      row;

    _applyHeaderRow(cells, numOfColumns);

    for (var i = numOfColumns; i < cells.length; i += numOfColumns) {
      row = _getRow(cells, numOfColumns, i);
      rows.push(row);
    }

    rows.forEach(function (r) {
      fragment.appendChild(r);
    });

    tbody[0].appendChild(fragment);

    // content is Ready
    _ready();
  }

  function init() {
    // reference to rise-google-sheet element
    var googleSheet = document.querySelector("#googleSheet");

    // register for the "rise-google-sheet-response" event that rise-google-sheet fires
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {

      _clear();

      // build the table content with the worksheet data
      _build(e.detail.cells);

    });

    // execute making a request for the Google Sheet data
    googleSheet.go();
  }

  return {
    "init": init
  };
};
