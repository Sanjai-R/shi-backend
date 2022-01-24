import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  const saltRounds = 12;
  let hashPassword;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      hashPassword = hash;
    });
  });
  return hashPassword;
};

export const verifyPassword = async (password: string) => {
  const saltRounds = 12;
  const pw = 'qw'; //todo: user password from db
  const hash = await bcrypt.hash(pw, saltRounds);
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
