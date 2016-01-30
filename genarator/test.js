// testing JS generators

var bears = function* () {
	yield 'grizzly'
	yield 'polar'
	console.log('You should not see me')
	return 'done'
} 

var genBear = bears()

console.log(genBear.next())
console.log(genBear.next())
// console.log(genBear.next())
// console.log(genBear.next())
// console.log(genBear.next())
// console.log(genBear.next())
// console.log(genBear.next())

