export default class Notification {
    title: string = '';
    detail: string = '';

    constructor(title: string = '', detail: string = '') {
        this.title = title;
        this.detail = detail;
    }
}