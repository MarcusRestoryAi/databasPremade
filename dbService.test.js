const { createUser, getAllUsers, getOneUser, updateUser, deleteUser } = require('./dbService');
const User = require('./models/user'); // Importera modellen
//import User from './user'

/*
// Mocka Sequelize-modellen
jest.mock('./user', () => ({
  User: {
    create: jest.fn(),
    findAll: jest.fn()
  }
}));
*/

jest.mock('./models/user')

describe('Databas Service Tester', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Återställ mockar efter varje test
  });

  test('createUser ska skapa en ny användare', async () => {
    // Mockad respons för User.create
    const mockUser = { id: 1, name: 'Marcus', email: 'marcus@example.com' };
    User.create.mockResolvedValue(mockUser);

    // Kör funktionen och verifiera
    const result = await createUser('Marcus', 'marcus@example.com');
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith({ name: 'Marcus', email: 'marcus@example.com' });
    expect(result).toEqual(mockUser);
  });

  test('getAllUsers ska returnera alla användare', async () => {
    // Mockad respons för User.findAll
    const mockUsers = [
      { id: 1, name: 'Marcus', email: 'marcus@example.com' },
      { id: 2, name: 'Anna', email: 'anna@example.com' },
    ];
    User.findAll.mockResolvedValue(mockUsers);

    // Kör funktionen och verifiera
    const result = await getAllUsers();
    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
  });

  test('getAllUsers ska hantera ett tomt resultat', async () => {
    // Mocka att databasen är tom
    User.findAll.mockResolvedValue([]);

    // Kör funktionen och verifiera
    const result = await getAllUsers();
    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  test('createUser ska hantera fel vid databasoperation', async () => {
    // Mocka ett fel från User.create
    User.create.mockRejectedValue(new Error('Databasfel'));

    // Kör funktionen och verifiera att den kastar ett fel
    await expect(createUser('Marcus', 'marcus@example.com')).rejects.toThrowError('Databasfel');
    expect(User.create).toHaveBeenCalledTimes(1);
  });

  test('getAllUsers ska hantera fel vid databasoperation', async () => {
    // Mocka ett fel från User.findAll
    User.findAll.mockRejectedValue(new Error('Databasfel'));
    // Kör funktionen och verifiera att den kastar ett fel
    await expect(getAllUsers()).rejects.toThrowError('Databasfel');
    expect(User.findAll).toHaveBeenCalledTimes(1);
  });

  test('getOneUser ska returnera en användare baserat på ID', async () => {
    const mockUser = { id: 1, name: 'Marcus', email: 'test@hey.se' };
    User.findByPk = jest.fn().mockResolvedValue(mockUser);
    const result = await getOneUser(1);
    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  test('getOneUser ska returnera null om användaren inte finns', async () => {
    User.findByPk = jest.fn().mockResolvedValue(null);
    const result = await getOneUser(999);
    expect(User.findByPk).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });

  test('updateUser ska uppdatera en användare', async () => {
    const mockUser = {
      id: 1,
      name: 'Marcus',
      email: 'whatever@hotmail.com',
      update: jest.fn().mockResolvedValue({ id: 1, name: 'Marcus', email: 'whatever@hotmail.com' }),
    };
    User.findByPk = jest.fn().mockResolvedValue(mockUser);
    const result = await updateUser(1, { email: 'newEmail@hotmail.com' });
    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(mockUser.update).toHaveBeenCalledWith({ email: 'newEmail@hotmail.com' });
    expect(result).toEqual({ id: 1, name: 'Marcus', email: 'whatever@hotmail.com' });
  });

  test('updateUser ska returnera null om användaren inte finns', async () => {
    User.findByPk = jest.fn().mockResolvedValue(null);
    const result = await updateUser(999, { email: 'email@hey.se' });
    expect(User.findByPk).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });

  test('deleteUser ska ta bort en användare', async () => {
    const mockUser = {
      id: 1,
      name: 'Marcus',
      email: 'hej@hotmail.com',
      destroy: jest.fn().mockResolvedValue(),
    };
    User.findByPk = jest.fn().mockResolvedValue(mockUser);
    const result = await deleteUser(1);
    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(mockUser.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  test('deleteUser ska returnera false om användaren inte finns', async () => {
    User.findByPk = jest.fn().mockResolvedValue(null);
    const result = await deleteUser(999);
    expect(User.findByPk).toHaveBeenCalledWith(999);
    expect(result).toBe(false);
  });
});
