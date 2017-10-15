new Vue({
    el:'.container',
    data:{
        addressList:[],
        limitNum:3,
        currentIndex:0,
        delFlag:false,
        curAddress:'',
        shippingMethod:1,
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{
        filteredItems: function () {
            return this.addressList.slice(0,this.limitNum); // only show first 3 items
        }

    },
    methods: {
        getAddressList: function () {
            this.$http.get("data/address.json").then(response => {
                var res = response.data;
                if (res.status == "0") {
                    this.addressList = res.result;
                }

            })
        },
        setDefault: function (addressId) {
            this.addressList.forEach((address,index)=>{
                if(address.addressId == addressId){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;
                }
            })
        },
        delConfirm: function (address) {
            this.delFlag = true;
            this.curAddress = address;
        },

        delAll:function () {
            var index = this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index,1);
            this.delFlag = false;
        }
    }

});