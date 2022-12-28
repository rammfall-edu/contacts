import { request } from "./request.js";

const host = 'http://localhost:8082';

document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('ul');
    const form = document.querySelector('form');
    const editForm = document.querySelector('.edit-form');
    let usersStorage = [];

    function toggleEditForm() {
        editForm.classList.toggle('d-none');
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const body = new FormData(form);

        request(`${host}/users`, {
            method: 'POST',
            body,
        }).then((users) => {
            renderUsers(users);
            usersStorage = users;

            form.reset();
        }).catch(err => {
            console.log(err.message);
        })
    });

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const body = new FormData(editForm);
        const { id } = editForm.dataset;

        request(`${host}/users/${id}`, {
            method: 'PUT',
            body,
        })
            .then((users) => {
                usersStorage = users;
                renderUsers(users);
                editForm.reset();
                toggleEditForm();
            });
    })

    list.addEventListener('click', ({ target }) => {
        if (target.dataset.action === 'delete') {
            const { id } = target.closest('li').dataset;

            request(`${host}/users/${id}`, {
                method: 'DELETE',
            })
                .then((users) => {
                    renderUsers(users);
                    usersStorage = users;
                })
                .catch((err) => {
                    console.log(err.message);
                })
        }

        if (target.dataset.action === 'edit') {
            const { id } = target.closest('li').dataset;
            const { name, phoneNumber } = usersStorage.find((user) => user.id === +id);
            toggleEditForm();
            editForm.dataset.id = id;

            editForm.elements.name.value = name;
            editForm.elements.phoneNumber.value = phoneNumber;
        }
    });

    request(`${host}/users`)
        .then((users) => {
            renderUsers(users);

            usersStorage = users;
        })

    function renderUsers(users) {
        list.innerHTML = '';

        users.forEach(({ id, name, phoneNumber }) => {
            const item = document.createElement('li');
            item.dataset.id = id;

            item.innerHTML = `
                    <h2>${name}</h2>
                    <p>${phoneNumber}</p>
                    <button data-action="edit">✎</button>
                    <button data-action="delete">x</button>
                `;
            list.append(item);
        });
    }
});
