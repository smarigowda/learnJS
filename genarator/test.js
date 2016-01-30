// testing JS generators

var bears = function* () {
	var kind = yield 'grizzly'
	yield kind + ' polar'
	// console.log('You should not see me')
	return 'done'
} 

var genBear = bears()

console.log(genBear.next())
console.log(genBear.next('ferocious'))
genBear.next()
// console.log(genBear.next())
// console.log(genBear.next())
// console.log(genBear.next())
// console.log(genBear.next())
// console.log(genBear.next())