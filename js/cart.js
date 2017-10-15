var vm = new Vue({
	el:"#app",
	data:{
	    productList:[],
        totalMoney:0,
        checkAllFlag:false,
        totalPrice:0,
        delFlag:false,
        curProduct:'',

	},

	filters:{
	    formatMoney: function (value) {
            return "$" + value.toFixed(2)  // better in backend return decimal, otherwise value will be round off in js.
        }

	},
	mounted: function () {
	    this.$nextTick(function () {   //use .$nextTick to ensure vm mounted
            vm.cartView();  //vm == this
        });
	},

	methods:{
		cartView: function () {
		    // ES5
            // var _this = this;
            // this.$http.get("data/cartData.json",{"id":123}).then(function (res) { //promise
				// _this.productList = res.data.result.list;
				// _this.totalMoney = res.data.result.totalMoney;
            // });
            //ES6
            let _this = this;
			this.$http.get("data/cartData.json",{"id":123}).then(res=>{ // inside(=> this) === outside this
                this.productList = res.data.result.list;
                this.totalMoney = res.data.result.totalMoney;
            });
        },

        changeMoney: function (product, way) {
            if(way>0){
                product.productQuantity++;
            }else{
                if (product.productQuantity > 1) {
                    product.productQuantity--;
                }
            }
            this.calcTotalPrice();
        },

        selectedProduct: function (item) {
            if(typeof item.checked == 'undefined'){
                Vue.set(item,"checked",true);  // global register. Since json doesn't have item.checked, use "Vue.set" to register a new property, default value as "true"
               // this.$set(item,"checked",true); // local register
            } else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            this.productList.forEach( (item,index)=> {
                if(typeof item.checked == 'undefined'){
                    Vue.set(item,"checked",this.checkAllFlag);
                } else{
                    item.checked = this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },

        calcTotalPrice: function () {
		    this.totalPrice = 0;
            this.productList.forEach( (item,index)=> {
                if(item.checked){
                    this.totalPrice += item.productPrice * item.productQuantity;
                }
            });
        },

        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },

        delProduct: function () {
		    var index = this.productList.indexOf(this.curProduct);  // in real world: return an id to backend, backend delete the item and then return the result to the frontend.
		    this.productList.splice(index,1);  // js: delete an element in the array
            this.calcTotalPrice();
		    this.delFlag = false;

        }








	}

});

// global filter
Vue.filter("money", function (value, type) {
    return "$" + value.toFixed(2) + type;
})