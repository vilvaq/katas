const STARTING_HEALTH = 1000
const NO_HEALTH = 0

class Character {
  health = STARTING_HEALTH

  getHealth(): number{
    return this.health
  }

  getLevel(): number{
    return 1
  }

  die(): void{
    this.health = NO_HEALTH
  }

  isDead(): boolean{
    return this.health <= NO_HEALTH
  }

  hit(character: Character, damage: number): void{
    if(this.isSelf(character)) return
    character.suffer(damage)
  }

  heal(character: Character, healingAmount: number): void{
    if(this.isSelf(character)) character.recover(healingAmount)
  }

  private recoverFully(): void{
    this.health = STARTING_HEALTH
  }

  private isSelf(character: Character): boolean {
    return character === this
  }


  private suffer(damage: number): void{
    if(this.health <= damage) {
      this.die()
    }else{
      this.health -= damage
    }
  }

  private recover(healing: number): void{
    if (this.isDead()) return
    if(this.health >= healing){ 
      this.recoverFully()
    }else{
      this.health += healing
    }
  }
}


describe("Character", () => {
  it("starts with maximum health'", () => {
    const character = new Character()

    expect(character.getHealth()).toEqual(1000);
  })

  it("starts at first level", () => {
    const character = new Character()

    expect(character.getLevel()).toEqual(1);
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

  it("damages another character", () => {
    const damage = 400;
    const hero = new Character()
    const villain = new Character()

    hero.hit(villain, damage)

    expect(villain.getHealth()).toEqual(STARTING_HEALTH - damage)
  })

  it("does not damage itself", () => {
    const villainHit = 100
    const hero = new Character()
    const villain = new Character()
    villain.hit(hero, villainHit)

    hero.hit(hero, 400)

    expect(hero.getHealth()).toEqual(STARTING_HEALTH - villainHit)   
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

    expect(villain.getHealth()).toEqual(0)
  })

  it("heals itself", () => {
    const damage = 300
    const hero = new Character()
    const sidekick = new Character()
    sidekick.hit(hero, damage)

    hero.heal(hero, 400)

    expect(hero.getHealth()).toEqual(STARTING_HEALTH)
  })

  it("can not heal another character", () => {
    const damage = 300
    const hero = new Character()
    const sidekick = new Character()
    hero.hit(sidekick, damage)

    hero.heal(sidekick, 400)

    expect(sidekick.getHealth()).toEqual(STARTING_HEALTH - damage)
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
