# Find Duplicates

```sh
npm run dupe-finder ../my/path/
```

```
> dupe-finder@0.0.1 dupe-finder /Users/peterbraden/repos/dupe-finder
> node index.js

...................................
┌────────────┬───────────────────────────────────────────────────────────────────────────┬────────────────────────────────────────────────────┬──────┐
│ hash       │ file1                                                                     │ file2                                              │ size │
├────────────┼───────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────┼──────┤
│ 6dca3e98ce │ ~/node_modules/graceful-fs/LICENSE                                        │ ~/node_modules/glob/LICENSE                        │ 1310 │
│ ab95d69fc4 │ ~/node_modules/glob/node_modules/minimatch/node_modules/lru-cache/LICENSE │ ~/node_modules/glob/node_modules/minimatch/LICENSE │ 1092 │
│ 6dca3e98ce │ ~/node_modules/glob/node_modules/minimatch/node_modules/sigmund/LICENSE   │ ~/node_modules/glob/LICENSE                        │ 1310 │
├────────────┼───────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────┼──────┤
│ 3 matches  │                                                                           │                                                    │ 3712 │
└────────────┴───────────────────────────────────────────────────────────────────────────┴────────────────────────────────────────────────────┴──────┘
```
