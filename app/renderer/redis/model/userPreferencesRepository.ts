import { Profile } from '../model/profile';
import { UserPreferences } from '../model/userPreferences';

export class UserPreferencesRepository {
    private userPreferencesKey = 'UserPreferences';

    constructor() {
    }

    save(userPreferences: UserPreferences) {
        let userPreferencesJson = localStorage.getItem(this.userPreferencesKey);
        localStorage.setItem(this.userPreferencesKey, JSON.stringify(userPreferences));
    }

    get(): UserPreferences {
        let userPreferencesJson = localStorage.getItem(this.userPreferencesKey);
        if (_.isNil(userPreferencesJson)) {
            return null;
        }
        else {
            let userPreferences = <UserPreferences>JSON.parse(userPreferencesJson);
            return userPreferences;
        }
    }

    getCurrentProfile(): [UserPreferences, Profile] {
        let preferences = this.get();
        if (preferences == null) {
            return null;
        }

        return [preferences, _.find(preferences.profiles, x => x.name == preferences.selectedProfileName)];
    }
}