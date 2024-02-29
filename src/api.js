const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
    headers: {
        authorization: '68087d11-b985-4432-95b1-f7afb2d9c956',
        'Content-Type': 'application/json',
    },
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    });
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    });
};
