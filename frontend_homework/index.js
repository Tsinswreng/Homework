class Index{
	constructor(){
		this.inputId = 'search'
	}

	static getInstance(){
		this.instance = new Index()
		return this.instance
	}

	getUrl_str(){
		const input = $('#'+this.inputId).val()
		let url = `https://www.baidu.com/s?wd=${input}&rsv_spt=1&rsv_iqid=0x93737ef0001d54bd&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=5&rsv_sug1=3&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&prefixsug=abcd&rsp=5&inputT=1802&rsv_sug4=3472`
		return url
	}

	goToUrl_void(url_str){
		window.location.href = url_str
	}

	百度一下_void(){
		this.goToUrl_void(this.getUrl_str())
	}
}

const indexObj = Index.getInstance()