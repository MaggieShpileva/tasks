import Data from "./data.json" assert { type: "json" };

class Cart {
  constructor(purchases) {
    this.currentProducts = purchases;
    this.total = [];
  }

  productsCart() {
    const result = [];
    this.currentProducts.map((product) => {
      Data.items.map((item) => {
        if (product.item === item.id) {
          const productCart = {
            id: product.item,
            name: item.name,
            price: item.price,
            amount: product.amount,
            discounts: [item.discount],
          };
          result.push(productCart);
        }
      });
    });
    this.total = result;
    return result;
  }

  discounts() {
    const result = this.productsCart().map((item, index) => {
      Data.itemsDiscounts.map((itemsDiscount) => {
        if (itemsDiscount.itemId == item.id) {
          //отфильтровываем скидки по id скидки
          let typeDis = Data.discounts.filter((typeDiscount) => {
            if (typeDiscount.id === itemsDiscount.discountId) {
              return typeDiscount.discount;
            }
          });
          //добавляем подходящие скидки к товару
          typeDis.map((currentDiscount) => {
            item.discounts.push(currentDiscount.discount);
          });
        }
      });
      //считаем цену со всеми примененными скидками
      const priceWithDiscount = item.discounts.reduce(
        (acc, i) => {
          acc -= (+i.slice(0, -1) / 100) * acc;
          return acc;
        },
        [item.price]
      );
      return { ...item, priceWithDiscount };
    });
    this.total = result;
    return result;
  }

  // общая скидка по чеку
  totalDiscount() {
    const { discountSum, withoutDiscountSum } = this.discounts().reduce(
      (acc, item) => {
        acc.discountSum += item.priceWithDiscount * item.amount;
        acc.withoutDiscountSum += item.price * item.amount;
        return acc;
      },
      { discountSum: 0, withoutDiscountSum: 0 }
    );
    const applicableDiscounts = Data.totalDiscounts.filter(
      (discount) => discount.minPrice <= discountSum
    );
    const maxDiscount = applicableDiscounts.reduce(
      (max, discount) => Math.max(max, discount.discount.slice(0, -1)),
      0
    );
    const totalDiscount = discountSum - discountSum * (maxDiscount / 100);
    return {
      discountSum: discountSum.toLocaleString("fr-FR"),
      withoutDiscountSum: withoutDiscountSum.toLocaleString("fr-FR"),
      totalDiscount: totalDiscount.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    };
  }

  printResult() {
    this.totalDiscount();

    this.total.map((item) => {
      let itemDiscountPrice = (
        item.amount * item.priceWithDiscount
      ).toLocaleString("fr-FR");
      let itemPrice = (item.amount * item.price).toLocaleString("fr-FR");

      console.log(
        `${item.name} - ${item.amount} штук, ${itemDiscountPrice} рублей (${itemPrice} рублей без скидки)
      `
      );
    });

    console.log(`Итого: ${this.totalDiscount().discountSum} (${
      this.totalDiscount().withoutDiscountSum
    } рублей без скидки)
    `);

    const totalPrice = this.totalDiscount().totalDiscount.split(",");
    console.log(
      `Итого со скидкой: ${totalPrice[0]} рублей ${
        totalPrice[1] !== "00" ? totalPrice[1] + " копеек" : ""
      } `
    );
  }
}
let cart = new Cart(Data?.purchases);
cart.printResult();
