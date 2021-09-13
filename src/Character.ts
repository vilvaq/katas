const MAX_HEALTH = 1000;
const NO_HEALTH = 0;

const GUILD_MELEE = 'melee'

type Characteristics = {
  level?: number;
  guild?: string;
}

const DEFAULTS = {
  level: 1,
  guild: GUILD_MELEE
}

export class Character {
  private _health = MAX_HEALTH;
  private _level: number;
  private _guild: string;

  static asMeleeFighter(): Character{
    return new Character(DEFAULTS)
  }

  constructor({ level, guild }: Characteristics = DEFAULTS) {
    this._level = level || DEFAULTS.level;
    this._guild = guild || DEFAULTS.guild;
  }

  health(): number {
    return this._health;
  }

  level(): number {
    return this._level;
  }

  guild(): string {
    return this._guild;
  }

  isDead(): boolean {
    return this._health <= NO_HEALTH;
  }

  die(): void {
    this._health = NO_HEALTH;
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
    if (this._health <= damage) {
      this.die();
    } else {
      this._health -= damage;
    }
  }

  private recover(healing: number): void {
    if (this.isDead())
      return;
    if (this._health >= healing) {
      this.recoverFully();
    } else {
      this._health += healing;
    }
  }

  private recoverFully(): void {
    this._health = MAX_HEALTH;
  }

  private isMuchLessPowerfulThan(character: Character): boolean {
    return character.level() - this.level() >= 5;
  }

  private isMuchMorePowerfulThan(character: Character): boolean {
    return this.level() - character.level() >= 5;
  }

  private isSelf(character: Character): boolean {
    return character === this;
  }
}
