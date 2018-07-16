# builder-of-things
A meta programming exercise from Codewars

https://www.codewars.com/kata/the-builder-of-things/train/javascript

Examples of what can be done with "Thing":

```javascript
const jane = new Thing('Jane')
jane.name // => 'Jane'

// can define boolean methods on an instance
jane.is_a.person
jane.is_a.woman
jane.is_not_a.man

jane.is_a_person // => true
jane.is_a_man // => false

// can define properties on a per instance level
jane.is_the.parent_of.joe
jane.parent_of // => 'joe'

// can define number of child things
// when more than 1, an array is created
jane.has(2).legs
jane.legs.length // => 2
jane.legs[0] instanceof Thing // => true

// can define single items
jane.has(1).head

jane.head instanceof Thing // => true

// can define number of things in a chainable and natural format
jane.has(2).arms.each(arm => having(1).hand.having(5).fingers )

jane.arms[0].hand.fingers.length // => 5

// can define properties on nested items
jane.has(1).head.having(2).eyes.each( eye => being_the.color.blue.with(1).pupil.being_the.color.black )

// can define methods
jane.can.speak('spoke', phrase =>
  `${name} says: ${phrase}`)

jane.speak("hello") // => "Jane says: hello"

// if past tense was provided then method calls are tracked
jane.spoke // => ["Jane says: hello"]
```
