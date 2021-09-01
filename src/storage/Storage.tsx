import AsyncStorage from "@react-native-async-storage/async-storage";

const NAME_KEY = 'name';
const CHOSEN_DIETS_KEY = 'chosen_diets';
const CHOSEN_COMPONENTS_KEY = 'chosen_components';

const getArray = async (key: string) => {
    try {
        const result = await AsyncStorage.getItem(key);
        if (result) {
            return JSON.parse(result);
        }
        return [];
    } catch (e) {
        console.log(e);
    }
};

const setArray = async (key: string, value: Array<any>) => {
    if (!value) {
        throw new Error("value must me set")
    }
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log(e);
    }
};

const getString = async (key: string) => {
    try {
        const result = await AsyncStorage.getItem(key);
        if (result) {
            return result;
        }
        return '';
    } catch (e) {
        console.log(e);
    }
};

const setString = async (key: string, value: string) => {
    try {
        return await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
};

export const storage = () => {
};

storage.getName = async () => {
    return await getString(NAME_KEY);
};
storage.setName = async (value:string) => {
    return await setString(NAME_KEY, value);
};

storage.getChosenDiets = async () => {
    return await getArray(CHOSEN_DIETS_KEY);
};
storage.setChosenDiets = async (value: Array<any>) => {
    return await setArray(CHOSEN_DIETS_KEY, value);
};

storage.getChosenComponents = async () => {
    return await getArray(CHOSEN_COMPONENTS_KEY);
};
storage.setChosenComponents = async (value: Array<any>) => {
    return await setArray(CHOSEN_COMPONENTS_KEY, value);
};
