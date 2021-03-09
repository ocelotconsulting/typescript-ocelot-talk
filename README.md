# TypeScript Ocelot Talk

This presentation was originally presented on March 9, 2021.

## Disclaimers

+ This project uses the [parcel](https://parceljs.org) bundler for its web content, which is easy to set up but has had limited activity
on its [github](https://github.com/parcel-bundler/parcel) page for the supposedly upcoming v2 release. I would not recommend it for a new
or existing project at this time.
+ For simplicity, this project uses one `tsconfig.json` file for both the client and the server. You probably wouldn't want to do that
in a real project.

## To Run

+ Make sure you have [node](https://nodejs.org/en/) (v14+) installed.
+ Open two terminal windows and change to the root directory of this project in each:
    + in the first, run these commands:
      + `npm install`
      + `npm run dev`
    + in the second, run `npm run server`
+ Open a browser to [http://localhost:3002](http://localhost:3002)
