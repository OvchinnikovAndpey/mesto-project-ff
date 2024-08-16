// конфигурация АПИ

const config = {
    baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
    headers: {
        authorization: '6529151b-a651-4db4-ad9e-59715b964e63',
        'Content-Type': 'application/json'
    }
}

// Переменная провеки Response

const handleResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}

// Получение данных с сверера о карточках

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(handleResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
}

// Получение данных с сверера о пользователе

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(handleResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
}

// Функция редактирования профиля

export const profileEditFunction = (inputName, inputDescription) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            name: `${inputName}`,
            about: `${inputDescription}`,
        })
    })
    .then(handleResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
}

// Функция добавления карточки на сервер

export const addCardToPage = (cardData) => {
return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify(cardData),
        headers: config.headers
    })
    .then(handleResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
}

// Функция удаления карточки с сервера

export const deleteCardFromServer = (cardId) => {
return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
}

//Добавление лайка к карточке поста

export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(handleResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
}

//Удаление лайка  с карточки поста

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
})
.then(handleResponse)
.catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
}

// Изменение аватара

export const avatarEdit = (removeAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: removeAvatar
        })
    })
    .then(handleResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });
}