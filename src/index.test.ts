const STARTING_HEALTH = 1000

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
  }

  isDead(): boolean{
    return !this.isAlive
  }

  receiveDamage(damage: number){
    this.health -= damage
    if(this.health <= 0) {
      this.health = 0
      this.isAlive = false
    }
  }

  hit(character: Character, damage: number): void{
    character.receiveDamage(damage)
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
})
