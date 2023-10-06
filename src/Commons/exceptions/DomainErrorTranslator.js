const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'REGISTER_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('thread tidak lengkap'),
  'REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('thread type data tidak valid'),
  'REGISTERED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('thread tidak mengembalikan sesuai format'),
  'REGISTERED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION' : new InvariantError('thread tidak mengembalikan sesuai format type data nya'),
  'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED' : new InvariantError('Method Add Thread Repository belum di pake'),
  'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED' : new InvariantError('Method Add Comment Repository belum di pake'),
  'REGISTER_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('comment tidak lengkap'),
  'REGISTER_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('comment type data tidak valid'),
  'REGISTERED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('COMMENT tidak mengembalikan sesuai format'),
  'REGISTERED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION' : new InvariantError('COMMENT tidak mengembalikan sesuai format type data nya'),
  'COMMENT.NOT_CONTAIN_NEEDED_PROPERTY' : new InvariantError('Model COMMENT tidak mengembalikan sesuai format'),
  'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION' : new InvariantError('Model COMMENT tidak mengembalikan sesuai format type data nya'),
  'REGISTER_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('comment tidak lengkap'),
  'REGISTER_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tipe data pada comment tidak valid'),
  'REGISTER_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('balasan tidak lengkap'),
  'REGISTER_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tipe data pada balasan tidak valid'),
};

module.exports = DomainErrorTranslator;
