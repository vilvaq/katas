class Character {
  isAlive = true

  getHealth(){
    return 1000
  }

  getLevel(){
    return 1
  }

  die(){
    this.isAlive = false
  }

  isDead(){
    return !this.isAlive
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
})
