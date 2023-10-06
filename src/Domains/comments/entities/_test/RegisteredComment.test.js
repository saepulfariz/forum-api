const RegisteredComment = require('../RegisteredComment');

describe('a RegisteredComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {};

        // Action and Assert
        expect(() => new RegisteredComment(payload)).toThrowError('REGISTERED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 123,
            content: 'sebuah comment',
            owner: {},
        };

        // Action and Assert
        expect(() => new RegisteredComment(payload)).toThrowError('REGISTERED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create RegisteredComment object correctly', () => {
        // Arrange
        const payload = {
            id: 'user-123',
            content: 'sebuah comment',
            owner: 'user-123',
        };

        // Action
        const registeredComment = new RegisteredComment(payload);

        // Assert
        expect(registeredComment).toBeInstanceOf(RegisteredComment);
        expect(registeredComment.id).toStrictEqual(payload.id);
        expect(registeredComment.content).toStrictEqual(payload.content);
        expect(registeredComment.owner).toStrictEqual(payload.owner);
    });
});
