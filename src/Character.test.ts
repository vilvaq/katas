import { Character } from './Character';

describe("Character", () => {

  describe("creation", () => {

    it("is a mele fighter", () => {
      const MELEE_GUILD = 'melee'
      const character = Character.asMeleeFighter()

      expect(character.guild()).toEqual(MELEE_GUILD)
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