import {Thing} from '../src/thing.js';

describe('Thing', () => {
  describe('constructor', () => {
    const jane = new Thing('jane');
    it('should constructor work', () => {
      expect(jane).toBeDefined();
    });
    it('jane.name = jane', () => {
      expect(jane.name).toBe('jane');
    });
  });

  describe('boolean', () => {
    const jane = new Thing('jane');
    it('should is_a work', () => {
      jane.is_a.person
      expect(jane.is_a_person).toBe(true);
    });
    it('should is_not_a work', () => {
      jane.is_not_a.man
      expect(jane.is_a_man).toBe(false);
    });
  });

  describe('properties per instance level', () => {
    const jane = new Thing('jane');
    it('should property work', () => {
      jane.is_the.parent_of.joe;
      expect(jane.parent_of).toBe('joe');
    });
  });

  describe('define number of childs things', () => {
    const jane = new Thing('jane');
    it('multiple items', () => {
      jane.has(2).legs;
      expect(jane.legs.length).toBe(2);
      expect(jane.legs[0] instanceof Thing).toBe(true);
    });
    it('single items', () => {
      jane.has(1).head;
      expect(jane.head instanceof Thing).toBe(true);
    });
    it('chainable', () => {
      jane.has(2).arms.forEach(arm => arm.having(1).hand.having(5).fingers);
      expect(jane.arms[0].hand.fingers.length).toBe(5);
    });
  });

  describe('define nested property', () => {
    const jane = new Thing('jane');
    it('being_the', () => {
      jane.has(1).head.having(2).eyes.forEach(eye => eye.being_the.color.green);
      expect(jane.head.eyes[0].color).toBe('green');
    });
    it('and_the', () => {
      jane.has(1).head.having(2).eyes.forEach(eye => eye.being_the.color.blue.and_the.shape.round);
      expect(jane.head.eyes[0].color).toBe('blue');
      expect(jane.head.eyes[0].shape).toBe('round');
    });
  });

  describe('define method', () => {
    const jane = new Thing('jane');
    it('should work', () => {
      jane.can.speak('spoke', phrase => `${name} says: ${phrase}!`);
      jane.speak('hi');
      expect(jane.spoke).toBe('jane says: hi!');
    });

  });
});