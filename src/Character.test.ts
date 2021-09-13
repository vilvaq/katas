import { Character } from './Character';

describe("Character", () => {

  describe("creation", () => {

    it("is a melee fighter by default", () => {
      const MELEE = 'melee'
      const character = new Character()

      expect(character.range()).toEqual(MELEE)
    })

    // Me gusta que no se exponga el elegir el tipo desde el constructor
    // No me mola sólo depender de protected para ello
    it("is a ranged fighter", () => {
      const RANGED = 'ranged'
      const archer = Character.asRanged()

      expect(archer.range()).toEqual(RANGED)
    })

    it("starts with maximum health", () => {
      const character = new Character()

      expect(character.health()).toEqual(1000);
    })

    it("starts at first level by default", () => {
      const character = new Character()

      expect(character.level()).toEqual(1);
    })

    it("starts at a defined level", () => {
      const level = 5
      const character = new Character({ level })

      expect(character.level()).toEqual(level);
    })

    it("starts alive", () => {
      const character = new Character()

      expect(character.isDead()).toEqual(false);
    })

    it("dies", () => {
      const character = new Character()

      character.die()

      expect(character.isDead()).toEqual(true);
    })
  })

  describe("attacking", () => {
    it("does not damage itself", () => {
      const villainHit = 100
      const hero = new Character()
      const villain = new Character()
      villain.hit(hero, villainHit)

      hero.hit(hero, 400)

      expect(hero.health()).toEqual(STARTING_HEALTH - villainHit)
    })

    it("damages another character", () => {
      const damage = 400;
      const hero = new Character()
      const villain = new Character()

      hero.hit(villain, damage)

      expect(villain.health()).toEqual(STARTING_HEALTH - damage)
    })

    it("damage is halved if opponent is much more powerful", () => {
      const baseDamage = 100
      const halvedDamage = baseDamage / 2
      const hero = new Character({ level: 5 })
      const villain = new Character({ level: 10 })

      hero.hit(villain, baseDamage)

      expect(villain.health()).toEqual(STARTING_HEALTH - halvedDamage)
    })

    it("damage is doubled if opponent is much less powerful", () => {
      const baseDamage = 100
      const doubledDamage = baseDamage * 2
      const hero = new Character({ level: 20 })
      const villain = new Character({ level: 10 })

      hero.hit(villain, baseDamage)

      expect(villain.health()).toEqual(STARTING_HEALTH - doubledDamage)
    })

    it("dies if health gets to 0", () => {
      const hero = new Character()
      const villain = new Character()

      hero.hit(villain, STARTING_HEALTH)

      expect(villain.isDead()).toEqual(true)
    })

    it("health can not be bellow 0", () => {
      const fatalDamage = 1500
      const hero = new Character()
      const villain = new Character()

      hero.hit(villain, fatalDamage)

      expect(villain.health()).toEqual(0)
    })

    // Asumo que si no se especifica los enemigos están en contacto directo

    it("hits with melee within range", () => {
      const inRange = 1
      const fatalDamage = 10000
      const knight = new Character()
      const villain = new Character()

      knight.hit(villain, fatalDamage, inRange)

      expect(villain.isDead()).toEqual(true)
    })

    it("does not hit with melee outside of range", () => {
      const outOfRange = 3
      const fatalDamage = 10000
      const knight = new Character()
      const villain = new Character()

      knight.hit(villain, fatalDamage, outOfRange)

      expect(villain.isDead()).toEqual(false)
    })

    it("hits ranged within range", () => {
      const inRange = 20
      const fatalDamage = 10000
      const bowman = Character.asRanged()
      const villain = new Character()

      bowman.hit(villain, fatalDamage, inRange)

      expect(villain.isDead()).toEqual(true)
    })

    it("does not hit ranged outside of range", () => {
      const outOfRange = 50
      const fatalDamage = 10000
      const bowman = Character.asRanged()
      const villain = new Character()

      bowman.hit(villain, fatalDamage, outOfRange)

      expect(villain.isDead()).toEqual(false)
    })
  })

  describe("healing", () => {
    it("heals itself", () => {
      const damage = 300
      const hero = new Character()
      const sidekick = new Character()
      sidekick.hit(hero, damage)

      hero.heal(hero, 400)

      expect(hero.health()).toEqual(STARTING_HEALTH)
    })

    it("can not heal another character", () => {
      const damage = 300
      const hero = new Character()
      const sidekick = new Character()
      hero.hit(sidekick, damage)

      hero.heal(sidekick, 400)

      expect(sidekick.health()).toEqual(STARTING_HEALTH - damage)
    })

    it("can not heal a dead character", () => {
      const healingAmount = 400;
      const hero = new Character()
      const corpse = new Character()

      corpse.die()
      hero.heal(corpse, healingAmount)

      expect(corpse.isDead()).toEqual(true)
      expect(corpse.health()).toEqual(0)
    })

    it("can not heal above starting health", () => {
      const healingAmount = 400;
      const hero = new Character()
      const sidekick = new Character()

      hero.heal(sidekick, healingAmount)

      expect(sidekick.health()).toEqual(STARTING_HEALTH)
    })
  })
})

const STARTING_HEALTH = 1000;