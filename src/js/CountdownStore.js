import { observable } from 'mobx';

class CountdownStore {
    @observable cdData = JSON.parse(localStorage.getItem('countdownData')) || {};
    @observable t;
    @observable sec;
    @observable min;
    @observable hours;
    @observable days;

    updateTime = () => {
        const timeStamp = Date.parse(this.cdData.deadline);
        this.t = timeStamp - Date.parse(new Date());
        this.sec = (this.t / 1000) % 60;
        this.min = Math.floor((this.t / 1000 / 60) % 60);
        this.hours = Math.floor((this.t / (1000 * 60 * 60)) % 24);
        this.days = Math.floor(this.t / (1000 * 60 * 60 * 24));
    }

    terminateTime = () => {
        this.sec = this.min = this.hours = this.days = 0;
    }

    submitData = (data) => {
        let timeStamp;
        let timezone = -(new Date().getTimezoneOffset() / 60 * 100);
            timezone = timezone < 0 ? timezone : '+' + timezone;
        if (data.deadline) {
            const timeString = data.deadline + ' 23:59:59 GMT' + timezone;
            timeStamp = new Date(timeString);
        } else if (data.duration) {
            const now = new Date();
            const day = ('0' + now.getDate()).slice(-2);
            const month = ('0' + (now.getMonth() + 1)).slice(-2);
            const year = now.getFullYear();

            const timeString = year + '/' + month + '/' + day + ' 23:59:59 GMT' + timezone;
            const today = new Date(timeString);
            const deadline = today.setDate(today.getDate() + parseInt(data.duration) - 1);
            timeStamp = new Date(deadline);
        } else {
            alert('请输入正确的日期。');
            return;
        }
        data.deadline = timeStamp;
        this.cdData = data;
        localStorage.setItem('countdownData', JSON.stringify(this.cdData));
    }
}

export default new CountdownStore;
