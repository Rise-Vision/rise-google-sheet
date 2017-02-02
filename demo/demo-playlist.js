/* exported DemoPlaylist */
/* eslint-disable no-console */

var DemoPlaylist = function() {
  "use strict";

  // provide the playback functions that control this content which rise-playlist will call
  function _play() {
    console.log( "DemoContent play!" );
    // ...
  }
  function _pause() {
    console.log( "DemoContent pause!" );
    // ...
  }
  function _stop() {
    console.log( "DemoContent stop!" );
    // ...
  }

  function _ready() {
    // construct the "rise-component-ready" event
    var readyEvent = new CustomEvent( "rise-component-ready", {
      "detail": {
        "play": _play,
        "pause": _pause,
        "stop": _stop,
        "done": false
      },
      "bubbles": true
    } );

    // dispatch the event for rise-playlist to receive
    document.querySelector( "#googleSheet" ).dispatchEvent( readyEvent );
  }

  function _clear() {
    var thead = document.querySelector( "thead tr" ),
      tbody = document.getElementsByTagName( "tbody" );

    while ( thead.firstChild ) {
      thead.removeChild( thead.firstChild );
    }

    while ( tbody[ 0 ].firstChild ) {
      tbody[ 0 ].removeChild( tbody[ 0 ].firstChild );
    }
  }

  function _applyHeaderRow( headerValues ) {
    var thead = document.querySelector( "thead tr" ),
      fragment = document.createDocumentFragment(),
      titles = [],
      th,
      i;

    // loop through first row column values and construct table header markup
    for ( i = 0; i < headerValues.length; i += 1 ) {
      th = document.createElement( "th" );
      th.innerHTML = headerValues[ i ];

      titles.push( th );
    }

    titles.forEach( function( title ) {
      fragment.appendChild( title );
    } );

    thead.appendChild( fragment );
  }

  function _getRow( rowValues ) {
    var fragment = document.createDocumentFragment(),
      contents = [],
      tr = document.createElement( "tr" ),
      td,
      i;

    // loop through values and construct row markup
    for ( i = 0; i < rowValues.length; i += 1 ) {
      td = document.createElement( "td" );
      td.innerHTML = rowValues[ i ];

      contents.push( td );
    }

    contents.forEach( function( content ) {
      tr.appendChild( content );
    } );

    fragment.appendChild( tr );

    return fragment;
  }

  function _build( results ) {
    var tbody = document.getElementsByTagName( "tbody" ),
      fragment = document.createDocumentFragment(),
      rows = [],
      row,
      i;

    _applyHeaderRow( results[ 0 ] );

    for ( i = 1; i < results.length; i += 1 ) {
      row = _getRow( results[ i ] );
      rows.push( row );
    }

    rows.forEach( function( r ) {
      fragment.appendChild( r );
    } );

    tbody[ 0 ].appendChild( fragment );

    // content is Ready
    _ready();
  }

  function init( apiKey ) {
    // reference to rise-google-sheet element
    var googleSheet = document.querySelector( "rise-google-sheet" );

    // register for the "rise-google-sheet-response" event that rise-google-sheet fires
    googleSheet.addEventListener( "rise-google-sheet-response", function( e ) {

      _clear();

      // build the table content with the worksheet data
      _build( e.detail.results );

    } );

    googleSheet.setAttribute( "apiKey", apiKey );

    // execute making a request for the Google Sheet data
    googleSheet.go();
  }

  return {
    "init": init
  };
};
