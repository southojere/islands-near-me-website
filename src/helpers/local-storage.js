const USER_KEY = "user";
const suffix = `islandsnearme`;

const getKey = key => `${key}.${suffix}`;
const setItem = (key, value) => {
  const actualKey = getKey(key);
  localStorage.setItem(actualKey, JSON.stringify(value));
};

const getItem = key => {
  const actualKey = getKey(key);
  const item = localStorage.getItem(actualKey);
  if (!item) return null;
  return JSON.parse(item);
};

const setUser = value => setItem(USER_KEY, value);
const getUser = () => getItem(USER_KEY);
const removeItem = key => localStorage.removeItem(getKey(key));
const clearUser = () => {
  removeItem(USER_KEY);
};

export { getItem, getUser, setItem, setUser, removeItem, clearUser };
