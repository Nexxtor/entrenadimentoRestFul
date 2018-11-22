window.onload = () => {
    app.init();
};

let app = {
    init: function () {
        this.addEvents();
        this.loadContent();
    },
    addEvents: function () {
        let form = document.userForm;
        form.addEventListener('submit', this.submitUser);
    },
    submitUser: function (event) {
        event.preventDefault();
        let form = document.userForm;
        let data = {
            username: form.username.value,
            name: form.name.value,
            lastname: form.lastname.value
        };
        fetch('/users', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                return res.json()
            })
            .then(data => {
                if (data.ok) {
                    this.addRow(data.insertado);
                } else {
                    let errors = document.getElementsByClassName("errors")[0];
                    errors.innerText = data.err;
                }
            });
    },
    addRow: function (data) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td class="id">${data._id} </td>
                        <td class="username">${data.username}</td>
                        <td>${data.name}</td>
                        <td>${data.lastname}</td>
                        <td> 
                            <a class="delete" href="#"> Delete</a>
                            <a class="update" href="#">Update</a> 
                        </td>`;
        let tbody = document.getElementsByClassName("listUsers")[0];
        tbody.appendChild(tr);

        let addEvents = () => {
            // Delete
            document.querySelectorAll(".delete").forEach(element => {
                element.addEventListener("click", function (event) {
                    event.preventDefault();
                    let id = element.parentElement.parentElement.getElementsByClassName("id")[0].innerText;
                    fetch('/users/' + id, {
                            method: 'DELETE'
                        }).then(res => res.json())
                        .then(data => {
                            if (data.ok) {
                                let tbody = document.getElementsByClassName("listUsers")[0];
                                tbody.removeChild(element.parentElement.parentElement);
                            } else {
                                let errors = document.getElementsByClassName("errors")[0];
                                errors.innerText = data.err.message;
                            }
                        })

                });
            });

            // Update
            document.querySelectorAll(".update").forEach(element =>{
                element.addEventListener('click', function(event){
                    event.preventDefault();
                    let old = element.parentElement.parentElement;
                    let tr = document.createElement('tr');
                    tr.innerHTML = `<form>
                                        <td class="id">
                                            <input type="text" name="id" readonly value ="id">
                                        </td>
                                        <td>
                                            <input type="text" name="username">
                                        </td>
                                        <td>
                                            <input type="text" name="name">
                                        </td>
                                        <td>
                                            <input type="text" name="lastname">
                                        </td>
                                        <td> <input type="submit" value="Save"> </td>
                                    </form>`;
                    tbody.replaceChild(tr,old);
                });
            });
        }
        addEvents();
    },
    loadContent: function () {
        fetch('/users', {
                method: 'GET'
            }).then(res => res.json())
            .then(data => {
                if (data.ok) {
                    data.users.forEach(element => {
                        this.addRow(element);
                    });
                }
            });
    }
}