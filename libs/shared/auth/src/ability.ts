export interface Ability {
  can(action: string, subject: string): boolean;
}

export class SimpleAbility implements Ability {
  constructor(private permissions: string[]) {}

  can(action: string, subject: string): boolean {
    return this.permissions.includes(`${subject}:${action}`);
  }
}
