const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const RegisterComment = require('../../../../Domains/comments/entities/RegisterComment');
const RegisteredComment = require('../../../../Domains/comments/entities/RegisteredComment');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
    it('should orchestracting the add comment action correctly', async () => {
        // Arrange
        const payload = {
            content: 'sebuah comment',
        };

        const owner = 'user-123';

        const mockRegisteredComment = new RegisteredComment({
            id: 'comment-123',
            content: payload.content,
            owner,
        });

        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockCommentRepository.addCommentToThread = jest.fn()
            .mockImplementation(() => Promise.resolve(mockRegisteredComment));
        mockThreadRepository.verifyThread = jest.fn()
            .mockImplementation(() => Promise.resolve());

        /** creating use case instance */
        const addCommentUseCase = new AddCommentUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
        });

        // Action
        const registeredComment = await addCommentUseCase.execute('thread-123', payload, owner);

        // Assert
        expect(registeredComment).toStrictEqual(new RegisteredComment({
            id: 'comment-123', content: 'sebuah comment', owner,
        }));

        expect(mockThreadRepository.verifyThread).toBeCalledWith('thread-123');
        expect(mockCommentRepository.addCommentToThread).toBeCalledWith('thread-123', new RegisterComment(payload), owner);
    });
});
