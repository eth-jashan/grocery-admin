class OrderModel{
constructor(id, number, order, orderTotal, date, status, address, paymentMode, uid, did, dName, dNum){
    this.id = id;
    this.number = number;
    this.order = order;
    this.orderTotal = orderTotal;
    this.date = date;
    this.status= status;
    this.address = address;
    this.paymentMode = paymentMode;
    this.uid = uid;
    this.did = did;
    this.dName = dName;
    this.dNum = dNum

}}

export default OrderModel