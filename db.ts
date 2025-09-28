import Dexie, { Table } from 'dexie';
import type { Member, Trainer, Training, Attendance, Setting } from './types';

export class TrainingDB extends Dexie {
  members!: Table<Member>;
  trainers!: Table<Trainer>;
  trainings!: Table<Training>;
  attendances!: Table<Attendance>;
  settings!: Table<Setting>;

  constructor() {
    super('TrainingDB');
    // FIX: The version() method exists on Dexie, but TypeScript is failing to see it on the subclass.
    // Casting 'this' to Dexie resolves this typing issue.
    (this as Dexie).version(2).stores({
      members: '++id, external_id, nachname, vorname',
      trainers: '++id, external_id, nachname, vorname',
      trainings: '++id, external_id, datum, thema, trainer1_id, trainer2_id',
      attendances: '[training_id+member_id], training_id, member_id',
      settings: 'key',
    });
    // FIX: The version() method exists on Dexie, but TypeScript is failing to see it on the subclass.
    // Also, when upgrading a schema, all previous table definitions must be repeated to avoid table deletion.
    (this as Dexie).version(3).stores({
        members: '++id, external_id, nachname, vorname',
        trainers: '++id, external_id, nachname, vorname',
        trainings: '++id, external_id, datum, thema, trainer1_id, trainer2_id, completed',
        attendances: '[training_id+member_id], training_id, member_id',
        settings: 'key',
    });
  }
}

export const db = new TrainingDB();