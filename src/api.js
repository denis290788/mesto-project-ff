const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
    headers: {
        authorization: '68087d11-b985-4432-95b1-f7afb2d9c956',
    },
};

export const getUserProfile = () => {
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

export const editProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '68087d11-b985-4432-95b1-f7afb2d9c956',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    });
};

export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: '68087d11-b985-4432-95b1-f7afb2d9c956',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    });
};

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/` + id, {
        method: 'DELETE',
        headers: {
            authorization: '68087d11-b985-4432-95b1-f7afb2d9c956',
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    });
};
