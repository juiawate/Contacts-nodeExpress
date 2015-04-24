
var ContactService = {
    get: function (id) {
        // gets all the contacts
        makeAjaxCall('/contacts/' + id ,'GET',null, function (xhr) {
            var res = JSON.parse(xhr.responseText);
            res.forEach(function (r) {
                createContacts(r);
            });
        });
    },
    create: function (obj) {
        makeAjaxCall('/contacts','POST',obj, function (xhr) {
            var res = JSON.parse(xhr.responseText);
            createContacts(res);
        });
    },
    getAll: function () {
        makeAjaxCall('/contacts','GET',null, function (xhr) {
            //console.log(JSON.parse(xhr.responseText));
            var res = JSON.parse(xhr.responseText);
            res.forEach(function (r) {
                createContacts(r);
            });
        });
    },
    update: function (id, obj) {
        makeAjaxCall('/contacts/' + id,'PUT',obj, function (xhr) {
            var res = JSON.parse(xhr.responseText);
            console.log(res);
        });
    },
    delete: function (id) {
        makeAjaxCall('/contacts/' + id,'DELETE',null, function (xhr) {
            var res = JSON.parse(xhr.responseText);
            console.log(res);
        });
    }
};

function createContacts(res) {
    var showDiv = document.querySelector('#showContacts');
    var con = document.querySelector('.contact').cloneNode(true);
    showDiv.appendChild(con);
    con.style.display = 'block';
    var children = con.children;
    children['name'].setAttribute('value',res.name);
    children['userEmail'].setAttribute('value',res.email);

    children['Save'].addEventListener('click', function (event) {
        event.preventDefault();
        ContactService.update(children['userEmail'].getAttribute('value'), {
            name: children['name'].value,
            email: children['userEmail'].value
        });
        children['name'].setAttribute('value',children['name'].value);
        con.innerHTML += 'Updated!';
    });

    children['Delete'].addEventListener('click', function (event) {
        event.preventDefault();
        ContactService.delete(children['userEmail'].getAttribute('value'));
        deleteExistingBlocks();
        ContactService.getAll();
    });
}

function deleteExistingBlocks() {
    var con = Array.prototype.slice.call(document.querySelectorAll('.contact'));
    con.forEach(function (c) {
        if(c.getAttribute('style') === 'display: block;'){
            c.parentNode.removeChild(c);
        }
    });
}

function makeAjaxCall(url, httpVerb, obj, callback) { // obj is optional depending on the request
    var xhr = new XMLHttpRequest();
    xhr.open(httpVerb, url);
    if(httpVerb === 'POST' || httpVerb === 'PUT') xhr.setRequestHeader('content-type','application/json');
    // if the httpVerb is post, modify the request header - content-type, xhr.send(JSON.stringify(obj))
    xhr.addEventListener('readystatechange',function () {
        if (xhr.readyState === 4) {
            callback(xhr);
        }
    });
    if(httpVerb === 'POST' || httpVerb === 'PUT') xhr.send(JSON.stringify(obj));
    else xhr.send();
}

document.addEventListener('DOMContentLoaded', function () {
    var form = document.forms.contactsForm;
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        ContactService.create({
            name: form.username.value,
            email: form.email.value
        });
        form.username.value = '';
        form.email.value = '';
    });

    var getForm = document.forms.findContactsForm;
    getForm.elements.namedItem('getData').addEventListener('click', function (event) {
        event.preventDefault();
        if(getForm.findEmail.value){
            deleteExistingBlocks();
            ContactService.get(getForm.findEmail.value);
            getForm.findEmail.value = '';
        }else {
            deleteExistingBlocks();
            ContactService.getAll();
        }
    });
});
