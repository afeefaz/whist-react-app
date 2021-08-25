import { observable, makeObservable, action } from "mobx"
import axios from "axios"
import dayjs from "dayjs"

const serverApi = "http://localhost:8080/products"

class productsStore{
    constructor() {
      this.products = axios.get(serverApi)
      this.shoppingCart = []
      
      makeObservable(this, {
        products: observable,
        shoppingCart : observable,
        getProducts : action,
        deleteProduct : action,
        addProduct : action,
        addToCart : action,
        handlePay : action,
        getTop5 : action,
        getLast5Days : action
      })
    }

    getProducts = async () => {
        this.products = await axios.get(serverApi)
    }

    getProduct = async (id) => {
        let product = await axios.get(`${serverApi}/${id}`)
        return product
    }
    deleteProduct = (id) => {
        axios.delete(`${serverApi}/${id}`).then(async (res) => {
            console.log(res)
            await this.getProducts()
        })
      }

    addProduct = async (obj) => {
      await axios.post(serverApi, obj).then(async (res) => {
        console.log(res)
        await this.getProducts()
      })
    }

    updateProduct = async (id, Title, Price, Descreption, Image) => {
      axios.put(`${serverApi}/${id}`, {Title, Price, Descreption, Image})
      await this.getProducts()
    }

    addToCart = (obj) => {
      this.shoppingCart.push(obj)
    }

    handlePay = (arr) => {
      let tempArr = []
      let total = 0
      for (const prod of arr) {
        total += prod.Price
        tempArr.push({id : prod._id})
      }

      axios.post("http://localhost:8080/transactions", {...tempArr, total}).then(async (res) => {
        console.log(res)
      })
    }

    getTop5 = async () => {
      let transactions  = await axios.get("http://localhost:8080/transactions")
      let counter = {}
      let top5 = []

      for (const products of transactions.data) {
          for (const prod in products.products) {
            if(counter[products.products[prod].id] !== undefined) counter[products.products[prod].id] += 1
            else counter[products.products[prod].id] = 1
        }
      }

      for (const key in counter) {
        let p = await this.getProduct(key)
        if(p.data[0] !== undefined) top5.push({name : p.data[0].Title, value : counter[key]})
      }

      top5.sort()
      top5.splice(5)

      return top5
    }

    getTop5Unique = async () => {
      let transactions  = await axios.get("http://localhost:8080/transactions")
      let counter = {}
      let top5 = []

      for (const products of transactions.data) {
        for (const prod in products.products) {
            let id = products.products[prod].id

            if(counter[id] !== undefined) counter[id] += 1
            else counter[id] = 1
        }
        for (const prod in counter) {
          if(counter[prod] > 1 && counter[prod] !== undefined){
            let product = await this.getProduct(prod)
            top5.push({name : product.data[0].Title, value : counter[prod]})
        }
        counter = {}
      }
    }
    return top5
  }

    getLast5Days = async () => {
      let transactions  = await axios.get("http://localhost:8080/transactions")
      let obj = {}
      let last5Days = []

      for (const products of transactions.data) {
        let today, day4, day3, day2, day1
        today = dayjs().date()
        day4 = today - 1
        day3 = today - 2
        day2 = today - 3
        day1 = today - 4

        if(dayjs(products.date).date() === today){
          if(obj[today] === undefined)
            obj[today] = {date : dayjs(products.date).format('DD/MM/YYYY'), total : products.total}
          else obj[today].total += products.total
        }
        else if(dayjs(products.date).date() === day4){
          if(obj[day4] === undefined)
            obj[day4] = {date : dayjs(products.date).format('DD/MM/YYYY'), total : products.total}
          else obj[day4].total += products.total
        }
        else if(dayjs(products.date).date() === day3){
          if(obj[day3] === undefined)
            obj[day3] = {date : dayjs(products.date).format('DD/MM/YYYY'), total : products.total}
          else obj[day3].total += products.total
        }
        else if(dayjs(products.date).date() === day2){
          if(obj[day2] === undefined)
            obj[day2] = {date : dayjs(products.date).format('DD/MM/YYYY'), total : products.total}
          else obj[day2].total += products.total
        }
        else if(dayjs(products.date).date() === day1){
          if(obj[day1] === undefined)
            obj[day1] = {date : dayjs(products.date).format('DD/MM/YYYY'), total : products.total}
          else obj[day1].total += products.total
        }
      }
      last5Days.push(obj)
      return last5Days
    }
  }
  
export default productsStore