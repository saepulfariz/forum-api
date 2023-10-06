const UsersTableTestHelper = require('../../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../../tests/ThreadsTableTestHelper');
const pool = require('../../../database/postgres/pool');
const RegisterThread = require('../../../../Domains/threads/entities/RegisterThread');
const RegisteredThread = require('../../../../Domains/threads/entities/RegisteredThread');
const NotFoundError = require('../../../../Commons/exceptions/NotFoundError');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addThread method', () => {
        it('should presist thread and return added thread correctly', async () => {
            // Arrange
            const registerThread = new RegisterThread({
                title: 'sebuah thread',
                body: 'sebuah body thread',
            });

            const fakeIdGenerator = () => '123';

            await UsersTableTestHelper.addUser({ id: 'user-123' });

            const threadsRepoPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            await threadsRepoPostgres.addThread(registerThread, 'user-123');

            // Assert
            const threads = await ThreadsTableTestHelper.findThreadById('thread-123');

            expect(threads).toHaveLength(1);
        });

        it('should return RegisteredThread correctly', async () => {
            // Arrange
            const registerThread = new RegisterThread({
                title: 'sebuah thread',
                body: 'sebuah body thread',
            });

            const fakeIdGenerator = () => '123';

            await UsersTableTestHelper.addUser({ id: 'user-123' });

            const threadsRepoPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            const registeredThread = await threadsRepoPostgres.addThread(registerThread, 'user-123');

            // Assert
            expect(registeredThread).toStrictEqual(new RegisteredThread({
                id: 'thread-123',
                title: registerThread.title,
                owner: 'user-123',
            }));
        });
    });

    describe('getThreadById method', () => {
        it('should throw NotFoundError if thread is not found', async () => {
            // Arrange
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

            // Action & Assert
            await expect(threadRepositoryPostgres.getThreadById('thread-123'))
                .rejects.toThrowError(NotFoundError);
        });

        it('should return Thread correctly', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' });
            await ThreadsTableTestHelper.addThread({
                id: 'thread-123',
                title: 'sebuah thread',
                body: 'sebuah body thread',
                owner: 'user-123',
            });

            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

            // Action
            const thread = await threadRepositoryPostgres.getThreadById('thread-123');

            // Assert
            expect(thread.id).toEqual('thread-123');
            expect(thread.title).toEqual('sebuah thread');
            expect(thread.body).toEqual('sebuah body thread');
            expect(thread.date.getMinutes()).toEqual(new Date().getMinutes());
            expect(thread.username).toEqual('dicoding');
        });
    });

    describe('verifyThread method', () => {
        it('should throw NotFoundError if thread is not found', async () => {
            // Arrange
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

            // Action & Assert
            await expect(threadRepositoryPostgres.verifyThread('thread-123'))
                .rejects.toThrowError(NotFoundError);
        });

        it('should not throw NotFoundError when thread is found', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' });
            await ThreadsTableTestHelper.addThread({ id: 'thread-123' });

            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

            // Action & Assert
            await expect(threadRepositoryPostgres.verifyThread('thread-123'))
                .resolves.not.toThrowError(NotFoundError);
        });
    });
});
