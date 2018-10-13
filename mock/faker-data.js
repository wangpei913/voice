module.exports = function () {
    var faker = require("faker");
    faker.locale = "zh_CN";
    var _ = require("lodash");
    return {
        people: _.times(100, function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar()
            }
        }),
        address: _.times(100, function (n) {
            return {
                id: faker.random.uuid(),
                zipCode: faker.address.zipCode(),
                city: faker.address.city(),
                county: faker.address.county()
            }
        }),
        commerce: _.times(100, function (n) {
            return {
                color: faker.commerce.color(),
                image: faker.image.image(),
                department: faker.commerce.department(),
                productName: faker.commerce.productName(),
                price: faker.commerce.price(),
                productAdjective: faker.commerce.productAdjective(),
                productMaterial: faker.commerce.productMaterial(),
                product: faker.commerce.product
            }
        })
    }
}