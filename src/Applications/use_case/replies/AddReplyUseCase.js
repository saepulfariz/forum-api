const RegisterReply = require('../../../Domains/replies/entities/RegisterReply');

class AddReplyUseCase {
    constructor({ repliesRepository, commentRepository, threadRepository }) {
        this._repliesRepository = repliesRepository;
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(threadId, commentId, payload, owner) {
        const registerReply = new RegisterReply(payload);

        await this._threadRepository.verifyThread(threadId);

        await this._commentRepository.verifyCommentIsExist(commentId, threadId);

        return this._repliesRepository.addReplyToComment(commentId, registerReply, owner);
    }
}

module.exports = AddReplyUseCase;
