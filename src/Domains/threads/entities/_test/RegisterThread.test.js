const RegisterThread = require('../RegisterThread');

describe('RegisterThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'title',
    };

    // Action & Assert
    expect(() => new RegisterThread(payload)).toThrowError('REGISTER_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 'title',
      body: 1234,
    };

    // Action & Assert
    expect(() => new RegisterThread(payload)).toThrowError('REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create RegisterThread entities correctly', () => {
    // Arrange
    const payload = {
      title: 'title',
      body: 'body',
    };

    // Action
    const registerThread = new RegisterThread(payload);

    // Assert
    expect(registerThread).toBeInstanceOf(RegisterThread);
    expect(registerThread.title).toEqual(payload.title);
    expect(registerThread.body).toEqual(payload.body);
  });
});
