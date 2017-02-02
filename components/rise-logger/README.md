# Rise Logger Web Component [![CircleCI](https://circleci.com/gh/Rise-Vision/rise-logger/tree/master.svg?style=svg)](https://circleci.com/gh/Rise-Vision/rise-logger/tree/master)

## Introduction

The `rise-logger` Web Component uses Google’s [Big Query](https://cloud.google.com/bigquery/) to log usage data of a parent Rise Vision web component (eg. [rise-google-sheet](http://rise-vision.github.io/rise-google-sheet)). 

Rise Logger Web Component works in conjunction with [Rise Vision](http://www.risevision.com), the [digital signage management application](http://rva.risevision.com/) that runs on [Google Cloud](https://cloud.google.com).

At this time Chrome is the only browser that this project and Rise Vision supports.

## Usage
To use the Rise Logger Web Component, you should first install it using Bower:
```
bower install https://github.com/Rise-Vision/rise-logger.git
```

Next, add an instance to your parent component in the dom-module. You should also include the source of  `rise-logger` before any code that executes in your parent component. For example:
```
<link rel="import" href="../rise-logger/rise-logger.html">

<dom-module id="my-component">
  <template>
    <rise-logger id="logger"></rise-logger>
    <content></content>
  </template>
</dom-module>

<script>
  (function() {
    "use strict";

    Polymer({
      is: "my-component",

      properties: {},
      
      /**
       * Polymer has finished its initialization. This is the entry point.
       */
      ready: function() {
        // log usage
        this.$.logger.log("my-component-table", {
          "event": "ready"
        });
      }
      
    })();
</script>
```

## Documentation
For further documentation on `rise-logger` attributes, methods, and usage, please see [here](http://rise-vision.github.io/rise-logger).

## Built With
- [Polymer](https://www.polymer-project.org/)
- [Polymer core-ajax](https://www.polymer-project.org/docs/elements/core-elements.html#core-ajax)
- [npm](https://www.npmjs.org)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [Google Big Query](https://cloud.google.com/bigquery/)
- [Rise Cache](https://github.com/Rise-Vision/rise-cache-v2)
- [Polyserve](https://www.npmjs.com/package/polyserve)
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

The web components can now be installed by executing the following commands in Terminal:
```
git clone https://github.com/Rise-Vision/rise-logger.git
cd rise-logger
npm install
bower install
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
localhost:8080/components/rise-logger/test/index.html
```

### Deployment
Once you are satisifed with your changes, deploy the contents of the `bower_components` folder to a folder on your server and also create a `rise-logger` folder within your folder and upload `rise-logger.html` to it. You can then use the web component by following the *Usage* instructions.

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

