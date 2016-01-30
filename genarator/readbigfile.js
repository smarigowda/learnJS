var fs = require('fs')

var genFunc = function* (resume) {
	// note that fs.readFile is an async function
	// contents will have the file content which is fed back into generator
	// by the iterator
	var contents = yield fs.readFile('big.file', 'utf8', resume)
	var uppercase = contents.toUpperCase()
	yield fs.writeFile('uppercase.file', uppercase, resume)
	console.log('all done...')
}

run(genFunc)

function run(generator) {
	var data = null, done = false
	// this is the callback function (resume)
	var resumeFunc = function() {
		data = arguments
		console.log(data)
		check()
	}
	var iterator = generator(resumeFunc)

	var yieldedObj = iterator.next()

	console.log('yielded Object = ' + JSON.stringify(yieldedObj))

	done = yieldedObj.done
	console.log('done = ' + done)

	
	function check() {
		// this is a noop until we receive the data from readFile and yielded is still true
		while (data && !done) {
			var err = data[0], item = data[1]
			if (err) { return iterator.throw(err) }
			// pass the file contents back to generator function
			var yieldedObj = iterator.next(item)
			console.log('yielded Object = ' + JSON.stringify(yieldedObj))
			// yielded = !!yieldedObj
			done = yieldedObj.done
			console.log('done = ' + done)
		}
	}

}