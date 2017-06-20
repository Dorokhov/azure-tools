import { Profile, RedisServer } from '../model/profile';

export class UserPreferences {
  profiles: Profile[] = [];
  selectedProfileName: string;
}