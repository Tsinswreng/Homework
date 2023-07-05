class User {
	constructor() { }
	assign() {
		this.userName = $('#userName').val();
		this.password1 = $('#password1').val();
		this.password2 = $('#password2').val();
		this.email = $('#email').val();
	}
	check() {
		let errroInfo = '';
		if (this.userName === '' || !this.userName) {
			errroInfo += '用户名未填写 ';
		}
		if (!this.password1.match(/(\w){6,20}/)) {
			errroInfo += '密码必须是6~20位、只能使用大小写英文字母、数字、下划线 ';
		}
		if (this.password1 !== this.password2) {
			errroInfo += '两次密码不一致 ';
		}
		if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			errroInfo += '邮箱不合法 ';
		}
		if (errroInfo !== '') {
			alert(errroInfo);
		}
		else {
			alert('通过');
			//window.location.href = 'https://www.bistu.edu.cn/';
			window.location.href = 'https://www.baidu.com/';
		}
	}
	submit() {
		this.assign();
		this.check();
	}
}
let user = new User();
