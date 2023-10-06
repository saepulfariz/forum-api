const RegisteredReply = require('../RegisteredReply');

describe('a RegisteredReply entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {};

        // Action and Assert
        expect(() => new RegisteredReply(payload)).toThrowError('REGISTERED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 123,
            content: 'sebuah balasan',
            owner: {},
        };

        // Action and Assert
        expect(() => new RegisteredReply(payload)).toThrowError('REGISTERED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create RegisteredReply object correctly', () => {
        // Arrange
        const payload = {
            id: 'user-123',
            content: 'sebuah balasan',
            owner: 'user-123',
        };

        // Action
        const registeredReply = new RegisteredReply(payload);

        // Assert
        expect(registeredReply).toBeInstanceOf(RegisteredReply);
        expect(registeredReply.id).toStrictEqual(payload.id);
        expect(registeredReply.content).toStrictEqual(payload.content);
        expect(registeredReply.owner).toStrictEqual(payload.owner);
    });
});
