# Google Sheet Web Component [![Circle CI](https://circleci.com/gh/Rise-Vision/rise-google-sheet/tree/master.svg?style=svg)](https://circleci.com/gh/Rise-Vision/rise-google-sheet/tree/master)

## Introduction

`rise-google-sheet` is a Polymer Web Component that works with [Rise Vision](https://www.risevision.com/), the digital signage management application for [Web Designers](http://risevision.com/web-designers). It retrieves data from a Google Sheet specified by key. It uses the cell-based feed feature of the [Google Sheets API](https://developers.google.com/google-apps/spreadsheets/) where each entry represents a single cell.

The `key` attribute is required which is to identify the Google Sheet you want to target. A spreadsheet's key can be found in the URL when viewing it in Google Docs (e.g. docs.google.com/spreadsheets/d/< KEY >/edit#gid=0).

Optionally, the `tab-id` attribute allows for specifying a particular worksheet tab in the spreadsheet. For example, the first tab would be `tab-id="1"`.

The specified feed is periodically retrieved if the `refresh` attribute is set, although a minimum refresh time of 10 seconds is enforced.

### Range
`rise-google-sheet` allows for fetching specific rows or columns from a worksheet by providing several attributes to specify the range of cells you want to retrieve.

For example, to retrieve cells for every row after the first row, and only in the fourth column, add the following attributes below:

```
<rise-google-sheet key="abc123" min-row="2" min-column="4" max-column="4"></rise-google-sheet>
```

### Empty cells
Optionally, the `return-empty` attribute allows for retrieving all cell data in a worksheet including empty cells. This is helpful if perhaps you want to visualize a table with the data and it's important that empty cells are included in the response to accurately populate the table with the data. 

Please note that using `return-empty` will return all empty cells, including the excess columns and rows in your worksheet. If this is not desired then you can workaround this by deleting the excess columns and rows from your worksheet. Alternatively, use the range attributes to specify exactly which cells are required.

For example, to retrieve cells for columns 1-5 and rows 2-10 **and** include empty cells:

```
<rise-google-sheet key="abc123" max-column="5" min-row="2" max-row="10" return-empty="true"></rise-google-sheet>
```

## Usage
To use the Google Sheet Web Component, you should first install it using Bower:
```
bower install https://github.com/Rise-Vision/rise-google-sheet.git
```

Next, construct your HTML page. You should include `webcomponents-lite.min.js` before any code that touches the DOM, and load the web component using an HTML Import. For example:

```
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="bower_components/rise-google-sheet/rise-google-sheet.html">
  </head>
  <body>
    <rise-google-sheet
      key="abc123"
      min-row="2"
      refresh="30"></rise-google-sheet>

    <script>
      // Wait for 'WebComponentsReady'.
      window.addEventListener('WebComponentsReady', function(e) {
        var sheet = document.querySelector('rise-google-sheet');

        // Respond to events it fires.
        sheet.addEventListener('rise-google-sheet-response', function(e) {
          if (e.detail && e.detail.cells) {
            console.log(e.detail.cells); // Array of cell objects
          }
        });

        sheet.go(); // Executes a request.
      });
    </script>
  </body>
</html>
```

`rise-google-sheet` returns an Array of cell objects that the Sheets API has provided. It uses the cell-based feed feature of the API where each entry represents a single cell.

For more detail on the format of cell objects see ["Working with cell-based feeds"](https://developers.google.com/google-apps/spreadsheets/#working_with_cell-based_feeds_1).

## Documentation
For further documentation on `rise-google-sheet` attributes, methods, usage, and a comprehensive demo, please see [here](http://rise-vision.github.io/rise-google-sheet).

## Built With
- [Polymer](https://www.polymer-project.org/)
- [npm](https://www.npmjs.org)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [Polyserve](https://www.npmjs.com/package/polyserve)
- [Google Sheets API](https://developers.google.com/google-apps/spreadsheets/)
- [web-component-tester](https://github.com/Polymer/web-component-tester) for testing

## Development

### Dependencies
* [Git](http://git-scm.com/) - Git is a free and open source distributed version control system that is used to manage our source code on Github.
* [npm](https://www.npmjs.org/) & [Node.js](http://nodejs.org/) - npm is the default package manager for Node.js. npm runs through the command line and manages dependencies for an application. These dependencies are listed in the _package.json_ file.
* [Bower](http://bower.io/) - Bower is a package manager for Javascript libraries and frameworks. All third-party Javascript dependencies are listed in the _bower.json_ file.
* [Gulp](http://gulpjs.com/) - Gulp is a Javascript task runner. It lints, runs unit and E2E (end-to-end) tests, minimizes files, etc. Gulp tasks are defined in _gulpfile.js_.
* [Polyserve](https://www.npmjs.com/package/polyserve) - A simple web server for using bower components locally.

### Local Development Environment Setup and Installation
To make changes to the web component, you'll first need to install the dependencies:

- [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js and npm](http://blog.nodeknockout.com/post/65463770933/how-to-install-node-js-and-npm)
- [Bower](http://bower.io/#install-bower) - To install Bower, run the following command in Terminal: `npm install -g bower`. Should you encounter any errors, try running the following command instead: `sudo npm install -g bower`.
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) - To install Gulp, run the following command in Terminal: `npm install -g gulp`. Should you encounter any errors, try running the following command instead: `sudo npm install -g gulp`.
- [Polyserve](https://www.npmjs.com/package/polyserve) - To install Polyserve, run the following command in Terminal: `npm install -g polyserve`. Should you encounter any errors, try running the following command instead: `sudo npm install -g polyserve`.

The web components can now be installed by executing the following commands in Terminal:
```
git clone https://github.com/Rise-Vision/web-component-rise-google-sheet.git
cd web-component-rise-google-sheet
npm install
bower install
```

### Run Locally
To access the demo locally, run the following command in Terminal: `polyserve`

Now in your browser, navigate to: 

```
localhost:8080/components/rise-google-sheet/demo/index.html
``` 

### Testing
You can run the suite of tests either by command terminal or via a local web server using Polyserve. 

#### Command Terminal
Execute the following command in Terminal to run tests:

```
gulp test
```

#### Local Server
Run the following command in Terminal: `polyserve`.

Now in your browser, navigate to: 

```
localhost:8080/components/rise-google-sheet/test/index.html
```

### Deployment
Once you are satisifed with your changes, deploy the contents of the `bower_components` folder to a folder on your server and also create a `rise-google-sheet` folder within your folder and upload `rise-google-sheet.html` to it. You can then use the web component by following the *Usage* instructions.

## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues, please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas, please post your thoughts to our [community](http://community.risevision.com), otherwise submit a pull request and we will do our best to incorporate it. Please be sure to submit test cases with your code changes where appropriate.

## Resources
If you have any questions or problems, please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision, please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision, please visit http://www.risevision.com/help/developers/.

**Facilitator**

[Stuart Lees](https://github.com/stulees "Stuart Lees")