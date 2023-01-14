import fs from "fs";

class CartManager {
  constructor() {
    this.carts = [];
    this.path = "./carritos.json";
    this.id = 1;
  }

  #generateId() {
    return this.products.length != 0
      ? this.products[this.products.length - 1].id + 1
      : this.id;
  }

  getCarts(){

  }

  async addCart(){

  }

  async getCartById(){
    
  }

  async updateCart(){

  }
  
}

export default CartManager;