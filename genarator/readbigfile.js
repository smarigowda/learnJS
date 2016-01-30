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
		console.log('inside resume func')
		data = arguments
		console.log(data)
		console.log('calling check func')
		check()
	}

	// calling generator function returns an iterator
	var iterator = generator(resumeFunc)

	var yieldedObj = iterator.next()

	console.log('yielded Object = ' + JSON.stringify(yieldedObj))

	done = yieldedObj.done
	console.log('done = ' + done)


	function check() {
		console.log('inside check function')
		// this is a noop until we receive the data from readFile and yielded is still true
		while (data && !done) {
			console.log('inside loop...')
			var err = data[0], item = data[1]
			data = null // to avoid infinite loop
			if (err) { return iterator.throw(err) }
			console.log('pass the file contents back to generator function')
			var yieldedObj = iterator.next(item)
			console.log('yielded Object = ' + JSON.stringify(yieldedObj))
			// yielded = !!yieldedObj
			done = yieldedObj.done
			console.log('done = ' + done)
		}
	}

}