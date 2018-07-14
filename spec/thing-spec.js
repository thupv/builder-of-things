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
      jane.is_the.parent_of.joe
      expect(jane.parent_of).toBe('joe');
    });
  });

});