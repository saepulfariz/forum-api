const RegisterComment = require('../../../Domains/comments/entities/RegisterComment');

class AddCommentUseCase {
    constructor({ commentRepository, threadRepository }) {
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(threadId, payload, owner) {
        const registerComment = new RegisterComment(payload);

        await this._threadRepository.verifyThread(threadId);

        return this._commentRepository.addCommentToThread(threadId, registerComment, owner);
    }
}

module.exports = AddCommentUseCase;
