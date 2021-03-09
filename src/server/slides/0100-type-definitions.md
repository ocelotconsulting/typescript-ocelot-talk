# Type Definitions

+ The type checker isn't going to help if all of your third-party libraries are completely dynamic.
+ Luckily, TS is fast becoming the standard for documenting JS libraries on NPM.
+ If a library doesn't provide its own definitions, chances are you can find a type definition in the @types namespace.
+ If no `@types/xxx` library exists you can:
    + Write the type definition yourself, or
    + Use the library dynamically, just like you would in JS (Disclaimer - I haven't tried this in a client bundle).

```
npm i express
npm i -D @types/express
```

```
{{expressMiddleware.ts}}
```

```
{{jslibrary.ts}}
```
