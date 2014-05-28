var fs = require('graceful-fs')
  , crypto = require('crypto')
  , glob = require('glob')
  , path = require('path')
  , Table = require('cli-table')


var HASHES = {}
  , DUPLICATES = []
  , OPEN = {}



var handleEnd = function(){
  var t = new Table({head:["hash", "file1", "file2", "size"], style:{compact:true}})
    , tot = 0
  DUPLICATES.forEach(function(d){
    var size = fs.statSync(d[1]).size
      , home = path.resolve('~').slice(0, -1)
    d[0] = d[0].slice(0, 10)
    d[1] = d[1].replace(home, '~/')
    d[2] = d[2].replace(home, '~/')
    d.push(size)
    t.push(d)
    tot += size
  })

  t.push([])
  t.push([DUPLICATES.length + ' matches', '', '', tot])
  console.log('\n' + t.toString())

}

var fileHash = function(f, cb){
  var shasum = crypto.createHash('sha256')

  var s = fs.ReadStream(f);
  s.on('data', function(d) {
    shasum.update(d);
  })

  s.on('end', function() {
    var d = shasum.digest('hex');
    cb(null, d, f);
  });

}


var handleFile = function(filename, cb){
  OPEN[filename] = true;
  fileHash(filename, function(err, hash, f){

    if (HASHES[hash]){
      DUPLICATES.push([hash, f, HASHES[hash]])
    } else {
      HASHES[hash] = f;
    }
    delete OPEN[filename]
    if (Object.keys(OPEN) < 1){
      handleEnd()
    }
  })

}

var traversePath = function(root){
  var g = new glob.Glob("*", {cwd: root, mark: true}, function(err, files){
  })
  OPEN[root] = true;
  g.on('match', function(m){
    var p = path.join(root, m)
    if (m.slice(m.length-1) === '/'){
      process.stdout.write('.')
      traversePath(p)
    } else {
      handleFile(p)
    }
  })

  g.on('end', function(){
    delete OPEN[root]
    if (Object.keys(OPEN) < 1){
      handleEnd()
    }
  })
}

if (!module.parent){
  var argv = require('optimist').argv;
  traversePath(argv[0] || process.cwd())
} else {
  module.exports = traversePath
}
