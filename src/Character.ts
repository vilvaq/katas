const STARTING_HEALTH = 1000;
const DEFAULT_STARTING_LEVEL = 1;
const NO_HEALTH = 0;

export class Character {
  private level: number = DEFAULT_STARTING_LEVEL;
  private health = STARTING_HEALTH;

  constructor(level: number = DEFAULT_STARTING_LEVEL) {
    this.level = level;
  }

  getHealth(): number {
    return this.health;
  }

  getLevel(): number {
    return this.level;
  }

  die(): void {
    this.health = NO_HEALTH;
  }

  isDead(): boolean {
    return this.health <= NO_HEALTH;
  }

  hit(enemy: Character, power: number): void {
    if (this.isSelf(enemy))
      return;
    const damage = this.calculateDamage(power, enemy);
    enemy.suffer(damage);
  }

  heal(character: Character, amount: number): void {
    if (this.isSelf(character))
      character.recover(amount);
  }

  private calculateDamage(base: number, enemy: Character): number {
    if (this.isMuchMorePowerfulThan(enemy))
      return base * 2;
    if (this.isMuchLessPowerfulThan(enemy))
      return base / 2;
    return base;
  }

  private suffer(damage: number): void {
    if (this.health <= damage) {
      this.die();
    } else {
      this.health -= damage;
    }
  }

  private recover(healing: number): void {
    if (this.isDead())
      return;
    if (this.health >= healing) {
      this.recoverFully();
    } else {
      this.health += healing;
    }
  }

  private recoverFully(): void {
    this.health = STARTING_HEALTH;
  }

  private isMuchLessPowerfulThan(character: Character): boolean {
    return character.getLevel() - this.getLevel() >= 5;
  }

  private isMuchMorePowerfulThan(character: Character): boolean {
    return this.getLevel() - character.getLevel() >= 5;
  }

  private isSelf(character: Character): boolean {
    return character === this;
  }
}
