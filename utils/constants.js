const errorServer = 500;
const urlRegExp = /https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/;
const errorMessages = {
  badRequest: 'Переданы некорректные данные',
  unauthorized: 'Необходима авторизация',
  conflictUser: 'Такой пользователь уже существует',
  conflictEmail: 'Такой email занят',
  unauthorizedUser: 'Неправильный email или пароль',
  notFoundUser: 'Пользователь с указанным id не найден не найден.',
  successAuthorization: 'Авторизация успешна',
  notFoundMovie: 'Фильм с указанным id не найден.',
  forbiddenMovie: 'Фильмы другого пользователя удалять запрещено',
  badRequestMovie: 'Передан несуществующий id фильма',
  serverError: 'На сервере произошла ошибка',
  requestError: 'Такого запроса нет',
};

module.exports = {
  urlRegExp,
  errorServer,
  errorMessages,
};
