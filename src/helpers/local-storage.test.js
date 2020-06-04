import { getUser, setUser, clearUser } from "./local-storage";

const mockUserObject = {
  email: "mock-email@test.com",
  id: "9",
  username: "frank"
};

test("test adding user to local storage", () => {
  setUser(mockUserObject);
  const user = getUser();
  expect(user).toBeTruthy();
});

test("test removing user from local storage", () => {
  setUser(mockUserObject);
  let user = getUser();
  expect(user).toBeTruthy();

  clearUser();
  user = getUser();
  expect(user).toBeFalsy();
});

test("user equals expected user", () => {
    setUser(mockUserObject);
    const user = getUser();
    expect(user).toMatchObject(mockUserObject)
})