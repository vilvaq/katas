const STARTING_HEALTH = 1000
const NO_HEALTH = 0

class Character {
  isAlive = true
  health = STARTING_HEALTH

  getHealth(): number{
    return this.health
  }

  getLevel(): number{
    return 1
  }

  die(): void{
    this.isAlive = false
    this.health = NO_HEALTH
  }

  isDead(): boolean{
    return !this.isAlive || this.health <= NO_HEALTH
  }

  hit(character: Character, damage: number): void{
    character.receiveDamage(damage)
  }

  heal(character: Character, healingAmount: number): void{
    character.recoverHealth(healingAmount)
  }


  private receiveDamage(damage: number): void{
    const result = this.health - damage
    if(result <= NO_HEALTH) {
      this.die()
    }else{
      this.health = result
    }
  }

  private recoverHealth(healingAmount: number): void{
    if (this.isDead()) return
    const result = this.health + healingAmount
    if(result >= STARTING_HEALTH){ 
      this.health = STARTING_HEALTH
    }else{
      this.health = result
    }
  }
}


describe("Character", () => {
  it("starts with 1000 health'", () => {
    const character = new Character()

    expect(character.getHealth()).toEqual(1000);
  })

  it("starts at level 1", () => {
    const character = new Character()

    expect(character.getLevel()).toEqual(1);
  })

  it("starts being alive", () => {
    const character = new Character()

    expect(character.isDead()).toEqual(false);
  })
  
  it("can be dead", () => {
    const character = new Character()

    character.die()

    expect(character.isDead()).toEqual(true);
  })

  it("can damage another character", () => {
    const damage = 400;
    const hero = new Character()
    const villain = new Character()

    hero.hit(villain, damage)

    expect(villain.getHealth()).toEqual(STARTING_HEALTH - damage)
  })

  it("dies if health gets to 0", () => {
    const hero = new Character()
    const villain = new Character()

    hero.hit(villain, STARTING_HEALTH)

    expect(villain.getHealth()).toEqual(0)
    expect(villain.isDead()).toEqual(true)
  })

  it("dies if health gets bellow 0", () => {
    const fatalDamage = 1500
    const hero = new Character()
    const villain = new Character()

    hero.hit(villain, fatalDamage)

    expect(villain.getHealth()).toEqual(0)
    expect(villain.isDead()).toEqual(true)
  })

  it("can heal another character", () => {
    const healingAmount = 400;
    const hero = new Character()
    const sidekick = new Character()
    hero.hit(sidekick, healingAmount)

    hero.heal(sidekick, healingAmount)

    expect(sidekick.getHealth()).toEqual(STARTING_HEALTH)
  })

  it("can not heal a dead character", () => {
    const healingAmount = 400;
    const hero = new Character()
    const corpse = new Character()

    corpse.die()
    hero.heal(corpse, healingAmount)

    expect(corpse.isDead()).toEqual(true)
    expect(corpse.getHealth()).toEqual(0)
  })

  it("can not heal above starting health", () => {
    const healingAmount = 400;
    const hero = new Character()
    const sidekick = new Character()

    hero.heal(sidekick, healingAmount)

    expect(sidekick.getHealth()).toEqual(STARTING_HEALTH)
  })
})
