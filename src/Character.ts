type Characteristics = {
  level?: number;
}

const DEFAULTS = {
  level: 1,
}

export class Character {
  private _health = MAX_HEALTH;
  private _level: number;
  private _attackType: string;

  static asRanged(){
    return new Character().withAttackType(RANGED.attack)
  }

  constructor({ level }: Characteristics = DEFAULTS) {
    this._level = level || DEFAULTS.level;
    this._attackType = MELEE.attack
  }

  health(): number {
    return this._health;
  }

  level(): number {
    return this._level;
  }

  range(): string {
    return this._attackType;
  }

  isDead(): boolean {
    return this._health <= NO_HEALTH;
  }

  die(): void {
    this._health = NO_HEALTH;
  }

  hit(enemy: Character, power: number, distance: number = 0): void {
    if (this.isSelf(enemy)) return;
    const damage = this.calculateDamage(power, enemy, distance);
    enemy.suffer(damage);
  }

  heal(character: Character, amount: number): void {
    if (this.isSelf(character))
      character.recover(amount);
  }

  protected withAttackType(attack: string){
    this._attackType = attack;
    return this
  }

  private calculateDamage(base: number, enemy: Character, distance: number): number {
    if(this.isNotInRange(distance)) return NO_DAMAGE
    if (this.isMuchMorePowerfulThan(enemy)) return base * 2;
    if (this.isMuchLessPowerfulThan(enemy)) return base / 2;
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

  private isNotInRange(distance: number): boolean{
    if(this.isRangedFighter() && distance > RANGED.maxRange) return true
    if(this.isMeleeFighter() && distance > MELEE.maxRange) return true
    return false
  }

  private isRangedFighter(): boolean{
    return this._attackType === RANGED.attack
  }

  private isMeleeFighter(): boolean{
    return this._attackType === MELEE.attack
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

const MAX_HEALTH = 1000;
const NO_HEALTH = 0;
const NO_DAMAGE = 0;

const MELEE = {
  maxRange: 2,
  attack: 'melee'
}

const RANGED = {
  maxRange: 20,
  attack: 'ranged'
}