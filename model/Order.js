const mongoose = require('mongoose');
const { Schema } = mongoose;  ///it is made a  different schema  

const orderSchema = new Schema({
    items: { type: [Schema.Types.Mixed], required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    //////TODO we can add enum type  
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'pending' },
    selectedAddress: { type: Schema.Types.Mixed, required: true }



})

const virtual = orderSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Order = mongoose.model('Order', orderSchema)









// "mascara"
// "items": [
//     {
//         "title": "Essence Mascara Lash Princess",
//         "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//         "category": "beauty",
//         "price": 9.99,
//         "discountPercentage": 10.48,
//         "rating": 2.56,
//         "stock": 99,
//         "tags": [
//             "beauty",
//         ],
//         "brand": "Essence",
//         "sku": "BEA-ESS-ESS-001",
//         "weight": 4,
//         "dimensions": {
//             "width": 15.14,
//             "height": 13.08,
//             "depth": 22.99
//         },
//         "warrantyInformation": "1 week warranty",
//         "shippingInformation": "Ships in 3-5 business days",
//         "availabilityStatus": "In Stock",
//         "reviews": [
//             {
//                 "rating": 3,
//                 "comment": "Would not recommend!",
//                 "date": "2025-04-30T09:41:02.053Z",
//                 "reviewerName": "Eleanor Collins",
//                 "reviewerEmail": "eleanor.collins@x.dummyjson.com"
//             },
//             {
//                 "rating": 4,
//                 "comment": "Very satisfied!",
//                 "date": "2025-04-30T09:41:02.053Z",
//                 "reviewerName": "Lucas Gordon",
//                 "reviewerEmail": "lucas.gordon@x.dummyjson.com"
//             },
//             {
//                 "rating": 5,
//                 "comment": "Highly impressed!",
//                 "date": "2025-04-30T09:41:02.053Z",
//                 "reviewerName": "Eleanor Collins",
//                 "reviewerEmail": "eleanor.collins@x.dummyjson.com"
//             }
//         ],
//         "returnPolicy": "No return policy",
//         "minimumOrderQuantity": 48,
//         "meta": {
//             "createdAt": "2025-04-30T09:41:02.053Z",
//             "updatedAt": "2025-04-30T09:41:02.053Z",
//             "barcode": "5784719087687",
//             "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
//         },
//         "images": [
//             "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
//         ],
//         "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
//         "productId": 1,
//         "quantity": 1,
//         "user": 3,
//         "id": 75
//     }
// ],
//     "totalAmount": 9,
//         "totalItems": 1,
//             "user": {
//     "email": "ramesh334@gmail.com",
//         "password": "Krush@123",
//             "role": "user",
//       }
// "brand": "Essence",
//     "sku": "BEA-ESS-ESS-001",
//         "weight": 4,
//             "dimensions": {
//     "width": 15.14,
//         "height": 13.08,
//             "depth": 22.99
// },
// "warrantyInformation": "1 week warranty",
//     "shippingInformation": "Ships in 3-5 business days",
//         "availabilityStatus": "In Stock",
//             "reviews": [
//                 {
//                     "rating": 3,
//                     "comment": "Would not recommend!",
//                     "date": "2025-04-30T09:41:02.053Z",
//                     "reviewerName": "Eleanor Collins",
//                     "reviewerEmail": "eleanor.collins@x.dummyjson.com"
//                 },
//                 {
//                     "rating": 4,
//                     "comment": "Very satisfied!",
//                     "date": "2025-04-30T09:41:02.053Z",
//                     "reviewerName": "Lucas Gordon",
//                     "reviewerEmail": "lucas.gordon@x.dummyjson.com"
//                 },
//                 {
//                     "rating": 5,
//                     "comment": "Highly impressed!",
//                     "date": "2025-04-30T09:41:02.053Z",
//                     "reviewerName": "Eleanor Collins",
//                     "reviewerEmail": "eleanor.collins@x.dummyjson.com"
//                 }
//             ],
//                 "returnPolicy": "No return policy",
//                     "minimumOrderQuantity": 48,
//                         "meta": {
//     "createdAt": "2025-04-30T09:41:02.053Z",
//         "updatedAt": "2025-04-30T09:41:02.053Z",
//             "barcode": "5784719087687",
//                 "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
// },
// "images": [
//     "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
// ],
//     "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
//         "productId": 1,
//             "quantity": 1,
//                 "user": 3,
//                     "id": 75
//         }
//       ],
