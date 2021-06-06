export default class FormService {
    constructor() {
        this._apiBase = 'http://localhost:3000';
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`, { method: 'GET'});
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + `, recieved ${res.status}`);
        }
        return await res.json();
    };
    postResource = async (url, body) => {
        const res = await fetch(`${this._apiBase}${url}`, { method: 'POST', mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: body});
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + `, recieved ${res.status}`);
        }
        return await res.json();
    };
    getForm = async (formId) => {
        const form = await this.getResource(`/${formId}`);
        // return this._transformForm(form);
        return form;
    };
    postForm = async (body) => {
        const form = await this.postResource('/form', body);
        return form;
    };
    getAllForms = async () => {
        const forms = await this.getResource('/');
        return forms;
    }
    _transformForm(form) {
        return {
            id: form.id,
            name: form.name,
            lines: form.lines,
            blocks: form.blocks
        };
    }
}
